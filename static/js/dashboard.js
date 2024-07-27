import * as firbase from "./firbase.js";

// todo 
  // add spinner when load user
  // add method to change pending or verify user
  // add user dicrctly
  // add images in send emails
  // add tab for change user password 

let usersNumSpan = document.querySelector(".users .info .num")
let emailItems = document.querySelector(".email-items")
let inactiveUsersNum = document.querySelector(".inactive-users .num")
let activeUsersNum = document.querySelector(".active-users .num")
let selectEmail = document.querySelector(".email-user")
let sendemailBtn = document.querySelector(".sendemail-btn-modal")
let emailform = document.querySelector(".emailform")
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.load('current', { 'packages': ['timeline'] })
function drawChart(usersData) {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Users');
  data.addColumn('number', 'active');
  data.addRows([
    ['active', usersData.active],
    ['inactive', usersData.inactive],
  ]);


  // Set chart options
  var options = {
    'title': 'Users Active',
    'width': 400,
    'height': 350
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function drawChartTimeLine(loggingData) {
  var options2 = {
    'title': 'Users Active In Days', 'width': 400,
    'height': 300, backgroundColor: '#fff'
  }
  let values = Object.values(loggingData)

  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'email' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows(values);

  chart.draw(dataTable, options2);
}
getUsersData()

function getUsersData() {

  const options = {
    headers: {
      "X-CSRFToken": csrfToken,
      "ContentType": 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    method: 'POST',
    // Convert JSON data to a string and set it as the request body
  };
  fetch('/usersdata', options) // api for the get request
    .then(response => response.json())
    .then(data => {
      const currentDate = new Date()
      const currentDateIndays = currentDate.getTime()
      let activeUsersCount = 0
      let inactiveUsersCount = 0
      if (data.results) {
      
        let loggingData = {}
        emailItems.innerHTML = ""
        selectEmail.innerHTML = ""
        let emails = data.users.map(user => user.email)

        selectEmail.innerHTML += ` <option value="${emails}">All Users</option>`
        data.users.forEach((user, index) => {
          loggingData[index] = [
            user.email,
            new Date(user.lastLogin),
            new Date(),
          ]
          // fill select email in form
          selectEmail.innerHTML += `
                   <option value="${user.email}">${user.email}</option>
                   `
          // console.log(userDetails);
          const creationTime = new Date(user.creationTime);
          const creationTimeFormatted = creationTime.getDate() + '/' + (creationTime.getMonth() + 1) + '/' + creationTime.getFullYear();
          const lastLogin = new Date(user.lastLogin);

          const lastLoginFormatted = lastLogin.getDate() + '/' + (lastLogin.getMonth() + 1) + '/' + lastLogin.getFullYear();
          let diffInLogin = Math.floor((currentDateIndays - lastLogin) / (24 * 3600 * 1000))
          let active = ''
          let email_verified = ''
          if (diffInLogin <= 7) {
            active = 'active'
            activeUsersCount++
          } else {
            active = 'inactive'
            inactiveUsersCount++
          }

          emailItems.innerHTML += `
                    <div class='user-data'>
                    <li class="list-group-item user-email">${user.email} <span class='status ${active}'>${active}</span>
                    <span class='status ${user.email_verified == true ? 'verified' : 'unverified'}'>[${user.email_verified == true ? 'Verified' : 'Unverified'}]</span></li>
                    <p class="create-at"><span class='title-span'>creationTime:</span> <span class='span-data'>${creationTimeFormatted}</span></p>
                    <p class="last-login"><span class='title-span'>last Login  </span>: <span class='span-data ${active}'>${lastLoginFormatted}</span></p>
                    </div>
                    `
        });
        usersNumSpan.innerHTML = data.users.length
        activeUsersNum.innerHTML = activeUsersCount
        inactiveUsersNum.innerHTML = inactiveUsersCount
        let usersData = {
          "active": activeUsersCount,
          "inactive": inactiveUsersCount
        }

        google.charts.setOnLoadCallback(drawChart(usersData));
        // google.charts.setOnLoadCallback(drawChartTimeLine(loggingData));
      }

    })
    .catch(error => {
      console.log(error);

    })

}



function CKupdate(){
  for ( let instance in CKEDITOR.instances ){
      CKEDITOR.instances[instance].updateElement();
      // CKEDITOR.instances[instance].setData('');
  }
}

CKEDITOR.replace( 'content' );
sendemailBtn.addEventListener("click", e => {
  e.preventDefault()
  showSpinner()
   CKupdate()
  let formdata = new FormData(emailform)
  
  const options = {
    headers: {
      "X-CSRFToken": csrfToken,
    },
    credentials: 'include',
    method: 'POST',
    body: formdata // Convert JSON data to a string and set it as the request body
  };
  fetch('/sendemailevents', options) // api for the get request
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        
        hideSpinner()
        document.querySelector(".close-email-modal").click()
        fireAlert("success","email sent succesfully")
      }
      else if(data.error)
      {
        console.log(data.error);
        hideSpinner()
        fireAlert("error",data.error)
        
      }
      else {
        hideSpinner()
        
        fireAlert("error","somthing error")
      }
    })
    .catch(error => {
     
      hideSpinner()
      fireAlert("error",error)

    })

})


// edit users
editUsersFetch()

function editUsersFetch() {

  const options = {
    headers: {
      "X-CSRFToken": csrfToken,
      "ContentType": 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    method: 'POST',
    // Convert JSON data to a string and set it as the request body
  };
  fetch('/editusers', options) // api for the get request
    .then(response => response.json())
    .then(data => {

      if (data.results) {
          let users = data.users
          let editUsersContainer = document.querySelector(".edit-users-ul")
          editUsersContainer.innerHTML = ""
          for (const key in users) {
             
              let user = users[key]
           
              if(user['role'] != 'admin')
              {
                editUsersContainer.innerHTML +=`
                <li class="list-group-item edit-users-list">
                    <div class="edit-users-email">${user['email']}</div>
                    <div class="edit-users-action">
                      <a class="edit-users-delete" data-target="${key}">
                        <i class="fa-solid fa-trash"></i>
                      </a>
                    </div>
                </li>
                `
              }
            }
          
      }

      let editUsersDelete  = document.querySelectorAll(".edit-users-delete");
      editUsersDelete.forEach(el=>
      {
        el.addEventListener("click",()=>
        {
          let uid = el.getAttribute("data-target");
          showSpinner()
          deleteUsersFetch(uid,el)
          
         
        })
      }
      )

    })
    .catch(error => {
      console.log(error);

    })

}


function deleteUsersFetch(uid,element) {
  let formdata = new FormData()
  formdata.append("uid",uid)
  const options = {
    headers: {
      "X-CSRFToken": csrfToken,
      "ContentType": 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    method: 'POST',
    body: formdata
    // Convert JSON data to a string and set it as the request body
  };
  fetch('/deleteuser', options) // api for the get request
    .then(response => response.json())
    .then(data => {

      if (data.results) {
        hideSpinner()  
        element.parentElement.parentElement.remove()
        fireAlert("success","user deleted successfully")
        getUsersData()

      }
      if(data.error)
      {
        hideSpinner()
        fireAlert("error","error happened.try again later")   
      }

    })
    .catch(error => {
      console.log(error);
      hideSpinner()
      fireAlert("error",error)   

    })

}
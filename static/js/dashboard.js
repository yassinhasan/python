import * as firbase from "./firbase.js";

let usersNumSpan = document.querySelector(".users .info .num")
let emailItems = document.querySelector(".email-items")
let inactiveUsersNum = document.querySelector(".inactive-users .num")
let activeUsersNum = document.querySelector(".active-users .num")
// firbase.get(firbase.ref(firbase.db, 'users/') 
// ).then(snapshot=>{
//     let count = 0

// })

getUsersData()

function getUsersData() {

        const options = {
          headers: {
        "X-CSRFToken" : csrfToken,
        "ContentType": 'application/json;charset=UTF-8',
          },
          credentials: 'include' ,
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
                emailItems.innerHTML = ""
                data.users.forEach(user => {
                   // console.log(userDetails);
                    const creationTime = new Date(user.creationTime);
                    const creationTimeFormatted =  creationTime.getDate() + '/' +  creationTime.getMonth() + '/' + creationTime.getFullYear();
                    const lastLogin = new Date(user.lastLogin);
                    const lastLoginFormatted =  lastLogin.getDate() + '/' +  lastLogin.getMonth() + '/' + lastLogin.getFullYear();
                    let diffInLogin =  Math.floor((currentDateIndays- lastLogin)/(24*3600*1000)) 
                    let active = ''
                    if(diffInLogin <= 7)
                      {
                        active = 'active'
                        activeUsersCount ++
                      }else{
                        active = 'inactive'
                        inactiveUsersCount ++
                      }
                    emailItems.innerHTML += `
                    <div class='user-data'>
                    <li class="list-group-item user-email">${user.email} <span class='status ${active}'>${active}</span></li>
                    <p class="create-at"><span class='title-span'>creationTime:</span> <span class='span-data'>${creationTimeFormatted}</span></p>
                    <p class="last-login"><span class='title-span'>last Login  </span>: <span class='span-data ${active}'>${lastLoginFormatted}</span></p>
                    </div>
                    `
                });
                usersNumSpan.innerHTML = data.users.length 
                activeUsersNum.innerHTML = activeUsersCount
                inactiveUsersNum.innerHTML = inactiveUsersCount
            }

          })
          .catch(error => {
           console.log(error);

          })

}

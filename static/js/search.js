let downloadBtn = document.querySelector(".download-btn");
let results = document.querySelector(".results")
let inputUrl = document.querySelector(".url-input")
// let copy = document.querySelector(".url-form .copy-div")
let loader = document.querySelector(".loader");
let msgShow = document.querySelector(".msg");
let timeDiv = document.querySelector(".time-div");

inputUrl.focus()


downloadBtn.addEventListener("click", (e) => {
   e.preventDefault()
   if(inputUrl.value == "")
   {
      showResultsError()
   }else{
    getResult()
   }

  })


function getResult() {
        let start = performance.now()
        downloadBtn.classList.add("disabled")
        timeDiv.innerHTML =""
        let resultContent = document.querySelector(".result-content");
        results.style.display = "block"
        resultContent.innerHTML = ""
        let searchItem = inputUrl.value
        showResultSpinner()
        let form  = document.querySelector(".url-form")
        let formdata = new FormData(form)
        const options = {
          headers: {
        "X-CSRFToken" : csrfToken,
        "ContentType": 'application/json;charset=UTF-8',
          },
          credentials: 'include' ,
          method: 'POST',
          body: formdata // Convert JSON data to a string and set it as the request body
        };
        fetch('/searchItem', options) // api for the get request
          .then(response => response.json())
          .then(data => {
                
            if (data.success) {
                let resultContent = document.querySelector(".result-content");
                let headers = ["company","item" , "promotion_title","before offer", "after offer","link"]
                let csvData = []
                let card = ""
                card += `<div class="btn-csv-wraper"><button class="btn download-results">Download Resutls <i class="fa-solid fa-download"></i></button></div>`
                for (const key in data.result) {
                  console.log(data.result);
                    let web_name = data.result[key][0][0];
                    let web_results = data.result[key][0];
                    card += `<h5   class="heading-6 web-name ${web_name}" data-bs-toggle="collapse" href="#${web_name}" role="button" aria-expanded="true" aria-controls="${web_name}">
                              <span class="web-name-span">${web_name}</span>
                              <i class="fa fa-solid fa-angle-down" style="
                                    margin-left: 10px;
                                "></i>
                              </h5>`
                    card += `<div class='result-wraper'>`
                    let foundClass = ''
                    for (let index = 0; index < web_results.length; index++) {
                      if(index == 0) continue
                      let title = web_results[index]['title']
                      let titleOffer = web_results[index]['promotion_title']
                      let beforOffer = web_results[index]['before_special']
                      let price = web_results[index]['price']
                      let image = web_results[index]['image']
                      let link = web_results[index]['link']
                      csvData.push([web_name,title.replace(/,/g,"-"),titleOffer.replace(/,/g,"-"),beforOffer.replace(/,/g,"-"),price.replace(/,/g,"-"),link])
                      card += 
                      `
                            <div class="card  show"  id="${web_name}">
                             <span class="hint-name ${web_name}">${web_name}</span>
                             <img src="${image}" class="card-img-top" alt="...">
                               <div class="card-body">
                              
                               <a href="${link}" target="_blank" class="card-title">${title}</a>
                              <p class="title-offer">${titleOffer}</p>
                              <p class="card-text"><span>${price}</span> <span class="before-price">${beforOffer}</span></p>
                            
                            </div>
                          </div>
                      `
                    }
                    card += '</div>'
                   
                  }
                  resultContent.innerHTML = card
                  hideResultSpinner()
                  let end = performance.now()
                  timeDiv.innerHTML = `these resuls took <span class="time-span">${Math.round((end - start) / 1000)}</span> to load  sec`
                  let downloadResults = document.querySelector(".download-results");
                  downloadResults.addEventListener("click",e=>{
                    e.preventDefault()
                    saveResultsAsCsv(headers,csvData)
                  })
                  
                }
                else{
                  fireAlert("error","no data found")
                  hideResultSpinner()
                }

              
          })
          .catch(error => {
            showResultsError()
            hideResultSpinner()
            inputUrl.focus()
          })

}

function showResultSpinner()
{
  loader.classList.add("show")
  msgShow.classList.add("show")

}
function hideResultSpinner()
{
 
  loader.classList.remove("show")
  msgShow.classList.remove("show")
  downloadBtn.classList.remove("disabled")
 
}


function showResultsError(){
  inputUrl.style.boxShadow=" 2px 2px #b52626"
  const Toast = Swal.mixin({
    customClass: 'swal-upload',
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      color: "#b58126",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "something error "
    }); // end of alert
}

let arrow = document.querySelector(".arrow")

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    arrow.style.display = "block";
  } else {
    arrow.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

arrow.addEventListener("click",e=>{
  e.preventDefault()
  topFunction()
})
import * as firbase from "./firbase.js";


let logoutBtn = document.querySelector(".logout");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault()
  showSpinner()
  logoutUser()
})

function logoutUser() {
    firbase.signOut(firbase.auth).then(() => {
    // repareGuestElements();
    let formdata = new FormData()
    const options = {
      method: 'POST',
      contentType: 'application/json;charset=UTF-8',
      body: formdata // Convert JSON data to a string and set it as the request body
    };
    fetch('/logout', options) // api for the get request
      .then(response => response.json())
      .then(data => {
        if (data.success == true) {
          window.location.href = "http://localhost/";
        
        }
        else {
          hideSpinner()

        }
      })
      .catch(error => {
        hideSpinner()

      })
    showSpinner()
    window.location.reload()

  }).catch((error) => {
  
  });
}

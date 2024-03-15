import * as firbase from "./firbase.js";

// register
let register_btn = document.querySelector(".register-btn-modal");
register_btn.addEventListener("click", (e) => {
  e.preventDefault();
  register()
})


function register() {
  showSpinner();
  hideRegistererror();
  if (!isEmptyRegisterfields()) {
    hideSpinner()
    return;
  }
  if (!isNotvalidUsername()) {
    hideSpinner()
    return;
  }

  let emailValue = email_r.value.trim();
  let passwordValue = password_r.value.trim();
  firbase.createUserWithEmailAndPassword(firbase.auth, emailValue,passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("uid",user.uid)
      saveUserinDatabase(user)
      // ...
    })
    .catch((error) => {
      hideSpinner()
      const errorCode = error.code;
      //   console.log(errorCode);
      const errorMessage = error.message;
      showRegistererror(errorCode, errorMessage)
    });

}

function saveUserinDatabase(user) {

 
  firbase.set(firbase.ref(firbase.db, 'users/' + user.uid), {
    username: username_r.value,
    email: user.email,
    password: password_r.value

  })
    .then(() => {
      let formdata = new FormData()
      formdata.append("username", username_r.value)
      formdata.append("email", user.email)

      const options = {
        method: 'POST',
        contentType: 'application/json;charset=UTF-8',
        body: formdata // Convert JSON data to a string and set it as the request body
      };
      fetch('/register', options) // api for the get request
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            window.location.href = "http://localhost/upload";
          
          }
          else {
            hideSpinner()
            console.log(data);
          }
        })
        .catch(error => {
          hideSpinner()
          console.log(error);
        })
    })
    .catch((error) => {
      // The write failed...
      console.log(error);
      const Toast = Swal.mixin({
        customClass: 'swal-login',
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        color: "#b52626",
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: error
      }); // end of alert
    });
}
// sign in
let sign_in_btn = document.querySelector(".login-btn-modal");
sign_in_btn.addEventListener("click", (e) => {
  e.preventDefault();

  login()
})

function login() {
  showSpinner();
  hideRegistererror();
  if (!isEmptyLoginfields()) {

    hideSpinner()
    return;
  }

  let emailLoggedValue = email_input.value.trim();
  let passwordLoggedValue = password_input.value.trim();
  firbase.signInWithEmailAndPassword(firbase.auth, emailLoggedValue, passwordLoggedValue)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("uid",user.uid)
      const userData = firbase.ref(firbase.db, 'users/' + user.uid);
      firbase.onValue(userData, (snapshot) => {
        let signedUser = snapshot.val();
        let formdata = new FormData()
        formdata.append("username", signedUser.username)
        formdata.append("email", signedUser.email)
        const options = {
          method: 'POST',
          contentType: 'application/json;charset=UTF-8',
          body: formdata // Convert JSON data to a string and set it as the request body
        };
        fetch('/login', options) // api for the get request
          .then(response => response.json())
          .then(data => {
            if (data.success == true) {
              window.location.href = "http://localhost/upload";
            }
            else {
              hideSpinner()

            }
          })
          .catch(error => {
            hideSpinner()
            console.log(error);
          })
        hideSignInmodal()
      });
  
      // ...
    })
    .catch((error) => {
      hideSpinner()
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      showLoginerror(errorCode, errorMessage)
    });
}







import * as firbase from "./firbase.js";
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
      // Signed in 
      const user = userCredential.user;
      user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        localStorage.setItem("token",idToken)
        localStorage.setItem("uid",user.uid)
        window.location.href= "/upload?token="+idToken
        // ...
      }).catch(function(error) {
        // Handle error
        console.log(error);
      });
    })
    .catch((error) => {
      hideSpinner()
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      showLoginerror(errorCode, errorMessage)
    });
}



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
          saveUserinDatabase(user)
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
        user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          console.log(idToken);
          localStorage.setItem("token",idToken)
          localStorage.setItem("uid",user.uid)
          window.location.href= "/upload?token="+idToken
          // ...
        }).catch(function(error) {
          // Handle error
          hideSpinner()
          console.log(error);
        });
      })
      .catch((error) => {
        hideSpinner()
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







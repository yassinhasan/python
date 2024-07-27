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
      if(user.emailVerified)
      {
        user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // check if user is admin
          // goto dashboard
          // Send token to your backend via HTTPS
          localStorage.setItem("token",idToken)
          localStorage.setItem("uid",user.uid)
          console.log( user.uid);
          firbase.get(firbase.ref(firbase.db, 'users/' + user.uid) 
          ).then(snapshot=>{
            let loggedUser= snapshot.val()
            if(loggedUser.role === "admin")
              {
                window.location.href= "/dashboard?token="+idToken
              }else{
                window.location.href= "/upload?token="+idToken
              }
          })
        }).catch(function(error) {
          // Handle error
          console.log(error);
        });
      }else{
        hideSpinner()

        Swal.fire({
          customClass: 'verify-alert',
          title: "<strong>Attention!!</strong>",
          html: `
          Your email address is not verified, click verify now
          `,
          showCloseButton: false,
          allowOutsideClick: false,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `Send Verification Email`,
          confirmButtonAriaLabel: "Send Verification Email",
        }).then(result => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            firbase.sendEmailVerification(user)
            .then(()=>{
              fireAlert("success", "Verification email sent successfully" )
              document.querySelector(".close-login-modal").click()
            }).catch(error=>{
              fireAlert("error", error )
            })
 
          }
        else if (result.isDismissed) {
         
    // close modal
        }
        });
      }
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
          firbase.sendEmailVerification(user)
          .then(() => {
            // Email verification sent!
            saveUserinDatabase(user)
          }).catch(error=>fireAlert("error",error));
         
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
      password: password_r.value ,
      "role" : "user" ,
      "status": "pending"
  
    })
      .then(() => {        
        hideSpinner()
        fireAlert("info",'An email verification link has been sent to ' + user.email )
        document.querySelector(".close-register-modal").click()
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







let spinners = document.querySelector(".main.spinners");
let overlay = document.querySelector(".main.overlay");

let filesSpinners = document.querySelector(".files-spinners");
let filesOverlay = document.querySelector(".files-overlay");
hideSpinner()
function showSpinner()
{
    overlay.style.display="block"
    spinners.style.display="block"
}

function hideSpinner()
{
    overlay.style.display="none"
    spinners.style.display="none"
}
function showFilesSpinner()
{
    filesSpinners.style.display="block"
    filesOverlay.style.display="block"
}

function hideFilseSpinner()
{
    filesSpinners.style.display="none"
    filesOverlay.style.display="none"
}


function hideRegistermodal()
{
    const register_modal = document.querySelector('.register-modal');
    const modal_r = bootstrap.Modal.getInstance(register_modal);    
    modal_r.hide();
    // hide register button
    // show exit button
    // here we will do every thing
}
function hideSignInmodal()
{
    const sign_modal = document.querySelector('.signin-modal');
    const modal = bootstrap.Modal.getInstance(sign_modal);    
    modal.hide();
    // hide register button
    // show exit button
    // here we will do every thing
}

function fireAlert(type,msg){
    var style = getComputedStyle(document.body)
    let primaryColor = ""
    if(type == "error")
    {
        primaryColor = "#b52626";
    }else{
        primaryColor = "#121212"
    }
    
    const Toast = Swal.mixin({
        customClass: 'swal-login',
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        color: primaryColor,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: type,
        title: msg
      }); // end of alert
}

function getTimeFormatting()
{
  var time = new Date();
  var options = {
    day: "numeric" ,
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    hour :  '2-digit' ,
    minute :  '2-digit' ,        
};
  time = time.toLocaleString('en-TT', {options})
  return {
    "time" : time ,
    "actualTime" :Date.now()
  }
}


var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];



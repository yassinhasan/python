
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

function fireAlert(type,msg,customClass='swal-login',position="top-start"){
    var style = getComputedStyle(document.body)
    let primaryColor = ""
    if(type == "error")
    {
        primaryColor = "#b52626";
    }else{
        primaryColor = "#121212"
    }
    
    const Toast = Swal.mixin({
        customClass: customClass,
        toast: true,
        position: position,
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

function getTimeFormatting(timeStamp=null)
{
  let time;
  if(timeStamp == null)
    {
      time = new Date();
    }else{
       time =  new Date(Date.now() - timeStamp)
    }
 
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



async function showLoaderWithTitle(title)
{
    let loadWraper = document.querySelector(".loader-wraper")
    if(loadWraper)
      {
        loadWraper.classList.add("show")
      }

    let loadTitle = document.querySelector(".loader-title");
    if(loadTitle)
      {
        loadTitle.innerHTML = title
      }
}
function removeLoaderWithTitle()
{
  let loadWraper = document.querySelector(".loader-wraper")
  if(loadWraper)
    {
      loadWraper.classList.remove("show")
    }
    let loadTitle = document.querySelector(".loader-title");
    if(loadTitle)
      {
        loadTitle.innerHTML = ""
      }
}

function demoFromHTML() {
  var pdf = new jsPDF('p', 'pt', 'letter');
  // source can be HTML-formatted string, or a reference
  // to an actual DOM element from which the text will be scraped.
  source = $('#cv')[0];
  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    '#editor': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true
    }
};
  // we support special element handlers. Register them with jQuery-style 
  // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
  // There is no support for any other type of selectors 
  // (class, of compound) at this time.

  margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 10000
  };
  // all coords and widths are in jsPDF instance's declared units
  // 'inches' in this case
  pdf.fromHTML(
  source, // HTML string or DOM elem ref.
  margins.left, // x coord
  margins.top, { // y coord
      'width': margins.width, // max width of content on PDF
      'elementHandlers': specialElementHandlers
  },

  function (dispose) {
      // dispose: object with X, Y of the last line add to the PDF 
      //          this allow the insertion of new lines after html
      pdf.save('Test.pdf');
  }, margins);
}


function createLogs(message)
{
  uploadString(logsRef, message).then((snapshot) => {
    console.log('Uploaded a raw string!');
  });
}

  function getUserInfo()
{
   fetch("http://ipinfo.io").then( result=>{
     ip =   result.ip ;
      localStorage.setItem("ip",ip)
  })
     
} 


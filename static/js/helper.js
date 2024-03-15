let spinners = document.querySelector(".spinners");
let overlay = document.querySelector(".overlay");

let filesSpinners = document.querySelector(".files-spinners");
let filesOverlay = document.querySelector(".files-overlay");


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



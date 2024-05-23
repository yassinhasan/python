let currentTab = 0;
let userCvData = {};
// create cv
let srcImage = null;
let imagePreview;
let image_cv_input;
let mainFormElem ;
let firstNameElem ;
let middleNameElem ;
let lastNameElem ;
let jopTitleElem;
let display_name;
let display_jop ;
let display_phone;
let display_email ;
let display_address;
let display_education;
let display_work ;
let display_skills ;
let display_courses ;
let display_lang ;
let display_ref ;
let userImages ;

  // contact
  let phonNumbersElements ;
  let emailElements ;
  let addressElements;
  // let summaryElements = document.querySelectorAll(".summary_cv")
  let edu_descrptionElements ;
  // let edu_startdateElements = document.querySelectorAll(".edu_startdate")
  // let edu_endDateElements = document.querySelectorAll(".edu_enddate")

  let exp_descriptionElements;
  // let exp_organizationElements = document.querySelectorAll(".exp_organization")
  // let exp_startDateElements = document.querySelectorAll(".exp_startdate")
  // let exp_endDateElements = document.querySelectorAll(".exp_enddate")
  let skillsElements;
  let coursesDescElements ;
  let langDescElements;
  let langSkillsElements ;
  let refDescElements;
  let repeatContactForm ;
  let repeatEducationForm ;
  let repeatWorkForm ;
  let repeatSkillsForm ;
  let repeatCoursesForm ;
  let repeatRefForm ;
  let repeatLangForm ;
  let fontFamily = [
      '"Poppins", sans-serif',
      '"Roboto", sans-seri',
      '"Gideon Roman", serif',
      '"Open Sans", sans-serif',
      '"Lato", sans-serif',
      '"Montserrat", sans-serif'
                     
  ]
let originalHasanCV = {
  "firstName": "Hasan",
  "middleName": "Elhussiny",
  "lastName": "Meady",
  "jopTitle": "Pharamacist",
  "contact": [
    {
      "phone_cv": "+966546035917",
      "email_cv": "dr_hasan781@yahoo.com",
      "address_cv": "Al Mubarraz, Al Ahsa,Saudi Arabia"
    },
    {
      "phone_cv": "+966575653417",
      "email_cv": "hasanmmeady781@gmail.com",
      "address_cv": ""
    }
  ],
  "education": [
    {
      "edu_descrption": "Bachelor’s degree in pharmacy (Very Good), Tanta University, Egypt (2010)"
    },
    {
      "edu_descrption": ""
    }
  ],
  "workExperience": [
    {
      "exp_description": "Pharmacist at Aldwaa, Alahsaa, KSA (2011 - Present)"
    },
    {
      "exp_description": "Pharmacist, Ibn Alnafess Pharmacy (part-time), Tanta, Egypt, (2010 - 2011)"
    },
    {
      "exp_description": "Pharmacist, Ministry of Health hospitals (Public Duty), Tanta, Egypt (2011)"
    }
  ],
  "siklls": [
    {
      "skill_cv": "Communication Skills: Proficient in liaising and communication with stakeholders, including experience with internal and external parties. Fluent in Arabic and English."
    },
    {
      "skill_cv": "Leadership & Training Skills: Experienced in onboarding and training new staff and pharmacists, ensuring smooth transition and implementation of systems."
    },
    {
      "skill_cv": "Problem-Solving Skills: Able to identify, report and propose solutions for any bug fixing or development."
    }
  ],
  "courses": [
    {
      "courses_desc": "Web and Programming Fundamentals (PHP, JAVASCRIPT, TYPESCRIPT, PYTHON, HTML, CSS)"
    },
    {
      "courses_desc": "Advanced Database Management using MySQL Shell Scripting, Virtualization, Active Directory (MCSA)"
    },
    {
      "courses_desc": "Docker containerization"
    },
    {
      "courses_desc": "Manage Linux operating systems"
    },
    {
      "courses_desc": "Networking (CCNA)"
    },
    {
      "courses_desc": "Networking (CCNA)"
    }
  ],
  "lang": [
    {
      "lang_desc": "Arabic",
      "lang_skills": "Native"
    },
    {
      "lang_desc": "English",
      "lang_skills": "Very Good"
    }
  ],
  "References": [
    {
      "ref_desc": "Available upon request"
    }
  ],
  "image"
    : "/images/hasan.png"
}

let edit = false;
let hideAgain = true;
showTab(currentTab);



function showTab(n) {
  document.querySelector(".progress").style.display = n == 0 ? 'none' : 'flex'
  let x = document.getElementsByClassName("step");
  x[n].style.display = "block";
  let progress = (n / (x.length - 1)) * 100;
  document.querySelector(".progress-bar")
    .style.width = progress + "%";
  document.querySelector(".progress-bar")
    .setAttribute("aria-valuenow", progress);
  document.getElementById("prevBtn")
    .style.display = n == 0 ? "none" : "inline";
  // document.getElementById("nextBtn")
  //   .innerHTML = n == x.length - 1 ? "Submit" : "Next";
  document.getElementById("nextBtn")
    .style.display = n == x.length - 1 ? "none" : "inline";
}

function nextPrev(n) {
  let x = document.getElementsByClassName("step");
  x[currentTab].style.display = "none";
  currentTab += n;
  if (currentTab >= x.length) {
    resetForm();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  let valid = true;
  let x = document.getElementsByClassName("step");
  let y = x[currentTab].getElementsByTagName("input");
  for (var i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  return valid;
}

function resetForm() {
  let x = document.getElementsByClassName("step");
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  // let inputs = document.querySelectorAll("input");
  // inputs.forEach(input => {
  //     input.value = "";
  //     input.className = "";
  // });
  currentTab = 0;
  showTab(currentTab);
  document.querySelector(".progress-bar")
    .style.width = "0%";
  document.querySelector(".progress-bar")
    .setAttribute("aria-valuenow", 0);
  document.getElementById("prevBtn")
    .style.display = "none";
}


$(document).ready(function () {
  $('.repeater').repeater({
    initEmpty: false,
    defaultValues: {
      'text-input': ''
    },
    show: function () {
      $(this).slideDown();
    },
    hide: function (deleteElement) {
      $(this).slideUp(deleteElement);
      setTimeout(() => {
        // generateCV();
      }, 500);
    },
    isFirstItemUndeletable: true
  })
})


// save screen shot


let downloadCvBtn1 = document.querySelector(".download-cv1");
downloadCvBtn1.addEventListener("click", e => {

  showLoaderWithTitle("Creating Image CV ..")
  convertToImage(document.querySelector(".cv1", "cv1"))
})
let downloadCvBtn2 = document.querySelector(".download-cv2");
downloadCvBtn2.addEventListener("click", e => {
  showLoaderWithTitle("Creating Image CV ..")
  convertToImage(document.querySelector(".cv2"), "cv2")
})


async function convertToImage(element, name) {
  // document.querySelector(".cv-wraper").style.scale = "1"
  const h = await html2canvas(element, {
    allowTaint: true,
    quality: 4,
    scale: 4,
  }).then(canvas => {
    const fileName = "name";
    const link = document.createElement("a");
    link.download = fileName + ".png";
    canvas.toBlob(function (blob) {
      link.href = canvas.toDataURL({
        width: canvas.width,
        height: canvas.height,
        left: 0,
        top: 0,
        format: "png",
        multiplier: 2
      });
      link.click();
      removeLoaderWithTitle()
      fireAlert("success", "Your CV is downloaded as Image")
    });
  })
  return h
}


let downloadPdf1 = document.querySelector(".download-pdf-1")
downloadPdf1.addEventListener("click", e => {
  // let scale = getComputedStyle(document.querySelector(".cv-wraper")).scale
  // document.querySelector(".cv-wraper").style.scale = "1"
  // showLoaderWithTitle("Creating Pdf CV ..")
  // printdoc(document.querySelector(".cv1"), "cv1", true)
  // document.querySelector(".cv-wraper").style.scale = scale
  printJS({printable:'cv1', type:'html',css:'https://drnull.web.app/css/cvmaker.css'});

})
let downloadPdf2 = document.querySelector(".download-pdf-2")
downloadPdf2.addEventListener("click", e => {
  // let scale = getComputedStyle(document.querySelector(".cv-wraper")).scale
  // document.querySelector(".cv-wraper").style.scale = "1"
  // showLoaderWithTitle("Creating Pdf CV ..")
  // printdoc(document.querySelector(".cv2"), "cv2")
  // document.querySelector(".cv-wraper").style.scale = scale
  printJS({printable:'cv2', type:'html',css:'https://drnull.web.app/css/cvmaker.css'});
})

async function printdoc(element, name, resize = false) {
  // document.querySelector(".cv2").style.scale = "1"
  const h = await html2canvas(element, {
    allowTaint: false,
    quality: 2,
    scale: 1,
    logging: false,

  })
    .then(canvas => {

      let toData = canvas.toDataURL({ width: canvas.width, height: canvas.height, left: 0, top: 0, format: "png", multiplier: 2 });
      var doc = new jsPDF('p', 'pt', 'a4');

      // th = doc.internal.pageSize.width;    
      // var height = width * hratio
      let width = doc.internal.pageSize.width
      let height = doc.internal.pageSize.height
      let widthRatio = width / canvas.width
      let heightRatio = height / canvas.height

      let ratio = widthRatio > heightRatio ? heightRatio : widthRatio
      doc.addImage(toData, 'PNG',
        20,
        20,
        (canvas.width * ratio - 40),
        (canvas.height * ratio - 40)
      )
      doc.save(name);
      removeLoaderWithTitle()
      fireAlert("success", "Your CV is downloaded")
    })
  return h
}


function fetchValues(attr, ...nodes) {
  let elementCount = nodes.length;

  // console.log(nodes);
  let elementDataCount = nodes[0].length
  let tempArray = []
  // no of repeater
  for (let x = 0; x < elementDataCount; x++) {
    // example now phone element
    let obj = {}
    for (let j = 0; j < elementCount; j++) {
     
      obj[`${attr[j]}`] = nodes[j][x].value
      
    }
    tempArray.push(obj)

  }
  // console.log(tempArray);
  return tempArray
}
// create cv
srcImage = null
imagePreview = document.querySelector(".image-preview")
image_cv_input = document.querySelector(".image_cv_input")
imagePreview.parentElement.style.display = "none"
imagePreview.addEventListener("click",e=>{
 image_cv_input.click()
})
mainFormElem = document.querySelector(".main-form")
firstNameElem = mainFormElem.firstname_cv
middleNameElem = mainFormElem.middle_cv
lastNameElem = mainFormElem.lastname_cv
jopTitleElem = mainFormElem.jop_cv
display_name = document.querySelectorAll(".name-cv")
display_jop = document.querySelectorAll(".jop-cv")
display_phone = document.querySelectorAll(".phone-container")
display_email = document.querySelectorAll(".email-container")
display_address = document.querySelectorAll(".address-container")
display_education = document.querySelectorAll(".education-container")
display_work = document.querySelectorAll(".work-container")
display_skills = document.querySelectorAll(".skills-container")
display_courses = document.querySelectorAll(".courses-container")
display_lang = document.querySelectorAll(".lang-container")
display_ref = document.querySelectorAll(".ref-container")
userImages = document.querySelectorAll(".image-cv");

function hideAllBeforeAddNewCV(...elementsToHide) {
  elementsToHide.forEach(elements => {
    hideElements(elements)
  }
  )

  function hideElements(elements) {


    elements.forEach(element => {
      element.parentElement.style.display = "none"

    })
  }
}



const userInputs = () => {
  // contact
  phonNumbersElements = document.querySelectorAll(".phone_cv")
  emailElements = document.querySelectorAll(".email_cv")
  addressElements = document.querySelectorAll(".address_cv")
  edu_descrptionElements = document.querySelectorAll(".edu_descrption")
  exp_descriptionElements = document.querySelectorAll(".exp_description")
  skillsElements = document.querySelectorAll(".skill_cv")
  coursesDescElements = document.querySelectorAll(".courses_desc")
  langDescElements = document.querySelectorAll(".lang_desc")
  langSkillsElements = document.querySelectorAll(".Lang_skills")
  refDescElements = document.querySelectorAll(".ref_desc");
  repeatContactForm = document.querySelector(".repeat-contact-form")
  repeatEducationForm = document.querySelector(".repeat-education-form")
  repeatWorkForm = document.querySelector(".repeat-work-form")
  repeatSkillsForm = document.querySelector(".repeat-skills-form")
  repeatCoursesForm = document.querySelector(".repeat-courses-form")
  repeatRefForm = document.querySelector(".repeat-ref-form")
  return {
    firstName: firstNameElem.value,
    middleName: middleNameElem.value,
    lastName: lastNameElem.value,
    jopTitle: jopTitleElem.value,
    contact: fetchValues(['phone_cv', 'email_cv', 'address_cv'], phonNumbersElements, emailElements, addressElements),
    education: fetchValues(['edu_descrption'], edu_descrptionElements),
    workExperience: fetchValues(['exp_description'], exp_descriptionElements),
    siklls: fetchValues(['skill_cv'], skillsElements),
    courses: fetchValues(['courses_desc'], coursesDescElements),
    lang: fetchValues(['lang_desc', 'lang_skills'], langDescElements, langSkillsElements),
    References: fetchValues(['ref_desc'], refDescElements),
    image: srcImage,
  }
}

function fillAllCv(elements, data) {
  if (data) {
    elements.forEach(element => {
      if (!edit) { element.parentElement.style.display = "block" }
      element.innerHTML = data
    })
  }

}

let imageCvDisplay = document.querySelectorAll(".image-cv")

function previewImage() {

  let image_cv_input = document.querySelector(".image_cv_input")
  let oFReader = new FileReader();
  oFReader.readAsDataURL(image_cv_input.files[0]);
  oFReader.onload = function (ofEvent) {
    srcImage = ofEvent.target.result;

    userCvData['image'] = srcImage
    imagePreview.parentElement.style.display = "flex"
    imagePreview.src = srcImage
    localStorage.setItem("userCv", JSON.stringify(userCvData))
    if (edit == false && hideAgain == true) {
      hideAllBeforeAddNewCV( display_name,display_jop,display_phone, display_email, display_address, display_education, display_work, display_courses, display_skills, display_lang, display_ref)
      hideAgain = false
    }
    imageCvDisplay.forEach(imageBox => {
      imageBox.src = srcImage
      imageBox.style.display = srcImage == null ? 'none' : 'flex'
      imageBox.parentElement.style.display = srcImage == null ? 'none' : 'flex'
    })
  }
}



function generateCV(data_target, item, category) {


  if (edit == false && hideAgain == true) {
   
    srcImage = null
    console.log(display_phone);
    hideAllBeforeAddNewCV(imageCvDisplay, display_phone, display_email, display_address, display_education, display_work, display_courses, display_skills, display_lang, display_ref)
    hideAgain = false
  }

  document.querySelectorAll(".image-cv-box").forEach(imageBox => {
    imageBox.style.display = srcImage == null ? 'none' : 'flex'
  }
  )
  userCvData = userInputs()
  
  localStorage.setItem("userCv", JSON.stringify(userCvData))
  if (item == 'firstName' || item == 'middleName' || item == 'lastName' || item == 'jopTitle') {
    fillAllCv(display_name, "<p>" + userCvData.firstName + " " + userCvData.middleName + " " + userCvData.lastName + "</p>")
    fillAllCv(display_jop, "<p>" + userCvData.jopTitle + "</p>")
  } else {
    
    fillAsList(data_target, userCvData[category], item)
  }
}


function fillAsList(data_target, dataList, item) {

  if (!dataList) return
  let divsLists = document.querySelectorAll(`.${data_target}`) //container
  let cv = 0;
  let num = ""
  divsLists.forEach((divsList, index) => {
    
    divsList.innerHTML = ""

    dataList.forEach((data,counter) => {
      
      if (data[item]) {
        divsList.parentElement.style.display = "block"
        num = counter > 0 ?   `(${counter+1})` : ''
        //  if i want to show item in list escpially in cv number 2 not one
        if (cv != 0 && item == "email_cv") {
          
          divsList.innerHTML += `<div><div class="text-size-bold">Email${num}: </div><a class="text-size">${data[item]}</a></div>`

        }
        else if (cv != 0 && item == "phone_cv") {
          divsList.innerHTML += `<div><div class="text-size-bold">Phone${num}: </div><span class="text-size">${data[item]}</span></div>`
        }
        else if (cv != 0 && item == "address_cv") {
          divsList.innerHTML += `<div><div class="text-size-bold">Address${num}: </div><span class="text-size">${data[item]}</span></div>`
        }
        else if (item == "lang_desc" || item == "lang_skills") {

          divsList.innerHTML += `<li><span class="lang-item">${data['lang_desc']}:</span><span class="lang-skills"> ${data['lang_skills']}</span> </li>`
        }
        else {
          divsList.innerHTML += `<li>${data[item]}</li>`

        }
      }
      else {
        if (divsList.childElementCount == 0 && edit == false) {
          divsList.parentElement.style.display = "none"
        }
      }
      

    })
    cv ++
  })
}


function generateCVFromLocalStorage() {


  let userCvData = JSON.parse(localStorage.getItem("userCv"))
  let dataWillLoaded = userCvData ? userCvData : originalHasanCV
  if (dataWillLoaded && dataWillLoaded['image'] && dataWillLoaded['image'] != null) {
    srcImage = dataWillLoaded['image']
    userImages.forEach(userImage => {
      userImage.style.display = "flex"
      userImage.src = dataWillLoaded['image']
    })

  } else {
    userImages.forEach(userImage => {
      userImage.style.display = "none"
      userImage.src = ""
    })
  }
  // if edit(is true so do'nt hide )
  hideAllBeforeAddNewCV(display_name, display_jop, display_phone, display_email, display_address, display_education, display_work, display_courses, display_skills, display_lang, display_ref)
  let firstName = dataWillLoaded.firstName ? dataWillLoaded.firstName : ""
  let middleName = dataWillLoaded.firstName ? dataWillLoaded.middleName : ""
  let lastName = dataWillLoaded.firstName ? dataWillLoaded.lastName : ""
  let jopTitle = dataWillLoaded.jopTitle ? dataWillLoaded.jopTitle : ""

  fillAllCv(display_name, "<p>" + firstName + " " + middleName + " " + lastName + "</p>")
  fillAllCv(display_jop, "<p>" + jopTitle + "</p>")
  fillAsList('phone-container', dataWillLoaded['contact'], 'phone_cv')
  fillAsList('email-container', dataWillLoaded['contact'], 'email_cv')
  fillAsList('address-container', dataWillLoaded['contact'], 'address_cv')
  fillAsList('education-container', dataWillLoaded['education'], 'edu_descrption')
  fillAsList('work-container', dataWillLoaded['workExperience'], 'exp_description')
  fillAsList('skills-container', dataWillLoaded['siklls'], 'skill_cv')
  fillAsList('courses-container', dataWillLoaded['courses'], 'courses_desc')
  fillAsList('lang-container', dataWillLoaded['lang'], 'lang_desc')
  fillAsList('lang-container', dataWillLoaded['lang'], 'lang_skills')
  fillAsList('ref-container', dataWillLoaded['References'], 'ref_desc')

}
generateCVFromLocalStorage()

document.querySelector(".firstname_cv").focus()
if (localStorage.getItem("userCv") != null) {
  Swal.fire({
    title: "<strong>Create Or Edit CV</strong>",
    html: `
        choose Create New CV or Edit Your Saved CV
      `,
    showCloseButton: false,
    allowOutsideClick: false,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
      <i class="fa-brands fa-creative-commons-share"></i> Create
      `,
    confirmButtonAriaLabel: "Thumbs up, Create!",
    cancelButtonText: `
      <i class="fa-solid fa-pen-to-square"></i> Edit
      `,
    cancelButtonAriaLabel: "Edit yOU CV"
  }).then(result => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem("userCv")
      localStorage.removeItem("stylecss-cv1")
      localStorage.removeItem("stylecss-cv2")
      generateCVFromLocalStorage()
    } else if (result.isDismissed) {
      edit = true
      // load data in form input
      loadDataInFormAfterSelectEditOption()

    }
  });
}
else {
  console.log(localStorage.getItem("userCv"));
}
function loadDataInFormAfterSelectEditOption() {
    // contact
    phonNumbersElements = document.querySelectorAll(".phone_cv")
    emailElements = document.querySelectorAll(".email_cv")
    addressElements = document.querySelectorAll(".address_cv")
   //  summaryElements = document.querySelectorAll(".summary_cv")
    edu_descrptionElements = document.querySelectorAll(".edu_descrption")
   //  edu_startdateElements = document.querySelectorAll(".edu_startdate")
   //  edu_endDateElements = document.querySelectorAll(".edu_enddate")
  
    exp_descriptionElements = document.querySelectorAll(".exp_description")
   //  exp_organizationElements = document.querySelectorAll(".exp_organization")
   //  exp_startDateElements = document.querySelectorAll(".exp_startdate")
   //  exp_endDateElements = document.querySelectorAll(".exp_enddate")
    skillsElements = document.querySelectorAll(".skill_cv")
    coursesDescElements = document.querySelectorAll(".courses_desc")
    langDescElements = document.querySelectorAll(".lang_desc")
    langSkillsElements = document.querySelectorAll(".Lang_skills")
    refDescElements = document.querySelectorAll(".ref_desc");
    repeatContactForm = document.querySelector(".repeat-contact-form")
    repeatEducationForm = document.querySelector(".repeat-education-form")
    repeatWorkForm = document.querySelector(".repeat-work-form")
    repeatSkillsForm = document.querySelector(".repeat-skills-form")
    repeatCoursesForm = document.querySelector(".repeat-courses-form")
    repeatRefForm = document.querySelector(".repeat-ref-form")
    repeatLangForm = document.querySelector(".repeat-lang-form")
  let userCvData = JSON.parse(localStorage.getItem("userCv"))
  firstNameElem.value = userCvData.firstName ?? ""
  middleNameElem.value = userCvData.middleName ?? ""
  lastNameElem.value = userCvData.lastName ?? ""
  jopTitleElem.value = userCvData.jopTitle ?? "";

  if(userCvData.contact)
  {
    userCvData.contact.forEach((data,index)=>
      {
        if(index == 0){  phonNumbersElements[0].value = data.phone_cv ?? ""}
        if(index == 0){    emailElements[0].value = data.email_cv ?? ""}
        if(index == 0){  addressElements[0].value = data.address_cv ?? ""}
        if(index > 0)
          {
          
            repeatContactForm.click()
            let phone_cv_elments  = document.querySelectorAll(".phone_cv")
            let email_cv_elments  = document.querySelectorAll(".email_cv")
            let address_cv_elments  = document.querySelectorAll(".address_cv")
            
            phone_cv_elments[index].value = data.phone_cv
            email_cv_elments[index].value = data.email_cv
            address_cv_elments[index].value = data.address_cv
          }
      }
    )
  }
  if(userCvData.education)
  {
    userCvData.education.forEach((data,index)=>
      {
       
        if(index == 0){ edu_descrptionElements[0].value = data.edu_descrption ?? ""}
       
        if(index > 0)
          {
          
            repeatEducationForm.click()
            let educatiob_elments  = document.querySelectorAll(".edu_descrption")
            educatiob_elments[index].value = data.edu_descrption
          }
      }
    )
  }
  if(userCvData.workExperience)
  {
    
    userCvData.workExperience.forEach((data,index)=>
      {
        if(index == 0){   exp_descriptionElements[0].value = data.exp_description ?? ""}
        if(index > 0)
          {
          
            repeatWorkForm.click()
            let workExp_elements  = document.querySelectorAll(".exp_description")
            workExp_elements[index].value = data.exp_description
          }
      }
    )
  }
  if(userCvData.siklls)
  {

    userCvData.siklls.forEach((data,index)=>
      {
  
        if(index == 0){  skillsElements[0].value = data.skill_cv ?? ""}
        if(index > 0)
          {
          
            repeatSkillsForm.click()
            let skills_elements  = document.querySelectorAll(".skill_cv")
            skills_elements[index].value = data.skill_cv
          }
      }
    )
  }
  if(userCvData.courses)
  {
    userCvData.courses.forEach((data,index)=>
      {
        if(index == 0){  coursesDescElements[0].value = data.courses_desc ?? ""}
        if(index > 0)
          {
          
            repeatCoursesForm.click()
            let courses_elements  = document.querySelectorAll(".courses_cv")
            courses_elements[index].value = data.courses_desc
          }
      }
    )
  }
  if(userCvData.References)
  {
    userCvData.References.forEach((data,index)=>
      {
        
        if(index == 0){   refDescElements[0].value = data.ref_desc ?? ""}
        if(index > 0)
          {
          
            repeatRefForm.click()
            let RefDescElements  = document.querySelectorAll(".ref_desc")
            RefDescElements[index].value = data.ref_desc
          }
      }
    )
  }
  if(userCvData.lang)
  {
    userCvData.lang.forEach((data,index)=>
      {

        if(index == 0){  
          
          let options1 = langDescElements[0].options;
          for (let index = 0; index < options1.length; index++) {
            const element = options1[index];
            console.log(element.value);
            if(element.value.toLowerCase() == data.lang_desc.toLowerCase()){
              element.selected = "selected" 
            } else{ 
              element.selected = ""
            }
          }
          let options2 = langSkillsElements[0].options;
          for (let i = 0; i < options2.length; i++) {
            const element = options2[i];
           
            if(element.value.toLowerCase() == data.lang_skills.toLowerCase()){
              element.selected = "selected" 
            } else{ 
              element.selected = ""
            }
          }
        }
        if(index > 0)
          {
          
            repeatLangForm.click()
            let langDescElements2  = document.querySelectorAll(".lang_desc")
            let langSkillsElements2  = document.querySelectorAll(".Lang_skills")
           
            let options3 = langDescElements2[index].options;
            for (let x = 0; x < options3.length; x++) {
              const element = options3[x];
           
              if(element.value.toLowerCase() == data.lang_desc.toLowerCase()){
                element.selected = "selected" 
              } else{ 
                element.selected = ""
              }
            }
            let options4 = langSkillsElements2[index].options;
            for (let y = 0; y < options4.length; y++) {
              const element = options4[y];
             
              if(element.value.toLowerCase() == data.lang_skills.toLowerCase()){
                element.selected = "selected" 
              } else{ 
                element.selected = ""
              }
            }
          }
      }
    )
  }
 
  if(userCvData['image'] && userCvData['image'] != null){
    
    imagePreview.parentElement.style.display ="flex"
    imagePreview.src = userCvData['image']
  }else{
    imagePreview.parentElement.style.display ="none"
  }

}
// const sliderm = new Sliderm('#exampe-slider', {
//   arrow: true,
//   pagination: true,
//   grouping: false,
//   loop: true,
//   preview: false,
//   columns: 4,
//   duration: 1000,
//   spacing: 30,
//   align: 'center',
// });


// function printElement(e) {
//   let cloned = e.cloneNode(true);
//   document.body.appendChild(cloned);
//   cloned.classList.add("printable");
//   window.print();
//   document.body.removeChild(cloned);
// }

// printElement(document.querySelector(".cv1"))

// customize template
/*
    --cv2-font-size-text: 14px;
    --cv2-font-size-title:18px;
    --cv2-font-size-heading:20px;
    --cv2-fontfamily:"Poppins", sans-serif;
    
    --cv1-bg1: #084C41;
    --cv1-bg2: #e9e9e9;
    --cv1-fc1:#fbfbfb;
    --cv1-fc2: #000;

    --cv2-bg1:#dee2e6;
    --cv2-bg2: #a8b5c7;
    --cv2-fc1:#fbfbfb;
    --cv2-fc2: #000;
*/
function getItemFromStorage(object,item)
{
  let css = null
  if(localStorage.getItem(object)){
    let style = JSON.parse(localStorage.getItem(object))
    css =  style[item]
  }
  return css
}



let bg1 = ""
let bg2 = ""
let fc1 = "#fbfbfb"
let fc2 = "#000"
let fFamily  ;
let fsize1 ;
let fsize2 ;
let fsize3 ;
let cvTarget = 0
let styleCss1 = {}
let styleCss2 = {}
function selectTemplate(element)
{

  /*
x;
    --cv2-fontfamily:"Poppins", sans-serif;
  
    --cv1-bg1: #084C41;
    --cv1-bg2: #e9e9e9;
    --cv1-fc1:#fbfbfb;
    --cv1-fc2: #000;

    --cv2-bg1:#dee2e6;
    --cv2-bg2: #a8b5c7;
    --cv2-fc1:#fbfbfb
          --cv2-font-size-text: 14px;
    --cv2-font-size-title:18px;
    --cv2-font-size-heading:20p
  */

    if(element.value == "template-1")
    {
        bg1 = getItemFromStorage('stylecss-cv1','--cv1-bg1') ?? "#084C41"
        bg2 = getItemFromStorage('stylecss-cv1','--cv1-bg2') ?? "#e9e9e9"
        fc1 = getItemFromStorage('stylecss-cv1','--cv1-fc1') ?? "#fbfbfb"
        fc2 =  getItemFromStorage('stylecss-cv1','--cv1-fc2') ?? "#000"
        fFamily =getItemFromStorage('stylecss-cv1','--cv1-fontfamily') ??  '"Roboto", sans-seri'
        fsize1 = getItemFromStorage('stylecss-cv1',' --cv1-font-size-heading') ?? "20"
        fsize2 = getItemFromStorage('stylecss-cv1',' --cv1-font-size-title') ?? "18"
        fsize3 = getItemFromStorage('stylecss-cv1',' --cv1-font-size-text') ?? "14"
        cvTarget = 1;
        document.querySelector(".cv2").style.display="none"
        document.querySelector(".cv1").style.display="block"

    }else if(element.value == "template-2")
    {
        bg1 = getItemFromStorage('stylecss-cv2','--cv2-bg1') ?? "#dee2e6"
        bg2 = getItemFromStorage('stylecss-cv2','--cv2-bg2') ?? "#a8b5c7"
        fc1 = getItemFromStorage('stylecss-cv2','--cv2-fc1') ?? "#000"
        fc2 =  getItemFromStorage('stylecss-cv2','--cv2-fc2') ?? "#000"
        fFamily =getItemFromStorage('stylecss-cv2','--cv2-fontfamily') ??  '"Roboto", sans-seri'
        fsize1 = getItemFromStorage('stylecss-cv2',' --cv2-font-size-heading') ?? "20"
        fsize2 = getItemFromStorage('stylecss-cv2',' --cv2-font-size-title') ?? "18"
        fsize3 = getItemFromStorage('stylecss-cv2',' --cv2-font-size-text') ?? "14"
        cvTarget = 2
        document.querySelector(".cv1").style.display="none"
        document.querySelector(".cv2").style.display="block"
    }else{
      document.querySelector(".cv1").style.display="block"
      document.querySelector(".cv2").style.display="block"
    }

    document.querySelector(".bg-1").value = bg1
    document.querySelector(".bg-2").value = bg2
    document.querySelector(".fc1").value = fc1
    document.querySelector(".fc2").value = fc2
    document.querySelector(".fontsize1").value = fsize1 // input
    document.querySelector(".fontsize2").value = fsize2 // input
    document.querySelector(".fontsize3").value = fsize3 // input
    document.querySelector(".fsize-span1").innerHTML =`(${fsize1}px)` 
    document.querySelector(".fsize-span2").innerHTML =`(${fsize2}px)` 
    document.querySelector(".fsize-span3").innerHTML =`(${fsize3}px)` 
    let opt = document.querySelector(".fontfamily").options;
    for (let index = 0; index < opt.length; index++) {
      const element = opt[index];
      if(element.value == fFamily)
        {
          element.selected = "selected"
        }else{
          element.selected = ""
        }
      
    }
    document.querySelector(".show-option").style.display = "flex"

    
}


const root = document.querySelector(':root');

// set css variable

function changeFontsize1(element) {

  fsize1 = element.value

  document.querySelector(".fsize-span1").innerHTML = `(${element.value}px)`
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-font-size-heading', `${fsize1}px`)
    styleCss1['--cv1-font-size-heading'] = `${fsize1}px`
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty.setProperty('--cv2-font-size-heading',`${fsize1}px`);
    styleCss2['--cv2-font-size-heading'] = `${fsize1}px`
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
}
function changeFontsize2(element) {

  fsize2 = element.value
  document.querySelector(".fsize-span2").innerHTML = `(${element.value}px)`
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-font-size-title', `${fsize2}px`)
    styleCss1['--cv1-font-size-title'] = `${fsize2}px`
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty.setProperty('--cv2-font-size-title',`${fsize2}px`);
    styleCss2['--cv2-font-size-title'] = `${fsize2}px`
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
}
function changeFontsize3(element) {

  fsize3 = element.value
  document.querySelector(".fsize-span3").innerHTML = `(${element.value}px)`
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-font-size-text', `${fsize3}px`)
    styleCss1['--cv1-font-size-text'] = `${fsize3}px`
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty.setProperty('--cv2-font-size-text',`${fsize3}px`);
    styleCss2['--cv2-font-size-text'] = `${fsize3}px`
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
  
}

function changeFontfamily(element) {
  fFamily = element.value
 
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-fontfamily', `${fFamily}`)
    styleCss1['--cv1-fontfamily'] = fFamily
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty('--cv2-fontfamily', `${fFamily}`)
    styleCss2['--cv2-fontfamily'] = fFamily
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
}
function changeBg2(element)
{
  bg2 = element.value
 
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-bg2', `${bg2}`)
    styleCss1['--cv1-bg2'] = bg2
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty('--cv2-bg2', `${bg2}`)
    styleCss2['--cv2-bg2'] = bg2
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
}
function changeBg1(element)
{
  bg1 = element.value
 
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-bg1', `${bg1}`)
    styleCss1['--cv1-bg1'] = bg1
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty('--cv2-bg1', `${bg1}`)
    styleCss2['--cv2-bg1'] = bg1
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
}
function changeFc1(element)
{
  fc1 = element.value
 
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-fc1', `${fc1}`)
    styleCss1['--cv1-fc1'] = fc1
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty('--cv2-fc1', `${fc1}`)
    styleCss2['--cv2-fc1'] = fc1
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
}
function changeFc2(element)
{
  fc2 = element.value
 
  if(cvTarget == 1)
  {
    root.style.setProperty('--cv1-fc2', `${fc2}`)
    styleCss1['--cv1-fc2'] = fc2
    localStorage.setItem("stylecss-cv1",JSON.stringify(styleCss1))
  }else{
    root.style.setProperty('--cv2-fc2', `${fc2}`)
    styleCss2['--cv2-fc2'] = fc2
    localStorage.setItem("stylecss-cv2",JSON.stringify(styleCss2))
  }
}

function setCssStyleFromLocalStorage(root)
{
  let styleCss1 = null
  if(localStorage.getItem('stylecss-cv1')){
     styleCss1 = JSON.parse(localStorage.getItem('stylecss-cv1'))

  }
  let styleCss2 = null
  if(localStorage.getItem('stylecss-cv2')){
    styleCss2 = JSON.parse(localStorage.getItem('stylecss-cv2'))
  }
  if(styleCss1)
  {
    for (const key in styleCss1) {
        const element = styleCss1[key];
        root.style.setProperty(key, element)
  
    }
  }
  if(styleCss2)
  {
    for (const key2 in styleCss2) {
     
        const element = styleCss2[key2];
        root.style.setProperty(`${key2}`, element)
      }
    
  }

}
setCssStyleFromLocalStorage(root)
let defaultBtn = document.querySelector(".default-btn")
defaultBtn.addEventListener("click",e=>
  {
    if(cvTarget == 1)
    {
      root.style.setProperty('--cv1-font-size-heading', `20px`)
      root.style.setProperty('--cv1-font-size-title', `18px`)
      root.style.setProperty('--cv1-font-size-text', `14px`)
      root.style.setProperty('--cv1-fontfamily', `"Roboto", sans-seri`)
      root.style.setProperty('--cv1-bg1', '#084C41')
      root.style.setProperty('--cv1-bg2', `#e9e9e9`)
      root.style.setProperty('--cv1-fc1', `#fbfbfb`)
      root.style.setProperty('--cv1-fc2', `#000`)
      localStorage.removeItem("stylecss-cv1")
    }else{
      root.style.setProperty('--cv2-font-size-heading',`20px`);
      root.style.setProperty('--cv2-font-size-title',`18px`);
      root.style.setProperty('--cv2-font-size-text',`14px`);
      root.style.setProperty('--cv2-fontfamily', `"Roboto", sans-seri`)
      root.style.setProperty('--cv2-bg1', `#dee2e6`)
      root.style.setProperty('--cv2-bg2', `#a8b5c7`)
      root.style.setProperty('--cv2-fc1', `#000`)
      root.style.setProperty('--cv2-fc2', `#000`)
      localStorage.removeItem("stylecss-cv2")
    }

   
  }
)


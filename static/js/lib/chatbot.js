
let toggleChatboxBtn = document.querySelector(".toggle-chatbox-btn");
let chat_box = document.querySelector(".chat-box");
let tooltip = document.querySelector(".tooltip");
let tooltip2 = document.querySelector(".tooltip2");
let send_msg = document.querySelector(".send_msg");
let loader = document.querySelector(".contact-loader")


let closeChatboxBtn = document.querySelector(".close-chatbox");

toggleChatboxBtn.addEventListener("click", () => {

   chat_box.classList.toggle("scale");
   toggleChatboxBtn.classList.toggle("scale");
   tooltip.style.visibility = "hidden";
   tooltip2.style.visibility = "hidden";
   ContactName.focus()
})

closeChatboxBtn.addEventListener("click", () => {
   toggleChatboxBtn.classList.toggle("scale");
   chat_box.classList.toggle("scale");
   tooltip.style.visibility = "hidden";
   tooltip2.style.visibility = "hidden";
})

tooltip.addEventListener("click", () => {

   toggleChatboxBtn.classList.toggle("scale");
   chat_box.classList.toggle("scale");
   tooltip.style.visibility = "hidden";
   tooltip2.style.visibility = "hidden";
   ContactName.focus()
})
tooltip2.addEventListener("click", () => {

   toggleChatboxBtn.classList.toggle("scale");
   chat_box.classList.toggle("scale");
   tooltip.style.visibility = "hidden";
   tooltip2.style.visibility = "hidden";
   ContactName.focus()
})


function hideChatBox() {
   toggleChatboxBtn.classList.add("scale");
   chat_box.classList.remove("scale");
   tooltip.style.visibility = "hidden";
   tooltip2.style.visibility = "hidden";
}
// send message
// form


let form_msg = document.querySelector(".form_msg");
send_msg.addEventListener("click", (e) => {
   e.preventDefault();

   loader.classList.add("show");
   clearContactEroor()
   if(!isEmptyContactfields())
   {
      hideChatBoxBeforeSendMesg()
      sendMessage()
   }else{
      loader.classList.remove("show");
      console.log("empty");
   }
})

const sendMessage = async () => {
   let contactForm = document.querySelector(".form_msg")
   let formdata = new FormData(contactForm)
   const options = {
     headers: {
   "X-CSRFToken" : csrfToken,
   "ContentType": 'application/json;charset=UTF-8',
     },
     credentials: 'include' ,
     method: 'POST',
     body: formdata // Convert JSON data to a string and set it as the request body
   };
   fetch('/contactme', options) // api for the get request
     .then(response => response.json())
     .then(data => {
       if (data.success == true) {
         showChatBoxAfterSendMesg()
       }
       else {
         console.log(data);
         
         showChatBoxAfterSendMesg()

       }
     })
     .catch(error => {
      console.log(error);
      showChatBoxAfterSendMesg()

     })
};


function hideChatBoxBeforeSendMesg()
{
   
   toggleChatboxBtn.style.display = "none"
   chat_box.classList.remove("scale");
   tooltip.style.visibility = "hidden";
   tooltip2.style.visibility = "hidden";
}
function showChatBoxAfterSendMesg()
{
   loader.classList.remove("show");
   toggleChatboxBtn.style.display = "block"
   toggleChatboxBtn.classList.remove("scale")
   chat_box.classList.remove("scale");
}




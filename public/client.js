const socket = io();
let name;
let sendBtn = document.querySelector("#send-btn");
let messageArea = document.querySelector(".message-area");
let textarea = document.getElementById("textarea");
let emoji = document.querySelector('.emojionearea-editor');

//Text-Editor starts
const elements = document.querySelectorAll('.btn');
const content = document.querySelector('#textarea');

elements.forEach(element =>{
    element.addEventListener('click', () =>{
        let command = element.dataset['element'];
        if(command=="createLink" || command=="insertImage")
        {
            let url = prompt("Enter the link: ", "http://");
            document.execCommand(command, false, url);
        }
        else 
        {
            document.execCommand(command, false, null);
        }
    })
})
// Text-editor ends

//taking user name from prompt..
while (!name) {
  name = prompt("Please Enter your name");
}

//when pressing send btn..
sendBtn.addEventListener("click", function () {
  // var x = document.getElementById("textarea").value;
  var x  = textarea.innerHTML;
  console.log(x);
  if (x == "") {
    //Sweet Alert
    Swal.fire({
      title: "Alert!",
      text: "Message cannot be empty!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  } else sendMessage(x);
  textarea.textContent="";
  
  console.log("btn clicked");
});

function sendMessage(enteredMessage) {
  //creating and storing data in a object 'mssg'
  let msg = {
    user: name,
    message: enteredMessage,
  };
  //appending message to show it in our chatbox(outgoing)..
  appendMessage(msg, "outgoing"); //outgoing- type of mssg
  // textarea.value = ""; //empty the textbox after sending mssg
  scrollAuto();

  //send to server
  socket.emit("messageEvent", msg);
}

//appending our message in the message Area container..
function appendMessage(msg, type) {
  let msgDiv = document.createElement("div");
  let className = type; //(incoming or outgoing)
  msgDiv.classList.add(className, "message"); //Adding 2 classes('incoming/outgoing', 'message' which we have created in html) to our msgDiv

  let namePlusMssg = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>    
    `;
  msgDiv.innerHTML = namePlusMssg; //inserting the data in our mssg div..
  messageArea.appendChild(msgDiv); //now appending the messages in our messageArea container..
}

//Recieving messages..
socket.on("messageEvent", function (msg) {
  appendMessage(msg, "incoming");
  scrollAuto();
});

//automatic scroll
function scrollAuto() {
  messageArea.scrollTop = messageArea.scrollHeight;
}


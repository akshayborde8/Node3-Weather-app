console.log("Client side java script file is loaded");


const weatherForm = document.querySelector("form");
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")



weatherForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    
    
    fetch("http://localhost:3000/weather?address="+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageTwo.textContent = data.error.message
            return console.log(messageTwo.textContent)
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecastData
            
        }
        
    })
})

}) 
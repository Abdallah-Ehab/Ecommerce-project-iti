



const userNameInput = document.querySelector(".userName")
const passwordInput = document.querySelector(".password")
const emailInput = document.querySelector(".email")


const errorElements = document.querySelectorAll(".error")

let inputs = []

console.log(errorElements)
userNameInput.addEventListener("input",(e)=>{
    let usernameError = errorElements[0]
    if(!validateUserName(e.target.value) && e.target.value != "" ){
        let message = document.createElement("p")
        message.textContent = "user-name should be 2-20 characters long, no special characters or spaces"
        usernameError.append(message)
    }else{
        const p = usernameError.querySelector("p")
        if(p){

            usernameError.removeChild("p")
        }
    }
})

emailInput.addEventListener("input",(e)=>{
    let emailError = errorElements[1]
    if(!validateEmail(e.target.value) && e.target.value != "" ){
        let message = document.createElement("p")
        message.textContent = "enter a valid email"
        emailError.append(message)
    }else{
        const p = emailError.querySelector("p")
        if(p){

            emailError.removeChild("p")
        }
    }
})

passwordInput.addEventListener("input",(e)=>{
    let passwordError = errorElements[2]
    if(!validateUserName(e.target.value) && e.target.value != "" ){
        let message = document.createElement("p")
        message.textContent = "password should be atleast 8 characters, with capital,small and special characters"
        passwordError.append(message)
    }else{
        const p = passwordError.querySelector("p")
        if(p){
        
            passwordError.removeChild("p")
        }
            
    }
})


function validateUserName(value){
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
    
    return usernameRegex.test(value)
    

}

function validatePassword(value){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value)
}

function validateEmail(value){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
}
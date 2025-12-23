const userNameInput = document.querySelector(".userName")
const passwordInput = document.querySelector(".password")
const emailInput = document.querySelector(".email")


const errorElements = document.querySelectorAll(".error")

let inputsAndValidators = [
    {
        input: userNameInput,
        validator: validateUserName,
        error: "user-name should be 2-20 characters long, no special characters or spaces"
        ,errorElement : errorElements[0]
    },{
        input: passwordInput,
        validator: validatePassword,
        error: "password should be atleast 8 characters, with capital,small and special characters",
        errorElement : errorElements[2]
    },{
        input: emailInput,
        validator: validateEmail,
        error: "enter a valid email"
        ,errorElement: errorElements[2]
    }
]

inputsAndValidators.forEach((form,index)=>{
    form.input.addEventListener("input",(e)=>{
        let errorElement = form.errorElement
        if(!form.validator(e.target.value) && e.target.value != "" ){
            let message = document.createElement("p")
            message.textContent = form.error
            if(!errorElement.firstChild)
                {
                
                    errorElement.append(message)
                }
                    
        }else{
            const p = errorElement.querySelector("p")
            if(p){
                errorElement.removeChild(p)
            }
        }
    })
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
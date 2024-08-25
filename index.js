const notesContainer = document.querySelector('.notes-container')
const createBtn = document.querySelector('.btn')
let notes = document.querySelector('.input-box')
let currentDate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`



let user;
let userPin;
let currentPin;


function showInformation(){
    notesContainer.innerHTML = localStorage.getItem("notes") 
    user = localStorage.getItem("user") 
    userPin = localStorage.getItem("userPin") 
}
showInformation();
function verifyPin() {
    swal.fire({
        title:`Input your pin ${user}🔒` ,
        input: "text",
        showLoaderOnConfirm: true,
        inputAttributes: {
            autocapitalize: "off"
        }
        }).then(pin => {
            currentPin = pin.value
            if(currentPin === userPin) {
                swal.fire({
                    title:`Welcome Back ${user}🎉`,
                    text: "Continue your notes✍🏼",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true
                    }).then(result => {
                document.querySelector(".lockScreen").classList.add("unlocked")
                document.querySelector("body").classList.add("active")
                    })
            }
            else {
                swal.fire({
                    title:`Invalid Pin ${user}💔`,
                    text: "Try Again🥺",
                    icon: "error",
                    confirmButtonText: "Try Again"
                    }).then(result => {
                        verifyPin()
                    })
                return
            }
        })
}
function saveUserDetails() {
    localStorage.setItem("user", user)
    localStorage.setItem("userPin", userPin)
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)

}

if (localStorage.getItem("user") === null) {
    swal.fire({
        title:"What is Your Name?",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
       
        }).then(name => {
            user = name.value
            swal.fire({
                title:"Set Your Pin🔒",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },
                }).then(pin => {
                    userPin = pin.value
                    document.querySelector(".lockScreen").classList.add("unlocked")
                    document.querySelector("body").classList.add("active")
                    swal.fire("Welcome to GLnotes App📓", "Pen Down Your Thoughts✍🏼", "success")

                    saveUserDetails()
                })
        });
    
}
else {
   verifyPin()
    
}



createBtn.addEventListener("click", () => {

    let inputBox = document.createElement('div');
    let heading = document.createElement('h2');
    let textHere = document.createElement('p')
    let deleteBtn = document.createElement('img');
    let date = document.createElement('p');

    inputBox.className = "input-box";
    // inputBox.classList.add("animate__animated animate__flipInX")
    heading.className = "heading"
    heading.textContent = "Title"
    heading.className = "text"
    heading.setAttribute("contenteditable", "true")


    textHere.setAttribute("contenteditable", "true")
    textHere.className = "text"
    textHere.classList.add("textHere")
    textHere.textContent = "Text Here..."

    deleteBtn.className = "delete"
    deleteBtn.src = "./icon-delete.svg"

    date.className = "date"
    date.textContent = currentDate
    inputBox.appendChild(heading)
    inputBox.appendChild(textHere)
    inputBox.appendChild(deleteBtn)
    inputBox.appendChild(date)
    notesContainer.appendChild(inputBox)
})

notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove()
        updateStorage();
    }

    else if (e.target.tagName === "P"){
        notes = document.querySelectorAll('.input-box')
        notes.forEach(note => {
            note.onkeyup = function() {
                updateStorage();
            }
        })

    }
})

document.addEventListener("keydown" ,(e) => {
    if (e.key === "Enter") {
        document.execCommand("InsertLIneBreak")
        e.preventDefault()
    }
})

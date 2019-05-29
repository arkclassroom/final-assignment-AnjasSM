const base_url = "http://localhost:4000/Users"

const validate = (data) => {
    let email = document.getElementById("inputemail").Value;
    let password = document.getElementById("inputpassword").Value;

    data.map(user => {
        if(email == user.email) {
            if(password == password) {
                alert("Login Successfully");
                window.location = "/";
                return true;
            } else {
                alert("Wrong Password")
                return false
            }
        } else {
            alert("Wrong Email")
            return false
        }
    })
}

//fetch user from db
const getData = () => {
    fetch(`${base_url}`)
    .then(res => res.json())
    .then(data => {
        validate(data)
    })
}

//click event
document.addEventListener("click", e => {
    //click for login btn
    if(e.target.id == "login") {
        getData()
    }
  
    //click for cancel btn
    if(e.target.id == "cancel") {
      window.location = "/"
    }
})
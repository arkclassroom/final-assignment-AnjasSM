const base_url = "http://localhost:4000/users"

const validate = (data) => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    data.map(user => {
        if(email == user.email) {
            if(password == password) {
                let manage = document.getElementById("manage");
                manage.setAttribute("class", "nav-link");
                alert("Login Successfully");
                document.cookie = `name = ${user.email}`
                alert(`welcome ${user.email} \n now you can access manage inventory`)
                return false;
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
    fetch(base_url)
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
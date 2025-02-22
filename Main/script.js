const form = document.querySelector("form");
const Iusername = document.querySelector(".username");
const Ipassword = document.querySelector(".password");

function login(){
    fetch("http://localhost:8080/login",
        {
            headers: {
                'Accept' : 'applcation/json',
                'Content-Type' : 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username: Iusername.value,
                password: Ipassword.value
            })            
        })
        .then(function(res) {console.log (res)})
        .catch(function(res) {console.log (res)})      
};

function clean(){
    Iusername.value = "";
    Ipassword.value = "";
}

form.addEventListener('submit', function (event){
    event.preventDefault();

    login();
    clean();
    
});

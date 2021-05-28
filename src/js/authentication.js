init();

async function init(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        var uid = user.uid;
        console.log('curent user is')
        console.log('uid: ' + uid);
        
        document.getElementById("loginmenu").textContent = "Logout";
        document.getElementById("loginmenu").href = "/views/logout.php";
        document.getElementById("joinmenu").textContent = "Hello! " + user.email;
        document.getElementById("joinmenu").href = "#";

        } else {
        console.log('user is signed out')
        }
    });
}

function signup() {
    const errorMsg = document.getElementById('errorMsg');    
    errorMsg.style.display = 'none';

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('signed up')
            window.location.href = '#';
        })
        .catch((error) => {
            console.log(error);
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = error.message;
        });
}

function login() {
    const errorMsg = document.getElementById('errorMsg');    
    errorMsg.style.display = 'none';

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('signed in')
            window.location.href = '#';
        })
        .catch((error) => {
            console.log(error);
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = error.message;
        });
}

function fogotPassword() {
    const errorMsg = document.getElementById('errorMsg');    
    errorMsg.style.display = 'none';

    const email = document.getElementById('emailInput').value;

    if(email.length == 0){
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Enter an email to send the password reset to.';
    } else {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function() {
                console.log('password reset email sent');
                alert(`Password reset sent to ${email}`);
            }).catch(function(error) {
                console.log(error);
                errorMsg.style.display = 'block';
                errorMsg.innerHTML = error.message;
            });
    }
}

function logout() {
    firebase.auth().signOut().then(function() {
        console.log('logout')
        window.location.href = "/"
    }).catch(function(error){
        console.log('logout error')
    });
}

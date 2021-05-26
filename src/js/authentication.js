window.onload = function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          console.log('curent user is')
          console.log('uid: ' + uid);
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

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            console.log('curent user is')
            console.log('uid: ' + uid);
            //User is signed in, redirect the the log page to collect this entry, place uuid as a GET request
            window.location.replace('../views/auth.php?uid='+uid);
        } else {
            console.log('user is signed out')
        }
    });   
}

function login() {
    const errorMsg = document.getElementById('errorMsg');    
    errorMsg.style.display = 'none';

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    // const data = {
    //     email: emailInput.value,
    //     password: passwordInput.value
    // };
    // httpPost('../api/login.php', data, (response) => {
    //     console.log(response)
    // });

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
        
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            console.log('curent user is')
            console.log('uid: ' + uid);
            //User is signed in, redirect the the log page to collect this entry, place uuid as a GET request
            window.location.replace('../views/auth.php?uid='+uid);
        } else {
            console.log('user is signed out')
        }
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

// function httpPost(url, data, callback = ()=>{}) {
//     const xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             // callback(JSON.parse(this.responseText))
//         }
//     };
//     xhttp.open("POST", url, false);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send('data=' + JSON.stringify(data));
// }

// function assert(condition, message) {
//     if (!condition) {
//         throw new Error(message || "Assertion failed");
//     }
// }
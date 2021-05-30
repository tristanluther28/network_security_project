const messaging = firebase.messaging();
init();

var fcmTok;

async function init(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            
        var uid = user.uid;
        console.log('curent user is')
        console.log('uid: ' + uid);
        document.getElementById("loginmenu").textContent = "Logout";
        document.getElementById("loginmenu").href = "/views/logout.php";
        // document.getElementById("joinmenu").textContent = "Hello! " + user.email;
        // document.getElementById("joinmenu").href = "/views/user.php";
        } else {
        console.log('user is signed out')
        }
        
    }); 
    messaging.onMessage((payload) => {
        // payload.notification for unicast
        // payload.data for multicast
        console.log('Message received. ', payload.data);
        alert(JSON.stringify(payload.data));
    });

    requestNotificationPermission();
}

function getFcmToken() {
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken({vapidKey: 'BGQZ0NVIRsbWITCs8XoVbnNZXjUqbummDVghxrGt6hncDvKlwARyhr2QMIsSCMdmbFUfLK8uLL4QuLH2npFu7cg'}).then((currentToken) => {
      if (currentToken) {
        console.log('FCM Token: ' + currentToken);
        fcmTok = currentToken;
      } else {
        // Show permission request.
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}


function requestNotificationPermission() {
    console.log('Requesting notification permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve a registration token for use with FCM.
        // In many cases once an app has been granted notification permission,
        // it should update its UI reflecting this.
        getFcmToken();
      } else {
        console.log('Unable to get permission to notify.');
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
            var uid = userCredential.user.uid;
            var fcm = fcmTok;
            //User is signed in, redirect the the log page to collect this entry, place uuid as a GET request
            window.location.replace('../views/auth.php?uid='+uid+'&fcm='+fcm);
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
            var uid = userCredential.user.uid;
            var fcm = fcmTok;
            //User is signed in, redirect the the log page to collect this entry, place uuid as a GET request
            window.location.replace('../views/auth.php?uid='+uid+'&fcm='+fcm);
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
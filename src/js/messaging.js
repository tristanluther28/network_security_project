const messaging = firebase.messaging();

init();

async function init(){
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

        // send token to backend php to log to cloudwatch
        // const data = {
        //     fcmToken: currentToken,
        //     email: 'fenga@oregonstate.edu'
        // };
        // httpPost('../api/captureUserDetail.php', data, (response) => {
        //     console.log(response)
        // });        
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

function httpPost(url, data, callback = ()=>{}) {
    // synchronous way
    // const xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         // console.log(this.responseText);
    //         callback(this.responseText);
    //     }
    // };
    // xhttp.open("POST", url, false);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.send('data=' + JSON.stringify(data));

    // asynchronous way
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
        //   console.log(xhr.responseText);
          callback(xhr.responseText);
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send('data=' + JSON.stringify(data)); 
}
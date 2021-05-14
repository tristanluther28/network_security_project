<!DOCTYPE html>
<html>

<head>
    <title>Hello World</title>

    <script src="https://www.gstatic.com/firebasejs/7.4.0/firebase.js"></script>
    
    <script src="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.js"></script>
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
</head>


<body>
    <div>
        <?php
            echo "Welcome";
        ?>
        <br>

        <button id='loginBtn' type="button" onclick="login()">Log In</button>
        <br>

        <div id="firebaseui-auth-container"></div>
    </div>

    <script type="text/javascript">
        window.onload = function() {
            console.log('loaded');
        }

        function login(){
            console.log('Starting login');

            // Initialize the FirebaseUI Widget using Firebase.
            var ui = new firebaseui.auth.AuthUI(firebase.auth());

            ui.start('#firebaseui-auth-container', {
                signInSuccessUrl: '/',
                signInOptions: [
                    {
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: false
                    }                    
                ]
            });
        }
    </script>
    
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <!-- <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js"></script> -->

    <!-- TODO: Add SDKs for Firebase products that you want to use
        https://firebase.google.com/docs/web/setup#available-libraries -->
    <!-- <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-analytics.js"></script> -->

    <script>
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyCxS_Go6o4rsPo-98dqO_hrr4qYrk5jICs",
            authDomain: "disco-nirvana-296921.firebaseapp.com",
            projectId: "disco-nirvana-296921",
            storageBucket: "disco-nirvana-296921.appspot.com",
            messagingSenderId: "723755294915",
            appId: "1:723755294915:web:e0dc5b2e8864cdb59fc276",
            measurementId: "G-GW0WGRYJPD"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    </script>
</body>
</html>
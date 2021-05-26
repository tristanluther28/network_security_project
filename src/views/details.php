<!DOCTYPE html>

<html>
<?php
    //Debugging statements
    /*
    error_reporting(-1);
    ini_set('display_errors', 'On');
    set_error_handler("var_dump");
    */

    include_once '../assets/key.php';
    require_once "../classes/Db.php";
    require_once "../classes/Users.php";
    session_start();
    //Create a user object
    $user = new Users();
    //Get the db user id from the get request
    if(isset($_GET['id'])){
        //Escape the string
        $id = $user->escape($_GET['id']);
        //Get this user in the current session
        $current_user = $user->select_id($id);
        //Get the other logged sign-ins based on the uid
        $other_user = $user->select_uid($current_user['uid_firebase']);
?>
<head>
    <title>User Details</title>

    <!--<link rel="stylesheet" href="../css/authentication.css">-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css">
    <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></script>
    <link rel="stylesheet" href="../css/details.css">
</head>

<body>
    <script src="../js/authentication.js"></script>
    
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>

    <!-- Add Firebase products that you want to use -->
    <script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-auth.js"></script>

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
    </script>

    <?php
        //Grab current user location information based on public IP Address
        $url = 'http://ip-api.com/json/'.$current_user['ip'];
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response_json = curl_exec($ch);
        curl_close($ch);
        $ip_api=json_decode($response_json, true);
    ?>

    <div class='background'>
        <div class='navBar'></div>
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <h1>Hello <span id="user-name">User</span></h1>
                </div>
                <div class="col-4">
                </div>
                <div class="col-4 text-center">
                    <h2>Current IP: <span id="user-ip"><?php echo $current_user['ip'] ?></span></h2>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">All Active Locations</h5>
                            <hr>
                            <ul>
                                <!-- List all locations that are currently signed in -->
                                <?php
                                    foreach($other_user as $other_uid){
                                        //Grab other user information based on public IP Address
                                        $url = 'http://ip-api.com/json/'.$other_uid['ip'];
                                        $ch = curl_init($url);
                                        curl_setopt($ch, CURLOPT_HTTPGET, true);
                                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                                        $response_json = curl_exec($ch);
                                        curl_close($ch);
                                        $ip_api_other=json_decode($response_json, true);
                                ?>
                                <li>
                                    <b>Locations</b>: <span id="user-city"><?php echo $ip_api_other['city'] ?></span>, <span id="user-state"><?php echo $ip_api_other['regionName'] ?></span> <span id="user-country"><?php echo $ip_api_other['country'] ?></span>
                                    <br><b>Operating System</b>: <span id="user-os"><?php echo $other_uid['os']; ?></span>
                                    <br><b>Time Zone</b>: <span id="user-tz"><?php echo $other_uid['time_zone'] ?></span>
                                </li>
                                <?php
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-8 map">
                    <div style="border-radius: 6px; overflow: hidden;">
                        <iframe
                            width="900"
                            height="350"
                            frameborder="0" style="border:0"
                            src="https://www.google.com/maps/embed/v1/place?key=<?php echo $GOOGLE_MAPS_API_KEY ?>&q=<?php echo $ip_api['lat']." ".$ip_api['lon'] ?>" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <div class="d-grid gap-2 col-10 mx-auto">
                        <a href="./index.php"><button class="btn btn-lg btn-primary welcome-btn" type="button">Return to Welcome</button></a>
                        <a href="./login.php"><button class="btn btn-lg btn-primary login-btn" type="button">  Return to Login  </button></a>
                    </div>
                </div>
                <div class="col-9 mt-4">
                    <div class="card" style="width: 61rem;">
                        <div class="card-body">
                            <h5 class="card-title">Current Device Information (<a href="http://www.faqs.org/rfcs/rfc3875.html">RFC 3875</a>)</h5>
                            <hr>
                            <!-- Place the RFC 3875 information here -->
                            <h6>
                                REMOTE_ADDR: <?php echo getenv("REMOTE_ADDR") ?> REMOTE_HOST: <?php echo getenv("REMOTE_HOST") ?>
                                SERVER_NAME: <?php echo getenv("SERVER_NAME") ?> SERVER_PORT: <?php echo getenv("SERVER_PORT") ?> SERVER_PROTOCOL: <?php echo getenv("SERVER_PROTOCOL") ?>
                                SERVER_SOFTWARE: <?php echo getenv("SERVER_SOFTWARE") ?>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-3">

                </div>
                <div class="col-9">
                    <div class="card" style="width: 61rem;">
                        <div class="card-body">
                            <h5 class="card-title">JSON Output</h5>
                            <hr>
                            <!-- Place the JSON used on this page here -->
                            <pre><code>
                                <?php echo $response_json; ?>
                            </code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<?php
    }
    else{
        http_response_code(404);
    }
?>
</html>
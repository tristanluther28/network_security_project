<!DOCTYPE html>

<html>

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
        //Function to determine the operating system of the user
        $detail =  $_SERVER['HTTP_USER_AGENT'];
        function os(){ 
            global $detail;
            $os1  = "Unknown";
            $os_a =  array(
                '/windows nt 10.0/i'     =>  'Windows 10',
                '/windows nt 6.3/i'     =>  'Windows 8.1',
                '/windows nt 6.2/i'     =>  'Windows 8',
                '/windows nt 6.1/i'     =>  'Windows 7',
                '/windows nt 6.0/i'     =>  'Windows Vista',
                '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
                '/windows nt 5.1/i'     =>  'Windows XP',
                '/windows xp/i'         =>  'Windows XP',
                '/windows nt 5.0/i'     =>  'Windows 2000',
                '/windows me/i'         =>  'Windows ME',
                '/win98/i'              =>  'Windows 98',
                '/win95/i'              =>  'Windows 95',
                '/win16/i'              =>  'Windows 3.11',
                '/macintosh|mac os x/i' =>  'Mac OS X',
                '/mac_powerpc/i'        =>  'Mac OS 9',
                '/linux/i'              =>  'Linux',
                '/ubuntu/i'             =>  'Ubuntu',
                '/iphone/i'             =>  'iPhone iOS',
                '/ipod/i'               =>  'iPod iOS',
                '/ipad/i'               =>  'iPad iOS',
                '/android/i'            =>  'Android',
                '/blackberry/i'         =>  'BlackBerry OS',
                '/webos/i'              =>  'Mobile'
            );

            foreach ($os_a as $key => $value){ 
                if (preg_match($key, $detail )){
                    $os1 = $value;
                }
            }   
            return $os1;
        }

        //Grab current user information based on public IP Address
        $url = 'http://ip-api.com/json/'.getenv("REMOTE_ADDR");
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
                    <h2>Current IP: <span id="user-ip"><?php echo $ip_api['query'] ?></span></h2>
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
                                <li>
                                    <b>Locations</b>: <span id="user-city"><?php echo $ip_api['city'] ?></span>, <span id="user-state"><?php echo $ip_api['regionName'] ?></span> <span id="user-country"><?php echo $ip_api['country'] ?></span>
                                    <br><b>Operating System</b>: <span id="user-os"><?php $os = os(); echo $os; ?></span>
                                    <br><b>Time Zone</b>: <span id="user-tz"><?php echo $ip_api['timezone'] ?></span>
                                </li>
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
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC6sAgEIocrdzH8NXBAOnftvETxlqzpSgE&q=<?php echo $ip_api['lat']." ".$ip_api['lon'] ?>" allowfullscreen>
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


</html>
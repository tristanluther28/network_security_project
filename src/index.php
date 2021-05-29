<!DOCTYPE html>
<html>

<head>
    <title>Home</title>

    <link rel="stylesheet" href="./css/authentication.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
</head>


<body>
    <?php include "./services/firebase.php" ?>

    <script src="./js/authentication.js"></script>

    <div class='background'></div>
    <nav class="navbar navbar-default navbar-expand-md navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">ECE 478: Client Fingerprinting Techniques</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/views/user.php">Detail</a>
                    </li>
                    <li>
                        <a id="joinmenu" href="/views/signup.php">Sign Up</a>
                    </li>
                    <li>
                        <a id="loginmenu" href="/views/login.php">Login</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

    <div class='hCenter'>
        <div class="container loginCard vCenter">
            <div class='loginFormContainer vCenter hCenter'>
                <div class='homeForm'>
                    <div class='homeTitle'> 
                            <p class='loginHeader'>Welcome</p>
                            <p class='projectName'>ECE 478 : </p>
                            <p class='projectName'>Client Fingerprinting Techniques</p>
                            <p class='projectName'>Research Project</p>
                    </div>  

                    <div class="homeField vLeft" style="margin-top:20px">
                        <h1>
                            <span style="color:black; margin-left:5%;">
                                Abstract
                            </span>
                        </h1>
                        <h6>
                            <span style="color:white">
                                .
                            </span>
                        </h6>
                        <p>
                            <span style="color:black; margin-left:10%">
                                Client fingerprinting is a tracking technique to collect information about users. This data can be used for a variety of purposes such as analytics, advertising, and fraud detection. Multiple methods exist to collect and use client data for security purposes but this added data collection also poses a potential security risk.
                            </span>
                        </p>
                    </div>

                    <div class="homeField vRight" style="margin-top:20px">
                        <h1>
                            <span style="color:white">
                                .
                            </span>
                        </h1>
                        <h6>
                            <span style="color:white">
                                .
                            </span>
                        </h6>
                        <p>
                            <span style="color:black; margin-left:10%">
                                Our demonstration shows the device fingerprinting techniques that can be employed by websites to prevent user accounts having multiple sign-ins at different locations, preventing possible fraud. Our demo also displays that sensitive user data is also being saved to servers where the possibility for it to be exploited exists.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
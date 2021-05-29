<!DOCTYPE html>

<html>

<head>
    <title>Sign Up</title>

    <link rel="stylesheet" href="../css/authentication.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>

<body>
    <?php include "../services/firebase.php" ?>

    <script src="../js/authentication.js"></script>

    <div class='background'></div>
    <nav class="navbar navbar-default navbar-expand-md navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">ECE 478: Client Fingerprinting Techniques</a>
            </div>
  
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="#">Detail</a>
                        </li>
                        <li class="active">
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
            <img class='wavePosition' src="../assets/wavyDivider.svg"/>

            <img class='lockIcon' src="../assets/verified_user.svg"/>

            <div class='loginFormContainer vCenter hCenter rightAlign'>
                <form class='loginForm' onsubmit="signup(); return false;">
                    <p class='loginHeader'>Sign Up</p>

                    <div class="inputField vCenter" style="margin-top:50px">
                        <div>
                            <img src="../assets/email.svg"/>
                            <input id="emailInput" style="margin-left:10px" type="email" placeholder="Enter email" oninvalid="this.setCustomValidity('Enter a valid email')" oninput="this.setCustomValidity('')" required/>
                        </div>
                    </div>

                    <div class="inputField vCenter" style="margin-top:10px">
                        <div>
                            <img src="../assets/lock.svg"/>
                            <input id="passwordInput" style="margin-left:10px" type="password" placeholder="Enter password" oninvalid="this.setCustomValidity('Enter password')" oninput="this.setCustomValidity('')" required/>
                        </div>
                    </div>

                    <div style="margin-top: 20px; height:15px">
                        <p id='errorMsg' class='errorMsg' style='display:none'>Error message</p>
                    </div>

                    <div style="margin-top:20px; margin-left: 5%">
                        <button class="loginBtn" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>


</html>
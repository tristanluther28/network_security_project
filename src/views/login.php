<!DOCTYPE html>

<html>

<head>
    <title>Login</title>

    <link rel="stylesheet" href="../css/authentication.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
</head>

<body>
    <?php include "../services/firebase.php" ?>

    <script src="../js/authentication.js"></script>

    <div class='background'></div>
    <div class='navBar'></div>
    
    <div class='hCenter'>
        <div class="container loginCard vCenter">
            <img class='wavePosition' src="../assets/wavyDivider.svg"/>

            <img class='lockIcon' src="../assets/verified_user.svg"/>

            <div class='loginFormContainer vCenter hCenter rightAlign'>
                <form class='loginForm' onsubmit="login(); return false;">
                    <p class='loginHeader'>Login</p>

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

                    <div style="margin-top:20px" class="hCenter">
                        <button class="loginBtn" type="submit">Log In</button>

                        <button style='margin-left: 20px
                        ' class="fogotPasswordBtn" type="button" onclick="fogotPassword()"> Forgot Password?</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>


</html>
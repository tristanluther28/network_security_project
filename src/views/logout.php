<!DOCTYPE html>
<html>
<?php
    session_start();
?>
<head>
    <title>Logout</title>

    <link rel="stylesheet" href="../css/authentication.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
</head>


<body>
    <?php include "../services/firebase.php" ?>

    <script src="../js/authentication.js"></script>
    <script> logout(); </script>
    

    <div class='background'></div>
    <nav class="navbar navbar-default navbar-expand-md navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">ECE 478: Client Fingerprinting Techniques</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <?php
                    if(isset($_SESSION['id'])){
                    ?>
                    <li>
                        <a href="/views/details.php?id=<?php echo $_SESSION['id'] ?>">Detail</a>
                    </li>
                    <?php
                        }
                    ?>
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
    <br>
    <br>
    <br>
    <br>
    <br>

    <?php
        echo "Logout";
        unset($_SESSION['id']);
        unset($_SESSION['email']);
    ?>
    
</body>
</html>
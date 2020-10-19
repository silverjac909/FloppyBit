<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Floppy Bit</title>
    <link rel="stylesheet" href="./styles.css">
    <link rel="stylesheet" href="./css/home.css">
</head>
<body>
    <?php
        if (isset($_POST['login'])){
            header("location: ./pages/login.php");
        }
        if (isset($_POST['register'])){
            header("location: ./pages/register.php");
        }

    ?>
    <header>
        <a href="index.php">
            <img src="images/floppybit.png" alt="FloppyBit Logo" id = "logo">
        </a>
    </header>
    <div class="login-box">
        <div class="button-box">
            <form action="index.php" method = 'post'>
                <ul>
                <li><button type = "submit" name = "login">Login</button></li></a>
                <li><button type = "submit" name = "register">Sign up</button></li></a>
                </ul>
            </form>
        </div>
    </div>
    <footer class="footer">
        <div class="footer left">
            Jacob Csencsics
        </div>
        <div class="footer right">
            <nav>
                <ul>
                    <li>COSC 365</li>
                    |
                    <li>Final Project</li>
                    |
                    <li>Spring 2020</li>
                </ul>
            </nav>
    </div>
    </footer>
</body>
</html>
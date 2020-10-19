<!-- Jacob Csencsics 
COSC 365 - Final -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>FloppyBit</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../css/login-register.css">
    
</head>
<body>

    <header>
            <a href="../index.php">
               <img src="../images/floppybit.png" alt="FloppyBit Logo" id = "logo">
            </a>
        </header>
    <div class="login-box">
        <p>Login<p>
        <div>
            <form action="pseudoDB.php" method='post'>
                <input type="text" name="username" placeholder="Username"required="required"><br>
                <input type="password" name="password" placeholder="Password" required="required"><br>
                <input type="submit" name="logsubmit" value="sign me in" class="button"></li>   
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
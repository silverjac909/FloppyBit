<?php

//Jacob Csencsics 
//COSC 365 - Final
// psuedo database 
function register(){
    $userArr = array(
        );

        //add handler for not same password maybe in JS 
        if($_REQUEST['password'] == $_REQUEST['Re-password']){

            $user = $_POST['username'];
            $pass = ($_POST['password']);

            $userArr[$user] = $pass;
            
            //serialize data to store in file and allow structure to stay the same 
            $serData = serialize($userArr);
            
            file_put_contents('user_info.txt', $serData, FILE_APPEND);

            header("location: ../index.php");
        }
        else{
            header("location: ./register.php");
        }
}

function login(){
    //unserialize data to make sure it's usable
    $recoverData = file_get_contents('user_info.txt');

    $userArr1 =  unserialize($recoverData);

    $user = $_POST['username'];
    $pass = ($_POST['password']);

    if(isset($userArr1[$user]) && $userArr1[$user] == $pass){
        header("location: ./game.html");
    }
    else{
        $msg="<span style='color:red'>Invalid Login Details</span>";
        echo($msg);
    }
}

//for registering users
if (isset($_POST['regsubmit'])){
    register();
}

//for logging in users 
if (isset($_POST['logsubmit'])){
    login();
}

?>
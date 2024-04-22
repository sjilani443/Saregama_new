<?php

$isvalid=false;
include("db.php");
if($_SERVER["REQUEST_METHOD"]=="POST"){
  $email=$_POST["email"];
  $pass=$_POST["pass"];

  $sql="SELECT * from users where email ='$email'";
  $res=mysqli_query($conn,$sql);
  $user = mysqli_fetch_array($res, MYSQLI_ASSOC);
  if($user){
    if(password_verify($_POST["pass"],$user["password_hash"])){
      session_start();
      $_SESSION["name"]=$user["name"];
      $_SESSION["email"]=$user["email"];
      header("Location: indexx.php");
      exit;
    }
  }
  $isvalid=true;
}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign In</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        font-size: large;
        background-color: lavender;
        display: flex;
        flex-direction: column;
      }
      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
      }
      form div {
        display: flex;
        flex-direction: column;
        font-size: larger;
        gap: 10px;
      }
      form div button{
        font-size: large;
      }
      form input{
        height: 20px;
      }
      fieldset {
        margin: 10% 30% 0 30%;
        padding: 50px;
        gap: 20px;
      }
      fieldset div{
        display: flex;
        justify-content: center;
      }
      fieldset h2{
        text-align: center;
        margin: 5% 0 5% 0;
      }
    </style>
  </head>
  <body>
    <fieldset>
      <h2>Sign In</h2>
      <?php
      if($isvalid):?>
      <em>Invalid details</em>
      <?php endif; ?>
      <form action="<?php echo $_SERVER["PHP_SELF"];?>" method="post">
        <div>
          <label for="email">Email </label>
          <input type="email" id="email" name="email" value="<?= htmlspecialchars($_POST["email"]?? "")?>" />
        </div>
        <div>
          <label for="password">Password </label>
          <input type="password" id="password" name="pass" />
        </div>
        <div>
          <button>Sign In</button>
        </div>
      </form>
      <div>
        Don't have an account? <a href="signup.php">Sign Up</a>
      </div>
    </fieldset>
  </body>
</html>

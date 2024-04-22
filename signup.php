<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign Up</title>
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
      <h2>Sign Up</h2>
      <form action="<?php echo $_SERVER["PHP_SELF"];?>" method="post" novalidate>
        <div>
          <label for="name">Name  </label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label for="email">Email </label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Password </label>
          <input type="password" id="password" name="pass" />
        </div>
        <div>
          <label for="password-con">Repeat Password </label>
          <input type="password" id="password-con" name="passcon" />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
      <div>
        Already have an account? <a href="signin.php">Sign In</a>
      </div>
    </fieldset>
  </body>
</html>

<?php
if(empty($_POST["name"])){
  die("Name is required");
}
if(empty($_POST["email"])){
  die("Email is reqired");
}
if(!filter_var($_POST["email"],FILTER_VALIDATE_EMAIL)){
  die("Valid email is required");
}
if(strlen($_POST["pass"])<8){
  die("Password Must be greater than 8 characters");
}
if(!preg_match("/[a-zA-Z]/i",$_POST["pass"])){
  die("Password Should contain atleast one letter");
}
if(!preg_match("/[0-9]/",$_POST["pass"])){
  die("Password Should contain atleast one number");
}
if($_POST["pass"]!==$_POST["passcon"]){
  die("Password must be same");
}
$password_hash=password_hash($_POST["pass"],PASSWORD_DEFAULT);

include("db.php");
$name=$_POST["name"];
$email=$_POST["email"];
$email_exists_query = "SELECT * FROM users WHERE email = '$email'";
$email_exists_result = mysqli_query($conn,$email_exists_query);
if($email_exists_result->num_rows>0){
  echo "Email Already exists!!";
}
else{
  $sql = "INSERT INTO users (name,email,password_hash) VALUES('$name','$email','$password_hash')";
  $res=mysqli_query($conn,$sql);
  header("Location: indexx.php");
  exit;
}
  $sql="SELECT * from users where email ='$email'";
  $res=mysqli_query($conn,$sql);
  $user = mysqli_fetch_array($res, MYSQLI_ASSOC);
if($user){
    session_start();
    $_SESSION["name"]=$user["name"];
    $_SESSION["email"]=$user["email"];
    header("Location: indexx.php");
    exit;
  }

?>
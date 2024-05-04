<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up</title>
  <link rel="stylesheet" href="signcss.css">
</head>

<body>
  <div class="container">
    <fieldset class="signup-box">
      <h2>Sign Up</h2>
      <div id="error"></div> <!-- Error messages will be displayed here -->
      <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post" novalidate>
        <div>
          <label for="name">Name </label>
          <input type="text" id="name" name="name" value="<?= htmlspecialchars($_POST["name"] ?? "") ?>" />
        </div>
        <div>
          <label for="email">Email </label>
          <input type="email" id="email" name="email" value="<?= htmlspecialchars($_POST["email"] ?? "") ?>" />
        </div>
        <div>
          <label for="password">Password </label>
          <input type="password" id="password" name="pass" <?= htmlspecialchars($_POST["pass"] ?? "") ?> />
        </div>
        <div>
          <label for="password-con">Repeat Password </label>
          <input type="password" id="password-con" name="passcon" <?= htmlspecialchars($_POST["passcon"] ?? "") ?> />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
      <div>
        Already have an account? <a href="signin.php">Sign In</a>
      </div>
    </fieldset>
  </div>
</body>

</html>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $errors = array(); // Initialize an array to store error messages
  include("db.php");
  if (empty($_POST["name"])) {
    $errors[] = "Name is required";
  }
  if (empty($_POST["email"])) {
    $errors[] = "Email is required";
  }
  if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Valid email is required";
  }
  if (strlen($_POST["pass"]) < 8) {
    $errors[] = "Password Must be greater than 8 characters";
  }
  if (!preg_match("/[a-zA-Z]/i", $_POST["pass"])) {
    $errors[] = "Password Should contain at least one letter";
  }
  if (!preg_match("/[0-9]/", $_POST["pass"])) {
    $errors[] = "Password Should contain at least one number";
  }
  if ($_POST["pass"] !== $_POST["passcon"]) {
    $errors[] = "Password must be same";
  }
  $email = $_POST["email"];
  $email_exists_query = "SELECT * FROM users WHERE email = '$email'";
  $email_exists_result = mysqli_query($conn, $email_exists_query);
  if ($email_exists_result->num_rows > 0) {
    $errors[] = "Email Already exists!!";
  }
  if (!empty($errors)) {
    // If there are errors, display them within the error div
    echo '<script>document.getElementById("error").innerHTML = "<ul><li>' . implode("</li><li>", $errors) . '</li></ul>";</script>';
  } else {
    // If no errors, proceed with form submission
    $password_hash = password_hash($_POST["pass"], PASSWORD_DEFAULT);

    include("db.php");
    $name = $_POST["name"];
    $email = $_POST["email"];
    $sql = "INSERT INTO users (name,email,password_hash) VALUES('$name','$email','$password_hash')";
    $res = mysqli_query($conn, $sql);
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
  }
}
?>
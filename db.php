<?php

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "saregama";
$conn = "";

try {
    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
} catch (mysqli_sql_exception $e) {
    echo "Failed to connect to MySQL: " . $e->getMessage();
}

// if ($conn) {
//     echo "You are connected";
// }

?>
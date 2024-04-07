<?php
include("db.php");
$sql = "SELECT * FROM album_main1";
$res = mysqli_query($conn, $sql);
if (mysqli_num_rows($res) > 0) {
    while ($row = mysqli_fetch_assoc($res)) {
        echo "<div class='card'>";
        echo "<img src='$row[Album_Cover]' alt='' />";
        echo "<p>$row[Album_Name] </p>";
        echo "<p class='index'>$row[i] </p>";
        echo "<div class='icon'>";
        echo "<i class='fa-solid fa-play'></i> </div>          
                        </div>";
    }
}
?>

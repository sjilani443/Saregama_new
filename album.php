<?php
include("db.php");
$hoverIndex = isset($_GET['hoverIndex']) ? $_GET['hoverIndex'] : null;

if ($hoverIndex !== null) {
    $tableName = "albums" . $hoverIndex;
    $sql = "SELECT * FROM $tableName";
    $res = mysqli_query($conn, $sql);
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {

            echo "<div class='asong poppins-light'>";
            echo "<div id='link'>$row[Song_link]</div>";
            echo "<div class='imgg'><img src='$row[Album_Cover]' alt=''></div>";
            echo "<div>$row[id]</div>";
            echo "<div id='song'>$row[Song]</div>";
            echo "<div id='moviename'>$row[Movie_Name]</div>";
            echo "<div id='singers'>$row[Singers],$row[Music_Director]</div>";
            echo "<div id='hero'>$row[Hero]</div>";
            echo "<div>$row[duration]</div>";
            echo "</div>";
        }
    }
    else {
        echo "No albums found for hover index $hoverIndex";
    }
    echo "</div>";
} 

?>

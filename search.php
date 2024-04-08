<?php
include("db.php");
$j = 1;
for ($i = 1; $i <= 4; $i++) {
    $tableName = "albums".$i; // Corrected variable name
    $sql = "SELECT * FROM $tableName";
    $res = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            // Fetch the row
            echo "<div class='searchsong'>";
            echo "<div id='searchid'>" . $j . "</div>"; // Corrected concatenation
            echo "<div id='slink'>" . $row['Song_link'] . "</div>"; // Accessing row data
            echo "<div class='simgg'><img src='" . $row['Album_Cover'] . "' alt=''></div>"; // Accessing row data
            echo "<div id='ssong'>" . $row['Song'] . "</div>"; // Accessing row data
            echo "<div id='smoviename'>" . $row['Movie_Name'] . "</div>"; // Accessing row data
            echo "<div id='ssingers'>" . $row['Singers'] . "," . $row['Music_Director'] . "</div>"; // Accessing row data
            echo "</div>";
            $j++;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Saregama</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    </style>
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>

    <script src="script.js"></script>

    <div class="body">
        <div class="nav poppins-light">
            <div class="logo">
                <img src="saregama-high-resolution-logo-white-transparent.svg" alt="" />
            </div>
            <div class="searchbar">
                <input type="text" id="searchInput" placeholder="search music, artists, albums...." />

            </div>
            <div class="sub">
                <button id="premium"><i class="fa-solid fa-crown"></i>Get Premium</button>
            </div>
            <div class="login">
                <button>
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>Login / Signup
                </button>
            </div>
        </div>
        <!-- nav ends here -->

        <div class="main">
            <div class="premium poppins-light">
                <div class="popup-container" id="popup">
                    <div class="popup">
                        <h2>Upgrade to Premium</h2>
                        <p>Benefits by getting Premium:</p>
                        <div class="premcards">
                        <div class="card1">
                            <div class="VIP"><h3>VIP</h3></div>
                        <ul>
                            <li>No Ads or Interuptions</li>
                            <li>Offline Downloads</li>
                            <li>High Quality Audio</li>
                            <li>Presonalised Albums</li>
                        </ul>
                        <button class="getnow poppins-light">Get Now</button>
                        </div>
                        <div class="card2">
                            <div class="pro"><h3>PRO</h3></div>
                        <ul>
                            <li>No Ads or Interuptions</li>
                            <li>Offline Downloads</li>
                            <li>High Quality Audio</li>
                            <li>Presonalised Albums</li>
                            <li>Multiple Devices</li>
                            <li>Family Plan</li>
                        </ul>
                        <button class="getnow poppins-light">Get Now</button>
                        </div>
                        </div>
                        <button id="closeBtn">Close</button>
                        <!-- Add your subscription form here -->
                    </div>
                </div>
            </div>
            <div class="sidebar">
                <div class="options">
                    <button id="home"><i class="fa-solid fa-house"></i>Home</button>
                    <button>
                        <i class="fa-solid fa-user"></i>
                        My Profile
                    </button>
                    <div class="profile">
                        <p>Jeelani Shaik</p>
                        <p>sjilani443@gmail.com</p>
                    </div>
                    <button><i class="fa-solid fa-chart-simple"></i>Top Charts</button>
                    <button>
                        <i class="fa-solid fa-arrow-up-right-dots"></i>Latest Trending
                    </button>
                    <button><i class="fa-solid fa-globe"></i>Top Global</button>
                    <button>
                        <i class="fa-solid fa-headphones-simple"></i>Your Playlists
                    </button>
                    <button>
                        <i class="fa-solid fa-podcast"></i>Trending Podcasts
                    </button>
                </div>

                <div class="logout">
                    <button><i class="fa-solid fa-gear"></i>Settings</button>
                    <button>
                        <i class="fa-solid fa-right-from-bracket"></i>Logout
                    </button>
                </div>
            </div>
            <div class="main-body">
                <div class="searchdiv poppins-light">
                    <?php
                    include("search.php");
                    ?>
                </div>

                <div class="foryou ">
                    <p class="poppins-light">For You</p>
                    <div class="cardcontainer">
                        <?php
                        include("db.php");
                        $sql = "SELECT * FROM albums_main1";
                        $res = mysqli_query($conn, $sql);
                        if (mysqli_num_rows($res) > 0) {
                            while ($row = mysqli_fetch_assoc($res)) {
                                echo "<div class='card poppins-light '>";
                                echo "<img src='$row[Album_Cover]' alt='' />";
                                echo "<div class='Aname'><p>$row[Album_Name] </p></div>";
                                echo "<p class='index'>$row[id] </p>";
                                echo "<div class='icon'>";
                                echo "<i class='fa-solid fa-play'></i> </div>          
                        </div>";
                            }
                        }
                        ?>

                    </div>
                </div>

                <div class="foryou ">
                    <p class="poppins-light">Top Artists</p>
                    <div class="cardcontainer">
                        <?php
                        include("db.php");
                        $sql = "SELECT * FROM albums_main2";
                        $res = mysqli_query($conn, $sql);
                        if (mysqli_num_rows($res) > 0) {
                            while ($row = mysqli_fetch_assoc($res)) {
                                echo "<div class='card poppins-light '>";
                                echo "<img src='$row[Album_Cover]' alt='' />";
                                echo "<div class='Aname'><p>$row[Album_Name] </p></div>";
                                echo "<p class='index'>$row[id] </p>";
                                echo "<div class='icon'>";
                                echo "<i class='fa-solid fa-play'></i> </div>          
                        </div>";
                            }
                        }
                        ?>

                    </div>
                </div>
                <?php include("playbar.html"); ?>
            </div>

            <div class="albumsm">
                <div class="searchdiv poppins-light">
                    <?php
                    include("search.php");
                    ?>
                </div>
                <div class="albums">
                    <?php include("album.php"); ?>
                </div>
                <?php include("playbar.html"); ?>
            </div>

        </div>
    </div>
</body>

</html>

<?php
echo $hoverIndex;
mysqli_close($conn);
?>
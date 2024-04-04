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
                <input type="text" placeholder="search music, artists,albums...." />
            </div>
            <div class="sub">
                <button><i class="fa-solid fa-crown"></i>Get Premium</button>
            </div>
            <div class="login">
                <button>
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>Login / Signup
                </button>
            </div>
        </div>
        <!-- nav ends here -->

        <div class="main">
            <div class="sidebar">
                <div class="options">
                    <button id="home">Home</button>
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

            <!-- sidebar ends here -->

            <div class="main-body">

                <div class="foryou ">
                    <p class="poppins-light">FOR YOU</p>
                    <div class="cardcontainer">
                        <form id="hoverIndexForm" method="GET" action="indexx.php">
                            <input type="hidden" name="hoverIndex" id="hoverIndexInput">
                        </form>

                        <?php
                        include("db.php");
                        $sql = "SELECT * FROM albums_main";
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

                        if (isset($_GET['hoverIndex'])) {
                            $hoverIndex = $_GET['hoverIndex'];
                        
                            echo $hoverIndex;
                        } else {
                            echo 'Hover index not provided';
                        }
                    
                        ?>
                    </div>
                </div>



                <!-- jjj -->
                <div class="playbar">
                    <div class="playbar-options">
                        <div class="songinfo">
                        </div>
                        <div class="play-buttons">
                            <div class="buttons">
                                <i class="fa-solid fa-backward-fast"></i>
                                <i class="fa-solid fa-circle-chevron-left"></i>
                                <div id="play"><i class="fa-solid fa-play"></i></div>
                                <i class="fa-solid fa-circle-chevron-right"></i>
                                <i class="fa-solid fa-forward-fast"></i>
                            </div>
                            <div class="volume">
                                <i class="fa-solid fa-volume-high"></i>
                                <input type="range" name="volume">
                            </div>
                        </div>

                        <div class="songimg">

                        </div>
                    </div>


                    <div class="seekbar">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>


            <div class="albums">
                <p>heelo</p>
                <div id="index1">x</div>
                
                <?php
                echo "Received number: " . $hoverIndex;
                ?>
            </div>

        </div>



</body>

</html>

<?php
mysqli_close($conn);
?>
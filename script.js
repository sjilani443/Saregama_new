$(document).ready(function () {
  var hoveredIndex = null;
  var debounceTimeout;

  let currentSong = new Audio();
  let play = $(".play");
  let asong;
  let logid=false;

  // function showOverlay() {
  //   document.getElementById("overlay").style.display = "block";
  // }
  
  // if ($(".profile").html()=="")
  // {
  //   showOverlay();
  // }
  // else
  // {
  //   document.getElementById("overlay").style.display = "none";
  // }

  // $("#loggid").on("click", function () {
  //   document.getElementById("overlay").style.display = "none";
  //   window.location.href = "signin.php";
  //   logid=true;
  // });

  $("#home").on("click", function () {
    var mainBody = $(".main-body");
    var albumsDiv = $(".albumsm");

    if (mainBody.css("display") === "none") {
      mainBody.css("display", "flex");
      albumsDiv.css("display", "none");
      $(".topchart").css("display","none");
      console.log("switchhh");
    }
  });

  $("#topcharts").on("click", function () {
    console.log("top charts clicked");
    var mainBody = $(".main-body");
    var albumsDiv = $(".topchart");
    if (mainBody.css("display") === "flex") {
      mainBody.css("display", "none");
      albumsDiv.css("display", "flex");
      console.log("switchhh");
    }
  });

  $("#latesttrending").on("click", function () {
    console.log("Latest Trending clicked");
    var mainBody = $(".main-body");
    var albumsDiv = $(".latesttrending");
    if (mainBody.css("display") === "flex") {
      mainBody.css("display", "none");
      albumsDiv.css("display", "flex");
      console.log("switchhh");
    }
  });

  $(".logo").on("click", function () {
    location.reload();
  });

  let isPlaying = false; // Track if a song is currently playing

  const playmusic = (track, pause = false) => {
    $(".playbar").css("display", "flex");
    $(".albums").css("padding-bottom", "9vh");
    $(".main-body").css("padding-bottom", "12vh");
    $(".asong").removeClass("selected");

    $(".usernamemain").css("display", "none");
    $(".enjoy").css("display", "none");
    // Select the currently playing song
    $(".asong").each(function () {
      // Check if the track of the current .asong matches the currently playing track
      if ($(this).find(":first-child").html() === track) {
        $(this).addClass("selected"); // Add the 'selected' class
        return false; // Exit the loop after the first match is found
      }
    });
    if (!pause) {
      console.log("Pausing", currentSong);
      currentSong.pause();
      // Set the source for the current song object and play it
      currentSong.src = track;
      currentSong.play();
      isPlaying = true;
      // $(".fa-play").hide();
      // $(".fa-pause").show();
      console.log("Pause optino ravali");
      play.html(`<i class="fa-solid fa-pause"></i>`);
    } else {
      console.log("Pausiing", currentSong);
      currentSong.pause();
      isPlaying = false;

      // $(".fa-pause").hide();
      // $(".fa-play").show();
      play.html(`<i class="fa-solid fa-play"></i>`);
    }
  };

  const addtoplaybar = (songinfo, songimg, singers, index) => {
    $(".songinfo").html(`Playing : ${songinfo}`);
    $(".songimg").html(`<img src="${songimg}" alt="">`);
    $(".singers").html(`(${singers})`);
  };

  $(".play").click(function () {
    if (!currentSong.paused) {
      console.log("Pause avvai");
      currentSong.pause();
      $(this).html(`<i class="fa-solid fa-play"></i>`);
    } else {
      console.log("Play avvali");
      console.log(currentSong);
      currentSong.play();
      $(this).html(`<i class="fa-solid fa-pause"></i>`);
    }
  });

  //seekbar
  $(".seekbar").click(function (e) {
    var seekbarWidth = $(this).width();
    var clickX = e.pageX - $(this).offset().left;
    var seekbarPercentage = (clickX / seekbarWidth) * 100;
    $(".circle").css("left", seekbarPercentage + "%");

    if (!isNaN(currentSong.duration) && isFinite(currentSong.duration)) {
      currentSong.currentTime =
        (currentSong.duration * seekbarPercentage) / 100;
    }
  });

  // Update the seekbar position as the audio plays
  currentSong.addEventListener("timeupdate", function () {
    var seekbarPercentage =
      (currentSong.currentTime / currentSong.duration) * 100;
    $(".circle").css("left", seekbarPercentage + "%");
  });

  $(".seekbar").mousedown(function (e) {
    e.preventDefault();
  });

  let prev = $(".prev");
  prev.click(function (element) {
    let prevIndex = (ind - 1 + asong.length) % asong.length; // Ensure the index wraps around correctly
    let prevCard = asong[prevIndex];
    let song = $(prevCard).find(":first-child").html();
    playmusic(song);
    console.log(prevCard);
    $(prevCard).addClass("selected");
    let songinfo = $(prevCard).find("#song").html();
    let songimg = $(prevCard).find(".imgg img").attr("src");
    let singers = $(prevCard).find("#singers").html();
    addtoplaybar(songinfo, songimg, singers, prevIndex); // Change nextIndex to prevIndex
    ind = prevIndex;
  });

  //Next Button
  let next = $(".next");
  next.click(function (element) {
    console.log("Previous Button clicked");
    let nextIndex = (ind + 1 + asong.length) % asong.length; // Ensure the index wraps around correctly
    let nextCard = asong[nextIndex];
    let song = $(nextCard).find(":first-child").html();
    playmusic(song);
    $(nextCard).addClass("selected");
    let songinfo = $(nextCard).find("#song").html();
    let songimg = $(nextCard).find(".imgg img").attr("src");
    let singers = $(nextCard).find("#singers").html();
    addtoplaybar(songinfo, songimg, singers, nextIndex);
    ind = nextIndex;
  });

  currentSong.addEventListener("ended", function () {
    let nextIndex = (ind + 1 + asong.length) % asong.length; // Ensure the index wraps around correctly
    let nextCard = asong[nextIndex];
    let song = $(nextCard).find(":first-child").html();
    playmusic(song);
    $(nextCard).addClass("selected");
    let songinfo = $(nextCard).find("#song").html();
    let songimg = $(nextCard).find(".imgg img").attr("src");
    let singers = $(nextCard).find("#singers").html();
    addtoplaybar(songinfo, songimg, singers, nextIndex);
    ind = nextIndex;
  });

  function shuffle(array) {
    let shuffledArray = [];
    let usedIndexes = [];
    let i = 0;
    while (i < array.length) {
      let randomNumber = Math.floor(Math.random() * array.length);
      if (!usedIndexes.includes(randomNumber)) {
        shuffledArray.push(array[randomNumber]);
        usedIndexes.push(randomNumber);
        i++;
      }
    }
    return shuffledArray;
  }
  $(".shuffle").click(function (element) {
    asong = shuffle(asong);
    let shuffledcard = asong[0];
    let song = $(shuffledcard).find(":first-child").html();
    if (!currentSong.paused) {
      currentSong.pause();
      playmusic(song);
    }
    let songinfo = $(shuffledcard).find("#song").html();
    let songimg = $(shuffledcard).find(".imgg img").attr("src");
    let singers = $(shuffledcard).find("#singers").html();
    addtoplaybar(songinfo, songimg, singers, 0);
  });

  $(".volume")
    .children()
    .last()
    .change(function (e) {
      console.log($(e.target).val());
      currentSong.volume = parseInt($(e.target).val()) / 100;
    });

  console.log(currentSong.currentTime);
  if (currentSong.currentTime == currentSong.duration) {
    $(".buttons").children().last().click();
  }

  $("#searchInput").on("focus", function () {
    $(".searchdiv").css("display", "flex");
  });
  $("#searchInput").on("click", function () {
    $(".searchdiv").css("display", "flex");
  });

  // Click event for .searchsong
  // Unbind the click event for ".searchsong" before binding it again
  $(document)
    .off("click", ".searchsong")
    .on("click", ".searchsong", function () {
      var songinfo = $(this).find("#ssong").html();
      var songimg = $(this).find(".simgg img").attr("src");
      var singers = $(this).find("#ssingers").html();
      var index = $(this).find("#searchid").html();
      var songlink = $(this).find("#slink").html();
      playmusic(songlink);
      addtoplaybar(songinfo, songimg, singers, index);
      $(".searchdiv").css("display", "none");
      main();
    });

  $(document).on("mouseleave", ".searchdiv", function (event) {
    $(".searchdiv").css("display", "none");
  });

  $(document).on("focusout", "#searchInput", function (event) {
    // Check if the clicked element is not within the searchdiv
    if (!$(".searchdiv").is(":hover")) {
      $(".searchdiv").css("display", "none");
    }
  });

  $("#searchInput").on("input", function () {
    var searchValue = $(this).val().toUpperCase();
    $(".searchsong").each(function () {
      var songName = $(this).find("#ssong").text().toUpperCase();
      var movieName = $(this).find("#smoviename").text().toUpperCase();
      var singers = $(this).find("#ssingers").text().toUpperCase();
      if (
        songName.indexOf(searchValue) > -1 ||
        movieName.indexOf(searchValue) > -1 ||
        singers.indexOf(searchValue) > -1
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  // Function to handle card hover with debouncing
  $(".card").mouseenter(function () {
    clearTimeout(debounceTimeout); // Clear any existing timeout
    hoveredIndex = $(this).find(".index").text();
    console.log("Hovered index:", hoveredIndex);
  });

  currentSong.onerror = function (error) {
    console.error("Audio error:", error);
  };

  var mainBody = $(".main-body");
  var albumsDiv = $(".albumsm");
  $(".card").click(function (event) {
    $.ajax({
      url: "album.php", // Specify the URL of the PHP script
      method: "GET", // Specify the HTTP method (GET or POST)
      data: { hoverIndex: hoveredIndex }, // Specify the data to be sent to the server
      dataType: "html", // Specify the expected data type of the response
      success: function (response) {
        $(".albums").html(response);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
      complete: function () {
        main();
      },
    });
    var mainBody = $(".main-body");
    var albumsDiv = $(".albumsm");

    if (mainBody.css("display") === "none") {
      mainBody.css("display", "flex");
      albumsDiv.css("display", "none");
      console.log("switchhh");
    } else {
      mainBody.css("display", "none");
      albumsDiv.css("display", "flex");
    }
  });
  let ind;
  function main() {
    asong = $(".asong");
    console.log(asong);
    let album = $(".album");
    console.log(album);
    $(asong).each(function (index, e) {
      $(e).click(function (element) {
        $(".asong").removeClass("selected");
        $(e).addClass("selected");
        console.log($(e).find(":first-child").html());
        if (currentSong.paused) {
          playmusic($(e).find(":first-child").html());
        } else {
          currentSong.pause();
          playmusic($(e).find(":first-child").html());
        }
        let songinfo = $(e).find("#song").html();
        let songimg = $(e).find(".imgg img").attr("src");
        let singers = $(e).find("#singers").html();
        addtoplaybar(songinfo, songimg, singers, index);
        ind = index;
      });
    });
  }
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");

  $("#premium").click(function () {
    popup.style.display = "block";
  });
  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  $("#logi").click(function () {
    console.log("Button Clicked");
    window.location.href = "signin.php";
  });
  $("#logout").click(function () {
    window.location.href = "signin.php";
  });
});

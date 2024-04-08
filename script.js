$(document).ready(function () {
  var hoveredIndex = null;
  var debounceTimeout;

  var currentSong = new Audio();
  var play=$("#play");

  $("#home").on("click", function() {
    window.location.href = "indexx.php";
});
  $(".logo").on("click", function() {
    location.reload();
});


const playmusic = (track, pause = false) => {
  if (!pause) {
    console.log("Playingg");
    currentSong.src = track;
    currentSong.play();
    play.html(`<i class="fa-light fa-pause"></i>`);
    console.log("It should change");
    currentSong.ontimeupdate = () => {
      $(".circle").css(
        "left",
        (currentSong.currentTime / currentSong.duration) * 100 + "%"
      );
    };
  } else {
    console.log("Pauseed");
    currentSong.pause();
    play.html(`<i class="fa-solid fa-play"></i>`);
  }
};


  const addtoplaybar = (songinfo, songimg, singers, index) => {
    $(".songinfo").html(`Playing : ${songinfo}`);
    $(".songimg").html(`<img src="${songimg}" alt="">`);
    $(".singers").html(`(${singers})`);
  };

  var fsonginfo = $("#firstname").html();
  var fsongimg = "https://c.saavncdn.com/800/Nandanandanaa-From-The-Family-Star-Telugu-2024-20240207141003-500x500.jpg";
  var fsingers = $("#firstsingers").html();
  var findex = $("#firstid").html(); // Corrected to use the correct ID
  var fsonglink = $("#firstlink").html();
  console.log(fsonginfo, fsongimg, fsingers, findex, fsonglink);
  playmusic(fsonglink,true);
  addtoplaybar(fsonginfo, fsongimg, fsingers, findex);

  $("#searchInput").on("focus", function () {
    $(".searchdiv").css("display", "flex");
  });
  $("#searchInput").on("click", function () {
    $(".searchdiv").css("display", "flex");
  });

  // Click event for .searchsong
  $(document).on("click", ".searchsong", function () {
    var songinfo = $(this).find("#ssong").html();
    var songimg = $(this).find(".simgg img").attr("src");
    var singers = $(this).find("#ssingers").html();
    var index = $(this).find("#searchid").html();
    var songlink = $(this).find("#slink").html();
    playmusic(songlink);
    addtoplaybar(songinfo, songimg, singers, index);
    $(".searchdiv").css("display", "none");
  });

  $(document).on("mouseleave", ".searchdiv", function (event) {
    // Check if the clicked element is not within the searchdiv
    $(".searchdiv").css("display", "none");
  });

  $(document).on("focusout", "#searchInput", function (event) {
    // Check if the clicked element is not within the searchdiv
    if (!$(".searchdiv").is(":hover")) {
      $(".searchdiv").css("display", "none");
    }
  });

  $("#searchInput").on("input", function() {
    var searchValue = $(this).val().toUpperCase();
    $(".searchsong").each(function() {
        var songName = $(this).find("#ssong").text().toUpperCase();
        var movieName = $(this).find("#smoviename").text().toUpperCase();
        var singers = $(this).find("#ssingers").text().toUpperCase();
        if (songName.indexOf(searchValue) > -1 || movieName.indexOf(searchValue)>-1 || 
              singers.indexOf(searchValue) > -1) {
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

  var mainBody = $(".main-body");
  var albumsDiv = $(".albums");
  $(".card").click(function (event) {
    $.ajax({
      url: "album.php", // Specify the URL of the PHP script
      method: "GET", // Specify the HTTP method (GET or POST)
      data: { hoverIndex: hoveredIndex }, // Specify the data to be sent to the server
      dataType: "html", // Specify the expected data type of the response
      success: function (response) {
        $(".albums").append(response);
      },
      error: function (xhr, status, error) {
        // Handle errors that occur during the AJAX request
        console.error(xhr.responseText);
      },
      complete: function () {
        main();
      },
    });
    // Toggle the display of mainDiv and albumsDiv accordingly
    var mainBody = $(".main-body");
    var albumsDiv = $(".albums");

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
    let asong = $(".asong");
    console.log(asong);
    let album = $(".album");
    console.log(album);
    $(asong).each(function (index, e) {
      $(e).click(function (element) {
        console.log($(e).find(":first-child").html());
        playmusic($(e).find(":first-child").html());
        let songinfo = $(e).find("#song").html();
        let songimg = $(e).find(".imgg img").attr("src");
        let singers = $(e).find("#singers").html();
        addtoplaybar(songinfo, songimg, singers, index);
        ind = index;
      });
    });
  }

  play.click(function (element) {
    if (currentSong.paused) {
      currentSong.play();
      play.html(`<i class="fa-solid fa-pause"></i>`);
    } else {
      currentSong.pause();
      play.html(`<i class="fa-solid fa-play"></i>`);
    }
  });

  //seekbar
  $(".seekbar").click(function (e) {
    let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    $(".circle").css("left", per + "%");
    currentSong.currentTime = (currentSong.duration * per) / 100;
  });

  //previous Button
  let prev = $(".buttons").children().first();
  prev.click(function (element) {
    let prevIndex = (ind - 1 + asong.length) % asong.length; // Ensure the index wraps around correctly
    console.log(prevIndex);

    let prevCard = asong[prevIndex];
    let song = $(prevCard).find(":first-child").html();
    playmusic(song);
    let songinfo = $(prevCard).find("#song").html();
    let songimg = $(prevCard).find(".imgg img").attr("src");
    let singers = $(prevCard).find("#singers").html();
    addtoplaybar(songinfo, songimg, singers, prevIndex);
    ind = prevIndex; // Update the current index
  });

  //Next Button
  let next = $(".buttons").children().last();
  next.click(function (element) {
    let nextIndex = (ind + 1 + asong.length) % asong.length; // Ensure the index wraps around correctly
    let nextCard = asong[nextIndex];
    let song = $(nextCard).find(":first-child").html();
    playmusic(song);
    let songinfo = $(nextCard).find("#song").html();
    let songimg = $(nextCard).find(".imgg img").attr("src");
    let singers = $(nextCard).find("#singers").html();
    addtoplaybar(songinfo, songimg, singers, nextIndex);
    ind = nextIndex;
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
});

$(document).ready(function () {
  var hoveredIndex = null;
  var debounceTimeout;

  var currentSong = new Audio();
  var play = $("#play");

  // Reload page when home button is clicked
  $("#home").click(function () {
    location.reload();
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
      complete: function() {
        main();
      }
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

  function main()
  {
  const playmusic = (track, pause = false) => {
    if (!pause) {
      currentSong.src = track;
      currentSong.play();
      play.html(`<i class="fa-solid fa-pause"></i>`);
      currentSong.ontimeupdate = () => {
        $(".circle").css(
          "left",
          (currentSong.currentTime / currentSong.duration) * 100 + "%"
        );
      };
    } else {
      currentSong.pause();
      play.html(`<i class="fa-solid fa-play"></i>`);
    }
  };

  const addtoplaybar = (songinfo, songimg, singers, index) => {
    $(".songinfo").html(`Playing : ${songinfo}`);
    $(".songimg").html(`<img src="${songimg}" alt="">`);
    $(".singers").html(`(${singers})`);
  };

  let asong = $(".asong");
  console.log(asong);
  let album = $(".album");
  console.log(album);

  let ind;
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

  //circle previous Button
  let pre = $(".buttons").children().eq(1);
  pre.click(function (ele) {
    let prevIndex = (ind - 1) % cards.length;
    if (prevIndex < 0) {
      prevIndex = cards.length - 1; // Wrap around to the last card if prevIndex becomes negative
    }
    playmusic(cards[prevIndex].lastElementChild.innerHTML);
  });

  // Circle next button
  let nex = $(".buttons").children().eq(3);
  nex.click(function (ele) {
    let nextIndex = (ind + 1) % cards.length; // Wrap around to the first card if ind exceeds the length
    playmusic(cards[nextIndex].lastElementChild.innerHTML);
    let songinfo1 = cards[nextIndex].getElementsByTagName("p")[0].innerHTML;
    let songimg1 = cards[nextIndex].firstElementChild.getAttribute("src");
    addtoplaybar(songinfo1, songimg1, nextIndex);
  });

  // Volume
  $(".volume").children().last().change(function (e) {
      console.log($(e.target).val());
      currentSong.volume = parseInt($(e.target).val()) / 100;
    });

  console.log(currentSong.currentTime);
  if (currentSong.currentTime == currentSong.duration) {
    $(".buttons").children().last().click();
  }
}
});

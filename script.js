document.addEventListener("DOMContentLoaded", function () {
  var hoveredIndex = null;
  var debounceTimeout;

  let currentSong = new Audio();
  let play = document.getElementById("play");

  // Reload page when home button is clicked
  document.getElementById("home").addEventListener("click", function () {
    location.reload();
  });

  // Function to handle card hover with debouncing
  var cards = document.querySelectorAll(".main-body .card");
  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      clearTimeout(debounceTimeout); // Clear any existing timeout
      hoveredIndex = this.querySelector(".index").textContent;
      console.log("Hovered index:", hoveredIndex);

      // Set a new timeout to submit the form after 500 milliseconds
      debounceTimeout = setTimeout(function () {
        // Update the hidden input value
        document.getElementById("hoverIndexInput").value = hoveredIndex;
        // Submit the form
        document.getElementById("hoverIndexForm").submit();
      }, 200); // Adjust the delay time as needed
    });
  });

  // Function to handle card click
  var mainBody = document.querySelector(".main-body");
  var albumsDiv = document.querySelector(".albums");
  mainBody.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default action

    // Toggle the display of mainDiv and albumsDiv accordingly
    if (mainBody.style.display === "none") {
      mainBody.style.display = "flex";
      albumsDiv.style.display = "none";
      console.log("switchhh");
    } else {
      mainBody.style.display = "none";
      albumsDiv.style.display = "flex";
    }
  });

  const playmusic = (track, pause = false) => {
    if (pause == false) {
      currentSong.src = track;
      currentSong.play();
      play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      currentSong.ontimeupdate = () => {
        document.querySelector(".circle").style.left =
          (currentSong.currentTime / currentSong.duration) * 100 + "%";
      };
    } else {
      currentSong.pause();
      play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  };

  const addtoplaybar = (songinfo, songimg, singers,index) => {
    let songinfoo = document.querySelector(".songinfo");
    let songimgg = document.querySelector(".songimg");
    let singerss=document.querySelector(".singers");
    songinfoo.innerHTML = `Playing : ${songinfo}`;
    songimgg.innerHTML = `<img src="${songimg}" alt="">`;
    singerss.innerHTML=`(${singers})`;
  };

  let asong = document.querySelectorAll(".asong");
  console.log(asong);
  let album = document.querySelector(".album");
  console.log(album);

  let ind;
  Array.from(asong).forEach((e, index) => {
    e.addEventListener("click", (element) => {
      console.log(e.firstElementChild.innerHTML);
      playmusic(e.firstElementChild.innerHTML);
      let songinfo = e.querySelector("#song").innerHTML;
      let songimg = e.querySelector(".imgg img").getAttribute("src");
      let singers = e.querySelector("#singers").innerHTML;
      addtoplaybar(songinfo, songimg, singers, index);
      ind = index;
    });
  });
  play.addEventListener("click", (element) => {
    if (currentSong.paused) {
      currentSong.play();
      play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
      currentSong.pause();
      play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  });

  //seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = per + "%";
    currentSong.currentTime = (currentSong.duration * per) / 100;
  });

  //previous Button
  let prev = document.querySelector(".buttons").firstElementChild;
  prev.addEventListener("click", (element) => {
    let prevIndex = (ind - 1 + asong.length) % asong.length; // Ensure the index wraps around correctly
    console.log(prevIndex);

    let prevCard = asong[prevIndex];
    let song = prevCard.firstElementChild.innerHTML;
    playmusic(song);
    let songinfo = prevCard.querySelector("#song").innerHTML;
    let songimg = prevCard.querySelector(".imgg img").getAttribute("src");
    let singers = prevCard.querySelector("#singers").innerHTML;
    addtoplaybar(songinfo, songimg,singers, prevIndex);
    ind = prevIndex; // Update the current index
  });

  //Next Button
  let next = document.querySelector(".buttons").lastElementChild;
  next.addEventListener("click", (element) => {
    let nextIndex = (ind + 1 + asong.length) % asong.length; // Ensure the index wraps around correctly
    let nextCard = asong[nextIndex];
    let song = nextCard.firstElementChild.innerHTML;
    playmusic(song);
    let songinfo = nextCard.querySelector("#song").innerHTML;
    let songimg = nextCard.querySelector(".imgg img").getAttribute("src");
    let singers = nextCard.querySelector("#singers").innerHTML;
    addtoplaybar(songinfo, songimg, singers,nextIndex);
    ind = nextIndex;
  });

  //circle previous Button
  let pre = document.querySelector(".buttons > :nth-child(2)");
pre.addEventListener("click", (ele) => {
    let prevIndex = (ind - 1) % cards.length;
    if (prevIndex < 0) {
        prevIndex = cards.length - 1; // Wrap around to the last card if prevIndex becomes negative
    }
    playmusic(cards[prevIndex].lastElementChild.innerHTML);
});

// Circle next button
let nex = document.querySelector(".buttons > :nth-child(4)");
nex.addEventListener("click", (ele) => {
    let nextIndex = (ind + 1) % cards.length; // Wrap around to the first card if ind exceeds the length
    playmusic(cards[nextIndex].lastElementChild.innerHTML);
    let songinfo1 = cards[nextIndex].getElementsByTagName("p")[0].innerHTML;
    let songimg1 = cards[nextIndex].firstElementChild.getAttribute("src");
    addtoplaybar(songinfo1, songimg1, nextIndex);
});

// Volume
document.querySelector(".volume").lastElementChild.addEventListener("change", (e) => {
    console.log(e.target.value);
    currentSong.volume = parseInt(e.target.value) / 100;
});

console.log(currentSong.currentTime);
if (currentSong.currentTime == currentSong.duration) {
    document.querySelector(".buttons").lastElementChild.click();
}
});

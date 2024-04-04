$(document).ready(function () {
    var hoveredIndex = null;
    var debounceTimeout;

    $('#home').click(function () {
        location.reload();
    });

    // Function to handle card hover with debouncing
    $('.main-body').on('mouseenter', '.card', function () {
        clearTimeout(debounceTimeout); // Clear any existing timeout
        var hoveredIndex = $(this).find('.index').text();
        console.log("Hovered index:", hoveredIndex);

        // Set a new timeout to submit the form after 500 milliseconds
        debounceTimeout = setTimeout(function () {
            // Update the hidden input value
            $('#hoverIndexInput').val(hoveredIndex);
            // Submit the form
            $('#hoverIndexForm').submit();
        }, 200); // Adjust the delay time as needed
    });

    // Function to handle form submission
    $('#hoverIndexForm').submit(function (event) {
      
    });

    // Function to handle card click
    $('.main-body').on('click', '.card', function (event) {
        event.preventDefault(); // Prevent the default action

        var mainDiv = $(".main-body");
        var albumsDiv = $(".albums");

        // Toggle the display of mainDiv and albumsDiv accordingly
        if (mainDiv.css('display') === 'none') {
            mainDiv.css('display', 'flex');
            albumsDiv.css('display', 'none');
            console.log("switchhh");
        } else {
            mainDiv.css('display', 'none');
            albumsDiv.css('display', 'flex');
        }
    });
});

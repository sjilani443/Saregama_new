document.addEventListener('DOMContentLoaded', function() {
    var hoveredIndex = null;
    var debounceTimeout;

    // Reload page when home button is clicked
    document.getElementById('home').addEventListener('click', function() {
        location.reload();
    });

    // Function to handle card hover with debouncing
    var cards = document.querySelectorAll('.main-body .card');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            clearTimeout(debounceTimeout); // Clear any existing timeout
            hoveredIndex = this.querySelector('.index').textContent;
            console.log("Hovered index:", hoveredIndex);

            // Set a new timeout to submit the form after 500 milliseconds
            debounceTimeout = setTimeout(function() {
                // Update the hidden input value
                document.getElementById('hoverIndexInput').value = hoveredIndex;
                // Submit the form
                document.getElementById('hoverIndexForm').submit();
            }, 200); // Adjust the delay time as needed
        });
    });

    // Function to handle card click
    var mainBody = document.querySelector('.main-body');
    var albumsDiv = document.querySelector('.albums');
    mainBody.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action

        // Toggle the display of mainDiv and albumsDiv accordingly
        if (mainBody.style.display === 'none') {
            mainBody.style.display = 'flex';
            albumsDiv.style.display = 'none';
            console.log("switchhh");
        } else {
            mainBody.style.display = 'none';
            albumsDiv.style.display = 'flex';
        }
    });

    
      
});

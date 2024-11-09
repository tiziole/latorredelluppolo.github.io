document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a.tocopy').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault(); // Prevents the anchor from navigating

            const textToCopy = anchor.textContent; // Get the text content of the anchor

            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    console.log("Text copied to clipboard!");
                    // Optional: Provide feedback to the user
                    alert("Text copied to clipboard!");
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                });
        });
    });
});

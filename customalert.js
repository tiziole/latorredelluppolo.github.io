document.addEventListener('DOMContentLoaded', function () {
    const alertBox = document.getElementById('custom-alert');

    document.querySelectorAll('a.tocopy').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent any default link behavior

            const textToCopy = anchor.textContent;

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Show the custom alert
                    alertBox.classList.remove('hidden');
                    alertBox.classList.add('show');

                    // Hide the alert after 2 seconds
                    setTimeout(() => {
                        alertBox.classList.remove('show');
                        alertBox.classList.add('hidden');
                    }, 2000);
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                });
        });
    });
});

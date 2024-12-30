//SCROLL TO FORM WITH NO ANCHOR

    // Aggiungi un gestore di eventi al pulsante dopo il caricamento del documento
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("gotoformiscrizione").addEventListener("click", function() {
        scrollToElement('formiscrizione');
      });
    });

    function scrollToElement(elementId) {
      var element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error("Element with ID '" + elementId + "' not found.");
      }
    }
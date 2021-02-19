/* Editmode Button Events =========================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';
// Custom Elements
import popupQueryEl from '../../customElements/popupQueryEl';
// Popup Query Content
import popupQueryContent from '../../customElementContent/popupQueryContent.js';
// Editmode Button
import * as editmodeButton from '../../dom/header/editmodeButton.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* Editmode Button Events ======================================================================================================================= */
    /* Toggle Edit Mode ===== */
    $('body').on('click', '.editmode-button', function () {

        // Toggle Editmode Button
        editmodeButton.toggleButton();

    });

})();
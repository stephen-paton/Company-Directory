/* Popup Content Events ============================================================================================================================= */
/* Import ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Popup Content Events
    ================================================================================================================================================= */
    /* Reject Event ===== */
    // Reject Event
    $('body').on('click', '.popup-content .reject', function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Remove popup container
        document.getElementsByClassName('popup-container')[0].remove();

        // Clear pending member element ID
        globals.clearPendingElementID();

    }); 

    /* Animation End Events ===== */
    $('body').on('animationend', '.popup-content', function () {

        if ($(this).hasClass('scale-in-centre')) {

            $(this).removeClass('scale-in-centre');

        }

    });

})();
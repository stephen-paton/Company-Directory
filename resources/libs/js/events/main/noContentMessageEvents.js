/* No Content Message Events =============================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* Animation End Events ===== */
    /* Remove slide-in-left Class from Member Card Container */
    $('body').on('animationend', '.no-content-message', function () {

        if ($(this).hasClass('slide-in-left')) {

            $(this).removeClass('slide-in-left');

        }

    });

})();
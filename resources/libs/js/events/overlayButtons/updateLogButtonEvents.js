/* Update Log Button Events =========================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Footer
import * as updateLog from '../../dom/footer/updateLog.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* Update Log Button Events ===================================================================================================================== */
    $('body').on('click', '.overlay-buttons .update-log-button', function () {

        $(this).addClass('slide-out-bottom');

    });

    /* ==============================================================================================================================================
    Animation End Events
    ================================================================================================================================================= */
    /* Remove swing-in-top Class from Header Card */
    $('body').on('animationend', '.overlay-buttons .update-log-button', function () {

        if ($(this).hasClass('slide-out-bottom')) {

            $(this).removeClass('slide-out-bottom');
            $(this).addClass('hidden');

            updateLog.open();

            return;

        }

        if ($(this).hasClass('slide-in-eliptical-bottom')) {

            $(this).removeClass('slide-in-eliptical-bottom');

            return;

        }

    });

})();
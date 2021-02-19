/* Update Log Events =================================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Footer
import * as updateLog from '../../dom/footer/updateLog.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Update Log Events
    ================================================================================================================================================= */
    // Close Update Log When any element other than the update log is clicked =====
    $('body').on('click', function (event) {

        /* 1. Check if update log is currently active, and if not, do nothing ===== */
        if (!($('footer').hasClass('active'))) {

            return;

        }

        /* 2. Exceptions to ignore ===== */        
        if (
            // Ignore update log button
            $(event.target).is('.update-log-button')) {

            return;

        }

        /* 3. Check if triggering element is, or is a child of the filter container, and if so do nothing ===== */
        if ($(event.target).is($('footer'))) {

            return;

        }

        if ($('footer').has($(event.target)).length > 0) {

            return;

        }

        /* 4. Close update log ===== */
        updateLog.close();

    });

    // Close Update Log When Cross is clicked =====
    $('body').on('click', '.update-log-header .close', function () {

        updateLog.close();

    });

})();
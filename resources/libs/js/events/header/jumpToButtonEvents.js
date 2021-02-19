/* Jump To Button Events ============================================================================================================================ */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* Jump To Button Events ======================================================================================================================== */
    /* Scroll to Selected Element */
    $('body').on('change', '#jump-to', function () {

        const value = $(this).val();

        const headerList = globals.headerList();

        let domID;

        for (let i = 0; i < headerList.length; i++) {

            const header = headerList[i];

            if (header['value'] == value) {

                domID = header['domID'];
                break;

            }

        }

        const headerID = `#${domID}`;

        document.querySelector(headerID).scrollIntoView({
            behavior: 'smooth'
        });

    });

})();
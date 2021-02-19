/* Header Events ==================================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Main
import * as main from '../../dom/main/main.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* Sort By Button Events ======================================================================================================================== */
    $('body').on('change', '#sort-content, #sort-order', function () {

        // Setup Sort Content and Sort Order Values
        const sortContent = $('#sort-content').val();
        const sortOrder = $('#sort-order').val();

        // Update Main Page Content
        main.update(null, sortContent, sortOrder);

        // Jump to Top of Main Section
        document.getElementsByTagName('main')[0].scrollTo(0,0);
    
    });

})();
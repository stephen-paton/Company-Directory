/* Add Button Events =========================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Custom Elements
import popupTableQueryEl from '../../customElements/popupTableQueryEl.js';
import popupButtonsEl from '../../customElements/popupButtonsEl.js';
// Custom Elements Content
import popupQueryContent from '../../customElementContent/popupQueryContent.js';
// Helpers
import * as elements from '../../helpers/elements.js';
import * as appSpecificHelper from '../../helpers/appSpecificHelper.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Add Button Events 
    ================================================================================================================================================= */
    // Click
    $('body').on('click', '.sub-header .add-button', function () {

        // Setup Popup Buttons Element
        const popupButtonNames = ['Department', 'Location', 'User'];
        const popupButtonClasses = ['add-department-button', 'add-location-button', 'add-user-button'];
        const inputs = popupQueryContent("addElement");

        const popupButtonsElement = popupButtonsEl(popupButtonNames, popupButtonClasses, ...inputs);

        // Add Popup Buttons Element to the DOM
        document.getElementsByTagName('body')[0].appendChild(popupButtonsElement);

    });

})();
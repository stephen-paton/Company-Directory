/* App Specific Helper ============================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Custom Elements
import infoboxEl from '../customElements/infoboxEl.js';
// Footer
import * as updateLog from '../dom/footer/updateLog.js';

/* Functions ===== */
/* Setup Text Input =================================================================================================================================
Description: Sets up Text Input Element to Company Directory App Expectations. */
export function setupTextInput(textInputElement) {

    textInputElement.spellcheck = false;
    textInputElement.maxLength = 50;

    return textInputElement;

}

/* Process Return Data ============================================================================================================================== */
export function processReturnData(returnData) {

    // Display Status Update
    const statusCode = returnData['status']['code'];
    const statusDescription = returnData['status']['description'];

    const successful = (statusCode == "200") ? true : false;

    return [successful, statusDescription];

}

/* Notify Status ==================================================================================================================================== */
export function notifyStatus(textValue) {

    const infoboxElement = infoboxEl(textValue);

    document.getElementsByTagName('body')[0].appendChild(infoboxElement);

    // Fade out Status Update after 3s
    setTimeout(function () {

        $('.infobox').fadeOut(function () {

            $(this).remove();

        });

    }, 3000);

    updateLog.log(textValue);

}

/* Trigger Search =========================================================================================================================================== */
export function triggerSearch() {

    $('.main-header .search-field').trigger('input');

}
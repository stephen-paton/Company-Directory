/* Delete Location Events =========================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Helpers
import * as appSpecificHelper from '../../../helpers/appSpecificHelper.js';
// Custom Element Content
import infoboxContent from '../../../customElementContent/infoboxContent.js';
// SQL
import * as sqlRequest from '../../../sql/sqlRequest.js';
// Globals
import * as globals from '../../../globals/globals.js';

/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Delete Location Events
    ================================================================================================================================================= */
    /* Accept Button ================================================================================================================================ */
    // Click
    $('body').on('click', '.delete-location .accept', async function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Delete Location
        const domID = globals.pendingElementID();

        const headerList = globals.headerList();

        const header = headerList.find(header => header['domID'] == domID);

        const locationID = header['locationID'];
        const location = header['value'];

        const returnData = await sqlRequest.deleteLocation(locationID);

        // Process Return Data
        const processedReturnData = appSpecificHelper.processReturnData(returnData);

        const successful = processedReturnData[0];
        const statusDescription = processedReturnData[1];

        // Notify User of Outcome
        const textValue = (successful) ? infoboxContent("deleteLocationSuccess", location) : infoboxContent("deleteLocationFailure", location, statusDescription);

        appSpecificHelper.notifyStatus(textValue);

        if (successful) {

            // Remove the Department Element Popup from the DOM
            document.getElementsByClassName('popup-container')[0].remove();

            // Clear Pending Element
            globals.clearPendingElementID();

            // Trigger Search
            appSpecificHelper.triggerSearch();

        } else {

            // Re-enable Button
            $(this).prop('disabled', false);

        }     

    });

})();
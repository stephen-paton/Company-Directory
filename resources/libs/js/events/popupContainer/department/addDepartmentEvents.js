/* Add Department Events =========================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Helpers
import * as appSpecificHelper from '../../../helpers/appSpecificHelper.js';
// Custom Element Content
import infoboxContent from '../../../customElementContent/infoboxContent.js';
// SQL
import * as sqlRequest from '../../../sql/sqlRequest.js';

/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Add Department Events
    ================================================================================================================================================= */
    // Accept Button Clicked
    $('body').on('click', '.add-department .accept', async function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Add Department
        const department = $('#add-department').val();
        const locationID = $('#add-location').val();
        const location = $('#add-location').find(`option[value=${locationID}]`).text(); 

        const returnData = await sqlRequest.insertDepartment(department, locationID);

        // Process Return Data
        const processedReturnData = appSpecificHelper.processReturnData(returnData);

        const successful = processedReturnData[0];
        const statusDescription = processedReturnData[1];

        // Notify User of Outcome
        const textValue = (successful) ? infoboxContent("addDepartmentSuccess", department, location) : infoboxContent("addDepartmentFailure", department, location, statusDescription);

        appSpecificHelper.notifyStatus(textValue);

        if (successful) {

            // Remove the Department Element Popup from the DOM
            document.getElementsByClassName('popup-container')[0].remove();

            // Trigger Search
            appSpecificHelper.triggerSearch();

        } else {

            // Re-enable Button
            $(this).prop('disabled', false);

        }     

    });

})();
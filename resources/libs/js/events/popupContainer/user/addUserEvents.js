/* Add User Events =========================================================================================================================== */
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
    Add User Events
    ================================================================================================================================================= */
    // Accept Button Clicked
    $('body').on('click', '.add-user .accept', async function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Add Department
        const firstName = $('#add-first-name').val();
        const surname = $('#add-surname').val();
        const email = $('#add-email').val();
        const departmentID = $('#add-department').val();

        const returnData = await sqlRequest.insertPersonnel(firstName, surname, email, departmentID);

        // Process Return Data
        const processedReturnData = appSpecificHelper.processReturnData(returnData);

        const successful = processedReturnData[0];
        const statusDescription = processedReturnData[1];

        // Notify User of Outcome
        const textValue = (successful) ? infoboxContent("addUserSuccess", firstName, surname) : infoboxContent("addUserFailure", firstName, surname, statusDescription);

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
/* Edit User Events =========================================================================================================================== */
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
    Edit User Events
    ================================================================================================================================================= */
    // Accept Button Clicked
    $('body').on('click', '.edit-user .accept', async function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Add Department
        const domID = globals.pendingElementID();

        const memberList = globals.memberList();

        const member = memberList.find(member => member['domID'] == domID);

        const personnelID = member['personnelID'];
        const firstName = $('#edit-first-name').val();
        const surname = $('#edit-surname').val();
        const email = $('#edit-email').val();
        const departmentID = $('#edit-department').val();

        const returnData = await sqlRequest.updatePersonnel(personnelID, firstName, surname, email, departmentID);

        // Process Return Data
        const processedReturnData = appSpecificHelper.processReturnData(returnData);

        const successful = processedReturnData[0];
        const statusDescription = processedReturnData[1];

        // Notify User of Outcome
        const textValue = (successful) ? infoboxContent("editUserSuccess", firstName, surname) : infoboxContent("editUserFailure", firstName, surname, statusDescription);

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
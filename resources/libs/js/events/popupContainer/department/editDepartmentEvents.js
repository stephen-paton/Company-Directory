/* Edit Department Events =========================================================================================================================== */
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
    Edit Department Events
    ================================================================================================================================================= */
    // Accept Button Clicked
    $('body').on('click', '.edit-department .accept', async function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Add Department
        const domID = globals.pendingElementID();

        const headerList = globals.headerList();

        const header = headerList.find(header => header['domID'] == domID);

        const departmentID = header['departmentID'];
        const department = $('#edit-department').val();
        const locationID = $('#edit-location').val();
        const location = $('#edit-location').find(`option[value=${locationID}]`).text(); 

        const returnData = await sqlRequest.updateDepartment(departmentID, department, locationID);

        // Process Return Data
        const processedReturnData = appSpecificHelper.processReturnData(returnData);

        const successful = processedReturnData[0];
        const statusDescription = processedReturnData[1];

        // Notify User of Outcome
        const textValue = (successful) ? infoboxContent("editDepartmentSuccess", department, location) : infoboxContent("editDepartmentFailure", department, location, statusDescription);

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
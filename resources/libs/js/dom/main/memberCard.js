/* Member Card ====================================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';
// SQL
import * as sqlParser from '../../sql/sqlParser.js';
// Helpers
import * as helper from '../../helpers/helper.js';
// Custom Elements
import infoboxEl from '../../customElements/infoboxEl.js';
// Custom Element Content
import infoboxContent from '../../customElementContent/infoboxContent.js';
// Footer
import * as updateLog from '../footer/updateLog.js';

/* Functions ===== */
/* Update ===========================================================================================================================================
Description: Updates the Member Card in the SQL database. */
export async function updateMember(memberDomID) {

    const memberList = globals.memberList();

    const member = memberList.find(member => member['domID'] == memberDomID);

    // Get SQL Parser Input Data
    const currentFirstName = $(`#first-name-${memberDomID}`).val();
    const currentSurname = $(`#surname-${memberDomID}`).val();
    const currentDepartment = $(`#department-${memberDomID}`).val();
    const currentLocation = $(`#location-${memberDomID}`).val();
    const currentEmail = $(`#email-${memberDomID}`).val();

    const originalFirstName = member['firstName'];
    const originalSurname = member['surname'];
    const originalDepartment = member['department'];
    const originalLocation = member['location'];
    const originalEmail = member['email'];

    const firstName = helper.oldIfSameNewIfDifferent(originalFirstName, currentFirstName);
    const surname = helper.oldIfSameNewIfDifferent(originalSurname, currentSurname);
    const department = helper.oldIfSameNewIfDifferent(originalDepartment, currentDepartment);
    const location = helper.oldIfSameNewIfDifferent(originalLocation, currentLocation);
    const email = helper.oldIfSameNewIfDifferent(originalEmail, currentEmail);
    const personnelID = member['personnelID'];

    // Update Member
    const returnData = await sqlParser.updateMember(firstName, surname, location, department, email, personnelID);

    // Display Status Update
    const statusCode = returnData['status']['code'];
    const statusDescription = returnData['status']['description'];

    let textValue = "";
    let successful = false;

    if (statusCode == "200") {

        textValue = infoboxContent("updateMemberSuccess", firstName, surname);
        successful = true;

    } else {

        textValue = infoboxContent("updateMemberFailure", firstName, surname, statusDescription);

    }

    const infoboxElement = infoboxEl(textValue);

    document.getElementsByTagName('body')[0].appendChild(infoboxElement);

    // Fade out Status Update after 3s
    setTimeout(function () {

        $('.infobox').fadeOut(function () {

            $(this).remove();

        });

    }, 3000);

    updateLog.log(textValue);

    return successful;

}

/* Delete Member ===========================================================================================================================================
Description: Deletes the Member from the SQL Database. */
export async function deleteMember(memberDomID) {

    const memberList = globals.memberList();
    const member = memberList.find(member => member['domID'] == memberDomID);

    const personnelID = member['personnelID'];

    // Delete Member
    const returnData = await sqlParser.deleteMember(personnelID);

    // Display Status Update
    const firstName = member['firstName'];
    const surname = member['surname'];
    const statusCode = returnData['status']['code'];
    const statusDescription = returnData['status']['description'];

    let textValue = "";
    let successful = false;

    if (statusCode == "200") {

        textValue = infoboxContent("deleteMemberSuccess", firstName, surname);
        successful = true;

    } else {

        textValue = infoboxContent("deleteMemberFailure", firstName, surname, statusDescription);

    }

    const infoboxElement = infoboxEl(textValue);

    document.getElementsByTagName('body')[0].appendChild(infoboxElement);

    // Fade out Status Update after 5s
    setTimeout(function () {

        $('.infobox').fadeOut(function () {

            $(this).remove();

        });

    }, 3000);

    updateLog.log(textValue);

    return successful;

}

/* Add Member ===========================================================================================================================================
Description: Adds the Member to the SQL Database. */
export async function addMember(firstName, surname, department, location, email) {

    // Add Member
    const returnData = await sqlParser.addMember(firstName, surname, department, location, email);

    // Display Status Update
    const statusCode = returnData['status']['code'];
    const statusDescription = returnData['status']['description'];

    let textValue = "";
    let successful = false;

    if (statusCode == "200") {

        textValue = infoboxContent("addMemberSuccess", firstName, surname);
        successful = true;

    } else {

        textValue = infoboxContent("addMemberFailure", firstName, surname, statusDescription);

    }

    const infoboxElement = infoboxEl(textValue);

    document.getElementsByTagName('body')[0].appendChild(infoboxElement);

    // Fade out Status Update after 5s
    setTimeout(function () {

        $('.infobox').fadeOut(function () {

            $(this).remove();

        });

    }, 3000);

    updateLog.log(textValue);

    return successful;

}
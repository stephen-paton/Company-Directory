/* Main ============================================================================================================================================= */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Data Structures
import * as memberListStruct from '../../dataStructures/memberListStruct.js';
import * as headerListStruct from '../../dataStructures/headerListStruct.js';
// Custom Elements
import memberCardContainerEl from '../../customElements/memberCardContainerEl.js';
import headerCardEl from '../../customElements/headerCardEl.js';
// Header
import * as jumpTo from '../header/jumpTo.js';
// Globals
import * as globals from '../../globals/globals.js';
// SQL
import * as sqlRequest from '../../sql/sqlRequest.js';
import * as sqlParser from '../../sql/sqlParser.js';
// Helpers
import * as elements from '../../helpers/elements.js';

/* Update ===========================================================================================================================================
Description: Updates the main element with content */
export async function update(searchResults = null, sortContent = 'surname', sortOrder = 'a-z', ) {

    /* 1. Update Globals (if required) ===== */
    let returnData;
    
    if (searchResults) {

        /* 1.1. Update memberList ===== */
        // Create updated memberList
        let updatedMemberList = memberListStruct.createMemberList(searchResults);
        // Sort updated memberList
        updatedMemberList = memberListStruct.sort(updatedMemberList, sortContent, sortOrder);
        // Store updated memberList
        globals.memberList(updatedMemberList);

        /* 1.2 Update Departement Globals ===== */
        returnData = await sqlRequest.getAllDepartments();
        const updatedDepartmentsList = returnData['data'];
        globals.departmentsList(updatedDepartmentsList);

        /* 1.3 Update Location Globals ===== */
        returnData = await sqlRequest.getAllLocations();
        const updatedLocationsList = returnData['data'];
        globals.locationsList(updatedLocationsList);

    }

    /* 1. Setup ===== */
    /* 1.1. memberList Setup ===== */
    // Create memberList
    let memberList = globals.memberList();

    /* 1.2. headerList Setup ===== */
    // Create headerList
    let headerList = headerListStruct.createHeaderList(sortContent);

    // Sort headerList
    headerList = headerListStruct.sort(headerList, sortOrder);

    // Store headerList in Globals
    globals.headerList(headerList);

    /* Helper Function ===== */
    /* Members In Header =====
    Description: Returns the members that the current header will have */
    function membersInHeader (header, memberList) {

        const type = header["type"];

        let validMembers = [];

        switch (type) {

            case "firstName":
            case "surname":
            case "email":
                memberList.forEach(member => {

                    if (member[type].toUpperCase().charAt(0) == header['value']) {
                        validMembers.push(member);
                    }
                });
                break;
            default:
                memberList.forEach(member => {
                    if (member[type] == header['value']) {
                        validMembers.push(member);
                    }
                });
                break;

        }

        return validMembers;

    }

    /* 2. Setup Main Content ===== */
    /* 2.1. Setup Main Content Fragment ===== */
    const mainContentFragment = document.createDocumentFragment();

    /* 2.2 Populate Main Content Fragment =====*/
    const type = headerList[0]['type'];

    let locationsList;
    let departmentsList;
    let totals;

    // If searchResults are present, then update header lists and totals
    if (searchResults) {

        switch (type) {

            case "department":
                returnData = await sqlRequest.getDepartmentTotals();
                totals = sqlParser.departmentTotals(returnData);
                globals.departmentTotals(totals);
                break;
            case "location":
                returnData = await sqlRequest.getLocationTotals();
                totals = sqlParser.locationTotals(returnData);
                globals.locationTotals(totals);
                break;

        }

    // If searchResults aren't present, then get header lists and totals from globals
    } else {

        switch (type) {

            case "department":
                totals = globals.departmentTotals();
                break;
            case "location":
                totals = globals.locationTotals();
                break;

        }

    }

    // Setup MemberCard Datalists
    locationsList = globals.locationsList();
    departmentsList = globals.departmentsList();

    // Loop through the headerList object and create appropriate headerCard and memberCard elements for each
    headerList.forEach(header => {

        // Setup
        const headerName = header['value'];
        // Get the members under the current header (accounting for filtered search)
        const membersInCurrentHeader = membersInHeader(header, memberList);
        // Get the current number of members under the current header (accounting for filtered search)
        const numberOfMembersInCurrentHeader = membersInCurrentHeader.length;
        let skippable = false;

        // Determine if element is skippable (A-Z headerCard with no memberCard elements - skippable because it has no representation in the SQL database, so can't trigger delete event)
        if (!totals) {

            if (numberOfMembersInCurrentHeader == 0) {

                skippable = true;

            }

        }

        // Create headerCard and MemberContainer elements for non-skippable header
        if (!skippable) {

            // Get the total number of members under the header in the SQL database
            let totalMembersInHeader;

            if (totals) {

                totalMembersInHeader = totals[headerName];
            
            } else {

                totalMembersInHeader = 0;

            }

            let headerCardElement;

            // If more than one member is under the header, then create headerCard with disabled delete button and memberCardContiner
            if (numberOfMembersInCurrentHeader > 0) {

                headerCardElement = headerCardEl(header, true);
                const memberCardContainerElement = memberCardContainerEl(membersInCurrentHeader, locationsList, departmentsList);

                // Populate Main Content Fragment
                mainContentFragment.appendChild(headerCardElement);
                mainContentFragment.appendChild(memberCardContainerElement);

            // If header is empty, but represents an SQL element, then create headerCard with active delete button
            } else {

                if (totalMembersInHeader > 0) {

                    headerCardElement = headerCardEl(header, true);

                } else {

                    headerCardElement = headerCardEl(header, false);

                }

                // Populate Main Content Fragment
                mainContentFragment.appendChild(headerCardElement);

            }

        }

    });

    /* 2.3. Add Main Content Fragment to the Main Element ===== */
    const mainElement = document.getElementsByTagName('main')[0];
    // Clear the existing content in the Main Element
    mainElement.innerHTML = "";
    // Add Main Content Fragment to the Main Element
    mainElement.appendChild(mainContentFragment);

    /* 2.4 Add no-content-message to the Main Element if no content is present ===== */
    const $headerCards = $('.header-card');

    if (!$headerCards.length) {

        // Setup No Content Message Element
        const noContentMessageElement = elements.div("no-content-message-container");
        const innerMessageElement = elements.paragraph("No users in current filters/search.", "no-content-message slide-in-left");

        noContentMessageElement.appendChild(innerMessageElement);

        // Add No Content Message Element to the Main Element
        mainElement.appendChild(noContentMessageElement);

    }

    /* 3. Trigger Relevant DOM Update Events ===== */
    // Make Sort Content Change Color
    $('.member-card').trigger('change-sort-content-color');

    // Trigger member card inputs to resize to contents
    $('.member-input').trigger('input');

    // Update the Jump To button now that the page has content
    jumpTo.update();

}
/* Member Card Container Element ============================================================================================================================ */
/* Element Structure ===== 

    <div class="member-card-container slide-in-left">
        ${department and location datalists}
        ${memberCards}
    </div>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';
// Custom Elements
import memberCardEl from './memberCardEl.js';

/* Functions ===== */
/* Make Container ===================================================================================================================================
Description: Generates a memberCard element for each member in the memberlist, and wraps them all in a memberCardContainer Element. */
export default function makeContainer(memberList, locationList, departmentList) {

    /* 1. Setup ===== */
    // Setup Member Card Container Element
    const memberCardContainerElement = elements.div("member-card-container slide-in-left");

    /* 2. Add Department and Location Datalist Elements to the Member Card Container Element ===== */
    // Setup Department Datalist Element
    const locationDatalistElement = elements.datalist(locationList, "", 'location-datalist');
    // Setup Department Datalist Element
    const departmentDatalistElement = elements.datalist(departmentList, "", 'department-datalist');
    // Add Department and Location Datalists to Member Card Container
    memberCardContainerElement.appendChild(locationDatalistElement);
    memberCardContainerElement.appendChild(departmentDatalistElement);



    /* 3. Populate Member Card Container Element with Member Card Elements ===== */
    memberList.forEach(member => {

        const memberCardElement = memberCardEl(member);

        memberCardContainerElement.appendChild(memberCardElement);

    });

    /* 4. Return Member Card Container Element ===== */
    return memberCardContainerElement;

}
/* Popup Table Query Element ==================================================================================================================================== */
/* Element Structure =====

    <popupEl class="classValue">
        <h2>${headingValue}</h2>
        <flexTable>
            ${tableObject}
        <flexTable class="update-table">
        <p>
            ${textValue}
        </p>
        <acceptRejectButtons/>
    </popupEl>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';
// Custom Elements
import popupEl from './popupEl.js';
import acceptRejectButtonsEl from './acceptRejectButtonsEl.js';

/* Functions ===== */
/* Make Message =====================================================================================================================================
Description: Creates popup message. */
export default function makePopupTableQueryEl(tableObject, tableClassValue, headingValue, textValue, classValue) {

    /* 1. Setup ===== */
    // Create Popup Query Fragment
    const popupTableQueryFragment = elements.fragment();
    // Create Heading Element
    const headingElement = elements.heading(2, headingValue);
    // Create Flex Table Element
    const flexTableElement = elements.flexTable(tableObject, tableClassValue);
    // Create Paragraph Element
    const paragraphElement = elements.paragraph(textValue);
    // Create Accept Reject Buttons Element
    const acceptRejectButtonsElement = acceptRejectButtonsEl();

    /* 2. Populate Popup Query Fragment ===== */
    popupTableQueryFragment.appendChild(headingElement);
    popupTableQueryFragment.appendChild(flexTableElement);
    popupTableQueryFragment.appendChild(paragraphElement);
    popupTableQueryFragment.appendChild(acceptRejectButtonsElement);

    /* 3. Create Popup Query Element ===== */
    const popupTableQueryElement = popupEl(popupTableQueryFragment, classValue);

    /* 4. Return Popup Query Element ===== */
    return popupTableQueryElement;

}
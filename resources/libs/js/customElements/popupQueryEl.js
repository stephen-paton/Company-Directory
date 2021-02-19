/* Popup Element ==================================================================================================================================== */
/* Element Structure =====

    <popupEl class="classValue">
        <h2>{headerValue}</h2>
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
export default function makePopupQueryEl(headingValue, textValue, classValue) {

    /* 1. Setup ===== */
    // Create Popup Query Fragment
    const popupQueryFragment = elements.fragment();
    // Create Header Element
    const headingElement = elements.heading(2, headingValue);
    // Create Paragraph Element
    const paragraphElement = elements.paragraph(textValue);
    // Create Accept Reject Buttons Element
    const acceptRejectButtonsElement = acceptRejectButtonsEl();

    /* 2. Populate Popup Query Fragment ===== */
    popupQueryFragment.appendChild(headingElement);
    popupQueryFragment.appendChild(paragraphElement);
    popupQueryFragment.appendChild(acceptRejectButtonsElement);

    /* 3. Create Popup Query Element ===== */
    const popupQueryElement = popupEl(popupQueryFragment, classValue);

    /* 4. Return Popup Query Element ===== */
    return popupQueryElement;

}
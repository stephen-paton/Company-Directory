/* Popup Button Element ==================================================================================================================================== */
/* Element Structure =====

    <popupEl class="classValue">
        <div class="button-container">
            ${buttons}
        </div>
        <p>
            ${textValue}
        </p>
        <rejectButton/>
    </popupEl>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';
// Custom Elements
import popupEl from './popupEl.js';
import rejectButtonEl from './rejectButtonEl.js';

/* Functions ===== */
/* Make Message =====================================================================================================================================
Description: Creates popup message. */
export default function makePopupButtons(buttonNamesArray, buttonClassArray, headingValue, textValue, classValue) {

    /* 1. Setup ===== */
    // Create Popup Buttons Fragment
    const popupButtonsFragment = elements.fragment();
    // Create Heading Element
    const headingElement = elements.heading(2, headingValue);
    // Create Button Container Element
    const buttonContainerElement = elements.div("button-container popup-buttons");
    // Create and Append Buttons to Button Container Element
    for (let i = 0; i < buttonNamesArray.length; i++) {

        const buttonName = buttonNamesArray[i];
        const buttonClass = `${buttonClassArray[i]} button`;

        const buttonElement = elements.textButton(buttonName, buttonClass);

        buttonContainerElement.appendChild(buttonElement);

    }

    // Create Paragraph Element
    const paragraphElement = elements.paragraph(textValue);
    // Create Accept Reject Buttons Element
    const rejectButtonElement = rejectButtonEl();

    /* 2. Populate Popup Query Fragment ===== */
    popupButtonsFragment.appendChild(headingElement);
    popupButtonsFragment.appendChild(buttonContainerElement);
    popupButtonsFragment.appendChild(paragraphElement);
    popupButtonsFragment.appendChild(rejectButtonElement);

    /* 3. Create Popup Query Element ===== */
    const popupButtonsElement = popupEl(popupButtonsFragment, classValue);

    /* 4. Return Popup Query Element ===== */
    return popupButtonsElement;

}
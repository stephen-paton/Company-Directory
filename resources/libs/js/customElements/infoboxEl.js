/* Infobox Element ==================================================================================================================================== */
/* Element Structure =====

    <div class="infobox">
        <imagebutton class="close"></imagebutton>
        <p>
            ${textValue}
        </p>
        ${infoboxContent}
    </div>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';

/* Functions ===== */
/* Make Message =====================================================================================================================================
Description: Creates popup message. */
export default function makeInfoboxEl(textValue) {

    /* 1. Setup ===== */
    // Create infobox element
    const infoboxElement = elements.div("infobox slide-in-left");
    // Create close buttons element
    const closeButtonElement = elements.imageButton("images/icons/cross.png", "close button");
    const paragraphElement = elements.paragraph(textValue);

    /* 2. Populate infobox element ===== */
    infoboxElement.appendChild(closeButtonElement);
    infoboxElement.appendChild(paragraphElement);

    /* 3. Return popup container element ===== */
    return infoboxElement;

}
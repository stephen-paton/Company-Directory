/* Reject Button Element ============================================================================================================================ */
/* Element Structure =====

    <div class="button-container">
        <button type="button" class="reject"></button>
    </div>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';

/* Functions ===== */
/* Make Buttons =====================================================================================================================================
Description: Makes Reject Buttons. */
export default function makeButtons() {

    /* 1. Setup ===== */
    // Setup button container element
    const buttonContainerElement = elements.div("button-container");
    // Setup reject button element
    const rejectButtonElement = elements.imageButton("images/icons/cross.png", "reject");

    /* 2. Populate Button Container Element ===== */
    buttonContainerElement.appendChild(rejectButtonElement);

    /* 3. Return Button Container Element ===== */
    return buttonContainerElement;
    
}
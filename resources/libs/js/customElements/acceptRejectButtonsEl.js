/* Accept/Reject Buttons Element ============================================================================================================================ */
/* Element Structure =====

    <div class="button-container">
        <button type="button" class="accept"></button>
        <button type="button" class="reject"></button>
    </div>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';

/* Functions ===== */
/* Make Buttons =====================================================================================================================================
Description: Makes Accept/Reject Buttons. */
export default function makeButtons() {

    /* 1. Setup ===== */
    // Setup button container element
    const buttonContainerElement = elements.div("button-container");
    // Setup accept button element
    const acceptButtonElement = elements.imageButton("images/icons/tick.png", "accept");
    // Setup reject button element
    const rejectButtonElement = elements.imageButton("images/icons/cross.png", "reject");

    /* 2. Populate Button Container Element ===== */
    buttonContainerElement.appendChild(acceptButtonElement);
    buttonContainerElement.appendChild(rejectButtonElement);

    /* 3. Return Button Container Element ===== */
    return buttonContainerElement;
    
}
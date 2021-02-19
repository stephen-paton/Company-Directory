/* Edit/Delete Buttons Element ============================================================================================================================== */
/* Element Structure ===== 

    <div class="button-container">
        <button type="button" class="button edit-button">
            <img src="/resources/images/icons/edit.png">
        </button>
        <button type="button" class="button delete-button" ${disabled}>
            <img src="/resources/images/icons/delete.png">
        </button>
    </div>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';

/* Functions ===== */
/* Make Buttons =====================================================================================================================================
Description: Make Edit/Delete Buttons. */
export default function makeButtons(disabled = false) {

    /* 1. Setup ===== */
    // Make Button Container Element
    const buttonContainerElement = elements.div("button-container");

    /* 2. Setup Inner Elements ===== */
    // Setup Edit Button Element
    const editButtonElement = elements.imageButton("images/icons/edit.png", "button edit-button");
    // Setup Delete Button Element
    const deleteButtonElement = elements.imageButton("images/icons/delete.png", "button delete-button");
    deleteButtonElement.disabled = disabled;

    /* 3. Populate Button Container Element ===== */
    buttonContainerElement.appendChild(editButtonElement);
    buttonContainerElement.appendChild(deleteButtonElement);

    /* 4. Return Button Container Element ===== */
    return buttonContainerElement;

}
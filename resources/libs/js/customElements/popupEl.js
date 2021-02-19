/* Popup Element ==================================================================================================================================== */
/* Element Structure =====

    <div class="popup-container">
        <div class="popup-content ${classValue} scale-in-centre">
            ${innerElement}
        </div>
    </div>

*/

/* Imports ===== */
// Helpers
import * as elements from '../helpers/elements.js';

/* Functions ===== */
/* Make Message =====================================================================================================================================
Description: Creates popup message. */
export default function makePopupContentEl(innerElement, classValue) {

    /* 1. Setup ===== */
    // Create popup container element
    const popupContainerElement = elements.div('popup-container');
    // Create popup content element
    const popupContentElement = elements.div(`popup-content ${classValue} scale-in-centre`);

    /* 2. Populate popup content element ===== */
    popupContentElement.appendChild(innerElement);

    /* 3. Popupate popup container element ===== */
    popupContainerElement.appendChild(popupContentElement);

    /* Return popup container element ===== */
    return popupContainerElement;

}
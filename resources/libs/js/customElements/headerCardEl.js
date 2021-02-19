/* Header Card Element ====================================================================================================================================== */
/* Element Structure =====

    <div class="header-card swing-in-top" id="${domID}">
        <p>${header}</p>
        ${editDeleteButtons}
    </div>

*/

/* Imports ===== */
// Helpers
import * as helper from '../helpers/helper.js';
import * as elements from '../helpers/elements.js';
import * as appSpecificHelper from '../helpers/appSpecificHelper.js';
// Custom Elements
import editDeleteButtonsEl from './editDeleteButtonsEl.js';

/* Functions ===== */
/* Make Card ========================================================================================================================================
Description: Makes a Header Card Element. */
export default function makeCard(header, disabled = false) {

    /* 1. Setup ===== */
    // Capture relevant values from the header object
    const value = header['value'];
    const domID = header['domID'];
    const type = header['type'];

    // Create Header Card Element
    const headerCardElement = elements.div("header-card swing-in-top", domID);
    
    /* 2. Setup Inner Elements ===== */
    // Setup header display paragraph
    const headerDisplayParagraph = elements.paragraph("", "header-display-text");

    const headerDisplayFragment = elements.fragment();
    const headerSpanElement = elements.span(value, "primary");
    headerDisplayFragment.appendChild(headerSpanElement);

    if (type == "department") {

        const spaceTextNode = elements.text(" - ");
        const location = header['location']
        const locationSpanElement = elements.span(location, "secondary");
        headerDisplayFragment.appendChild(spaceTextNode);
        headerDisplayFragment.appendChild(locationSpanElement);

    }

    headerDisplayParagraph.appendChild(headerDisplayFragment);

    headerCardElement.appendChild(headerDisplayParagraph);

    // Only add Edit/Delete Button Element for elements that are in the SQL database
    if ((type == "department") || (type == "location")) {

        const editDeleteButtonElement = editDeleteButtonsEl(disabled);
        headerCardElement.appendChild(editDeleteButtonElement);

    }

    /* 4. Return Header Card Element ===== */
    return headerCardElement;

}
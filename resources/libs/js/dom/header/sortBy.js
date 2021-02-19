/* Sort By ========================================================================================================================================== */
/* Imports ===== */
// Helpers
import * as helper from '../../helpers/helper.js';
import * as elements from '../../helpers/elements.js';
// Data Structures
import filterListStruct from '../../dataStructures/filterListStruct.js'

/* Functions ===== */
/* Update ===========================================================================================================================================
Description: Updates the Content of the select elements in the Sort By Button */
export function update() {
    
    /* 1. Setup Sort Content ===== */
    // Setup values and display text for Sort Content Select Element
    let optionsValues = filterListStruct();
    let optionsDisplays = optionsValues.map(value => {

        value = helper.removeHyphens(value);
        value = helper.capitalizeEachWord(value);

        return value;

    });

    // Setup Sort Content Select Element
    const sortContentOptionsElement = elements.selectOptions(optionsValues, optionsDisplays, "surname");

    // Update the contents of the Sort Content Element
    const sortContentElement = document.getElementById("sort-content");
    sortContentElement.innerHTML = "";
    sortContentElement.appendChild(sortContentOptionsElement);

    /* 2. Setup Sort Order ===== */
    // Setup values and display text for Sort Content Select Element
    optionsValues = ["a-z", "z-a"];
    optionsDisplays = optionsValues.map(value => helper.capitalizeEachWord(value));

    // Setup Sort Order Select Element
    const sortOrderOptionsElement = elements.selectOptions(optionsValues, optionsDisplays, "a-z");

    // Update the contents of the Sort Order Element
    const sortOrderElement = document.getElementById("sort-order");
    sortOrderElement.innerHTML = "";
    sortOrderElement.appendChild(sortOrderOptionsElement);

}
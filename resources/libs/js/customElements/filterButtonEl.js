/* Filter Button Element ==================================================================================================================================== */
/* Filter Button Element Structure =====

    Text Input Filters (first-name, surname, email):
        <div class="button filter-button">
            <div class="filter-content-container">
                <select class="filter-type">
                    <option class="default" value="remaining-option-value">First Remaining Option</option>
                    ...
                    <option value="remaining-option-value">Last Remaining Option</option>
                </select>
                <button type="button" class="button delete-button">-</button>
            </div>
            <div class="filter-content-container">
                <label for="filter-${type}">Contains:</label>
                <input type="text" class="filter-value filter-field" id="filter-${type}" placeholder="Filter...">
            </div>            
        </div>

        Select Filters (department, location):
        <div class="button filter-button">
            <div class="filter-content-container">
                <select class="filter-type">
                    <option class="default" value="remaining-option-value">First Remaining Option</option>
                    ...
                    <option value="remaining-option-value">Last Remaining Option</option>
                </select>
                <button type="button" class="button delete-button">-</button>
            </div>
            <div class="filter-content-container">
                <label for="filter-${type}">Works in:</label>
                <select class="filter-value" id="filter-${type}">
                    <option class="default" value="first-filter-element-value">
                    <option value="last-filter-element-value">
                </select>
            </div>           
        </div>

*/
/* Imports ===== */
// Helpers
import * as helper from '../helpers/helper.js';
import * as debug from '../helpers/debug.js';
import * as elements from '../helpers/elements.js';
// Globals
import * as globals from '../globals/globals.js';

/* Functions ===== */
/* Make Filter Button ===============================================================================================================================
Description: Makes a filter button element. */
export default function makeFilterButton(remainingFilters = [], defaultPreference = "") {

    /* 1. Validate Inputs ===== */
    if (!(remainingFilters.length)) {

        debug.log("filter(): All filters are already in use.");
        return false;

    }

    /* 2. Setup ===== */
    // Create filter button element
    const filterButtonElement = elements.div("button filter-button");

    /* 3. Setup Filter Button Element Inner Elements ===== */
    /* 3.1 Setup filter content container element 1 ===== */
    const filterContentContainerElement1 = elements.div("filter-content-container");

    /* 3.1.1 Setup filter type select element ===== */
    // Set remainingFilterDisplays - The values that the options elements should display
    const remainingFilterDisplays = remainingFilters.map(filter => {

        filter = helper.removeHyphens(filter);
        filter = helper.capitalizeEachWord(filter);
        
        return filter;

    });

    // Set defaultPreference - the option that will be selected initially
    if (!remainingFilters.includes(defaultPreference)) {

        if (remainingFilters.includes("surname")) {

            defaultPreference = "surname";

        } else if (remainingFilters.includes("first-name")) {

            defaultPreference = "first-name";

        } else {

            defaultPreference = remainingFilters[0];

        }
        
    }

    // Create filter type select element
    const filterTypeSelectElement = elements.select(remainingFilters, remainingFilterDisplays, defaultPreference, "filter-type");

    /* 3.1.2 Setup Delete Button ===== */
    const deleteButtonElement = elements.textButton("-", "button delete-button");

    /* 3.2 Populate filter content container element 1 ===== */
    filterContentContainerElement1.appendChild(filterTypeSelectElement);
    filterContentContainerElement1.appendChild(deleteButtonElement);

    /* 3.3 Setup filter content container element 2 ===== */
    const filterContentContainerElement2 = elements.div("filter-content-container");

    /* 3.3.1 Setup inner elements ===== */
    // Setup
    let filterContentLabelElement;
    let filterContentInputElement;

    let filterContentOptions;

    // Populate based on defaultPreference value
    switch (defaultPreference) {

        case "first-name":
            filterContentLabelElement = elements.label("filter-first-name", "Starts With:");
            filterContentInputElement = elements.textInput("Filter...", "filter-value filter-field", "filter-first-name" );
            break;
        case "surname":
            filterContentLabelElement = elements.label("filter-surname", "Starts With:");
            filterContentInputElement = elements.textInput("Filter...", "filter-value filter-field", "filter-surname");
            break;
        case "email":
            filterContentLabelElement = elements.label("filter-email", "Starts With:");
            filterContentInputElement = elements.textInput("Filter...", "filter-value filter-field", "filter-email");
            break;
        case "department":
            const departmentsList = globals.departmentsList();
            filterContentOptions = departmentsList.map(departmentRow => departmentRow['department']);

            filterContentLabelElement = elements.label("filter-department", "Works In:");
            filterContentInputElement = elements.select(filterContentOptions, filterContentOptions, "", "filter-value", "filter-department");
            break;
        case "location":
            const locationsList = globals.locationsList();
            filterContentOptions = locationsList.map(locationRow => locationRow['location']);

            filterContentLabelElement = elements.label("", "", "filter-location", "Works In:");
            filterContentInputElement = elements.select(filterContentOptions, filterContentOptions, "", "filter-value", "filter-location");
            break;

    }

    /* 3.4 Populate filter content container element 2 ===== */
    filterContentContainerElement2.appendChild(filterContentLabelElement);
    filterContentContainerElement2.appendChild(filterContentInputElement);

    /* 4. Populate Filter Button Element ===== */
    filterButtonElement.appendChild(filterContentContainerElement1);
    filterButtonElement.appendChild(filterContentContainerElement2);

    /* 5. Return Filter Button Element ===== */
    return {
        filterButton: filterButtonElement,
        filterUsed: defaultPreference
    };

}
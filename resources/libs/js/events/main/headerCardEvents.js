/* Header Card Events =============================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';
// Helpers
import * as appSpecificHelper from '../../helpers/appSpecificHelper.js';
import * as elements from '../../helpers/elements.js';
// Custom Elements
import popupQueryEl from '../../customElements/popupQueryEl.js';
import popupTableQueryEl from '../../customElements/popupTableQueryEl.js';
// Custom Element Content
import popupQueryContent from '../../customElementContent/popupQueryContent.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Header Card Events
    ================================================================================================================================================= */
    /* Edit Button Events =========================================================================================================================== */
    // Click
    $('body').on('click', '.header-card .edit-button', function () {

        /* 1. Update Pending Element ===== */
        const $parentHeaderCard = $('.header-card').has($(this));
        const domID = $parentHeaderCard.attr('id');
        globals.pendingElementID(domID);

        /* 2. Create Edit Popup Element ===== */
        // Setup Inputs
        const headerList = globals.headerList();
        const header = headerList.find(header => header['domID'] == domID);
        const type = header['type'];

        let editPopupElement;

        if (type == "department") {

            // Setup Inputs
            const department = header['value'];
            const location = header['location'];

            // Table Element Setup
            // Department
            const departmentTextElement = appSpecificHelper.setupTextInput(elements.textInput("Department...", "", "edit-department"));
            departmentTextElement.value = department;
            // Location
            const locationsList = globals.locationsList();
            const locationValues = [];
            const locationDisplays = [];
            
            let defaultLocation;

            locationsList.forEach(locationRow => {

                const locationValue = locationRow['locationID'];
                const locationDisplay = locationRow['location'];

                locationValues.push(locationValue);
                locationDisplays.push(locationDisplay);

                if (location == locationDisplay) {

                    defaultLocation = locationValue;

                }

            });

            defaultLocation = (defaultLocation) ? defaultLocation : locationValues[0];

            const locationSelectElement = elements.select(locationValues, locationDisplays, defaultLocation, "", "edit-location");

            // Create Table Query Popup
            const tableObject = {
                "tableBody": [
                    [elements.text('Department:'), departmentTextElement, elements.text(`(${department})`)],
                    [elements.text('Location:'), locationSelectElement, elements.text(`(${location})`)],
                ]
            };

            // Setup Popup Table Query Element
            const tableClassValue = "change-table";
            const inputs = popupQueryContent("editDepartment", department, location);
            editPopupElement = popupTableQueryEl(tableObject, tableClassValue, ...inputs);

        } else if (type == "location") {

            // Setup Inputs
            const location = header['value'];

            // Table Element Setup
            // Location
            const locationTextElement = appSpecificHelper.setupTextInput(elements.textInput("Location...", "", "edit-location"));
            locationTextElement.value = location;

            // Create Table Query Popup
            const tableObject = {
                "tableBody": [
                    [elements.text('Location:'), locationTextElement, elements.text(`(${location})`)]
                ]
            };

            // Setup Popup Table Query Element
            const tableClassValue = "change-table";
            const inputs = popupQueryContent("editLocation", location);
            editPopupElement = popupTableQueryEl(tableObject, tableClassValue, ...inputs);

        } else {

            return;

        }
        
        /* 3. Add Delete Popup Element to DOM ===== */
        document.getElementsByTagName('body')[0].appendChild(editPopupElement);

    });

    /* Delete Button Events ========================================================================================================================= */
    // Click
    $('body').on('click', '.header-card .delete-button', function () {

        /* 1. Update Pending Element ===== */
        const $parentHeaderCard = $('.header-card').has($(this));
        const domID = $parentHeaderCard.attr('id');
        globals.pendingElementID(domID);

        /* 2. Create Delete Popup Element ===== */
        // Setup Inputs
        const headerList = globals.headerList();
        const header = headerList.find(header => header['domID'] == domID);
        const type = header['type'];

        let deletePopupElement;

        if (type == "department") {

            const department = header['value'];
            const location = header['location'];

            const inputs = popupQueryContent("deleteDepartment", department, location);

            deletePopupElement = popupQueryEl(...inputs);

        } else if (type == "location") {

            const location = header['value'];

            const inputs = popupQueryContent("deleteLocation", location);

            deletePopupElement = popupQueryEl(...inputs);

        } else {

            return;

        }

        /* 3. Add Delete Popup Element to DOM ===== */
        document.getElementsByTagName('body')[0].appendChild(deletePopupElement);

    });

    /* ==============================================================================================================================================
    Animation End Events
    ================================================================================================================================================= */
    /* Remove swing-in-top Class from Header Card */
    $('body').on('animationend', '.header-card', function () {

        if ($(this).hasClass('swing-in-top')) {

            $(this).removeClass('swing-in-top');

        }

    });

})();
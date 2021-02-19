/* Add Element Events =========================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../../globals/globals.js';
// Helpers
import * as elements from '../../../helpers/elements.js';
import * as appSpecificHelper from '../../../helpers/appSpecificHelper.js';
// Custom Elements
import popupTableQueryEl from '../../../customElements/popuptableQueryEl.js';
// Custom Element Content
import popupQueryContent from '../../../customElementContent/popupQueryContent.js';

/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Add Element Events
    ================================================================================================================================================= */
    // Add Department Button Clicked
    $('body').on('click', '.add-element .add-department-button', function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Table Element Setup
        // Department
        const departmentTextElement = appSpecificHelper.setupTextInput(elements.textInput("Department...", "", "add-department"));
        // Location
        const locationsList = globals.locationsList();
        const locationValues = [];
        const locationDisplays = [];
        
        locationsList.forEach(locationRow => {

            const locationValue = locationRow['locationID'];
            const locationDisplay = locationRow['location'];

            locationValues.push(locationValue);
            locationDisplays.push(locationDisplay);

        });

        const locationSelectElement = elements.select(locationValues, locationDisplays, locationValues[0], "", "add-location");

        // Create Table Query Popup
        const tableObject = {
            "tableBody": [
                [elements.text('Department:'), departmentTextElement],
                [elements.text('Location:'), locationSelectElement],
            ]
        };

        // Setup Popup Table Query Element
        const tableClassValue = "change-table";
        const inputs = popupQueryContent("addDepartment");
        const addDepartmentPopupElement = popupTableQueryEl(tableObject, tableClassValue, ...inputs);

        // Remove the Add Element Popup from the DOM
        document.getElementsByClassName('popup-container')[0].remove();

        // Add the Add Department Popup to the DOM
        document.getElementsByTagName('body')[0].appendChild(addDepartmentPopupElement);

    });

    // Add Location Button Clicked
    $('body').on('click', '.add-element .add-location-button', function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Table Element Setup
        // Location
        const locationTextElement = appSpecificHelper.setupTextInput(elements.textInput("Location...", "", "add-location"));

        // Create Table Query Popup
        const tableObject = {
            "tableBody": [
                [elements.text('Location:'), locationTextElement],
            ]
        };

        // Setup Popup Table Query Element
        const tableClassValue = "change-table";
        const inputs = popupQueryContent("addLocation");
        const addLocationPopupElement = popupTableQueryEl(tableObject, tableClassValue, ...inputs);

        // Remove the Add Element Popup from the DOM
        document.getElementsByClassName('popup-container')[0].remove();

        // Add the Add Department Popup to the DOM
        document.getElementsByTagName('body')[0].appendChild(addLocationPopupElement);

    });

    // Add User Button Clicked
    $('body').on('click', '.add-element .add-user-button', function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Table Element Setup
        // Department
        const departmentTextElement = appSpecificHelper.setupTextInput(elements.textInput("Department...", "", "add-department"));
        // Location
        const locationsList = globals.locationsList();
        const locationValues = [];
        const locationDisplays = [];
        
        locationsList.forEach(locationRow => {

            const locationValue = locationRow['locationID'];
            const locationDisplay = locationRow['location'];

            locationValues.push(locationValue);
            locationDisplays.push(locationDisplay);

        });

        const locationSelectElement = elements.select(locationValues, locationDisplays, locationValues[0], "", "add-location");

        // Create Table Query Popup
        const tableObject = {
            "tableBody": [
                [elements.text('Department:'), departmentTextElement],
                [elements.text('Location:'), locationSelectElement],
            ]
        };

        // Setup Popup Table Query Element
        const tableClassValue = "change-table";
        const inputs = popupQueryContent("addUser");
        const addDepartmentPopupElement = popupTableQueryEl(tableObject, tableClassValue, ...inputs);

        // Remove the Add Element Popup from the DOM
        document.getElementsByClassName('popup-container')[0].remove();

        // Add the Add Department Popup to the DOM
        document.getElementsByTagName('body')[0].appendChild(addDepartmentPopupElement);

    });

    // Add User Button Clicked
    $('body').on('click', '.add-element .add-user-button', function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Table Element Setup
        // firstName
        const firstNameTextElement = appSpecificHelper.setupTextInput(elements.textInput("First Name...", "", "add-first-name"));
        // surname
        const surnameTextElement = appSpecificHelper.setupTextInput(elements.textInput("Surname...", "", "add-surname"));
        // email
        const emailTextElement = appSpecificHelper.setupTextInput(elements.textInput("Email...", "", "add-email"));
        // department
        const departmentsList = globals.departmentsList();
        const departmentValues = [];
        const departmentDisplays = [];
        
        departmentsList.forEach(departmentRow => {

            const departmentValue = departmentRow['departmentID'];
            const departmentDisplay = `${departmentRow['department']} - ${departmentRow['location']}`;

            departmentValues.push(departmentValue);
            departmentDisplays.push(departmentDisplay);

        });

        const departmentSelectElement = elements.select(departmentValues, departmentDisplays, departmentValues[0], "", "add-department");

        // Create Table Query Popup
        const tableObject = {
            "tableBody": [
                [elements.text('First Name:'), firstNameTextElement],
                [elements.text('Surname:'), surnameTextElement],
                [elements.text('Email:'), emailTextElement],
                [elements.text('Department:'), departmentSelectElement]
            ]
        };

        // Setup Popup Table Query Element
        const tableClassValue = "change-table";
        const inputs = popupQueryContent("addUser");
        const addUserPopupElement = popupTableQueryEl(tableObject, tableClassValue, ...inputs);

        // Remove the Add Element Popup from the DOM
        document.getElementsByClassName('popup-container')[0].remove();

        // Add the Add Department Popup to the DOM
        document.getElementsByTagName('body')[0].appendChild(addUserPopupElement);

    });

})();
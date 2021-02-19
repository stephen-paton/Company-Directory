/* Member Card Events =============================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';
// Helpers
import * as elements from '../../helpers/elements.js';
import * as appSpecificHelper from '../../helpers/appSpecificHelper.js';
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
    Member Card Events
    ================================================================================================================================================= */
    /* Edit Button ================================================================================================================================== */
    // Click
    $('body').on('click', '.member-card .edit-button', function () {

        /* 1. Update Pending Element ===== */
        const $parentMemberCard = $('.member-card').has($(this));
        const domID = $parentMemberCard.attr('id');
        globals.pendingElementID(domID);

        /* 2. Create Edit Popup Element ===== */
        // Setup Inputs
        const memberList = globals.memberList();

        const member = memberList.find(member => member['domID'] == domID);

        const firstName = member['firstName'];
        const surname = member['surname'];
        const email = member['email'];
        const department = `${member['department']} - ${member['location']}`;

        // Table Element Setup
        // firstName
        const firstNameTextElement = appSpecificHelper.setupTextInput(elements.textInput("First Name...", "", "edit-first-name"));
        firstNameTextElement.value = firstName;
        // surname
        const surnameTextElement = appSpecificHelper.setupTextInput(elements.textInput("Surname...", "", "edit-surname"));
        surnameTextElement.value = surname;
        // email
        const emailTextElement = appSpecificHelper.setupTextInput(elements.textInput("Email...", "", "edit-email"));
        emailTextElement.value = email;
        // department
        const departmentsList = globals.departmentsList();
        const departmentValues = [];
        const departmentDisplays = [];
        let defaultDepartment;
        
        departmentsList.forEach(departmentRow => {

            const departmentValue = departmentRow['departmentID'];
            const departmentDisplay = `${departmentRow['department']} - ${departmentRow['location']}`;

            departmentValues.push(departmentValue);
            departmentDisplays.push(departmentDisplay);

            if (department == departmentDisplay) {

                defaultDepartment = departmentValue;

            }

        });

        defaultDepartment = (defaultDepartment) ? defaultDepartment : departmentValues[0];

        const departmentSelectElement = elements.select(departmentValues, departmentDisplays, defaultDepartment, department, "edit-department");

        // Create Table Query Popup
        const tableObject = {
            "tableBody": [
                [elements.text('First Name:'), firstNameTextElement, elements.text(`(${firstName})`)],
                [elements.text('Surname:'), surnameTextElement, elements.text(`(${surname})`)],
                [elements.text('Email:'), emailTextElement, elements.text(`(${email})`)],
                [elements.text('Department:'), departmentSelectElement, elements.text(`(${department})`)]
            ]
        };

        // Setup Popup Table Query Element
        const tableClassValue = "change-table";
        const inputs = popupQueryContent("editUser");
        const addUserPopupElement = popupTableQueryEl(tableObject, tableClassValue, ...inputs);

        // Add the Edit User Popup to the DOM
        document.getElementsByTagName('body')[0].appendChild(addUserPopupElement);

    });

    /* Delete Button ================================================================================================================================ */
    // Click
    $('body').on('click', '.member-card .delete-button', function () {

        /* 1. Update Pending Element ===== */
        const $parentMemberCard = $('.member-card').has($(this));
        const domID = $parentMemberCard.attr('id');
        globals.pendingElementID(domID);

        /* 2. Create Delete Popup Element ===== */
        // Setup Inputs
        const memberList = globals.memberList();
        const member = memberList.find(member => member['domID'] == domID);
        const firstName = member['firstName'];
        const surname = member['surname'];
        const inputs = popupQueryContent("deleteUser", firstName, surname);
        // Create Delete Popup Element
        const popupQueryElement = popupQueryEl(...inputs);

        /* 3. Add Delete Popup Element to DOM ===== */
        document.getElementsByTagName('body')[0].appendChild(popupQueryElement);

    });

    /* Change Sort Content Color ==================================================================================================================== */
    $('body').on('change-sort-content-color', '.member-card', function () {

        const elementClassName = $('#sort-content').val();
        const elementToHighlight = `.${elementClassName}`;

        $(this).find(elementToHighlight).addClass('active');

    });

})();
/* Popup Query Content ============================================================================================================================== */
/* Imports ===== */
// Helpers
import * as helper from '../helpers/helper.js';

/* Variables ===== */
const popupQueryContentValue = {
    /* 
    "getter" : [
        textValue,
        classValue    
    ] 
    */
    // Element
    // Add Element
    "addElement": [
        "Add Element",
        [
            {read: "Click on one of the above buttons to add a new element of the corresponding type, or click the 'close' button below to close this window."}
        ],
        "add-element"
    ],

    // Department
    // Add Department
    "addDepartment": [
        "Add Department",
        [
            {read: "To add a new department to the database, fill in the above form and then click the 'accept' button below, or click on the 'close' button to close this window."}
        ],
        "add-department"
    ],
    // Edit Department
    "editDepartment": [
        "Edit Department",
        [
            {read: "Update the above form and then click the 'accept' button below to update this department, or click on the 'close' button to close this window."}
        ],
        "edit-department"
    ],
    // Delete Department
    "deleteDepartment": [
        "Delete Department",
        [
            {read: "Are you certain you wish to delete department - '"},
            {write: {0: "department"}},
            {read: " - "},
            {write: {1: "location"}},
            {read: "'? This action is permanent and will delete the user and all associated information from the database."}
        ],
        "delete-department"
    ],

    // Location
    // Add Location
    "addLocation": [
        "Add Location",
        [
            {read: "To add a new location to the database, fill in the above form and then click the 'accept' button below, or click on the 'close' button to close this window."}
        ],
        "add-location"
    ],
   // Edit Location
   "editLocation": [
        "Edit Location",
        [
            {read: "Update the above form and then click the 'accept' button below to update this location, or click on the 'close' button to close this window."}
        ],
        "edit-location"
    ],
    // Delete Location
    "deleteLocation": [
        "Delete Location",
        [
            {read: "Are you certain you wish to delete location - '"},
            {write: {0: "location"}},
            {read: "'? This action is permanent and will delete the user and all associated information from the database."}
        ],
        "delete-location"
    ],

    // User
    // Add User
    "addUser": [
        "Add User",
        [
        {read: "To add a new user to the database, fill in the above form and then click the 'accept' button below, or click on the 'close' button to close this window."}
       ],
       "add-user"
    ],
    // Edit User
    "editUser": [
        "Edit User",
        [
            {read: "Update the above form and then click the 'accept' button below to update this user, or click on the 'close' button to close this window."}
        ],
        "edit-user"
    ],
    // Delete User
    "deleteUser": [
        "Delete User",
        [
            {read: "Are you certain you wish to delete user - "},
            {write: {0: "firstName"}},
            {read: " "},
            {write: {1: "surname"}},
            {read: "? This action is permanent and will delete the user and all associated information from the database."}
        ],
        "delete-user"
    ]

}

/* Functions ===== */
/* Popup Query Content ============================================================================================================================== 
Description: Parses the popupQueryContentValue object above and returns the processed text string from the text object, and classValue of the corresponding element. */
export default function popupQueryContent(queryElement, ...replacementStrings) {

    /* 1. Setup ===== */
    // Get the correct popupQuery element
    const popupQueryElement = helper.copyByValue(popupQueryContentValue[queryElement]);
    // Get the text object of the correct popupQuery element
    const textValueInputArray = popupQueryElement[1];

    /* 2. Parse the text object and push each text line into the textValueOutputArray, substituting user input variables for 
    the corresponding 'write' elements ===== */
    // Setup output elements
    const textValueOutputArray = [];
    let textValueOutput = "";
    // Parse the text object
    textValueInputArray.forEach((textValue, i) => {

        if (textValue['write'] !== undefined) {

            const writeKey = Object.keys(textValue['write'])[0];

            textValueOutput = replacementStrings.find((replacementString, i) => {

                return i == writeKey;

            });


        } else if (textValue['read'] !== undefined) {

            textValueOutput = textValue['read'];

        }

        textValueOutputArray.push(textValueOutput);

    });

    /* 3. Collapse the resulting textValueArrayObject down to a single text string and get the classValue from the popupQuery element ===== */
    const headingValue = popupQueryElement[0];
    const textValue = textValueOutputArray.join('');
    const classValue = popupQueryElement[2];

    /* 4. Return the headingValue, textValue and classValue in an array ===== */
    return [headingValue, textValue, classValue];

}
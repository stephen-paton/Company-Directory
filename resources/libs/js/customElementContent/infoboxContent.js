/* Infobox Content ============================================================================================================================== */
/* Imports ===== */
// Helpers
import * as helper from '../helpers/helper.js';

/* Variables ===== */
const infoboxContentValue = {
    /* 
    "getter" : [
        textValue
    ] 
    */
   // Member Infobox Messages

   // Department
   // Add Department
   "addDepartmentSuccess": [
        {write: {0: "department"}},
        {read: " - "},
        {write: {1: "location"}},
        {read: " was successfully added."}
    ],
    "addDepartmentFailure": [
        {write: {0: "department"}},
        {read: " - "},
        {write: {1: "location"}},
        {read: " could not be added. "},
        {write: {2: "statusDescription"}}
    ],
    // Edit Department
    "editDepartmentSuccess": [
        {write: {0: "department"}},
        {read: " - "},
        {write: {1: "location"}},
        {read: " was successfully updated."}
    ],
    "editDepartmentFailure": [
        {write: {0: "department"}},
        {read: " - "},
        {write: {1: "location"}},
        {read: " could not be updated. "},
        {write: {2: "statusDescription"}}
    ],
    // Delete Department
    "deleteDepartmentSuccess": [
        {write: {0: "department"}},
        {read: " "},
        {write: {1: "location"}},
        {read: " was successfully deleted."}
    ],
    "deleteDepartmentFailure": [
        {write: {0: "department"}},
        {read: " "},
        {write: {1: "location"}},
        {read: " could not be deleted. "},
        {write: {2: "statusDescription"}}
    ],


    // Location
    // Add Location
    "addLocationSuccess": [
        {write: {0: "location"}},
        {read: " was successfully added."}
    ],
    "addLocationFailure": [
        {write: {0: "location"}},
        {read: " could not be added. "},
        {write: {1: "statusDescription"}}
    ],
    // Edit Location
    "editLocationSuccess": [
        {write: {0: "location"}},
        {read: " was successfully updated."}
    ],
    "editLocationFailure": [
        {write: {0: "location"}},
        {read: " could not be updated. "},
        {write: {1: "statusDescription"}}
    ],
    // Delete Location
    "deleteLocationSuccess": [
        {write: {0: "location"}},
        {read: " was successfully deleted."}
    ],
    "deleteLocationFailure": [
        {write: {0: "location"}},
        {read: " could not be deleted. "},
        {write: {1: "statusDescription"}}
    ],

    // User
    // Add User
    "addUserSuccess": [
        {write: {0: "firstName"}},
        {read: " "},
        {write: {1: "surname"}},
        {read: " was successfully added."}
    ],
    "addUserFailure": [
        {write: {0: "firstName"}},
        {read: " "},
        {write: {1: "surname"}},
        {read: " could not be added. "},
        {write: {2: "statusDescription"}}
    ],
    // Edit User
    "editUserSuccess": [
        {write: {0: "firstName"}},
        {read: " "},
        {write: {1: "surname"}},
        {read: " was successfully updated."}
    ],
    "editUserFailure": [
        {write: {0: "firstName"}},
        {read: " "},
        {write: {1: "surname"}},
        {read: " could not be updated. "},
        {write: {2: "statusDescription"}}
    ],
    // Delete User
    "deleteUserSuccess": [
        {write: {0: "firstName"}},
        {read: " "},
        {write: {1: "surname"}},
        {read: " was successfully deleted."}
    ],
    "deleteUserFailure": [
        {write: {0: "firstName"}},
        {read: " "},
        {write: {1: "surname"}},
        {read: " could not be deleted. "},
        {write: {2: "statusDescription"}}
    ]
}

/* Functions ===== */
/* Infobox Content ============================================================================================================================== 
Description: Parses the infoboxContentValue object above and returns the processed text string from the corresponding text object. */
export default function infoboxContent(infoboxSelector, ...replacementStrings) {

    /* 1. Setup ===== */
    // Get the text object of the correct infobox element
    const textValueInputArray = helper.copyByValue(infoboxContentValue[infoboxSelector]);

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

    /* 3. Collapse the resulting textValueArrayObject down to a single text string ===== */
    const textValue = textValueOutputArray.join('');

    /* 4. Return the output text string ===== */
    return textValue;

}
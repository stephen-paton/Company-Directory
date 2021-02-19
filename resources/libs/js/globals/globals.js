/* Globals ========================================================================================================================================== */
/* Imports ===== */
// Helpers
import * as helper from '../helpers/helper.js';
import * as debug from '../helpers/debug.js';
import * as dataValidator from '../helpers/dataValidator.js';
// Data Structures
import filterListStruct from '../dataStructures/filterListStruct.js';
import searchFiltersStruct from '../dataStructures/searchFiltersStruct.js';

/* Variables ===== */
let memberListValue;
let headerListValue;
let pendingElementIDValue;
let remainingFiltersValue = filterListStruct();
let searchFiltersValue = searchFiltersStruct();
let departmentsListValue = [];
let locationsListValue = [];
let locationTotalsValue = [];
let departmentTotalsValue = [];

/* Functions ===== */
/* ==================================================================================================================================================
Member List Functions
===================================================================================================================================================== */
/* Member List ======================================================================================================================================
Description: If input is null, returns memberList. Else, updates memberList with input value (if valid) */
export function memberList(updatedMemberList = null) {

    const functionName = "globals.memberList()";

    // Return currently stored memberList
    if (!(updatedMemberList)) {

        return helper.copyByValue(memberListValue);

    }

    for (let i = 0; i < updatedMemberList.length; i++) {

        const expectedProperties = ['firstName', 'surname', 'location', 'department', 'email', 'personnelID', 'domID'];
        const member = updatedMemberList[i];

        const validInput = dataValidator.objectOnlyContainsProperties(expectedProperties, member, "member");

        if (!validInput[0]) {

            debug.log(`${functionName}: ${validInput[1]}`);
            return false;

        }

    }

    memberListValue = updatedMemberList;
    return true;

}

/* ==================================================================================================================================================
Header List functions
===================================================================================================================================================== */
/* Header List ======================================================================================================================================
Description: If input is null, returns headerList. Else, updates headerList with input value (if valid) */
export function headerList (updatedHeaderList = null) {

    const functionName = "globals.headerList()";

    // Return currently stored memberList
    if (!(updatedHeaderList)) {

        return helper.copyByValue(headerListValue);

    }

    const expectedProperties = ['value', 'type', 'domID'];

    for (let i = 0; i < updatedHeaderList.length; i++) {

        const header = updatedHeaderList[i];

        const validInput = dataValidator.objectOnlyContainsProperties(expectedProperties, header, "header");
        
        if (!validInput[0]) {

            debug.log(`${functionName}: ${validInput[1]}`);
            return false;

        }

    }

    headerListValue = updatedHeaderList;
    return true;

}

/* ==================================================================================================================================================
Pending Element ID Functions
===================================================================================================================================================== */
/* Pending Element ID ===============================================================================================================================
Description: If input is null, returns pendingElementID. Else, updates pendingElementID with input value (if valid) */
export function pendingElementID(updatedPendingElementID = null) {

    // Return currently stored pendingElementID
    if (!(updatedPendingElementID)) {

        return helper.copyByValue(pendingElementIDValue);

    }

    pendingElementIDValue = updatedPendingElementID;
    return true;

}

/* Clear Pending Element ID ============================================================================================================================== */
export function clearPendingElementID() {

    pendingElementIDValue = null;

}

/* ==================================================================================================================================================
Remaining Filters Functions
===================================================================================================================================================== */
/* Remaining Filters ================================================================================================================================
Description: Returns the list of remaining filters. */
export function remainingFilters() {

    return helper.copyByValue(remainingFiltersValue);

}

/* Reset Remaining Filters ==========================================================================================================================
Description: Reset the list of remaining filters. */
export function resetRemainingFilters() {

    remainingFiltersValue = filterListStruct();

}

/* Add Filter =======================================================================================================================================
Description: Adds a filter to the remainingFilters list. */
export function addFilter(filter) {
    
    const functionName = "globals.addFilter()";

    const validFilters = filterListStruct();

    if (!validFilters.includes(filter)) {

        debug.log(`${functionName}: "${filter}" is not a valid filter.`);
        return false;

    }

    if (remainingFiltersValue.includes(filter)) {

        debug.log(`${functionName}: "${filter}" is already in the remainingFilters list.`);
        return false;

    }

    remainingFiltersValue.push(filter);
    return true;

}

/* Remove Filter ====================================================================================================================================
Description: Remove a filter from the remainingFilters list. */
export function removeFilter(filter) {

    const functionName = "globals.removeFilter()";

    if (!remainingFiltersValue.includes(filter)) {

        debug.log(`${functionName}: "${filter}" is not in the remainingFilters list.`);
        return false;

    }

    const itemToRemove = remainingFiltersValue.indexOf(filter);

    remainingFiltersValue.splice(itemToRemove, 1);

    return true;

}

/* ==================================================================================================================================================
Search Filters Functions
===================================================================================================================================================== */
/* Search Filters ===================================================================================================================================
Description: Returns the searchFilters object, which contains */
export function searchFilters() {

    return helper.copyByValue(searchFiltersValue);

}

/* Update Search Filter =============================================================================================================================
Description: Update the input element in Search Filters. */
export function updateSearchFilters(filterName, filterValue) {

    const functionName = "globals.updateSearchFilters()";

    const validKeys = filterListStruct();

    if (!validKeys.includes(filterName)) {

        debug.log(`${functionName}: Invalid filterName input.`)
        return false;

    }

    searchFiltersValue[filterName] = filterValue;

    return true;

}

/* Reset Search Filters =============================================================================================================================
Description: Resets Search Filters to default values. */
export function resetSearchFilters() {

    searchFiltersValue = searchFiltersStruct();

}

/* ==================================================================================================================================================
Departments and Locations Lists
===================================================================================================================================================== */
/* Departments List ================================================================================================================================= 
Description: Stores / Returns a list containing all departments in the SQL database. */
export function departmentsList(departmentsList = null) {

    const functionName = "globals.departmentsList()";

    /* 1. Return current Departments List Value if no input is provided ===== */
    if (!departmentsList) {

        return helper.copyByValue(departmentsListValue);

    }

    /* 2. Validate Input ===== */
    // Confirm that input is array
    if (!Array.isArray(departmentsList)) {

        debug.log(`${functionName}: departmentsList must be an array.`)
        return false;

    }

    // Confirm that input array contains expected properties
    const expectedProperties = ['department', 'departmentID', 'location'];

    for (let i = 0; i < departmentsList.length; i++) {

        const department = departmentsList[i];

        const validInput = dataValidator.objectOnlyContainsProperties(expectedProperties, department, "department");

        if (!validInput[0]) {

            debug.log(`${functionName}: ${validInput[1]}`);

        }

    }

    

    /* 3. Update Departments List Value ===== */
    departmentsListValue = departmentsList;
    return true;

}

/* Locations List ================================================================================================================================= 
Description: Stores / Returns a list containing all locations in the SQL database. */
export function locationsList(locationsList = null) {

    const functionName = "globals.locationsList()";

    /* 1. Return current Locations List Value if no input is provided ===== */
    if (!locationsList) {

        return helper.copyByValue(locationsListValue);

    }

    /* 2. Validate Input ===== */
    // Confirm that input is array
    if (!Array.isArray(locationsList)) {

        debug.log(`${functionName}: locationsList must be an array.`)
        return false;

    }

    // Confirm that input array contains only strings
    const expectedProperties = ['location', 'locationID'];

    for (let i = 0; i < departmentsList.length; i++) {

        const location = locationsList[i];

        const validInput = dataValidator.objectOnlyContainsProperties(expectedProperties, location, "location");

        if (!validInput[0]) {

            debug.log(`${functionName}: ${validInput[1]}`);

        }

    }
    
    /* 3. Update Locations List Value ===== */
    locationsListValue = locationsList;
    return true;

}

/* ==================================================================================================================================================
Department and Location Totals
===================================================================================================================================================== */
/* Department Totals ================================================================================================================================
Description: Stores / Returns a list containing total dependencies of each department with dependencies in the personnel table in the SQL database. */
export function departmentTotals(departmentTotals = null) {

    /* 1. Return current Locations List Value if no input is provided ===== */
    if (!departmentTotals) {

        return helper.copyByValue(departmentTotalsValue);

    }

    /* 2. Validate Input ===== */
    // Confirm that input is array
    if (!Array.isArray(departmentTotals)) {

        debug.log('globals.departmentTotals(): departmentTotals must be an array.');
        return false;

    }

    // Confirm that input array contains only numbers
    const departmentTotalsKeys = Object.keys(departmentTotals);

    for (let i = 0; i < departmentTotals.length; i++) {

        const departmentKey = departmentTotalsKeys[i];
        const department = departmentTotals[departmentKey];

        if (typeof(department) !== "number") {

            debug.log('globals.departmentTotals(): departmentTotals must contain only integer values.')
            return false;

        }

    }

    /* 3. Update Department Totals Value ===== */
    departmentTotalsValue = departmentTotals;
    return true;

}

/* Location Totals ================================================================================================================================
Description: Stores / Returns a list containing total dependencies of each location with dependencies in the department table in the SQL database. */
export function locationTotals(locationTotals = null) {

    /* 1. Return current Locations List Value if no input is provided ===== */
    if (!locationTotals) {

        return helper.copyByValue(locationTotalsValue);

    }

    /* 2. Validate Input ===== */
    // Confirm that input is array
    if (!Array.isArray(locationTotals)) {

        debug.log('globals.locationTotals(): locationTotals must be an array.');
        return false;

    }

    // Confirm that input array contains only numbers
    const locationTotalsKeys = Object.keys(locationTotals);

    for (let i = 0; i < locationTotals.length; i++) {

        const locationKey = locationTotalsKeys[i];
        const location = locationTotals[locationKey];

        if (typeof(location) !== "number") {

            debug.log('globals.locationTotals(): locationTotals must contain only integer values.')
            return false;

        }

    }

    /* 3. Update Location Totals Value ===== */
    locationTotalsValue = locationTotals;
    return true;

}
/* SQL Parser ======================================================================================================================================= */
/* Imports ===== */
import sqlRequest from './sqlRequest.js';

/* Functions ===== */
/* ==================================================================================================================================================
Totals
===================================================================================================================================================== */
/* Department Totals ================================================================================================================================
Description: Returns an object of key [department] value [total] pairs. */
export function departmentTotals(returnData) {

    const departments = returnData['data'];

    const departmentTotals = [];

    departments.forEach(department => {

        departmentTotals[department['department']] = department['departmentTotals'];

    });

    return departmentTotals;

}

/* Location Totals ================================================================================================================================
Description: Returns an object of key [location] value [total] pairs. */
export function locationTotals(returnData) {

    const locations = returnData['data'];

    const locationTotals = [];

    locations.forEach(location => {

        locationTotals[location['location']] = location['locationTotals'];

    });

    return locationTotals;

}
/* ==================================================================================================================================================
Get All Locations Data
===================================================================================================================================================== */
// Helper Functions
/* Locations List =================================================================================================================================
Description: Returns a list of all locations in the SQL database, sorted A-Z. */
function locationsList(returnData) {

    const locations = returnData['data'];

    const locationsList = [];

    locations.forEach(locationData => {

        const location = locationData['location'];

        locationsList.push(location);

    });

    locationsList.sort();

    return locationsList;

}

// Main
/* Get All Locations Data =========================================================================================================================
Description: Returns an object contining locationsList and locationHeaderlistInput. */
export async function getAllLocationsData() {

    const returnData = await sqlRequest('getAllLocations');

    const locationsListValue = locationsList(returnData);
    const locationHeaderlistInputValue = locationHeaderlistInput(returnData);

    const allLocationsDataObject = {
        locationsList: locationsListValue,
        locationHeaderlistInput: locationHeaderlistInputValue
    };

    return allLocationsDataObject;

}

/* ==================================================================================================================================================
Get All Departments Data
===================================================================================================================================================== */
// Helper Functions
/* Departments List =================================================================================================================================
Description: Returns a list of all departments in the SQL database, sorted A-Z. */
function departmentsList(returnData) {

    const departments = returnData['data'];

    const departmentsList = [];

    departments.forEach(departmentData => {

        const department = departmentData['department'];

        if (!departmentsList.includes(department)) {

            departmentsList.push(department);

        }

    });

    departmentsList.sort();

    return departmentsList;

}

// Main
/* Get All Departments Data =========================================================================================================================
Description: Returns an object contining departmentsList and departmentHeaderlistInput. */
export async function getAllDepartmentsData() {

    const returnData = await sqlRequest('getAllDepartments');

    const departmentsListValue = departmentsList(returnData);
    const departmentHeaderlistInputValue = departmentHeaderlistInput(returnData);

    const allDepartmentsDataObject = {
        departmentsList: departmentsListValue,
        departmentHeaderlistInput: departmentHeaderlistInputValue
    };

    return allDepartmentsDataObject;

}
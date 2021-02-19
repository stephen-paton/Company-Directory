/* SQL Request ====================================================================================================================================== */
/* Imports ===== */
import * as debug from '../helpers/debug.js';
import $ from 'jquery';

/* Functions ===== */
/* Post Request ===================================================================================================================================== */
function postRequest(request = 'getAll', data = {}) {

    let phpFilename;

    // Validate Inputs
    switch (request) {
        // Maintenance
        case 'resetDatabase':
            phpFilename = `maintenance/${request}.php`;
            break;
        // All
        case 'getAll':
        case 'getFiltered':
            phpFilename = `all/${request}.php`;
            break;
        // Personnel
        case 'insertPersonnel':
        case 'updatePersonnel':
        case 'deletePersonnel':
            phpFilename = `personnel/${request}.php`;
            break;
        // Department
        case 'insertDepartment':
        case 'updateDepartment':
        case 'deleteDepartment':
        case 'getAllDepartments':
        case 'getDepartmentTotals':
            phpFilename = `department/${request}.php`;
            break;
        // Location
        case 'insertLocation':
        case 'updateLocation':
        case 'deleteLocation':
        case 'getAllLocations':
        case 'getLocationTotals':
            phpFilename = `location/${request}.php`;
            break;
        default:
            return;
    }

    debug.log(`sqlRequest.postRequest(): Request to ${phpFilename} initiated`);

    let sendData = {data: data};

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: `php/${phpFilename}`,
            type: 'POST',
            dataType: 'json',
            data: sendData
        })
        .done(function(result) {

            debug.log(result);

            resolve(result);

        })
        .fail(function(jqXHR, textStatus, errorThrown) {

            debug.log(jqXHR);

            let rejectObject = {
                errorCode: jqXHR['status'],
                errorMessage: jqXHR['statusText']
            }

            reject(rejectObject);
            
        });

    });

}

/* ==================================================================================================================================================
Maintenance
===================================================================================================================================================== */
/* Reset Database =================================================================================================================================== */
export async function resetDatabase() {

    const returnData = await postRequest('resetDatabase');

    return returnData;

}

/* ==================================================================================================================================================
All
===================================================================================================================================================== */
/* Get All ========================================================================================================================================== */
export async function getAll() {

    const returnData = await postRequest('getAll');

    return returnData;

}

/* Get Filtered ===================================================================================================================================== */
export async function getFiltered(searchTerm = "", searchFilters = {}) {

    const data = {
        searchTerm: searchTerm,
        searchFilters: searchFilters
    }

    const returnData = await postRequest('getFiltered', data);

    return returnData;

}

/* ==================================================================================================================================================
Search
===================================================================================================================================================== */
/* Get Search Results =============================================================================================================================== */
export async function getSearchResults(searchTerm = "", searchFilters = {}) {

    let returnData;
    let searchResults;

    if (searchTerm == "") {

        const searchFilterKeys = Object.keys(searchFilters);

        let containsFilters = false;

        for (let i = 0; i < searchFilterKeys.length; i++) {

            const key = searchFilterKeys[i];

            if (!(searchFilters[key] == "")) {

                containsFilters = true;
                break;

            }

        }

        // If no search term or filters are present, then get all 
        if (!containsFilters) {

            returnData = await getAll();

            return returnData;

        }

    }

    returnData = await getFiltered(searchTerm, searchFilters);

    return returnData;

}

/* ==================================================================================================================================================
Personnel
===================================================================================================================================================== */
/* Insert Personnel ==================================================================================================================================== */
export async function insertPersonnel(firstName, surname, email, departmentID) {

    const data = {
        firstName: firstName,
        surname: surname,
        email: email,
        departmentID: departmentID
    };

    const returnData = await postRequest('insertPersonnel', data);

    return returnData;

}

/* Update Personnel ================================================================================================================================= */
export async function updatePersonnel(personnelID, firstName, surname, email, departmentID) {

    const data = {
        personnelID: personnelID,
        firstName: firstName,
        surname: surname,
        email: email,
        departmentID: departmentID
    };

    const returnData = await postRequest('updatePersonnel', data);

    return returnData;

}

/* Delete Personnel ================================================================================================================================= */
export async function deletePersonnel(personnelID) {

    const data = {
        personnelID: personnelID
    };

    const returnData = await postRequest('deletePersonnel', data);

    return returnData;

}

/* ==================================================================================================================================================
Department
===================================================================================================================================================== */
/* Insert Department ==================================================================================================================================== */
export async function insertDepartment(department, locationID) {

    const data = {
        department: department,
        locationID: locationID
    };

    const returnData = await postRequest('insertDepartment', data);

    return returnData;

}

/* Update Department ================================================================================================================================= */
export async function updateDepartment(departmentID, department, locationID) {

    const data = {
        departmentID: departmentID,
        department: department,
        locationID: locationID
    };

    const returnData = await postRequest('updateDepartment', data);

    return returnData;

}

/* Delete Personnel ================================================================================================================================= */
export async function deleteDepartment(departmentID) {

    const data = {
        departmentID: departmentID
    }

    const returnData = await postRequest('deleteDepartment', data);

    return returnData;

}

/* Get All Departments ============================================================================================================================== */
export async function getAllDepartments() {

    const returnData = await postRequest('getAllDepartments');

    return returnData;

}

/* Get Department Totals ================================================================================================================================ */
export async function getDepartmentTotals() {

    const returnData = await postRequest('getDepartmentTotals');

    return returnData;

}

/* ==================================================================================================================================================
Location
===================================================================================================================================================== */
/* Insert Location ==================================================================================================================================== */
export async function insertLocation(location) {

    const data = {
        location: location
    };

    const returnData = await postRequest('insertLocation', data);

    return returnData;

}

/* Update Location ================================================================================================================================= */
export async function updateLocation(locationID, location) {

    const data = {
        locationID: locationID,
        location: location
    };

    const returnData = await postRequest('updateLocation', data);

    return returnData;

}

/* Delete Personnel ================================================================================================================================= */
export async function deleteLocation(locationID) {

    const data = {
        locationID: locationID
    }

    const returnData = await postRequest('deleteLocation', data);

    return returnData;

}

/* Get All Locations ================================================================================================================================ */
export async function getAllLocations() {

    const returnData = await postRequest('getAllLocations');

    return returnData;

}

/* Get Location Totals ============================================================================================================================== */
export async function getLocationTotals() {

    const returnData = await postRequest('getLocationTotals');

    return returnData;

}
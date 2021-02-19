/* Header List Struct ====================================================================================================================================== */
/* Imports ===== */
// Data Structures
import headerStruct from './headerStruct.js';
import departmentHeaderStruct from './departmentHeaderStruct.js';
import locationHeaderStruct from './locationHeaderStruct.js';
// Helpers
import * as debug from '../helpers/debug.js';
// Globals
import * as globals from '../globals/globals.js';

/* Functions ===== */
/* Create Header List ===============================================================================================================================
Description: Creates a Header List based on input sortContent */
export function createHeaderList(sortContent = "surname") {

    /* ==============================================================================================================================================
    Helper Functions
    ================================================================================================================================================= */
    /* Create A to Z List =====
    Description: Creates an A to Z Header List */
    function createAToZList(sortContent) {

        const AToZList = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

        let headerList = [];
        let type;

        switch (sortContent) {

            case "first-name":
                type = "firstName";
                break;
            default: 
                type = sortContent;
                break;

        }

        AToZList.forEach((letter, i) => {

            const value = letter;
            const domID = `header${i}`;

            headerList.push(headerStruct(value, type, domID));

        });

        return headerList;

    }

    /* Create Department List ===== */
    function createDepartmentList (sortContent) {

        const type = sortContent;
        const departments = globals.departmentsList();

        const headerList = [];

        departments.forEach((departmentRow, i) => {

            const department = departmentRow['department'];
            const location = departmentRow['location'];
            const domID = `header${i}`;
            const departmentID = departmentRow['departmentID'];

            headerList.push(departmentHeaderStruct(department, location, type, domID, departmentID));

        });

        return headerList;

    }

    /* Create Location List ===== */
    function createLocationList(sortContent) {

        const type = sortContent;
        const locations = globals.locationsList();

        const headerList = [];

        locations.forEach((locationRow, i) => {

            const location = locationRow['location'];
            const domID = `header${i}`;
            const locationID = locationRow['locationID'];

            headerList.push(locationHeaderStruct(location, type, domID, locationID));

        });

        return headerList;

    }

    /* ==============================================================================================================================================
    Main Function
    ================================================================================================================================================= */
    let headerList;

    switch (sortContent) {

        case 'surname':
        case 'first-name':
        case 'email':
            headerList = createAToZList(sortContent);
            break;
        case 'department':
            headerList = createDepartmentList(sortContent);
            break;
        case 'location':
            headerList = createLocationList(sortContent);
            break;
        default:
            debug.log('headerList.createHeaderList(): Incorrect sortContent specified');
            return false;

    }

    return headerList;

}

/* Sort =============================================================================================================================================
Description: Sorts Header List by sortOrder input */
export function sort(list, sortOrder = "a-z") {

    /* Helper Functions ===== */
    /* Sort A to Z ===== */
    function sortAToZ(list) {

        list.sort((a,b) => a['value'].localeCompare(b['value']));
    
        return list;
    
    }
    
    /* Sort A to Z ===== */
    function sortZToA(list) {

        list.sort((a,b) => b['value'].localeCompare(a['value']));

        return list;
    
    }

    /* Main Function ===== */
    // Sort List Based on sortOrder
    let sortedList;

    switch (sortOrder) {

        case "a-z":
             sortedList = sortAToZ(list);
             break;
        case "z-a":
            sortedList = sortZToA(list);
            break;
        default:
            debug.log('headerList.sort(): Invalid sortOrder specified');
            return false;

    }

    return sortedList;

}
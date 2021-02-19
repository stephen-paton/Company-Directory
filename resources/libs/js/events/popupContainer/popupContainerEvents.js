/* Popup Container Events =========================================================================================================================== */
/* Imports ===== */
// Events
// Popup Content Events
import * as popupContentEvents from './popupContentEvents.js';
// Element Events
import * as addElementEvents from './element/addElementEvents.js';
// Department Events
import * as addDepartmentEvents from './department/addDepartmentEvents.js';
import * as editDepartmentEvents from './department/editDepartmentEvents.js';
import * as deleteDepartmentEvents from './department/deleteDepartmentEvents.js';
// Location Events
import * as addLocationEvents from './location/addLocationEvents.js';
import * as editLocationEvents from './location/editLocationEvents.js';
import * as deleteLocationEvents from './location/deleteLocationEvents.js';
// User Events
import * as addUserEvents from './user/addUserEvents.js';
import * as editUserEvents from './user/editUserEvents.js';
import * as deleteUserEvents from './user/deleteUserEvents.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    // Popup Content Events
    popupContentEvents.eventSetup;
    // Element Events
    addElementEvents.eventSetup;
    // Department Events
    addDepartmentEvents.eventSetup;
    editDepartmentEvents.eventSetup;
    deleteDepartmentEvents.eventSetup;
    // Location Events
    addLocationEvents.eventSetup;
    editLocationEvents.eventSetup;
    deleteLocationEvents.eventSetup;
    // User Events
    addUserEvents.eventSetup;
    editUserEvents.eventSetup;
    deleteUserEvents.eventSetup;

})();
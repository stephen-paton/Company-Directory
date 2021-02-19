/* Header Events ==================================================================================================================================== */
/* Imports ===== */
// Events
import * as editmodeButtonEvents from './editmodeButtonEvents.js';
import * as filterPopupEvents from './filterPopupEvents.js';
import * as jumpToButtonEvents from './jumpToButtonEvents.js';
import * as searchBarEvents from './searchBarEvents.js';
import * as sortByButtonEvents from './sortByButtonEvents.js';
import * as addButtonEvents from './addButtonEvents.js';
import * as logoEvents from './logoEvents.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    editmodeButtonEvents.eventSetup;
    filterPopupEvents.eventSetup;
    jumpToButtonEvents.eventSetup;
    searchBarEvents.eventSetup;
    sortByButtonEvents.eventSetup;
    addButtonEvents.eventSetup;
    logoEvents.eventSetup;

})();
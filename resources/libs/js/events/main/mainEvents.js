/* Main Events ====================================================================================================================================== */
/* Imports ===== */
// Events
import * as confirmationButtonEvents from './confirmationButtonEvents.js';
import * as headerCardEvents from './headerCardEvents.js';
import * as memberCardEvents from './memberCardEvents.js';
import * as memberCardContainerEvents from './memberCardContainerEvents.js';
import * as noContentMessageEvents from './noContentMessageEvents.js';

/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Main Events
    ================================================================================================================================================= */
    confirmationButtonEvents.eventSetup;
    headerCardEvents.eventSetup;
    memberCardEvents.eventSetup;
    memberCardContainerEvents.eventSetup;
    noContentMessageEvents.eventSetup;

})();
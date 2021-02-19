/* Events =========================================================================================================================================== */
/* Imports ===== */
// Events
import * as defaultEvents from './defaults/defaultEvents.js';
import * as overlayButtonEvents from './overlayButtons/overlayButtonsEvents.js';
import * as headerEvents from './header/headerEvents.js';
import * as mainEvents from './main/mainEvents.js';
import * as popupContainerEvents from './popupContainer/popupContainerEvents.js';
import * as footerEvents from './footer/footerEvents.js';
import * as infoboxEvents from './infobox/infoboxEvents.js';

/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    defaultEvents.eventSetup;
    overlayButtonEvents.eventSetup;
    headerEvents.eventSetup;
    mainEvents.eventSetup;
    popupContainerEvents.eventSetup;
    infoboxEvents.eventSetup;
    footerEvents.eventSetup;

})();
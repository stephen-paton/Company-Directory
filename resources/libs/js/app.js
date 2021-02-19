/* App ============================================================================================================================================== */
/* Imports ===== */
// Libraries
import "core-js/stable"; // Babel needs in main file to compile correctly
import "regenerator-runtime/runtime"; // Babel needs in main file to compile correctly
import $ from 'jquery';
// Setup
import setup from './setup.js';

/* Main ===== */
$(function () {

    setup();

});




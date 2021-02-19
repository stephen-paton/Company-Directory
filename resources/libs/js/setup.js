/* Setup ============================================================================================================================================ */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Header
import * as header from './dom/header/header.js';
// Footer
import * as updateLog from './dom/footer/updateLog.js';
// Events
import * as events from './events/events.js';

/* Functions ===== */
/* Setup ============================================================================================================================================
Description: Sets up the company directory app. */
export default function setup() {

    /* 1. Add Intro Log to Update Log ===== */
    updateLog.log("Opened the Company Directory");
    
    /* 2. Event Setup ===== */
    events.eventSetup;

    /* 3. Header Initialization ===== */
    header.update();

    /* 4. Main Page Initalization ===== */
    $('.main-header .search-field').trigger('input');

    

}
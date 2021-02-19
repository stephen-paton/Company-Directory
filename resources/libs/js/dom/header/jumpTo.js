/* Jump To Button =================================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Helpers
import * as elements from '../../helpers/elements.js';

/* Functions ===== */
/* Update ===========================================================================================================================================
Description: Populates the Jump To button with the values of the current header-card element ids */
export function update() {

    /* 1. Setup ===== */
    // Setup options values and display text
    const optionsValues = [];

    $('.header-card .primary').each(function () {

        optionsValues.push($(this).text());

    });

    // Setup Jump To Options Element
    const jumpToOptionsElement = elements.selectOptions(optionsValues, optionsValues, "");

    /* 2. Update the contents of the Jump To Element ===== */
    const jumpToElement = document.getElementById('jump-to');
    jumpToElement.innerHTML = "";
    jumpToElement.appendChild(jumpToOptionsElement);

}
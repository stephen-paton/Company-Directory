/* Update Log ======================================================================================================================================= */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Helpers
import * as elements from '../../helpers/elements.js';

/* Functions ===== */
/* Log ==============================================================================================================================================
Description: Adds a list item to the update log element, containing the input text. */
export function log(textValue) {

    /* 1. Setup Display Text ===== */
    const updateTextSpanElement = elements.span(textValue, "update");
    const connectingTextNodeElement = elements.text(" - ");
    const currentDateTime = new Date().toLocaleString('en-GB', {timeZone: 'UTC'});
    const dateTimeSpanElement = elements.span(currentDateTime, "time")
    const displayTextFragment = elements.fragment();
    displayTextFragment.appendChild(updateTextSpanElement);
    displayTextFragment.appendChild(connectingTextNodeElement);
    displayTextFragment.appendChild(dateTimeSpanElement);

    /* 2. Setup Display List Item Element ===== */
    const displayListItemElement = elements.listItem();
    displayListItemElement.appendChild(displayTextFragment);

    /* 3. Add the List Item to the Update Log Element ===== */
    $('.update-log').prepend(displayListItemElement);

}

/* Open =============================================================================================================================================
Description: Opens the Update Log. */
export function open() {

    $('footer').addClass('active');
    $('footer').slideDown(1000);
    $('footer').removeClass('hidden');

}

/* Close ============================================================================================================================================
Description: Closes the Update Log. */
export function close() {

    $('footer').removeClass('active');

    $('footer').slideUp(1000, function () {

        $('footer').addClass('hidden');

        $('.overlay-buttons .update-log-button').removeClass('hidden');
        $('.overlay-buttons .update-log-button').addClass('slide-in-eliptical-bottom');

    });

}
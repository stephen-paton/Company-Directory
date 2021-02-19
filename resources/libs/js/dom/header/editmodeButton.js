/* Editmode Button ================================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';

/* Functions ===== */
/* Toggle Button ====================================================================================================================================
Toggles the Editmode Button On and Off. */
export function toggleButton() {

    if ($('body').hasClass('edit-mode')) {

        $('body').removeClass('edit-mode');

    } else {

        $('body').addClass('edit-mode');

    }

}
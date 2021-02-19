/* Confirmation Button Events ======================================================================================================================= */
/* Imports ===== */
// Libraries
import $ from 'jquery';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* Animation End Events ===== */
    /* Remove animations from Confirmation Buttons */
    $('body').on('animationend', '.confirmation-buttons', function () {

        if ($(this).hasClass('swing-in-top')) {

            $(this).removeClass('swing-in-top');

            return

        }

        if ($(this).hasClass('slide-out-top')) {

            $(this).removeClass('slide-out-top');

            const $callingInput = $('.member-card').has($(this)).find('input:focus');

            $(this).remove();

            $callingInput.trigger('input'); // Retriggers 'input' event, to check if status has changed in time that it took this animation to run
            
            return

        }

    });

})();
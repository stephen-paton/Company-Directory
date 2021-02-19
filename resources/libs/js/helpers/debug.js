/* =====================================================================================================
Debug
======================================================================================================== */
const DEBUG = false;

/* Debug Log 
Description: When the app is in DEBUG mode, writes messages to the console. */
export function log(input) {

    if (DEBUG) {

        console.log(input);

    }

}
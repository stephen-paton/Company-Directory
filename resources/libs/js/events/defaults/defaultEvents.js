/* Default Events =========================================================================================================================================== */
/* Imports ===== */

/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Default Events
    ================================================================================================================================================= */
    /* Focus Outline Only when Tabbing ================================================================================================================ */
    function handleFirstTab(e) {
        if (e.keyCode === 9) {
          
            document.body.classList.add('user-is-tabbing');
          
            window.removeEventListener('keydown', handleFirstTab);
            window.addEventListener('mousedown', handleMouseDownOnce);

        }

      }
      
    function handleMouseDownOnce() {

        document.body.classList.remove('user-is-tabbing');
        
        window.removeEventListener('mousedown', handleMouseDownOnce);
        window.addEventListener('keydown', handleFirstTab);
      
    }

    // Defaults to tab display
    window.addEventListener('keydown', handleFirstTab);

    /* Ensure App Height is Browser Height (for problematic mobile browsers) ====================================================== */
    let resizeDelayTimer;

    function resizePage () {

        function resize() {

            // Scrolls page to drop chrome address bar
            window.scrollTo(0, 1);

            const width = window.innerWidth;
            const height = window.innerHeight;

            // Sets the maximum page height to inner height
            document.getElementsByTagName('html')[0].style.maxHeight = `${height}px`;
            document.getElementsByTagName('body')[0].style.maxHeight = `${height}px`;
            document.getElementsByTagName('html')[0].style.maxWidth = `${width}px`;
            document.getElementsByTagName('body')[0].style.maxWidth = `${width}px`;

            // Scrolls page to top again
            window.scrollTo(0, 0);

        }

        clearTimeout(resizeDelayTimer);

        resizeDelayTimer = setTimeout(resize, 500);

    }

    window.addEventListener('resize', resizePage);

    window.dispatchEvent(new Event('resize'));

})();
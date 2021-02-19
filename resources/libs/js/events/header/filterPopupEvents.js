/* Filter Popup Events ============================================================================================================================== */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';
// Helpers
import * as helper from '../../helpers/helper.js';
import * as elements from '../../helpers/elements.js';
// Custom Elements
import filterButtonEl from '../../customElements/filterButtonEl.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* ==============================================================================================================================================
    Filter Popup Events
    ================================================================================================================================================= */
    /* Helper Functions ===== */
    function updateAvailableFilterOptions() {

        $('.filter-type').each(function () {

            const defaultOption = $(this).val();

            const optionsValues = globals.remainingFilters();
            optionsValues.push(defaultOption);
            const optionsDisplays = optionsValues.map(value => {

                value = helper.removeHyphens(value);
                value = helper.capitalizeEachWord(value);

                return value;

            });

            const optionsElement = elements.selectOptions(optionsValues, optionsDisplays, defaultOption);

            $(this).empty();
            $(this).append(optionsElement);

        });

    }

    function updateAllSearchFilters() {

        $('.filter-container .filter-button').each(function () {

            const filterName = $(this).find('.filter-type option.default').val();
            const filterValue = $(this).find('.filter-value').val();

            globals.updateSearchFilters(filterName, filterValue);

        });

    }

    function genericFilterUpdates() {

        // Update available options for all filter buttons
        updateAvailableFilterOptions();

        // Update all search filters
        updateAllSearchFilters();

        // Hide Add button when all filters are in use
        if (!globals.remainingFilters().length) {

            if ($('.filter-container .add-button').is(":visible")) {

                $('.filter-container .add-button').fadeOut();

            }

        }

        // Fade In Add Button when one or more filters are available
        if (globals.remainingFilters().length) {

            if ($('.filter-container .add-button').is(":hidden")) {

                $('.filter-container .add-button').fadeIn();

            }

        }

        // Trigger Search
        $('.main-header .search-field').trigger('input');

    }

    /* Filter Container Close Event ==================================================================================================================
    Description: Close the Filter Container when another element in the DOM is clicked */
    $('body').on('click', function (event) {

        /* 1. Check if search-bar is currently active, and if not, do nothing ===== */
        if (!($('.main-header .search-bar').hasClass('active'))) {

            return;

        }

        /* 2. Exceptions to ignore ===== */
        if (
            // Ignore filter delete buttons (these are child elements of the filter-container, but are immediately deleted when clicked, removing them from the DOM and making them return false as child elements)
            $(event.target).is('.filter-button .delete-button') ||
            // Ignore the search-bar element (It stands to reason that someone who has the filters open and goes to search something still wants the filters open)
            $(event.target).is('.main-header .search-bar *')
        ) {

            return;

        }

        /* 3. Check if triggering element is, or is a child of the filter container, and if so do nothing ===== */
        const $filterContainer = $('.filter-container');

        if ($(event.target).is($filterContainer)) {

            return;

        }

        if ($filterContainer.has($(event.target)).length > 0) {

            return;

        }

        /* 4. Close filter-container ===== */
        $('.main-header .filtermode-button').trigger('click');

    });

    /* Add Button Click Event =======================================================================================================================
    Description: Add Filter Button to Filter Popup when add button is clicked ===== */
    $('body').on('click', '.filter-container .add-button', function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Create New Filter Button
        const newFilterButton = filterButtonEl(globals.remainingFilters());

        // Remove Filter from availableFilters
        globals.removeFilter(newFilterButton['filterUsed']);

        // Add New Filter Button to Filter Popup Element
        $('.filter-controls').after(newFilterButton['filterButton']);

        // Generic Filter Updates
        genericFilterUpdates();

        // Re-enable Button
        $(this).prop('disabled', false);

    });

    /* Delete Filter button when Delete button is clicked ===== */
    $('body').on('click', '.filter-container .delete-button', function () {

        // Disable Button
        $(this).prop('disabled', true);

        // Setup
        const $parentButton = $('.filter-button').has($(this));
        const originalOption = $parentButton.find('.filter-type option.default').val();

        // Add deleted option back to remainingFilters list
        globals.addFilter(originalOption);

        // Remove this filter from searchFilters object
        globals.updateSearchFilters(originalOption, "");

        // Delete filter button
        $parentButton.remove();

        // Generic Filter Updates
        genericFilterUpdates();

        // Re-enable Button
        $(this).prop('disabled', false);

    });

    /* Change Button on filter-type update ===== */
    $('body').on('change', '.filter-container .filter-type', function () {

        // Setup
        const originalOption = $(this).find('option.default').val();
        const selectedOption = $(this).val();

        const $parentButton = $('.filter-button').has($(this));

        const newFilterButton = filterButtonEl(globals.remainingFilters(), selectedOption);

        // Add previous filter back to remainingFilters list
        globals.addFilter(originalOption);
        // Remove new filter from remainingFilters list
        globals.removeFilter(newFilterButton['filterUsed']);
        // Remove previous filter from searchFilters object
        globals.updateSearchFilters(originalOption, "");

        // Insert new filter button after current filter button
        $parentButton.after(newFilterButton['filterButton']);
        // Remove current filter button
        $parentButton.remove();

        // Generic Filter Updates
        genericFilterUpdates();

    });
    
    /* Clear Filter List when Clear button is clicked ===== */
    $('body').on('click', '.filter-container .clear-button', function () {

        // Check if any filters exist
        const $filterButtons = $('.filter-button');
        
        if ($filterButtons.length) {

            // Disable Clear Button
            $(this).prop('disabled', true);

            // Remove all filter buttons
            $('.filter-button').remove();
            
            // Reset Remaining Filters
            globals.resetRemainingFilters();

            // Reset Search Filters
            globals.resetSearchFilters();

            // Generic Filter Updates
            genericFilterUpdates();

            // Re-enable Clear Button
            $(this).prop('disabled', false);

        }

    });

    /* Update Search Filters on input ===== */
    $('body').on('input', '.filter-container .filter-value', function () {

        const filterName = $('.filter-button').has(this).find('.filter-type').val();
        const filterValue = $(this).val();

        globals.updateSearchFilters(filterName, filterValue);

        // Generic Filter Updates
        genericFilterUpdates();

    });

    /* Animation End Events ========================================================================================================================= */
    $('body').on('animationend', '.main-header .filter-container', function () {

        if ($(this).hasClass('slide-in-left')) {

            $(this).removeClass('slide-in-left');
            return;

        }

        if ($(this).hasClass('slide-out-right')) {

            $(this).removeClass('slide-out-right');
            $(this).addClass('hidden');
            return;

        }

    });

})();
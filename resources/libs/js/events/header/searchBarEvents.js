/* SearchBar Events ================================================================================================================================= */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// Globals
import * as globals from '../../globals/globals.js';
// Header
import * as searchBar from '../../dom/header/searchBar.js';

/* Functions ===== */
/* Event Setup ======================================================================================================================================
Description: Sets up DOM events */
export const eventSetup = (function () {

    /* Search Form Events ===== */
    /* Search Event on change ===== */
    let resetTimer;
    let subsequentSearchTimer;
    let subsequentSearch = false;
    $('body').on('input', '.main-header .search-field', function () {

        /* 1. Setup ===== */
        const searchTerm = $(this).val();
        const searchFilters = globals.searchFilters();

        /* 2. Carry out the search function ===== */
        // Clear resetTimer
        clearTimeout(resetTimer);
        clearTimeout(subsequentSearchTimer);

        // Run search immediately on the first pass
        if (!subsequentSearch) {

            subsequentSearch = true;

            searchBar.search(searchTerm, searchFilters);

        // Delay search by 500ms (retriggering) when the user attempts a subsequent search
        } else {

            subsequentSearchTimer = setTimeout(function () {

                searchBar.search(searchTerm, searchFilters);

            }, 500);

        }

        // Reset to search immediately if the user doesn't attempt a subsequent search for 500ms
        resetTimer = setTimeout(function () {

            subsequentSearch = false;

        }, 500);

    });

    /* FilterMode Button Events ========================================================================================================================= */
    /* Make Active On Click */
    $('body').on('click', '.filtermode-button', function () {

        const $searchBar = $('.main-header .search-bar');
        const $filterContainer = $('.main-header .filter-container');

        if ($searchBar.hasClass('active')) {

            $searchBar.removeClass('active');
            $filterContainer.removeClass('slide-in-left');
            $filterContainer.addClass('slide-out-right');

        } else {

            $searchBar.addClass('active');
            $filterContainer.removeClass('slide-out-right hidden');
            $filterContainer.addClass('slide-in-left');

        }

    });

})();
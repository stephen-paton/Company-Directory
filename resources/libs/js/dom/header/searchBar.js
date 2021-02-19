/* Search Bar ======================================================================================================================================= */
/* Imports ===== */
// Libraries
import $ from 'jquery';
// SQL
import * as sqlRequest from '../../sql/sqlRequest.js';
// Main
import * as main from '../main/main.js';

/* Functions ===== */
/* Search Function  =========================================================================================================================
Description: Initiates a search of the SQL database. */
export async function search(searchTerm, searchFilters) {

    // Perform Search
    const returnData = await sqlRequest.getSearchResults(searchTerm, searchFilters);
    const searchResults = returnData['data'];

    /* Update Main Page Content ===== */
    // Setup
    const sortContent = $('#sort-content').val();
    const sortOrder = $('#sort-order').val();

    // Update Main Page Content
    main.update(searchResults, sortContent, sortOrder);

}
/* Search Filters Struct =========================================================================================================================================== */
/* Functions ===== */
/* Create Search Filters ============================================================================================================================
Description: Creates the searchFilters object data struct, used by the searchFilters global to keep track of current search filter values. */
export default function createSearchFilters () {

    const searchFilters = {
        'first-name': "",
        'surname': "",
        'department': "", 
        'location': "", 
        'email': ""
    };

    return searchFilters;

}
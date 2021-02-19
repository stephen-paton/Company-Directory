/* Filter List Struct =========================================================================================================================================== */
/* Functions ===== */
/* Create Filter List ===============================================================================================================================
Description: Creates a list of class selectors, used by the remaining filters global to reset. */
export default function createFilterList () {

    const filterList = ['first-name', 'surname', 'department', 'location', 'email'];

    return filterList;

}
/* Location Header Struct =========================================================================================================================================== */
/* Functions ===== */
/* Create Header ====================================================================================================================================
Description: Creates a header data struct, used by the headerList data struct*/
export default function createHeader (location, type, domID, locationID) {

    const header = {
        value: location,
        type: type,
        domID: domID,
        locationID: locationID
    }

    Object.freeze(header);

    return header;

}
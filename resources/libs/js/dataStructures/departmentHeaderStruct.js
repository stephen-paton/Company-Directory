/* Department Header Struct =========================================================================================================================================== */
/* Functions ===== */
/* Create Header ====================================================================================================================================
Description: Creates a header data struct, used by the headerList data struct*/
export default function createHeader (department, location, type, domID, departmentID) {

    const header = {
        value: department,
        location: location,
        type: type,
        domID: domID,
        departmentID: departmentID
    }

    Object.freeze(header);

    return header;

}
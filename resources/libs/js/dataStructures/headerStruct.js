/* Header Struct =========================================================================================================================================== */
/* Functions ===== */
/* Create Header ====================================================================================================================================
Description: Creates a header data struct, used by the headerList data struct*/
export default function createHeader (value, type, domID) {

    const header = {
        value: value,
        type: type,
        domID: domID,
    }

    Object.freeze(header);

    return header;

}
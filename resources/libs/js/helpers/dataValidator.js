/* Data Validator =================================================================================================================================== */
/* Functions ===== */
/* Object Only Contains Properties ===== */
export function objectOnlyContainsProperties(expectedProperties = [], object,  objectName = "Object") {

    /* 1. Setup Default Return Values ===== */
    let isValid = true;
    let responseMessage = `${objectName} contains all expected properties.`;

    /* 2. Check that object doesn't contain more properties than expected ===== */
    const objectLength = object.length;
    const expectedPropertiesLength = expectedProperties.length;

    if (objectLength > expectedPropertiesLength) {

        isValid = false;
        responseMessage = `${objectName} contains too many properties.`;

        return [isValid, responseMessage];

    }

    /* 3. Check that object contains expected properties ===== */
    for (let i = 0; i < expectedProperties.length; i++) {

        const property = expectedProperties[i];

        isValid = object.hasOwnProperty(property);

        if (!isValid) {

            responseMessage = `${objectName} does not contain expected property "${property}".`;
            
            return [isValid, responseMessage];

        }

    }

    /* 4. Return Success Data ===== */
    return [isValid, responseMessage];

}
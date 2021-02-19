/* Helper =========================================================================================================================================== */
/* Functions ===== */
/* Disable Element ==================================================================================================================================
Description: Disables the Element in the DOM. */
export function disableElement(elementSelector) {

    document.querySelector(elementSelector).disabled = true;

}

/* Var To String ====================================================================================================================================
Description: Returns the variable name as a string. */
export function varToString(varObj) {

    return Object.keys(varObj)[0];

}

/* Get Key By Value =================================================================================================================================
Description: Does as the name says, and returns the key of a value in an object */
export function getKeyByValue(object, value) {

    return Object.keys(object).find(key => object[key] === value);

}

/* Get Object Length ================================================================================================================================
Description: Takes an object and returns its length */
export function getObjectLength(object) {

    return Object.keys(object).length;

}

/* Capitalize Each Word (Including Hyphenated Words) ================================================================================================ */
export function capitalizeEachWord(stringInput) {

    let returnString = stringInput.replace(/(^\w{1})|([\s-]+\w{1})/g, letter => letter.toUpperCase());

    return returnString;

}

/* Copy By Value ==================================================================================================================================== */
export function copyByValue(object) {

    /* 1. Return object if it is a pass-by-value data type ===== */
    if (typeof object !== "object" || object === null) {

        return object;
  
    }

    /* 2. Set the new Object to either Array or Object based on the type of the input object */
    const newObject = (Array.isArray(object)) ? [] : {};

    /* 3. Loop through the input object and copy the keys and values to the new object ===== */
    for (const key in object) {
        
        // Get the value associated with the key in the original object
        const value = object[key];

        // Recursively call this function on the value associated with the key from the original object, to either
        // return the original value (if it is pass-by-value) or a new object of the same type as the original value,
        // containing the same content, but copied.
        const copiedValue = copyByValue(value);
        // Set the copied value as the value associated with the same key in the new object
        newObject[key] = copiedValue;
    }

    /* 4. Return the new object ===== */
    return newObject;

}

/* Remove Hyphens ===== */
export function removeHyphens(stringInput) {

    let returnString = stringInput.replace(/-/g, " ");
    
    return returnString;

}

/* Old If Same / New If Different ========================================================================================================== */
export function oldIfSameNewIfDifferent(oldString, newString) {

    return (newString.trim().toLowerCase() == oldString.trim().toLowerCase()) ? oldString : newString;

}
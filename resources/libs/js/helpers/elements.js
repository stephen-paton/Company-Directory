/* Elements ========================================================================================================================================= */
/* Imports ===== */
import * as debug from "./debug.js";
/* Functions ===== */
/* Fragment =========================================================================================================================================
Description: Makes a Document Fragment. */
export function fragment() {

    return document.createDocumentFragment();

}

/* Heading ========================================================================================================================================== */
export function heading(headingType = 2, textValue = "", classValue = "", idValue = "") {

    const functionName = "elements.heading()";

    /* 1. Validate Inputs ===== */
    // Validate headingType
    if (!(Number.isInteger(headingType) && ((headingType >= 1) && (headingType <=6)))) {

        debug.log(`${functionName}: headingType must be an integer value, between 1 and 6 (inclusive).`)
        return;

    }

    // Validate textValue
    if (typeof(textValue) !== "string") {

        debug.log(`${functionName}: headingType must be an integer.`)
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log(`${functionName}: classValue must be a string.`)
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log(`${functionName}: idValue must be a string.`)
        return;

    }

    /* 2. Create Heading Element ===== */
    const headingElement = document.createElement(`h${headingType}`);

    /* 3. Add ID and Class to Paragraph Element ===== */
    if (idValue !== "") {

        headingElement.id = idValue;

    }

    if (classValue !== "") {

        headingElement.className = classValue;

    }

    /* 4. Populate Heading Element ===== */
    const textNodeElement = document.createTextNode(textValue);
        headingElement.appendChild(textNodeElement);

    /* 5. Return Heading Element ===== */
    return headingElement;


}

/* Table ============================================================================================================================================
Description: Makes a Table Element. */
export function table(tableObject = {}, classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate tableObject
    if (typeof(tableObject) !== "object") {

        debug.log("elements.table(): tableObject must be an object.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.table(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.table(): idValue must be a string.")
        return;

    }

    /* 2. Create Table Element ===== */
    const tableElement = document.createElement("table");


    /* 3. Add ID and Class to Element ===== */
    if (idValue !== "") {

        tableElement.id = idValue;

    }

    if (classValue !== "") {

        tableElement.className = classValue;

    }

    /* 4. Determine Maximum Column Span ===== */
    const tableObjectKeys = Object.keys(tableObject);

    let maxColSpan = 1;

    tableObjectKeys.forEach(key => {

        const tableSectionArray = tableObject[key];

        tableSectionArray.forEach(tableRowArray => {

            const tableRowSpan = tableRowArray.length;

            if (tableRowSpan > maxColSpan) {

                maxColSpan = tableRowSpan;

            }

        });

    });

    /* 5. Create and Populate Table Head Element ===== */
    if (tableObjectKeys.includes("tableHead")) {

        const tableHeadElement = document.createElement("thead");

        const tableHeadArray = tableObject["tableHead"];
        
        tableHeadArray.forEach((tableRowArray, i) => {

            const tableRowElement = document.createElement("tr");
            tableRowElement.className = `row${i+1}`;

            const numberOfTableCellElements = tableRowArray.length;
            const colSpan = Math.floor(maxColSpan / numberOfTableCellElements);
            const remainder = maxColSpan - (colSpan * numberOfTableCellElements);

            tableRowArray.forEach((tableHeaderCellInnerElement, j) => {

                const tableHeaderCellElement = document.createElement("th");
                tableHeaderCellElement.appendChild(tableHeaderCellInnerElement);
                tableHeaderCellElement.className = `col${j+1}`;
                tableHeaderCellElement.colSpan = (j = 0) ? colSpan + remainder : colSpan;

                tableRowElement.appendChild(tableHeaderCellElement);

            });

            tableHeadElement.appendChild(tableRowElement);

        });

        tableElement.appendChild(tableHeadElement);

    }

    /* 6. Create and Populate Table Body Element ===== */
    if (tableObjectKeys.includes("tableBody")) {

        const tableBodyElement = document.createElement("tbody");

        const tableBodyArray = tableObject["tableBody"];
        
        tableBodyArray.forEach((tableRowArray, i) => {

            const tableRowElement = document.createElement("tr");
            tableRowElement.className = `row${i+1}`;

            const numberOfTableCellElements = tableRowArray.length;
            const colSpan = Math.floor(maxColSpan / numberOfTableCellElements);
            const remainder = maxColSpan - (colSpan * numberOfTableCellElements);

            tableRowArray.forEach((tableCellInnerElement, j) => {

                const tableCellElement = document.createElement("td");
                tableCellElement.appendChild(tableCellInnerElement);
                tableCellElement.className = `col${j+1}`;
                tableCellElement.colSpan = (j = 0) ? colSpan + remainder : colSpan;

                tableRowElement.appendChild(tableCellElement);

            });

            tableBodyElement.appendChild(tableRowElement);

        });

        tableElement.appendChild(tableBodyElement);

    }

    /* 7. Create and Populate Table Foot Element ===== */
    if (tableObjectKeys.includes("tableFoot")) {

        const tableFootElement = document.createElement("tfoot");

        const tableFootArray = tableObject["tableFoot"];
        
        tableFootArray.forEach((tableRowArray, i) => {

            const tableRowElement = document.createElement("tr");
            tableRowElement.className = `row${i+1}`;

            const numberOfTableCellElements = tableRowArray.length;
            const colSpan = Math.floor(maxColSpan / numberOfTableCellElements);
            const remainder = maxColSpan - (colSpan * numberOfTableCellElements);

            tableRowArray.forEach((tableCellInnerElement, j) => {

                const tableCellElement = document.createElement("td");
                tableCellElement.appendChild(tableCellInnerElement);
                tableCellElement.className = `col${j+1}`;
                tableCellElement.colSpan = (j = 0) ? colSpan + remainder : colSpan;

                tableRowElement.appendChild(tableCellElement);

            });

            tableFootElement.appendChild(tableRowElement);

        });

        tableElement.appendChild(tableFootElement);

    }

    /* 8. Return Table Element ===== */
    return tableElement;

}

/* Flex Table ===== */
export function flexTable(tableObject = {}, classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate tableObject
    if (typeof(tableObject) !== "object") {

        debug.log("elements.flexTable(): tableObject must be an object.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.flexTable(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.flexTable(): idValue must be a string.")
        return;

    }

    /* 2. Create Table Element ===== */
    const tableElement = document.createElement("div");
    tableElement.className = "flex-table"


    /* 3. Add ID and Class to Element ===== */
    if (idValue !== "") {

        tableElement.id = idValue;

    }

    if (classValue !== "") {

        tableElement.classList.add(classValue);

    }

    /* 4. Create and Populate Table Head Element ===== */
    const tableObjectKeys = Object.keys(tableObject);

    if (tableObjectKeys.includes("tableHead")) {

        const tableHeadElement = document.createElement("div");
        tableHeadElement.className = "flex-thead";

        const tableHeadArray = tableObject["tableHead"];
        
        tableHeadArray.forEach((tableRowArray, i) => {

            const tableRowElement = document.createElement("div");
            tableRowElement.className = `flex-tr row${i+1}`;

            tableRowArray.forEach((tableHeaderCellInnerElement, j) => {

                const tableHeaderCellElement = document.createElement("div");
                tableHeaderCellElement.className = `flex-th col${j+1}`;
                tableHeaderCellElement.appendChild(tableHeaderCellInnerElement);

                tableRowElement.appendChild(tableHeaderCellElement);

            });

            tableHeadElement.appendChild(tableRowElement);

        });

        tableElement.appendChild(tableHeadElement);

    }

    /* 5. Create and Populate Table Body Element ===== */
    if (tableObjectKeys.includes("tableBody")) {

        const tableBodyElement = document.createElement("div");
        tableBodyElement.className = "flex-tbody";

        const tableBodyArray = tableObject["tableBody"];
        
        tableBodyArray.forEach((tableRowArray, i) => {

            const tableRowElement = document.createElement("div");
            tableRowElement.className = `flex-tr row${i+1}`;

            tableRowArray.forEach((tableCellInnerElement, j) => {

                const tableCellElement = document.createElement("div");
                tableCellElement.className = `flex-td col${j+1}`;
                tableCellElement.appendChild(tableCellInnerElement);

                tableRowElement.appendChild(tableCellElement);

            });

            tableBodyElement.appendChild(tableRowElement);

        });

        tableElement.appendChild(tableBodyElement);

    }

    /* 6. Create and Populate Table Foot Element ===== */
    if (tableObjectKeys.includes("tableFoot")) {

        const tableFootElement = document.createElement("div");
        tableFootElement.className = "flex-tfoot";

        const tableFootArray = tableObject["tableFoot"];
        
        tableFootArray.forEach((tableRowArray, i) => {

            const tableRowElement = document.createElement("div");
            tableRowElement.className = `flex-tr row${i+1}`;

            tableRowArray.forEach((tableCellInnerElement, j) => {

                const tableCellElement = document.createElement("div");
                tableCellElement.className = `flex-td col${j+1}`;
                tableCellElement.appendChild(tableCellInnerElement);

                tableRowElement.appendChild(tableCellElement);

            });

            tableFootElement.appendChild(tableRowElement);

        });

        tableElement.appendChild(tableFootElement);

    }

    /* 7. Return Table Element ===== */
    return tableElement;

}

/* Text =============================================================================================================================================
Description: Makes a TextNode Element. */
export function text(textValue = "") {

    /* 1. Validate Input ===== */
    // Validate textValue
    if (typeof(textValue) !== "string") {

        debug.log("elements.text(): textValue must be a string.")
        return;

    }

    /* 2. Create Text Element ===== */
    const textElement = document.createTextNode(textValue);

    /* 3. Return Text Element ===== */
    return textElement;

}

/* Paragraph =========================================================================================================================================== 
Description: Makes a Paragraph Element. */
export function paragraph(textValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate textValue
    if (typeof(textValue) !== "string") {

        debug.log("elements.paragraph(): textValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.paragraph(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.paragraph(): idValue must be a string.")
        return;

    }

    /* 2. Create Paragraph Element ===== */
    const paragraphElement = document.createElement("p");

    /* 3. Add ID and Class to Paragraph Element ===== */
    if (idValue !== "") {

        paragraphElement.id = idValue;

    }

    if (classValue !== "") {

        paragraphElement.className = classValue;

    }

    /* 4. Populate Paragraph Element ===== */
    const textNodeElement = document.createTextNode(textValue);
        paragraphElement.appendChild(textNodeElement);

    /* 5. Return Paragraph Element ===== */
    return paragraphElement;

}

/* Image =========================================================================================================================================== 
Description: Makes an Image Element. */
export function image(srcValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate srcValue
    if (typeof(srcValue) !== "string") {

        debug.log("elements.image(): srcValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.image(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.image(): idValue must be a string.")
        return;

    }
    
    /* 2. Create Image Element ===== */
    const imageElement = document.createElement("img");
    imageElement.src = srcValue;

    /* 3. Add ID and Class to Image Element ===== */
    if (idValue !== "") {

        imageElement.id = idValue;

    }

    if (classValue !== "") {

        imageElement.className = classValue;

    }

    /* 4. Return Image Element ===== */
    return imageElement;

}

/* Div =========================================================================================================================================== 
Description: Makes a Div Element. */
export function div(classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.div(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.div(): idValue must be a string.")
        return;

    }

    /* 2. Create Div Element ===== */
    const divElement = document.createElement("div");

    /* 3. Add ID and Class to Div Element ===== */
    if (idValue !== "") {

        divElement.id = idValue;

    }

    if (classValue !== "") {

        divElement.className = classValue;

    }

    /* 4. Return Div Element ===== */
    return divElement;

}

/* Text Button =========================================================================================================================================== 
Description: Makes a Text Button Element. */
export function textButton(textValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate textValue
    if (typeof(textValue) !== "string") {

        debug.log("elements.textButton(): textValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.textButton(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.textButton(): idValue must be a string.")
        return;

    }

    /* 2. Create Button Element ===== */
    const buttonElement = document.createElement("button");
    buttonElement.type = "button";

    /* 3. Add ID and Class to Button Element ===== */
    if (idValue !== "") {

        buttonElement.id = idValue;

    }

    if (classValue !== "") {

        buttonElement.className = classValue;

    }

    /* 4. Populate Button Element ===== */
    const textNodeElement = document.createTextNode(textValue);
    buttonElement.appendChild(textNodeElement);

    /* 5. Return Button Element ===== */
    return buttonElement;

}

/* Image Button =========================================================================================================================================== 
Description: Makes an Image Button Element. */
export function imageButton(srcValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate srcValue
    if (typeof(srcValue) !== "string") {

        debug.log("elements.imageButton(): srcValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.imageButton(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.imageButton(): idValue must be a string.")
        return;

    }

    /* 2. Create Button Element ===== */
    const buttonElement = document.createElement("button");
    buttonElement.type = "button";

    /* 3. Add ID and Class to Button Element ===== */
    // 
    if (idValue !== "") {

        buttonElement.id = idValue;

    }

    if (classValue !== "") {

        buttonElement.className = classValue;

    }

    /* 4. Create Inner Image Element ===== */
    const imageElement = image(srcValue);

    /* 5. Populate Button Element ===== */
    buttonElement.appendChild(imageElement);

    /* 4. Return Button Element ===== */
    return buttonElement;

}

/* Select Options ==========================================================================================================================================
Description: Makes a document fragment containing a list of options that can be inserted into a select element */
export function selectOptions(optionsValues = [], optionsDisplays = [], defaultValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate optionsValues
    if (!Array.isArray(optionsValues)) {

        debug.log("elements.selectOptions(): optionsValues must be an array.")
        return;

    }

    // Validate optionsDisplays
    if (!Array.isArray(optionsDisplays)) {

        debug.log("elements.selectOptions(): optionsDisplays must be an array.")
        return;

    }

    // Validate defaultOption
    if (typeof(defaultValue) !== "string") {

        debug.log("elements.selectOptions(): defaultValue must be a string.")
        return;

    }

    /* 2. Create Select Options Fragment ===== */
    const selectOptionsFragment = fragment();

    /* 3. Setup Options ===== */
    /* 3.1. Sort Options A-Z ===== */
    // Create a list of options indexes
    const optionsIndex = optionsValues.map((x, i) => i);

    // Sort optionsIndex list by optionsDisplays list sorted A-Z
    optionsIndex.sort((a, b) => optionsDisplays[a].localeCompare(optionsDisplays[b]));

    // Sort optionsValues and optionsDisplays list by indexes of sorted optionsIndex list
    optionsValues = optionsIndex.map(x => optionsValues[x]);
    optionsDisplays = optionsIndex.map(x => optionsDisplays[x]);

    /* 4. Create Option Elements and append to Select Options Fragment ===== */
    optionsValues.forEach((optionValue, i) => {

        // Setup option element
        const optionElement = document.createElement("option");
        optionElement.value = optionValue;
        optionElement.innerHTML = optionsDisplays[i];

        // Make default option selected 
        if (optionValue == defaultValue) {

            optionElement.className = "default";
            optionElement.selected = true;
        
        }

        // Append option element to select element
        selectOptionsFragment.appendChild(optionElement);

    });

    /* 5. Return Select Options Fragment =====*/
    return selectOptionsFragment;

}

/* Select =========================================================================================================================================== 
Description: Makes a Select Element. */
export function select(optionsValues = [], optionsDisplays = [], defaultValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate optionsValues
    if (!Array.isArray(optionsValues)) {

        debug.log("elements.select(): optionsValues must be an array.")
        return;

    }

    // Validate optionsDisplays
    if (!Array.isArray(optionsDisplays)) {

        debug.log("elements.select(): optionsDisplays must be an array.")
        return;

    }

    // Validate defaultOption
    if (typeof(defaultValue) !== "string") {

        debug.log("elements.select(): defaultValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.select(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.select(): idValue must be a string.")
        return;

    }

    /* 2. Create Select Element ===== */
    const selectElement = document.createElement("select");

    /* 3. Add ID and Class to Select Element ===== */
    if (idValue !== "") {

        selectElement.id = idValue;

    }

    if (classValue !== "") {

        selectElement.className = classValue;

    }
    
    /* 4. Setup Options ===== */
    const selectOptionsElement = selectOptions(optionsValues, optionsDisplays, defaultValue);

    /* 5. Populate Select Element ===== */
    selectElement.appendChild(selectOptionsElement);

    /* 6. Return Select Element ===== */
    return selectElement;

}

/* Datalist Options =================================================================================================================================
Description: Makes a Document Fragment of Options Element that can be inserted into a Datalist Element. */
export function datalistOptions(optionsValues = []) {

    /* 1. Validate Inputs ===== */
    // Validate optionsValues
    if (!Array.isArray(optionsValues)) {

        debug.log("elements.datalistOptions(): optionsValues must be an array.")
        return;

    }

    /* 2. Create Datalist Options Fragment ===== */
    const datalistOptionsFragment = document.createDocumentFragment();

    /* 3. Setup Options ===== */
    /* 3.2.1 Sort Options A-Z ===== */
    optionsValues.sort();

    /* 4. Create Option Elements and append to Datalist Options Fragment ===== */
    optionsValues.forEach(optionValue => {

        // Setup Option Element
        const optionElement = document.createElement("option");
        optionElement.value = optionValue;

        // Append Option Element to Datalist Options Fragment
        datalistOptionsFragment.appendChild(optionElement);

    });

    /* 5. Return Datalist Options Fragment ===== */
    return datalistOptionsFragment;

}

/* Datalist =========================================================================================================================================== 
Description: Makes a Datalist Element. */
export function datalist(optionsValues = [], classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate optionsValues
    if (!Array.isArray(optionsValues)) {

        debug.log("elements.datalist(): optionsValues must be an array.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.datalist(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.datalist(): idValue must be a string.")
        return;

    }

    /* 2. Create Datalist Element ===== */
    const datalistElement = document.createElement("datalist");

    /* 3. Add ID and Class to Datalist Element ===== */
    if (idValue !== "") {

        datalistElement.id = idValue;

    }

    if (classValue !== "") {

        datalistElement.className = classValue;

    }

    /* 4. Setup Options ===== */
    const datalistOptionsElement = datalistOptions(optionsValues);
    
    /* 5. Populate Datalist Element ===== */
    datalistElement.appendChild(datalistOptionsElement);

    /* 6. Return Datalist Element ===== */
    return datalistElement;

}

/* Label =========================================================================================================================================== 
Description: Makes a Label Element. */
export function label(forValue = "", textValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate forValue
    if (typeof(forValue) !== "string") {

        debug.log("elements.label(): forValue must be a string.")
        return;

    }

    // Validate textValue
    if (typeof(textValue) !== "string") {

        debug.log("elements.label(): textValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.label(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.label(): idValue must be a string.")
        return;

    }

    /* 2. Create Label Element ===== */
    const labelElement = document.createElement("label");
    labelElement.htmlFor = forValue;

    /* 3. Add ID and Class to Label Element ===== */
    if (idValue !== "") {

        labelElement.id = idValue;

    }

    if (classValue !== "") {

        labelElement.className = classValue;

    }

    /* 4. Populate Label Element ===== */
    const textNodeElement = document.createTextNode(textValue);
    labelElement.appendChild(textNodeElement);

    /* 5. Return Label Element ===== */
    return labelElement;

}

/* Text Input =========================================================================================================================================== 
Description: Makes a Text Input Element. */
export function textInput(placeholderValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate placeholderValue
    if (typeof(placeholderValue) !== "string") {

        debug.log("elements.textInput(): placeholderValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.textInput(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.textInput(): idValue must be a string.")
        return;

    }

    /* 2. Create textInput Element ===== */
    const textInputElement = document.createElement("input");
    textInputElement.type = "text";
    textInputElement.placeholder = placeholderValue;

    /* 3. Add ID and Class to textInput Element ===== */
    if (idValue !== "") {

        textInputElement.id = idValue;

    }

    if (classValue !== "") {

        textInputElement.className = classValue;

    }

    /* 4. Return textInput Element ===== */
    return textInputElement;

}

/* List Item ========================================================================================================================================
Description: Creates a List Item Element. */
export function listItem(textValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate textValue
    if (typeof(textValue) !== "string") {

        debug.log("elements.listItem(): textValue must be a string.")
        return;

    }

    /* 2. Create List Item Element ===== */
    const listItemElement = document.createElement("li");
    
    /* 3. Populate List Item Element ===== */
    if (!(textValue == "")) {

        const textNodeElement = document.createTextNode(textValue);
        listItemElement.appendChild(textNodeElement);
    
    }

    /* 4. Return List Item Element ===== */
    return listItemElement;

}

/* Span =============================================================================================================================================
Description: Creates a Span Element. */
export function span(textValue = "", classValue = "", idValue = "") {

    /* 1. Validate Inputs ===== */
    // Validate textValue
    if (typeof(textValue) !== "string") {

        debug.log("elements.span(): textValue must be a string.")
        return;

    }

    // Validate classValue
    if (typeof(classValue) !== "string") {

        debug.log("elements.span(): classValue must be a string.")
        return;

    }

    // Validate idValue
    if (typeof(idValue) !== "string") {

        debug.log("elements.span(): idValue must be a string.")
        return;

    }

    /* 2. Create Span Element =====*/
    const spanElement = document.createElement("span");

    /* 3. Add ID and Class to textInput Element ===== */
    if (idValue !== "") {

        spanElement.id = idValue;

    }

    if (classValue !== "") {

        spanElement.className = classValue;

    }

    /* 4. Populate Span element ===== */
    const textNodeElement = document.createTextNode(textValue);
    spanElement.appendChild(textNodeElement);

    /* 5. Return Span Element ===== */
    return spanElement;

}

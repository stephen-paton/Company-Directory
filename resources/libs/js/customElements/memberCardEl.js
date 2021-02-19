/* Member Card Element ====================================================================================================================================== */
/* Element Structure =====

    <div class="member-card" id="${domID}">
        <div class="member-card-header">
            <p><span class="first-name">${firstName}</span> <span class="surname">${surname}</span></p>
            <div class="button-container">
                <button type="button" class="edit-button">
                    <img src="/resources/images/icons/edit.png">
                </button>
                <button type="button" class="delete-button">
                    <img src="/resources/images/icons/delete.png">
                </button>
            </div>
        </div>
        <div class="member-info-container">
            <div class="member-info">
                <p>Department:</p>
                <p class="department">${department}</p>
            </div>
            <div class="member-info">
                <p>Location:</p>
                <p class="location">${location}</p>
            </div>
            <div class="member-info">
                <p>Email:</p>
                <p class="email">${email}</p>
            </div>
        </div>
    </div>

*/

/* Imports ===== */
// Helpers
import * as helper from '../helpers/helper.js';
import * as elements from '../helpers/elements.js';
//Custom Elements
import editDeleteButtonsEl from './editDeleteButtonsEl.js';

/* Functions ===== */
/* Make Card ========================================================================================================================================
Description: Makes and returns a member card as a string */
export default function makeCard(member) {

    /* 1. Setup ===== */
    const firstName = member['firstName'];
    const surname = member['surname'];
    const domID = member['domID'];
    // Make Member Card Element
    const memberCardElement = elements.div("member-card", domID);

    /* 2. Setup Inner Elements ===== */
    /* 2.1 Setup Member Card Header Element ===== */
    const memberCardHeaderElement = elements.div("member-card-header");
    /* 2.1.1 Setup Member Card Header Element Inner Elements ===== */
    /* 2.1.1.1 Setup Name Paragraph Element ===== */
    const nameParagraphElement = elements.paragraph();
    // Setup First Name Span Element
    const firstNameSpanElement = elements.span(firstName, "first-name member-display-text");
    // Setup Space TextElement
    const spaceTextElement = elements.text(" ");
    // Setup Surname Span Element
    const surnameSpanElement = elements.span(surname, "surname member-display-text");
    /* 2.1.1.2 Populate Name Paragraph Element ===== */
    nameParagraphElement.appendChild(firstNameSpanElement);
    nameParagraphElement.appendChild(spaceTextElement);
    nameParagraphElement.appendChild(surnameSpanElement);
    /* 2.1.1.3 Setup Edit/Delete Buttons Element ===== */
    const editDeleteButtonsElement = editDeleteButtonsEl();
    /* 2.2 Populate Member Card Header Element ===== */
    memberCardHeaderElement.appendChild(nameParagraphElement);
    memberCardHeaderElement.appendChild(editDeleteButtonsElement);
    /* 2.3 Setup Member Info Container Element ===== */
    const memberInfoContainerElement = elements.div("member-info-container");
    /* 2.3.1 Setup Member Info Container Element Inner Elements and Add to Member Info Container Element ===== */
    const memberKeys = ["department", "location", "email"];

    memberKeys.forEach(key => {

        /* 2.3.1.1 Setup Member Info Element ===== */
        const memberInfoElement = elements.div("member-info");
        /*2.3.1.1.1 Setup Member Info Element Inner Elements ===== */
        // Setup Paragraph Element
        const headerParagraphElement = elements.paragraph(helper.capitalizeEachWord(key));
        // Setup Member Input Element
        const memberParagraphElement = elements.paragraph(member[key], `${key} member-display-text`);
        /* 2.3.1.2 Populate Member Info Element ===== */
        memberInfoElement.appendChild(headerParagraphElement);
        memberInfoElement.appendChild(memberParagraphElement);

        // Populate Member Info Container Element
        memberInfoContainerElement.appendChild(memberInfoElement);

    });

    /* 3. Populate Member Card Element ===== */
    memberCardElement.appendChild(memberCardHeaderElement);
    memberCardElement.appendChild(memberInfoContainerElement);

    /* 4. Return Member Card Element ===== */
    return memberCardElement;

}
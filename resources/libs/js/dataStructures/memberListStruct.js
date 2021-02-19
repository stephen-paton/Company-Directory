/* Member List Struct ====================================================================================================================================== */
/* Imports ===== */
// Data Structures
import memberStruct from './memberStruct.js';
// Helpers
import * as debug from '../helpers/debug.js';

/* Functions ===== */
/* Create Member List =============================================================================================================================== 
Description: Creates Member List from sqlReturnObject */
export function createMemberList(searchResults) {

    const memberList = [];

    searchResults.forEach((memberData, i) => {

        const firstName = memberData['firstName'];
        const surname = memberData['lastName'];
        const location = memberData['location'];
        const department = memberData['department'];
        const email = memberData['email'];
        const personnelId = memberData['personnelID'];
        const domId = `member${i}`;


        memberList.push(memberStruct(firstName, surname, location, department, email, personnelId, domId));

    });

    return memberList;

}

export function sort(list, sortContent = "surname", sortOrder = "a-z") {

    /* Helper Functions ===== */
    /* Sort A to Z ===== */
    function sortAToZ(list, sortContent = "surname") {

        switch (sortContent) {
    
            case 'first-name':
                sortContent = "firstName";
                list.sort((a,b) => a['firstName'].localeCompare(b['firstName']));
                break;
            case "surname":
                list.sort((a,b) => a['surname'].localeCompare(b['surname']));
                break;
            case "location":
                list.sort((a,b) => a['location'].localeCompare(b['location']));
                break;
            case "department":
                list.sort((a,b) => a['department'].localeCompare(b['department']));
                break;
            case "email":
                list.sort((a,b) => a['email'].localeCompare(b['email']));
                break;
    
        }
    
        return list;
    
    }
    
    /* Sort Z to A ===== */
    function sortZToA(list, sortContent = "surname") {
    
        switch (sortContent) {
    
            case 'first-name':
                list.sort((a,b) => b['firstName'].localeCompare(a['firstName']));
                break;
            case "surname":
                list.sort((a,b) => b['surname'].localeCompare(a['surname']));
                break;
            case "location":
                list.sort((a,b) => b['location'].localeCompare(a['location']));
                break;
            case "department":
                list.sort((a,b) => b['department'].localeCompare(a['department']));
                break;
            case "email":
                list.sort((a,b) => b['email'].localeCompare(a['email']));
                break;
    
        }
    
        return list;
    
    }

    /* Main Function ===== */
    let sortedList;

    switch (sortOrder) {

        case "a-z":
            sortedList = sortAToZ(list, sortContent);
            break;
        case "z-a":
            sortedList = sortZToA(list, sortContent);
            break;
        default:
            debug.log('memberList.sort: Invalid sortOrder specified');
            return false;

    }

    return sortedList

}
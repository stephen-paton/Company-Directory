/* Member Struct =========================================================================================================================================== */
/* Functions ===== */
/* Create Member ====================================================================================================================================
Description: Creates a member data struct, used by the memberList data struct. */
export default function createMember (firstName, surname, location, department, email, personnelID, domID) {

    const member = {
        firstName: firstName,
        surname: surname,
        location: location,
        department: department,
        email: email,
        personnelID: personnelID,
        domID: domID
    }

    Object.freeze(member);

    return member;

}
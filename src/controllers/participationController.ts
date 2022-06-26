export function checkIfListsNotEmpty(requestsLength:number,acceptedParticipantsLength:number){
    let requestsListExists = false;
    let acceptedParticipantsExists = false;
    if (requestsLength !== 0) {
        requestsListExists = true 
    }
    if (acceptedParticipantsLength !== 0) {
        acceptedParticipantsExists = true
    }
    return {rqListNotEmpty: requestsListExists,apLNotEmpty: acceptedParticipantsExists}
}


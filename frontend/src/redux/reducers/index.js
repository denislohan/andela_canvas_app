let initial_state = {submissions:[]}
export default (state = initial_state,action) => {
    console.log('state ', state)
    if (action.type === 'STORE_SUBMISSIONS')
     return {
         ...state,
         submissions:action.submissions

     }
     else if (action.type === 'UPDATE_SUBMISSIONS'){
         console.log('action type', action.type)
         return {
             ...state,
             submissions:state.submissions.slice(1,state.submissions.length)
         }
     }

     else 
        return state

}
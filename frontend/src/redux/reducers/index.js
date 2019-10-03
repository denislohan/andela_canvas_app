let initial_state = {submissions:[],sections:[],sectionUsers:[]}
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

     else if (action.type === 'START_FETCH'){
         console.log('START_FETCH_SECTIONS')
         return state
      
     }
     else if (action.type === 'END_FETCH'){
        console.log('END_FETCH ',action.data)
        switch (action.data_type){
            case 'sections': 
                return {
                    ...state,
                    sections:action.data
                }     
            case 'usersBySections':
                    return {
                        ...state,
                        sectionUsers:action.data
                    }   

            default : return state
        }
    }
    else if (action.type === 'ERROR'){
        console.log('ERROR FETCHING SECTIONS', action.err)
        return state
    }

     else 
        return state

}
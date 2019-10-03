import axios from 'axios'

const popSubmissions = () =>{
    console.log('invoked')
    return { type: "UPDATE_SUBMISSIONS"}
}
const storeSubmissions = (submissions) =>{
    console.log('invoked')
    return { type: "STORE_SUBMISSIONS",submissions}
}
 const startFetch = ()=>{
     console.log('started')
    return  { type: "START_FETCH",data_type:'sections'}
}
 
 const endFetch = (data,fetchType)=>(
    { type: "END_FETCH",data_type:fetchType,data}

 )
 const displayError = (err)=>(
    { type: "ERROR",err}

 )


const fetchSections = (course) => {
    return async (dispatch)=> {
        dispatch(startFetch())                
        return await axios.get(`http://localhost:4001/engineers/sections/${course}`)
            .then((sections)=> {
                dispatch(endFetch(sections,'sections'))                
            })
            .catch((err)=>{
                dispatch (displayError(err))
            })
    }
}

const getUsersBySection = (section) =>{
    console.log('fetching section', section)

 return  async (dispatch)=> {
    console.log('started')

        dispatch(startFetch())                
        return await axios.get(`http://localhost:4001/engineers/sections/${section}/enrollments`)
            .then((sections)=> {
                dispatch(endFetch(sections,'usersBySections'))                
            })
            .catch((err)=>{
                dispatch (displayError(err))
            })
    }
}

export default {
    popSubmissions,
    storeSubmissions,
    fetchSections,
    getUsersBySection
}
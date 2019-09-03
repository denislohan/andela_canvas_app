const popSubmissions = () =>{
    console.log('invoked')
    return { type: "UPDATE_SUBMISSIONS"}
}
const storeSubmissions = (submissions) =>{
    console.log('invoked')
    return { type: "STORE_SUBMISSIONS",submissions}
}

export default {
    popSubmissions,
    storeSubmissions
}

  
 const initialState = {
    FellowsList:{
    }
  }
  
  


 function reducer(state=initialState, action) {
    switch(action.type){

      case 'UPDATEFELLOWS' : state.FellowsList= action.item
      case 'STORECONTEXT' : state.context = action.context

    }
    console.log('reducer', state);

    return state;
  }

  export default reducer
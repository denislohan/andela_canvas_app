
  
 const initialState = {
    FellowsList:{
    }
  }
  
  


 function reducer(state=initialState, action) {
    switch(action.type){

      case 'UPDATEFELLOWS' : state.FellowsList= action.item

    }
    console.log('reducer', state);

    return state;
  }

  export default reducer
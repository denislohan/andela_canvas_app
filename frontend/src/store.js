

import { createStore } from 'redux';
import reducer from './reducers'
const store = createStore(reducer);


class Store{
  constructor(){
    this.store = store;
  }

  hasActiveUsers(){
    return this.store.getState().FellowsList.length > 0
  }

  getStore = () =>{
    return this.store
  }

  findFellow(fellowId){
    const data = this.store.getState().FellowsList
    for(var index in data)
      {
        if(data[index].id == fellowId)
          return data[index]
      }



      return null;
  }

}

  export default Store

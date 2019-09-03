import React from 'react'
import ReactDOM from 'react-dom'
import Store from '../store'

const storeObject = new Store(),
      store = storeObject.getStore()

const createEngeneersList = (e,context) =>{

    const id = e.target.parentNode.getAttribute('id'),
      fellow= storeObject.findFellow(id) ;

      if(!context.state.currentFellow[fellow.id]){

        context.state.currentFellow[fellow.id]=fellow;
        //console.log(context.state.currentFellow)
        context.fetchFellow(id,context.state.course,fellow.name)
        const fellowSecData= React.createElement('span',{id:'email'},
            [
                React.createElement('p',{},'Email:'+ fellow.email),
                React.createElement('p',{},'Course:'+ fellow.courseId),
            ]
      
      )

        ReactDOM.render(
          fellowSecData,
          document.getElementById(fellow.email) 
        )
      }

    else{
      ReactDOM.unmountComponentAtNode(document.getElementById('tableData'))
      ReactDOM.unmountComponentAtNode(document.getElementById('scoreCard'))

      ReactDOM.unmountComponentAtNode(document.getElementById(context.state.currentFellow[fellow.id].email))
        context.state.currentFellow[fellow.id] = null
    }

}

export default createEngeneersList
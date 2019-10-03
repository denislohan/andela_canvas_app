import React from 'react'
import ReactDOM from 'react-dom'
import Store from '../store'

const storeObject = new Store(),
      store = storeObject.getStore()
const createEngineersList = (e,context) =>{

    const id = e.target.parentNode.getAttribute('id'),
    fellow= storeObject.findFellow(id) ;


      if(!context.state.currentFellow[fellow.id]){

        context.state.currentFellow[fellow.id]=fellow;
        //console.log(context.state.currentFellow)
        context.fetchFellow(id,context.state.course,fellow.name)
        const fellowSecData= React.createElement('span',{id:'email'},
            [
                React.createElement('p',{},'Email:'+ fellow.email),
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
      ReactDOM.unmountComponentAtNode(document.getElementById('scoreCard2'))
      ReactDOM.unmountComponentAtNode(document.getElementById('scoreCard3'))
      ReactDOM.unmountComponentAtNode(document.getElementById('scoreCard4'))


      ReactDOM.unmountComponentAtNode(document.getElementById(context.state.currentFellow[fellow.id].email))
        context.state.currentFellow[fellow.id] = null
    }

}
const updateFellowlist = (fellows,data,getEngList) => {
  renderFellowlist(fellows,data,getEngList)
}
const renderFellowlist=(fellows,data,getEngList)=>{
  console.log("function =>",getEngList)
  var list = []
  // a react  element 'div' to handle fellow's list
  var fellowsDiv= React.createElement('div',{className:'fellows_C'},list)

  for (var index in fellows){
    fellows[index].courseId= data.courseId;

   list.push(React.createElement('div', 
    {
      key:fellows[index].id,
      className:'tray', 
      id :fellows[index].id,
      style:{width:'60%', backgroundColor:'#9aa041',display:'block',borderStyle: 'outset'},

    },
  [
      React.createElement('div',{className:'Header-end',style:{width:'97%', height:'30px'},
    onClick:getEngList
    },fellows[index].name),
     
      React.createElement('div',{
        key:fellows[index].email,
        id:fellows[index].email
      },

      )
  ]
    )
   )
        
  }
  ReactDOM.render( 
    fellowsDiv,  
    document.getElementById("fellows") 
  ) 
}

export {createEngineersList,renderFellowlist,updateFellowlist}
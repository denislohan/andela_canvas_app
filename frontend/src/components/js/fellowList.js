import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import React from 'react'
import Static_Store from '../../store' 
import ArrayList from 'arr_list'
import {renderFellowlist,updateFellowlist} from '../../helpers/functions'

// getting fellow list from the old store
const storeObject = new Static_Store(),
      store = storeObject.getStore()
     

    

const mapStateTolist = ({sectionUsers})=>{
    console.log('new section', sectionUsers.data)
    let section_list = new ArrayList(),
    final_fellow_list = []
if (sectionUsers.data && sectionUsers.data.length){
    if (Array.isArray(sectionUsers.data)){
    const fellows = store.getState()['FellowsList']
    //console.log('fellows',fellows.data)
    sectionUsers.data.map(id=>{
        section_list.add(id)
    })

    fellows.map(fellow=>{
        console.log('fellow', fellow)
        if(section_list.contains(fellow.id)){
            final_fellow_list.push(fellow)
        }
    })

    console.log('final_fellow_list==> ',final_fellow_list)
        return {final_fellow_list}
    }
}
}

class updateList extends React.Component{
//const updateList = (sectionUsers)=> {
    constructor(props){
        super(props)

        this.context = props.context
        this.getEngList = props.getEngList
        console.log('context',this.context)


    }
 componentWillReceiveProps({final_fellow_list}){
    if (final_fellow_list && document.getElementById('fellows'))
        ReactDOM.unmountComponentAtNode(document.getElementById('fellows'))
        updateFellowlist(final_fellow_list,{courseId:this.context},this.getEngList)
 }
 render(){
     return null
 }
}
  
export default connect(mapStateTolist)(updateList)
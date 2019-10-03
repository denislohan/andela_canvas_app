import React from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {renderFellowlist} from '../../helpers/functions'
import actions from '../../redux/actions'

const mapDispatchToProps=(dispatch)=>{
    return{
      fetchUsersBySection : (section) => dispatch (actions.getUsersBySection(section))
    }
  }
class Selector extends React.Component{

     componentWillUpdate =(sections)=>{
         this.sections= []
        for(var i in sections){
                this.sections.push({value:`${sections[i].id}`,label:`${sections[i].name}`})
        };
        
    }
    serveSection = (e) =>{
        console.log('target ',e.value)
        this.props.fetchUsersBySection(e.value)


    }

    render = () => {        
        return(
            <Select onChange= {this.serveSection} options = {this.sections}/>
        )
    }
}

const mapSectionsToSelector = ({sections}) =>{
    let cleanSections = []
    if(Array.isArray(sections.data))
        sections.data.map(section=>{
            cleanSections.push(section)
        })
    return cleanSections
}
export default connect(mapSectionsToSelector,mapDispatchToProps)(Selector);
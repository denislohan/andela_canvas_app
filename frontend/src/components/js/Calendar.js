import React from 'react';
import AddToCalendar from 'react-add-to-calendar';
import {connect} from 'react-redux'
 
class Calendar extends React.Component{
    constructor(props){
        super(props)
        console.log('props  ===> ', props)
    }

    render() {
        return <div>
            <pointer>
                <p>{this.props.title? this.props.title.split(':')[0] : ''}</p>
                <p>{this.props.startTime? this.props.startTime.split('T')[0] : ''}</p>
                <AddToCalendar event={this.props}/>
            </pointer>
            </div>
      };
}

const mapStateToProps=({submissions})=>{
    return submissions[0]
}


export default connect(mapStateToProps)(Calendar)
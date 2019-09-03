import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import CalendarEvent from '../../components/js/Calendar'
import {connect} from 'react-redux'
import actions from '../../redux/actions';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const mapDispatchToProps=(dipatch)=>{
return {
  popSubmissions:()=> dipatch(actions.popSubmissions())
}

}
class ModelApp extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: true,
      currOutput: 0
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.popSubmissions=this.popSubmissions.bind(this)
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }
  closeModal() {
    ReactDOM.unmountComponentAtNode(document.getElementById('models'))
  }
  popSubmissions(){
    console.log('clicked 1')
    this.props.popSubmissions()
  }
 
  render() {
    let i =0;

    return (
      <div>
        {/* <button onClick={this.openModal}>Open Modal</button> */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <p ref={subtitle => this.subtitle = subtitle}> Here you cad add an output deadline <br/>on engineers' calendars</p>
         
          <br/>
          <br/>
          <CalendarEvent/>   
          <br/>
          <button onClick={this.closeModal}>Close</button>
          <button onClick={this.popSubmissions}>Next Output</button>     
        </Modal>
      </div>
    );
  }
}
 
export default connect(null,mapDispatchToProps)(ModelApp)
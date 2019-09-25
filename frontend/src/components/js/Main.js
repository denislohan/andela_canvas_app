import React, { Component } from 'react';
import logo from '../static/logo.svg';
import google_ca from '../static/google_ca.jpeg'
import '../css/Main.css';
import Store from '../../store'
import real_store from '../../redux/store'
import axios from 'axios'
import ReactDOM from 'react-dom'; 
import socketIOClient from "socket.io-client";
import {stopLoader,runLoader} from '../utils/utils'
import slack_ from 'slack-notify'
import createEngineersList from '../../helpers/functions'
import ScoreCard from './Graph'
import { Grid, Row, Col } from 'react-flexbox-grid';
import createCaEvents from '../../helpers/createCaEvents';
import Model from '../models/calendar'
import ArrayList from 'arr_list'
import {Provider,connect} from 'react-redux'
import actions from '../../redux/actions/index'
import $ from 'jquery'

const eventsList = new ArrayList()
var slack = slack_('https://hooks.slack.com/services/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')
const storeObject = new Store(),
      store = storeObject.getStore()

const mapDispatchToProps=(dispatch)=>{
  return{
    storeSubmissions : (submissions)=>dispatch(actions.storeSubmissions(submissions))
  }
}

class App extends Component {
  
  constructor(props){
    super(props)
    this.state={
      currentFellow: [],
      mouseout:true,
      endPoint:'localhost:4001',
      socket:socketIOClient,
      fullData:[],
      course:null,
      total_outputs:0,
      events:[]
    }
    this.fetchActiveUsers = this.fetchActiveUsers.bind(this);
    this.getEngList = this.getEngList.bind(this);
    this.fetchFellow = this.fetchFellow.bind(this)
    this.updateCourse =this.updateCourse.bind(this)
    this.handleCalendarEvents = this.handleCalendarEvents.bind(this)
    this.componentDidMount=this.componentDidMount.bind(this)
  }

  componentDidMount() {
    stopLoader('logo');
    const { endPoint } = this.state;
    const self = this
    const socket = socketIOClient(endPoint);
    socket.on("full_data", data => {
      let keys=Object.keys(data)
      this.state.fullData[data[keys[0]].assignName.split(':')[0]] = data
      this.state.total_outputs = data.index
      stopLoader('logo')

    });
    $("#course-tag").on('keyup', function (e) {
      if (e.keyCode === 13) {
        self.fetchActiveUsers();
      }
  });

    document.getElementsByClassName('App')[0].addEventListener('scroll', this.onScroll , true, true);
  }

  handleCalendarEvents(e){
    const fellows = store.getState()['FellowsList']
    let fellowData = {}
    const data = this.state.fullData
    var curr_id, submssn, event
    for (var index  in fellows){
     curr_id= fellows[index].id  
     for (var output in data){ //for each assgn
      for (var id in data[output]){ // for each submissn
        if (id == curr_id){ 
          submssn = data[output][id]
          fellowData [data[output][id].assignName] = submssn
            if(data[output][id].assignName.split(':')[1] && data[output][id].assignName.indexOf('Assignment') < 0 ){
              event = createCaEvents(submssn)
              if(!eventsList.contains(event))
                eventsList.add(event)
            }
          }
        }
    }
    this.props.storeSubmissions(eventsList.arr)

    ReactDOM.render(
      <Provider store ={real_store}>
        <Model/>,
      </Provider>,
      document.getElementById('models'))
    }
  }

  updateCourse(e){
    this.state.course = e.target.value
  }

  fetchFellow(fellowId, courseId,fellowName){
  var fellowData = {}
  let data = this.state.fullData;
  let numOfAss = this.state.total_outputs
  
  var tr =[]
  var table = React.createElement('table',{},
                React.createElement('tr',{},
                    React.createElement('th',{},'OUTPUT'),
                    React.createElement('th',{},'ATEMPTS'),
                    React.createElement('th',{},'SCORE'),
                ),
                React.createElement('tbody',{},tr)
  )

  let total = 0,
    numOfop = 0,
    sub_lateness = 0,
    all_lateness = 0

  for (var output in data){
      for (var id in data[output]){
        if (id == fellowId){

          fellowData [data[output][id].assignName] = data[output][id]
          //create table
          if(data[output][id].assignName.split(':')[1] && data[output][id].assignName.indexOf('Assignment') < 0 ){
            console.log("Date  ",)
            if(new Date > new Date(data[output][id].due_date))
              all_lateness++
            console.log('late ', data[output][id])
            //counting the number of outputs
            if (data[output][id].numofsub){ //if submitted 
              numOfop++
              if(data[output][id].isLate)
                sub_lateness++            }
            tr.push(
              React.createElement('tr',{},
                [
                  React.createElement('td',{},data[output][id].assignName),
                  React.createElement('td',{},data[output][id].numofsub),
                  React.createElement('td',{},data[output][id].score)
                ]
              )
            )
            total+= data[output][id].score;
          }

        }
      }
  }

  ReactDOM.render(
    table,
    document.getElementById('tableData')
  )

  ReactDOM.render(
    <ScoreCard value={numOfop} max={numOfAss} title = {'Delivelered vs Total'}/>,
    document.getElementById('scoreCard')
  )
  ReactDOM.render(
    <ScoreCard value={numOfop} max={all_lateness} title = {' Delivelered vs expected'}/>,
    document.getElementById('scoreCard2')
  )
  ReactDOM.render(
    <ScoreCard value= {numOfop-sub_lateness}max={numOfop} title = {' Delivelered on time'}/>,
    document.getElementById('scoreCard3')
  )
  ReactDOM.render(
    <ScoreCard colors = {[
      '#3da940','#3da940','#3da940','#53b83a','#84c42b','#f1bc00','#ed8d00','#d12000',
    ]} value={(numOfAss-numOfop)- (all_lateness - sub_lateness)} max= {numOfAss-numOfop}  title = {' Late & Undelivered Pending  '}
   
    />,
    document.getElementById('scoreCard4')
  )
  
  slack.send({
    channel: '#test_app',
    text: `@here
    LMS ouputs results for ${fellowName}`,
    fields: {
      'Number of  OutPuts submitted': `${numOfop}`,
      'Average': `${total/18}`
    },
    username: 'canvas bot'
  });
  return fellowData
  }

  getEngList(e){
      createEngineersList(e,this)
  }
  
  async fetchActiveUsers(){
  var data = {
    courseId:this.state.course
  }

if(!storeObject.hasActiveUsers()){ //taking advantage of the store state
  runLoader('logo')
  axios.post('http://localhost:4001/engineers/list',data, 
    { headers: {
      'Content-Type': 'application/json',
    }

  }).then(async (list)=>{
    await store.dispatch({ type: "UPDATEFELLOWS", item: list.data});
    if(!list.data.length){
      alert('no confirmed engineer under your section')
      return
    }
    let fellows = list.data;
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
      onClick:this.getEngList
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
  })
  }
}

  render() {

    return (
      <div className="App">
      <title>LMS Performance Tracker</title>
        <div className = 'tray'>
          <header className="App-header">
          <course-tag id ='course-tag'>
            Course ID <input onChange = {this.updateCourse}/>
          </course-tag>
          
          <general-list id = 'general-list'><a onClick={this.fetchActiveUsers}>Active Engineers</a>
          </general-list>
          
         
          <calendar-button>
            <img width = '20px' height = 'auto' src = {google_ca}
                onClick ={this.handleCalendarEvents}

            />
          </calendar-button>
          <img src={logo} id ='logo' className="App-logo" alt="logo" 
          /> 
          </header>
        </div>
        
        {/* </StickyHeader> */}
        <div className ='_body'> 
          <div id = 'fellows'></div>
          <div id = 'results'>
          <div id = 'tableData'>
          </div>
            <Grid fluid>
              <Row>
                <Col xs={25} md={3} lg={3}>
                <div id ='scoreCard'></div>
                </Col>
                <Col xs={25} md={3} lg={3}>
                <div id ='scoreCard2'></div>
                </Col>
                <Col xs={25} md={3} lg={3}>
                <div id ='scoreCard3'></div>
                </Col>
                <Col xs={25} md={3} lg={3}>
                <div id ='scoreCard4'></div>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps) (App);

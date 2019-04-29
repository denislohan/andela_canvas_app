import React, { Component } from 'react';
import logo from '../static/logo.svg';
import '../css/Main.css';
import Store from '../../store'
import axios from 'axios'
import ReactDOM from 'react-dom'; 
import socketIOClient from "socket.io-client";
import Utils from '../utils/utils'
import 'react-sticky-header/styles.css';


//store.dispatch({ type: "updateFellows", item: {fellow1:"lohan"} });

const storeObject = new Store(),
      store = storeObject.getStore()

console.log(store.getState())

class App extends Component {
  
  constructor(props){
    super(props)
    this.state={
      currentFellow: [],
      mouseout:true,
      endPoint:'localhost:4001',
      socket:socketIOClient,
      fullData:[]
    }
    this.fetchActiveUsers = this.fetchActiveUsers.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.fetchFellow = this.fetchFellow.bind(this)
    this.onScroll=this.onScroll.bind(this)
  }

  componentDidMount() {
    const { endPoint } = this.state;
    const socket = socketIOClient(endPoint);
    socket.on("full_data", data => {
      let keys=Object.keys(data)
      console.log(data[keys[0]].assignName.split(':')[0])

      this.state.fullData[data[keys[0]].assignName.split(':')[0]] = data

      Utils.stopLoader('logo')

    });

    store.subscribe(()=>{
    })


   // registering listeners
    document.getElementsByClassName('App')[0].addEventListener('scroll', this.onScroll , true, true);

  }

  onScroll(){
    
  }
  fetchFellow(fellowId, courseId){
    console.log('felow Id')
    console.log(fellowId)

  var fellowData = {}
  let data = this.state.fullData;
  
  var tr =[]
  var table = React.createElement('table',{},
                React.createElement('tr',{},
                    React.createElement('th',{},'OUTPUT'),
                    React.createElement('th',{},'ATEMPTS'),
                    React.createElement('th',{},'SCORE'),
                  
                ),
                React.createElement('tbody',{},tr)
  
  )
console.log("datttttttta")

  for (var output in data){

      for (var id in data[output]){
        if (id == fellowId){

          fellowData [data[output][id].assignName] = data[output][id]

          //create table
          tr.push(
            React.createElement('tr',{},
             [
               React.createElement('td',{},data[output][id].assignName),
               React.createElement('td',{},data[output][id].numofsub),
               React.createElement('td',{},data[output][id].score)
             ]
           )
          )

        }
      }


  }

  ReactDOM.render(
    table,
    document.getElementById('tableData')
  )

  }

  handleHover(e){

    console.log('debug')
      const id = e.target.parentNode.getAttribute('id'),
      fellow= storeObject.findFellow(id) ;
    
      if(!this.state.currentFellow[fellow.id]){

        this.state.currentFellow[fellow.id]=fellow;
        //console.log(this.state.currentFellow)
       this.fetchFellow(id,219)


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
      console.log('removing')
      ReactDOM.unmountComponentAtNode(document.getElementById('tableData'))
      ReactDOM.unmountComponentAtNode(document.getElementById(this.state.currentFellow[fellow.id].email))
        this.state.currentFellow[fellow.id] = null

    }
    //this.state.clicked = !this.state.clicked 

  }
  
 

  async fetchActiveUsers(courseId){
  var data = {
    courseId:219
  }

  console.log('retreaving the active users')

if(!storeObject.hasActiveUsers()) //taking advantage of the store state
  axios.post('http://localhost:4001/engineers/list',data, 
    { headers: {
      'Content-Type': 'application/json',
    }

  }).then(async (list)=>{
    await store.dispatch({ type: "UPDATEFELLOWS", item: list.data});
    
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
      onClick:this.handleHover
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
); 

  })

}
  
  render() {
    return (
      <div className="App">
        {/* Header */}

        {/* <StickyHeader > */}

        <div className = 'tray'>
          <header className="App-header">
          <general-list><a onClick={this.fetchActiveUsers}>Active Students</a>
          </general-list>
          <sub-missions >Submissions
          </sub-missions>
          <img src={logo} id ='logo' className="App-logo" alt="logo" /> 
          </header>
        </div>
        
        {/* </StickyHeader> */}
        <div className ='_body'> 
          <div id = 'fellows'></div>
          <div id = 'tableData'></div>
        </div>
    </div>




    );
  }
}

export default App;

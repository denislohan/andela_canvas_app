import React from 'react';
import App from '../js/Main';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,mount,render} from 'enzyme';
Enzyme.configure({ adapter: new Adapter() })  

// describe( 'Main app', ()=>{
//   let app,container,wrapper;
//   beforeEach(() => {
//     app = mount(<App />, {attachTo: document.body}) 
//     wrapper = render(<App/>); 
//     //container = shallow(<App />) 
//   })

// it('It should render the App without crashing', ()=>{
//   expect(app.find('.App')).not.toBe(null);
  

// })


// it('It should contain all contains the divs', () => {

//   //console.log(getApp().html())
//   expect(app.find('.App').childAt(0).hasClass('tray')).toBe(true); // issue here

//   expect(wrapper.text()).toContain('anvas APP')

//   // const div = document.createElement('div');
//   // ReactDOM.render(<App />, div);
//   // ReactDOM.unmountComponentAtNode(div);

// });
// })

describe('Welcome', () => {
  it('Welcome renders hello world', () => {
    const welcome = shallow(<Welcome />);
    expect(welcome.find('div').text()).toEqual('Hello world');
  });
});
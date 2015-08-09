var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = require("./Header");
var RightBar = require('./RightBar');

//Sockets
var StudentTile = require('./StudentTile');
var socket = io.connect('http://localhost:8080');

var Grid = React.createClass({
  getInitialState: function(){
    return {
      lesson: {text:"", author: "", title: ""},
      user: {first_name: "TEACHER", last_name: "A", username: "hello", id: '123'},
      students: [{username: 'ahines', first_name: 'Asha', last_initial: 'H'}, {username: 'amjacobo', first_name: 'Aaron', last_initial: 'J'}],
      prompt: 'Please look at the text and highlight the best example of a character showing caring.'
    }
  },
  componentDidMount: function(){
    this.getLesson();
    socket.on('select', this.updateStudentTile)
  },
  updateStudentTile: function(data){
    var textFromStudent = data.selection
    $('#studentText').html(textFromStudent);
  },
  addStudent: function(studentData){
    // not sure where to call addStudent yet, but
    // probably somewhere in the login component
   var students =  this.state.students;
   students.push(studentData)
   this.setState({
      students: students
    })
  },
  viewPrompt: function(){
    socket.emit('viewPrompt', this.state.prompt)
  },
  disableStudents: function(){
    //turn off listeners by calling disconnect function
    socket.disconnect()
  },
  getLesson: function(){
    //here is where the api call would happen
    //to recieve the lesson which is active
    //for that class

    //stubbed for right now
    var newLesson = {text: "Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.", author: "Charlotte Manetta", title: "The Amazing Zamboni"}

    this.setState({
      lesson: newLesson
    });
  },
  render: function() {
    var teacher = {_id: "22", first_name: "sally", last_name: "bates", username: "sbates", password: "1234"}
    var student = {_id: "24", first_name: "robert", username: "robertb", password: "1234"}
    var lesson = this.state.lesson

    var students = this.state.students.map(function(student){
      return ( 
        <li key={student.id}>
          <StudentTile student={student} lesson={lesson} />
        </li>
      )
    })
    return (

      <div className="container">
        <Header teacher={teacher} student={student} />
        <h3>Teacher Dashboard</h3>
        <RouteHandler />
        <ul>
          {students}
        </ul>
        <RightBar prompt={this.state.prompt} actionOne={this.viewPrompt} actionTwo={this.disableStudents} labelOne="view question" labelTwo="finished"/>
      </div>
    );
  },
});

module.exports = Grid;

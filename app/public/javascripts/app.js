var React = require("react");
var _ = require("underscore");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var StudentView = require("./components/StudentView");
var TeacherView = require("./components/TeacherView");
var StudentPanel = require("./components/StudentPanel");
var LessonPanel = require("./components/LessonPanel");
var Grid = require("./components/Grid");
var Home = require("./components/Home");

//functions defined in the global scope to be used in many components
var call = function(action, method, data){
  return new Promise(function(resolve, reject){
    request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){
      resolve(serverData)
    });

    request.fail(function(serverData){
      reject(serverData)
    });
  });
}

//Routes for the react router
var routes = (
  <Route handler={App}>
    <Route path="/"         name="home"     handler={Home} />
    <Route path="/students" name="students" handler={StudentView}/>
    <Route path="teachers/:id" name="teachers" handler={TeacherView}>
      <Route path="student-panel" name="studentPanel" handler={StudentPanel}/>
      <Route path="lesson-panel" name="lessonPanel" handler={LessonPanel}/>
      <Route path="grid" name="grid" handler={Grid}/>
    </Route>
  </Route>
);

//Top Level app component that manages whole app state
var App = React.createClass({
  getInitialState: function(){
    user: null
  },
  render: function(){
    return (
      <RouteHandler />
    )
  }
});

Router.run(routes, Router.HashLocation, function(Root){
  React.render(<Root />, document.body);
})

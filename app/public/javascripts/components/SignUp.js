var React = require('react');
var Router = require('react-router');
var AuthError = require('./AuthError')

var SignUp = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  getInitialState: function() {
    return {
      authBox: 'Students',
      error: false
    };
  },
  handleSubmit: function(event){
    event.preventDefault();
    var signUp = this;
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    var username = $(event.target).find('#username').val()
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var password = $(event.target).find('#password').val()
    var pin = $(event.target).find('#pin').val()
    var data = {username: username, first_name: first_name, last_name: last_name, password: password, pin: pin}

    var request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){

      if(serverData.teacher === null || serverData.student === null){
        signUp.setState({
          error: true
        })
        signUp.transitionTo('/')
      } else if (serverData.student) {
        signUp.transitionTo('students', {id: serverData.student._id});
      } else {
        signUp.transitionTo('teachers', {id: serverData.teacher._id});
      }
    })
    request.fail(function(serverData){
      console.log(serverData);
    });
  },
  handlePillClick: function(event){
    event.preventDefault();
    this.setState({
      authBox: $(event.target).text()
    });
  },
  render: function() {
    if(this.state.authBox === 'Teachers'){
      var authBox = <div id="authBox">
        <ul className="nav nav-pills">
          <li role="presentation"><a href="#" onClick={ this.handlePillClick }>Students</a></li>
          <li role="presentation" className="active"><a href="#" onClick={ this.handlePillClick }>Teachers</a></li>
        </ul>
        <div className="row">

          <form id="teacherLoginForm" className="col-sm-4 col-md-4 col-lg-4" action="/teachers/login" method="post" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" id="username" placeholder="SuzyQ86" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" id="password" placeholder="*******" />
            </div>
            <button type="submit" className="btn btn-custom">Log In</button>
          </form>

          <form id="signUp" className="col-sm-8 col-md-8 col-lg-8" action="/teachers" method="post" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input type="text" className="form-control" name="first_name" id="first_name" placeholder="Suzy" />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Que" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" id="username" placeholder="SuzyQ86" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" id="password" placeholder="*******" />
            </div>
            <button type="submit" className="btn btn-custom">Sign Up</button>
          </form>
        </div>
      </div>
    } else if(this.state.authBox === 'Students'){
      var authBox = <div id="authBox">
        <ul className="nav nav-pills">
          <li role="presentation" className="active"><a href="#" onClick={ this.handlePillClick }>Students</a></li>
          <li role="presentation"><a href="#" onClick={ this.handlePillClick }>Teachers</a></li>
        </ul>
        <form id="studentLogIn" action="/students/login" method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" id="username" placeholder="SuzyQ86" />
          </div>
          <div className="form-group">
            <label htmlFor="pin">Pin</label>
            <input type="text" className="form-control" name="pin" id="pin" placeholder="1234" />
          </div>
          <button type="submit" className="btn btn btn-custom">Log In</button>
        </form>
      </div>
    }
    if (this.state.error){
      var authError = <AuthError/>
    } else {
      var authError = <div></div>
    }
    return (
      <div>
        { authBox }
        { authError }
       </div>
    );
  }
});

module.exports = SignUp;

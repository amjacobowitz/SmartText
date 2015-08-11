var React = require('react');
var StudentBox = require('./StudentBox');

var StudentList = React.createClass({
getInitialState: function() {
    return {
      students:[]
    };
  },
  componentDidMount: function() {
    this.getStudentList();
  },
  getStudentList: function(){
    var studentList = this;
    var path = "/teachers/"
                 + this.props.teacher._id
                 +"/klasses/"
                 + this.props.klass._id
                 + "/students"
    var request = $.ajax({
      url:      path,
      method:   'get',
      dataType: "json"
    });

    request.done(function(serverData){
      var newStudents = serverData.students
      studentList.setState({
        students: newStudents
      });
    });

    request.fail(function(serverData){
      console.log('there was an error getting the students')
      console.log(serverData);
    });
  },
  handleSubmit: function(event){
    event.preventDefault();

    var studentList = this;
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    var username = $(event.target).find('#username').val()
    var first_name = $(event.target).find("#first_name").val();
    var last_initial = $(event.target).find('#last_initial').val()
    var data = {username: username, first_name: first_name, last_initial: last_initial }

    var request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){
      if(method === "post"){
        debugger
        var newStudents = studentList.state.students.concat(serverData.student)
        studentList.setState({
          students: newStudents
        });
      } else if (method === "put"){
        this.getStudentList();
      }
    }.bind(this));

    request.fail(function(serverData){
      console.log('there was an error creating that student')
      console.log(serverData);
    });
  },
  handleDeleteStudent: function(student_id){
    var action = '/teachers/'
                   + this.props.teacher._id
                   +"/klasses/"
                   + this.props.klass._id
                   +"/students/"
                   + student_id;
    var method = 'delete';
    var request = $.ajax({
      url:      action,
      method:   method,
      dataType: "json"
    });

    request.done(function(serverData){
      this.getStudentList();
    }.bind(this));

    request.fail(function(serverData){
      console.log('there was an error deleting the student')
      console.log(serverData);
    });
  },
  render: function(){
    var students = this.state.students.map(function(student){
      return (
        <div key={student._id}>
          <StudentBox student={student}
                    delete={this.handleDeleteStudent}
                    teacher={this.props.teacher}
                    klass={this.props.klass}
                    update={this.handleSubmit} />
        </div>
      )
    }.bind(this))
    var path = "/teachers/"
                 + this.props.teacher._id
                 +"/klasses/"
                 + this.props.klass._id
                 + "/students"
    return (
      <div>
        <h7>New Student</h7>
        <form action={path} method="post" onSubmit={this.handleSubmit}>
          <input id="username" type="text" name="username" placeholder="sammysosa" />
          <input id="first_name" type="text" name="first_name" placeholder="Sammy" />
          <input id="last_initial" type="text" name="last_initial" placeholder="S." />
          <input type="submit" value="Create Student" />
        </form>
        <div>
          {students}
        </div>
      </div>
    )
  }
});

module.exports = StudentList;

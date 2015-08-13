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
        <div className="flpr dib w600px h800px m30px">
          <h4>Add a Student to this Class</h4>
          <form id="newStudent" action={path} method="post" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input className="form-control" id="username" type="text" name="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <input className="form-control" id="first_name" type="text" name="first_name" placeholder="First Name" />
            </div>
            <div className="form-group">
              <input className="form-control" id="last_initial" type="text" name="last_initial" placeholder="Last Initial" />
            </div>
            <input className="btn btn-custom" type="submit" value="Create Student" />
          </form>
        </div>
          <div id="studentsList">
            {students}
          </div>
      </div>
    )
  }
});

module.exports = StudentList;

var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Header = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
  ],
  render: function(){
    var teacher = this.props.teacher
    var student = this.props.student
    var content = null
    var buttons = null
    var logo = null

    if (teacher) {
      content = <p className="navbar-text navbar-left">{teacher.first_name}</p>
      buttons =
        <div  id="buttons" className="btn-group navbar-right">
          <form className="navbar-form form-inline">
            <Link to="grid" disabled={this.props.activeLesson !== null} params={{id: teacher._id }} className="btn btn-xs btn-group btn-group-xs nabar-btn btn-primary sharp" role="group">Dashboard</Link>
            <Link to="studentPanel" params={{id: teacher._id }} className="btn btn-xs btn-group btn-group-xs nabar-btn btn-primary sharp" role="group">Students</Link>
            <Link to="lessonPanel" params={{id: teacher._id }} className="btn btn-xs btn-group btn-group-xs nabar-btn btn-primary sharp" role="group">Lessons</Link>
            <Link to="/" className="btn btn-xs btn-group btn-group-xs nabar-btn btn-danger sharp" role="group">Log Out</Link>
            </form>
        </div>
      logo = <Link to='lessonPanel' className="navbar-brand" params={{id: teacher._id }}><img src="../../../images/smartext_final.png" className="logo" alt="SmartText" / ></Link>
    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
      logo = <Link to='students' className="navbar-brand" params={{id: student._id }}><img src="../../../images/smartext_final_v3.png" className="logo" alt="SmartText" / ></Link>
    } else {
      logo = <Link to='/' className="navbar-brand"><img src="../../../images/smartext_final_v3.png" className="logo" alt="SmartText" / ></Link>
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">{logo}</a>
          {content}
          {buttons}
        </div>
      </nav>
    )
  }
});

module.exports = Header;

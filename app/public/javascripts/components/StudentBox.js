var React = require('react');

var StudentBox = React.createClass({
  getInitialState: function() {
    return {
      display: "panel"
    };
  },
  deleteClick: function(){
    this.props.delete(this.props.student._id);
  },
  editClick: function(){
    this.setState({
      display: "edit"
    });
  },
  handleSubmit: function(event){
    event.preventDefault();
    this.props.update(event);
    this.setState({
      display: "panel"
    });
  },
  render: function() {
    if(this.state.display === "panel"){
      var content =
        <div className="b1pxsb col-md-2 mt10px pad7px w150px h150px ml5px br10">
          <p>
            <span>{this.props.student.first_name} {this.props.student.last_initial}   </span>
            <a className="mar3px imgtag" onClick={this.editClick}><i className="glyphicon glyphicon-pencil"></i></a>
            <a className="mar3px" onClick={this.deleteClick}><i className="glyphicon glyphicon-remove"></i></a>
          </p>
          <p>Username: {this.props.student.username}</p>
        </div>
    } else if (this.state.display === "edit"){
      var path = "/teachers/"
                   + this.props.teacher._id
                   + "/klasses/"
                   + this.props.klass._id
                   +"/students/"
                   + this.props.student._id
      var content =
        <div className="panel panel-default mt10px ">
          <div className="panel-heading">
            <h4> Editing {this.props.student.first_name}</h4>
            <form id="studentEdit" action={path} method="put" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input className="form-control" id="username" type="text" name="username" placeholder={this.props.student.username} />
                </div>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input className="form-control" id="first_name" type="text" name="first_name" placeholder={this.props.student.first_name} />
                </div>
                <div className="form-group">
                  <label htmlFor="last_initial">Last Initial</label>
                  <input className="form-control" id="last_initial" type="text" name="last_initial" placeholder={this.props.student.last_initial} />
                </div>
              <input className="btn btn-custom" type="submit" value="Update Student" />
            </form>
          </div>
        </div>
    }
    return (
      <div>
        { content }
      </div>
    );
  }

});

module.exports = StudentBox;


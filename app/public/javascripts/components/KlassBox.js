var React = require('react');
var StudentList = require('./StudentList')

var KlassBox = React.createClass({
  getInitialState: function() {
    return {
      display: 'panel'
    };
  },
  deleteClick: function(){
    this.props.delete(this.props.klass._id);
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
    var path = "/teachers/"
                 + this.props.teacher._id
                 +"/klasses/"
                 + this.props.klass._id
                 + "/students"

    if(this.state.display === "panel"){
      var content =
      <div className="panel panel-default flpr dib w400px">
        <div className="panel-heading">
          <div className="row">
            <div className="col-sm-4">
              <h1>{this.props.klass.name}</h1>
              <p>Pin: {this.props.klass.pin}</p>
              <p>Grade: {this.props.klass.grade}</p>
              <button className="btn btn-custom mar3px" onClick={this.editClick}>Edit</button>
              <button className="btn btn-custom mar3px" onClick={this.deleteClick}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    } else if (this.state.display === "edit"){
      var path = "/teachers/"+ this.props.teacher._id +"/klasses/" + this.props.klass._id
      var content = <div className="panel panel-default dib w400px">
        <div className="panel-heading">
          <h3>{this.props.klass.name}</h3>
          <p>Pin: {this.props.klass.pin}</p>
          <p>Grade: {this.props.klass.grade}</p>
          <button className="btn btn-custom" onClick={this.deleteClick}>Delete</button>
        </div>
        <div className="panel-body">
          <form id="klassEdit" action={path} method="put" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="last_initial">Class Name</label>
              <input id="name"
                   type="text"
                   name="name"
                   className="form-control"
                   defaultValue={this.props.klass.name} />
            </div>
            <div className="form-group">
              <label htmlFor="last_initial">Grade</label>
              <input id="grade"
                    type="text"
                    name="grade"
                    className="form-control"
                    defaultValue={this.props.klass.grade} />
            </div>
            <div className="form-group">
              <label htmlFor="pin">Pin</label>
              <input id="pin"
                   type="text"
                   name="pin"
                   className="form-control"
                   defaultValue={this.props.klass.pin} />
            </div>
            <input type="submit" className="btn btn-custom" value="Update Class" />
          </form>
        </div>
      </div>
    }
    return (
      <div>
        { content }
        <div className="panel-body">
          <StudentList teacher={this.props.teacher}
                       klass={this.props.klass}/>
        </div>
      </div>
    );
  }

});

module.exports = KlassBox;

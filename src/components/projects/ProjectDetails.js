import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import moment from "moment";

const ProjectDetails = props => {
  const id = props.match.params.id;
  const project = props.project;
  if (!props.auth.uid) {
    return <Redirect to="/signin" />;
  }
  return project ? (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project title - {project.title}</span>
          <p>{project.content}</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>
            Posted by The {project.authorFirstName} {project.authorLastName}
          </div>
          <div>{moment(project.timeStamp.toDate()).calendar()}</div>
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "projects"
    }
  ])
)(ProjectDetails);

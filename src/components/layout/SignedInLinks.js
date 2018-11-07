import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = props => {
  const signOut = props.signOut;
  const initials = props.profile.initials;
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/create">New Project</NavLink>
        </li>
        <li>
          <a onClick={signOut}>Log Out</a>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            {initials && initials.toUpperCase()}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

const mapStateToProps = state => ({
  profile: state.firebase.profile
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInLinks);

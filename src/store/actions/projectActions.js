export const createProject = (project, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const profile = state.firebase.profile;
    const uid = state.firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: uid,
        timeStamp: new Date()
      })
      .then(data => {
        dispatch({ type: "CREATE_PROJECT", project: data });
        history.push("/");
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR", error: err });
      });
  };
};

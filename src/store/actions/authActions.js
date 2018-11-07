export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {
        console.log(data);
        dispatch({ type: "LOGIN_SUCCES" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", error: err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("out");
        dispatch({ type: "SIGNOUT_SUCCES" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        const uid = resp.user.uid;
        return firestore
          .collection("users")
          .doc(uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            email: newUser.email
          });
      })
      .then(data => {
        console.log(data);
        dispatch({ type: "SIGNUP_SUCCES" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", error: err });
      });
  };
};

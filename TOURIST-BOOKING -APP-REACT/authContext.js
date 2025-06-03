import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {//these three are the object attributes that we are gonna pass as common among all the pages that are gonna use this
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {//so these are the various states o fthe on=bject that we will seal with 
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));//local storage is a storage within the browser of the user we set this here because once we refresh the login object should till remain the same and should only change when there is a change in user
  }, [state.user]);
//the context we created is an obhect and the reducer is also associated with the same object attributes fuunctions but there is no link between them
//while wrapping up with the children we also give the dispatch method(which is a reducer) for seeting the new user initially
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  currentUser: "",
  theme: "dark",
  count: 0,
  session: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_SESSION":
      return { ...state, session: action.payload };
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    default:
      throw new Error();
  }
}

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

const pings = (state = [], action) => {
  if (action.type === "ADD_PING") {
    return [...state, "action.ping"];
  }
  return state;
};

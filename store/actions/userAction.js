export const showUserLogin = (showLog) => async (dispatch) => {
  dispatch({ type: "SHOW_USER_LOGIN", payload: showLog });
};

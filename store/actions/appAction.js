export const setAppLoading = (loading) => async (dispatch) => {
  dispatch({ type: "LOADING_APP", payload: loading });
};

export const setDistance = (val) => (dispatch) => {
  dispatch({
    type: 'SET_DISTANCE',
    payload: val,
  });
}

export const setDegree = (degree) => (dispatch) => {
  dispatch({
    type: 'SET_DEGREE',
    payload: degree,
  });
}

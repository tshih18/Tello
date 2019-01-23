const initialState = {
  dist: 150,  // 20-500
  degree: 45, // 1-360
  speed: 10,  // 10-100
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_DISTANCE':
      return {
        ...state,
        dist: action.payload
      }

    case 'SET_DEGREE':
      return {
        ...state,
        degree: action.payload
      }
    default: {
      return state
    }
  }
}

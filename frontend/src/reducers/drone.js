const initialState = {
  dist: 100,  // 20-500
  degree: 15, // 1-360
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

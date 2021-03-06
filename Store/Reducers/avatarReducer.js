const initialState = { avatar: require('../../Images/ic_tag_faces.png') }

const setAvatar = (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case 'SET_AVATAR':
      nextState = {
        avatar: action.value
      }
      return nextState || state
    default:
      return state
  }
}

export default setAvatar

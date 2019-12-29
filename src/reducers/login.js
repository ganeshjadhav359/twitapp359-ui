const initialState = {
    accessToken:null,
    isLoggedIn:false,
    userData:null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LoginToken':
      return Object.assign({}, state, {
        accessToken: action.payload
      });
    case 'LogoutToken':
      return Object.assign({}, state, {
        accessToken: ''
      });
    case 'LOGGED_IN': {
      return Object.assign({}, state, {
        isLoggedIn: action.payload
      });
    }
    case 'USER_DATA': {
        return Object.assign({}, state, {
            userData: action.payload
          });
    }
    default:
      return state;
  }
};
export default loginReducer;

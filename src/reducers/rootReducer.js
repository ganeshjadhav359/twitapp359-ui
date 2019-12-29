import { combineReducers } from 'redux';
import loginReducers from './login';

const rootReducers =combineReducers({
    login : loginReducers
})

export default rootReducers;
import { combineReducers } from 'redux';
import roleReducer from '../reducers/roleReducer';

const rootReducer = combineReducers({
  role: roleReducer,
});

export default rootReducer;
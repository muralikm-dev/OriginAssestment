import { combineReducers } from 'redux';
import { userDetailsReducer } from './userdetails/reducer';

const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
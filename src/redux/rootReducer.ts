import { combineReducers } from 'redux';
import { userDetailsReducer, awsDetailsReducer } from './userdetails/reducer';

const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
    awsDetails: awsDetailsReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;

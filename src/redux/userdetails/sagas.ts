import { call, put, takeLatest } from "@redux-saga/core/effects";
import { FetchDetailsAction, FETCH_DETAILS, UpdateDetailsAction, UPDATE_DETAILS, FETCH_DETAILS_FAILURE, FETCH_DETAILS_SUCCESS, UPDATE_DETAILS_FAILURE, UPDATE_DETAILS_SUCCESS, FetchAWSDetailAction, FETCH_AWS_REGION_FAILURE, FETCH_AWS_REGION_SUCCESS, FETCH_AWS_REGION } from './types';
import { UserDetailsSample } from "../UserDetailsSample";
import { fetchRestApi, fetchRestAwsApi } from "./fetchRestApi";

function* fetchDetails(action: FetchDetailsAction) {
    let response;
    try {
        response = yield call(fetchRestApi); 
           
        // response = UserDetailsSample;
        console.log(response);
    
  } catch (error) {
    yield put({ type: FETCH_DETAILS_FAILURE, payload: error });
  }
  yield put({ type: FETCH_DETAILS_SUCCESS, payload: response });
}

export function* watchFetchDetails() {
    yield takeLatest(FETCH_DETAILS, fetchDetails);
}

function* fetchAwsDetails(action: FetchAWSDetailAction) {
    let response;
    try {
        response = yield call(fetchRestAwsApi); 
        console.log(response);
    
  } catch (error) {
    yield put({ type: FETCH_AWS_REGION_FAILURE, payload: error });
  }
  yield put({ type: FETCH_AWS_REGION_SUCCESS, payload: response });
}

export function* watchFetchAwsDetails() {
    yield takeLatest(FETCH_AWS_REGION, fetchAwsDetails);
}

function* updateDetails(action: UpdateDetailsAction) {
    let response;
    const userDetails = action.payload;
    try {
        
        response = userDetails;
        console.log(response);
    
  } catch (error) {
    yield put({ type: UPDATE_DETAILS_FAILURE, payload: error });
  }
  yield put({ type: UPDATE_DETAILS_SUCCESS, payload: response });
}

export function* watchUpdateDetails() {
    yield takeLatest(UPDATE_DETAILS, updateDetails);
}

export const userSagas = [
    watchFetchDetails,
    watchUpdateDetails,
    watchFetchAwsDetails
];

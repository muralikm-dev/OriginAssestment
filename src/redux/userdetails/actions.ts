import { FETCH_DETAILS, FetchDetailsAction, UPDATE_DETAILS, 
  UpdateDetailsAction, UserDetails, FetchDetailsSuccessAction, 
  FETCH_DETAILS_SUCCESS, FetchDetailsFailureAction, FETCH_DETAILS_FAILURE, 
  UPDATE_DETAILS_SUCCESS, UPDATE_DETAILS_FAILURE, UpdateDetailsSuccessAction, UpdateDetailsFailureAction,
  FETCH_AWS_REGION, FETCH_AWS_REGION_SUCCESS, FETCH_AWS_REGION_FAILURE,
  FetchAWSDetailAction, FetchAWSDetailSuccessAction, FetchAWSDetailFailureAction, AwsDetails } from './types';

export const fetchDetails = (): FetchDetailsAction => ({
    type: FETCH_DETAILS,
});

export const fetchDetailsSuccess = (payload: UserDetails[]): FetchDetailsSuccessAction => ({
  type: FETCH_DETAILS_SUCCESS,
  payload
});

export const fetchDetailsFailureAction = (error: Error): FetchDetailsFailureAction => ({
  type: FETCH_DETAILS_FAILURE,
  payload: error
});

export const fetchAwsDetails = (): FetchAWSDetailAction => ({
  type: FETCH_AWS_REGION,
});

export const fetchAwsDetailsSuccess = (payload: AwsDetails): FetchAWSDetailSuccessAction => ({
  type: FETCH_AWS_REGION_SUCCESS,
  payload
});

export const fetchAwsDetailsFailure = (error: Error): FetchAWSDetailFailureAction => ({
  type: FETCH_AWS_REGION_FAILURE,
  payload: error
});

export const updateDetails = (payload: UserDetails[]): UpdateDetailsAction => ({
    type: UPDATE_DETAILS,
    payload
});

export const updateDetailsSuccess = (payload: UserDetails[]): UpdateDetailsSuccessAction => ({
  type: UPDATE_DETAILS_SUCCESS,
  payload
});

export const updateDetailsFailure = (error: Error): UpdateDetailsFailureAction => ({
  type: UPDATE_DETAILS_FAILURE,
  payload: error
});

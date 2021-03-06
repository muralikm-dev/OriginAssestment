import { FETCH_DETAILS, FETCH_DETAILS_SUCCESS, UPDATE_DETAILS, FetchDetailsAction, UpdateDetailsAction, UserDetails, UserDetailsState, UserDetailsTypes, FETCH_DETAILS_FAILURE, UPDATE_DETAILS_SUCCESS, UPDATE_DETAILS_FAILURE, AwsDetailsState, AwsDetailsTypes, FETCH_AWS_REGION, FETCH_AWS_REGION_SUCCESS, FETCH_AWS_REGION_FAILURE } from './types';
import { UserDetailsSample } from '../UserDetailsSample';

const initialState: UserDetailsState = {
    data: [],
    updatedData: [],
    loading: false,
    updated: false,
};

const initialAwsState: AwsDetailsState = {
    data: {region: '', version: ''},
    loading: false
}
   

export const userDetailsReducer = (state: UserDetailsState = initialState, action: UserDetailsTypes): UserDetailsState => {
    switch (action.type) {
        case FETCH_DETAILS: 
            // const data:UserDetails[] = UserDetailsSample;
            return {...state, loading: true, updated: false};
        case FETCH_DETAILS_SUCCESS:
            const data = action.payload;
            console.log(data);
            return { ...state, data, loading: true, updated: false };
        case FETCH_DETAILS_FAILURE:
            return { ...state, loading: false, updated: false };
        case UPDATE_DETAILS: 
            return {...state, loading: false, updated: true};
        case UPDATE_DETAILS_SUCCESS:
            const updatedData = action.payload;
            console.log(updatedData);
            const newState = {...state };
            newState.data = updatedData; 
            
            return { ...state, data: newState.data, updatedData, loading: false, updated: true };
        case UPDATE_DETAILS_FAILURE:
            return { ...state, loading: false, updated: false };        
        default:
            return { ...state, loading: false, updated: false };
    }
}

export const awsDetailsReducer = (state: AwsDetailsState = initialAwsState, action: AwsDetailsTypes): AwsDetailsState => {
    switch (action.type) {
        case FETCH_AWS_REGION: 
            // const data:UserDetails[] = UserDetailsSample;
            return {...state, loading: true};
        case FETCH_AWS_REGION_SUCCESS:
            const data = action.payload;
            console.log(data);
            return { ...state, data, loading: true };
        case FETCH_AWS_REGION_FAILURE:
            return { ...state, loading: false };
        default:
            return { ...state, loading: false };
    }
}

export const userDetails = (state: { data: any; }) => state.data;

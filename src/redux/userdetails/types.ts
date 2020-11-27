export const FETCH_DETAILS = "FETCH_DETAILS";
export const FETCH_DETAILS_SUCCESS = "FETCH_DETAILS_SUCCESS";
export const FETCH_DETAILS_FAILURE = "FETCH_DETAILS_ERROR";
export const UPDATE_DETAILS = "UPDATE_DETAILS";
export const UPDATE_DETAILS_SUCCESS = "FETCH_DETAILS_SUCCESS";
export const UPDATE_DETAILS_FAILURE = "FETCH_DETAILS_FAILURE";

export interface FetchDetailsAction {
    readonly type: typeof FETCH_DETAILS;
}

export interface FetchDetailsSuccessAction {
    readonly type: typeof FETCH_DETAILS_SUCCESS;
    readonly payload: UserDetails[];
}

export interface FetchDetailsFailureAction {
    readonly type: typeof FETCH_DETAILS_FAILURE;
    readonly payload: Error;
}

export interface UpdateDetailsAction {
    readonly type: typeof UPDATE_DETAILS;
    readonly payload: UserDetails[];
}

export interface UpdateDetailsSuccessAction {
    readonly type: typeof UPDATE_DETAILS_SUCCESS;
    readonly payload: UserDetails[];
}

export interface UpdateDetailsFailureAction {
    readonly type: typeof UPDATE_DETAILS_FAILURE;
    readonly payload: Error;
}

export interface UserDetailsState {
    data: UserDetails[],
    updatedData: UserDetails[],
    readonly loading: boolean,
    readonly updated: boolean
}

export interface UserDetails {
    readonly ID: number;
    name: string;
    email: string;
    address: string;
}

export type UserDetailsTypes =
  | FetchDetailsAction
  | FetchDetailsSuccessAction
  | FetchDetailsFailureAction
  | UpdateDetailsAction
  | UpdateDetailsSuccessAction
  | UpdateDetailsFailureAction;
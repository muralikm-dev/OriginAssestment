import { createSelector } from "reselect";
import { UserDetailsState, UserDetails } from "./types";
import { RootState } from "../rootReducer";

const userDetailsList = (state: RootState): UserDetails[] => state.userDetails.data;
const updatedDetailsList = (state: RootState): UserDetails[] => state.userDetails.data;
const updatedDetailsUpdated = (state: RootState): boolean => state.userDetails.updated;

export const userDetailsSelector = createSelector(userDetailsList, userDetails => userDetails);
export const updatedDetailsSelector = createSelector(updatedDetailsList, updateDetails => updateDetails)
export const updatedSelector = createSelector(updatedDetailsUpdated, updated => updated);
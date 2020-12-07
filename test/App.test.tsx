import configureMockStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import {TableComponent} from '../src/component/TableComponent';
import { EnzymeAdapter, mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import React from 'react';
import toJson from 'enzyme-to-json';
import App from '../src/App';
import { Table, TableHead , TableRow, TableCell } from '@material-ui/core';
import { Provider } from 'react-redux';
import axios  from 'axios';
import * as types from '../src/redux/userdetails/types';
import * as actions from '../src/redux/userdetails/actions';
import * as reducer from '../src/redux/userdetails/reducer';
import { UserDetailsSample } from '../src/redux/UserDetailsSample';

configure({ adapter: new Adapter() });

  describe('App render', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

      const initialState: types.UserDetailsState = {
        data: [],
        updatedData: [],
        loading: false,
        updated: false,
      };

      it('async api call for the grid', async () => {
        // const wrapper = shallow(<Provider store={mockStore({initialState})}><TableComponent /></Provider>);
        
        const res = await axios.get("https://z2wzh9du86.execute-api.ap-southeast-2.amazonaws.com/live/users")
        expect(res.data).to.have.length(10);
        expect(res.data[1].name).to.be.equal('Sai');        
      })

      it('async api call to aws to fetch region and version', async () => {
        const res = await axios.get("https://86tylxc8w6.execute-api.ap-southeast-2.amazonaws.com/live/awsdetails")
        expect(res.data.region).to.be.equal("ap-southeast-2");
        expect(res.data.version).to.be.equal("nodejs12.x");
      })

      it('fetch details action type', () => {
        expect(actions.fetchDetails().type).to.be.equals(types.FETCH_DETAILS);
        expect(actions.fetchDetailsSuccess([]).type).to.be.equals(types.FETCH_DETAILS_SUCCESS);        
      })

      it('Mock Fetch Details Success Reducer', () => {
        expect(reducer.
          userDetailsReducer(initialState, 
            {payload: UserDetailsSample, type: types.FETCH_DETAILS_SUCCESS})).to.be.not.equals({ data: UserDetailsSample,
             updatedData: [], loading: true, updated: false});
        
      })

      it('Update Details Sucess Reducer', () => {
        expect(reducer.userDetailsReducer(initialState,
          {payload: UserDetailsSample, type: types.UPDATE_DETAILS_SUCCESS})).to.be.not.equals({ data: UserDetailsSample,
            updatedData: UserDetailsSample, loading: false, updated: true})
      })
  })

  

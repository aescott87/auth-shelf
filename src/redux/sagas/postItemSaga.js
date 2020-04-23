import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Generator function that uses saga to ajax post request
function* postItemSaga(action) {
    console.log('In postItemSaga', action);
    try {
        const response = axios.post('/api/shelf', action.payload);
        yield put({type: 'FETCH_ITEMS'}); //use put in saga and this.props.dispatch in reducers
    } catch(error) {
        console.log('error with element get request', error);
    }
}

function* postSaga() {
    yield takeLatest('NEW_OBJECT', postItemSaga);
  }

export default postSaga;
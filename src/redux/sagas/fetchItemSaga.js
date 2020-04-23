import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItem() {
  try {
    const response = yield axios.get('/api/shelf');
    yield put({ type: 'SET_LIST', payload: response.data });
  } catch (error) {
    console.log('List get request failed', error);
  }
}

function* listSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItem);
}

export default listSaga;
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  updateUserError,
  updateUserSuccess,
} from "./actions";
import { actionTypes } from "./actionTypes";
import {
  createUserApi,
  deleteUserApi,
  loadUsersApi,
  updateUserApi,
} from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response?.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response?.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess(response?.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onDeleterUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response?.data));
  }
}

function* onUpdateUserStartAsync({ payload}) {
const {id, ...rest} = payload
  try {
    console.log(id);
    console.log("form value in saga", rest);
    // console.log(payload)
    const response = yield call(updateUserApi, id, rest);
    if (response.status === 200) {
      yield put(updateUserSuccess(response?.data));
    }
  } catch (error) {
    yield put(updateUserError(error.response?.data));
  }
}
function* onLoadUsers() {
  yield takeEvery(actionTypes.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(actionTypes.CREATE_USER_START, onCreateUserStartAsync);
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(actionTypes.DELETE_USER_START);
    yield call(onDeleterUserStartAsync, userId);
  }
}

function* onUpdateUser() {
  yield takeLatest(actionTypes.UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}

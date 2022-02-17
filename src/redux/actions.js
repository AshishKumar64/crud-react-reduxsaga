import { actionTypes } from "./actionTypes";

export const loadUsersStart = () => ({
    type: actionTypes.LOAD_USERS_START
})

export const loadUsersSuccess = (users) => ({
    type: actionTypes.LOAD_USERS_SUCCESS,
    payload: users
});

export const loadUsersError = (error) => ({
    type: actionTypes.LOAD_USERS_ERROR,
    payload: error
})

export const createUserStart = (user) => ({
    type: actionTypes.CREATE_USER_START,
    payload: user
})

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserError = (error) => ({
    type: actionTypes.CREATE_USER_ERROR,
    payload: error
})

export const deleteUserStart = (userId) => ({
    type: actionTypes.DELETE_USER_START,
    payload: userId
})

export const deleteUserSuccess = (userId) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    payload: userId
})

export const deleteUserError = (error) => ({
    type: actionTypes.DELETE_USER_ERROR,
    payload: error
})

export const updateUserStart = (userInfo) => ({
    type: actionTypes.UPDATE_USER_START,
    payload: userInfo
})

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
})

export const updateUserError = (error) => ({
    type: actionTypes.UPDATE_USER_ERROR,
    payload: error
})
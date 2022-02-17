import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
import rootSaga from "./userSagas";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === "development"){
    // middlewares.push(logger);
}
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga);
export default store;
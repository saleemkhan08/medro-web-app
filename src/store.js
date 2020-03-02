import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
//import logger from "redux-logger";
import thunk from "redux-thunk";
import CategoryReducer from "./components/categories/CategoryReducer";
import AuthReducer from "./components/headers/AuthReducer";
import ImagesReducer from "./components/images/ImagesReducer";
import ProductReducer from "./components/products/ProductReducer";
const REACT_APP_API_KEY = "AIzaSyAAzstWb_q00rzlKRlls3ZcaAAdCm7NMNo";
const REACT_APP_AUTH_DOMAIN = "medro-2020.firebaseapp.com";
const REACT_APP_DATABASE_URL = "https://medro-2020.firebaseio.com";
const REACT_APP_PROJECT_ID = "medro-2020";
const REACT_APP_STORAGE_BUCKET = "medro-2020.appspot.com";
const REACT_APP_MESSAGE_SENDER_ID = 778426666283;
const REACT_APP_ID = "1:778426666283:web:6922479008b06307be896e";

export const store = createStore(
    combineReducers({
        CategoryReducer,
        ProductReducer,
        AuthReducer,
        ImagesReducer
    }),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export const config = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGE_SENDER_ID,
    appId: REACT_APP_ID
};

firebase.initializeApp(config);

export const database = firebase.database();

export const auth = firebase.auth();

export const storageRef = firebase.storage().ref();

export const storage = firebase.storage();

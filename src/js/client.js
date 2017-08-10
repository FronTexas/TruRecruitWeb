import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import {Provider} from 'react-redux';

import AppContainer from './pages/AppContainer';


const loggerMiddleware = createLogger();

function configureStore(initialState){
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	);
	return createStore(reducer,initialState,enhancer);
}

const store = configureStore({});


const app = document.getElementById("app");

ReactDOM.render(
		<Provider store={store}>
			<AppContainer></AppContainer>
		</Provider>
,app);



import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();
const connectRouterHistory = connectRouter(history);

function configureStoreDev(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
      thunk,
      reactRouterMiddleware,
    ];
  
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      createRootReducer(history),
      initialState,
      composeEnhancers(applyMiddleware(...middlewares))
    );
  
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(connectRouterHistory(nextRootReducer));
      });
    }
  
    return store;
}
  
const configureStore = configureStoreDev;

export default configureStore;
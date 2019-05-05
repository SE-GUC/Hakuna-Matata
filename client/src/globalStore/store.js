import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import setAuthToken from '../utils/setAuthToken';


function saveToLocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
    } catch(e) {
      console.log(e)
    }
  }
  function loadFromLocalStorage() {
    try {
      const serializedState = localStorage.getItem('state')
      const token = localStorage.getItem('jwtToken')
      setAuthToken(token);

      if (serializedState === null) return {}
      return JSON.parse(serializedState)
    } catch(e) {
      console.log(e)
      return {}
    }
  }
  
const initialState = {};
const persistedState = loadFromLocalStorage()

const middleware = [thunk];

const store = createStore(rootReducer/*our reducer */,    persistedState/*our initial state */,
    compose( 
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

)
);

store.subscribe(() => saveToLocalStorage(store.getState()))


export default store;
import { createStore, combineReducers } from "redux"
import { updateFeedReducer } from "./reducers/updateFeed"
import { modalsReducer } from "./reducers/modals"

const rootReducer = combineReducers({
  updateFeedReducer,
  modalsReducer
})

const store = createStore(updateFeedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
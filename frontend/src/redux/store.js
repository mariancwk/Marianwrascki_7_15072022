import { createStore } from "redux"
import { updateFeedReducer } from "./updateFeed"

const store = createStore(updateFeedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
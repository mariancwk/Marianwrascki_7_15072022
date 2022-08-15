import { createStore } from "redux"
import { updateFeedReducer } from "./reducers/updateFeed"

// Create a redux store with one redcuer
const store = createStore(updateFeedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
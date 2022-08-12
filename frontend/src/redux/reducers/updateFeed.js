const initialState = {
    posts:[]
}

export const UPDATE_FEED = 'UPDATE_FEED'

export const updateFeedReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_FEED:
            return {
                ...state,
                posts: action.payload
            }
            
        default:
            return state
    }
}

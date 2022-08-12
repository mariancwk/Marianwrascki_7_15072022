const initialState = {
    showSendPostModal: false,
    showEditPostModal: false
}
export const SHOW_SEND_POST_MODAL = 'SHOW_SEND_POST_MODAL'
export const CLOSE_SEND_POST_MODAL = 'CLOSE_SEND_POST_MODAL'
export const SHOW_EDIT_POST_MODAL = 'SHOW_EDIT_POST_MODAL'
export const CLOSE_EDIT_POST_MODAL = 'CLOSE_EDIT_POST_MODAL'


export const modalsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_SEND_POST_MODAL:
            return {
                ...state,
                showSendPostModal: true
            }
        
        case CLOSE_SEND_POST_MODAL:
            return {
                ...state,
                showSendPostModal: false
            }

        case SHOW_EDIT_POST_MODAL:
            return {
                ...state,
                showEditPostModal: true
            }
        
        case CLOSE_EDIT_POST_MODAL:
            return {
                ...state,
                showEditPostModal: false
            }

        default:
            return state
    }
}
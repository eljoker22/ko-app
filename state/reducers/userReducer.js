
const initialState = null;

const loadingReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USER':
            return state = action.user;
        default:
            return state;
    }
}

export default loadingReducer;
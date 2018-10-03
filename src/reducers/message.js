const initialState = {
    title: '',
    message: null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MESSAGE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


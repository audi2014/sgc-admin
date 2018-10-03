const initialState = {
    title: '',
    message: null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'HIDE_MESSAGE':
            return {
                title: '',
                message: null

            };
        case 'SHOW_MESSAGE':
            return {
                title: action.payload.title,
                message: action.payload.message
            };
        default:
            return state;
    }
}


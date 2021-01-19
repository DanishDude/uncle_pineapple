const initialState = {
    loading: false,
    isLoggedIn: false,
    requestLogin: false,
    user: {},
    token: '',
    error: '',
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'START_SIGNUP_LOGIN':
            return { ...state, loading: true, isLoggedIn: false, error: '', requestLogin: false };
        case 'SUCCESS_SIGNUP_LOGIN':
            return {
                ...state,
                loading: false,
                requestLogin: false,
                isLoggedIn: true,
                user: action.user,
                token: action.token,
            };
        case 'ERROR_SIGNUP_LOGIN':
            return { ...state, loading: false, isLoggedIn: false, requestLogin: false, error: action.err };
        case 'LOGOUT':
            return initialState;
        case 'REQUEST_LOGIN':
            return { ...state, requestLogin: true };
        case 'DENY_LOGIN_REQUEST':
            return { ...state, requestLogin: false };
        case 'LIKE_RECIPE':
            if (!state.user.likes.includes(action.recipeId)) {
                state.user.likes.push(action.recipeId);
            }
            return { ...state };
        case 'DISLIKE_RECIPE':
            state.user.likes = state.user.likes.filter((like) => like !== action.recipeId);
            return { ...state };
        default:
            return state;
    }
};

export default user;

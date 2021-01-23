// -------- User Signup-Login -------- //
export const startLoginSignup = () => ({
    type: 'START_LOGIN_SIGNUP',
});

export const successLoginSignup = (user, token) => ({
    type: 'SUCCESS_LOGIN_SIGNUP',
    user,
    token,
});

export const errorLoginSignup = (err) => ({
    type: 'ERROR_LOGIN_SIGNUP',
    err,
});

export const signup = (user) => (dispatch) => {
    dispatch(startLoginSignup());
    if (user.confirmPassword) delete user.confirmPassword;

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };

    fetch('http://localhost:5000/api/auth/signup', options)
        .then((res) => res.json())
        .then((payload) => {
            const { success, msg, user, token } = payload;

            if (!success) {
                dispatch(errorLoginSignup(msg));
            } else {
                dispatch(successLoginSignup(user, token));
            }
        })
        .catch((err) => {
            dispatch(errorLoginSignup('Signup error'));
            console.log(err);
        });
};

export const login = (user) => (dispatch) => {
    dispatch(startLoginSignup());

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };

    fetch('http://localhost:5000/api/auth/login', options)
        .then((res) => res.json())
        .then((payload) => {
            const { success, msg, user, token } = payload;

            if (!success) {
                dispatch(errorLoginSignup(msg));
            } else {
                dispatch(successLoginSignup(user, token));
            }
        })
        .catch((err) => {
            dispatch(errorLoginSignup('Login error'));
            console.log(err);
        });
};

// -------- Other User Actions -------- //
export const logout = () => ({
    type: 'LOGOUT',
});

export const requestLogin = (context) => ({
    type: 'REQUEST_LOGIN',
    context,
});

export const denyLoginRequest = () => ({
    type: 'DENY_LOGIN_REQUEST',
});

export const likeRecipe = (recipeId) => ({
    type: 'LIKE_RECIPE',
    recipeId,
});

export const dislikeRecipe = (recipeId) => ({
    type: 'DISLIKE_RECIPE',
    recipeId,
});

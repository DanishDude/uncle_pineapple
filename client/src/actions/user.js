import { REACT_APP_API_SERVER } from '@env';

// -------- User Signup-Login -------- //
export const startSignupLogin = () => ({
    type: 'START_SIGNUP_LOGIN',
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
    dispatch(startSignupLogin());
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
    dispatch(startSignupLogin());

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

export const startModifyUser = () => ({
    type: 'START_MODIFY_USER',
});

export const successModifyUser = (user) => ({
    type: 'SUCCESS_MODIFY_USER',
    user,
});

export const errorModifyUser = (err) => ({
    type: 'ERROR_MODIFY_USER',
    err,
});

export const modifyUser = (user, token) => (dispatch) => {
    dispatch(startModifyUser());

    let fd = new FormData();
    const allowed = ['avatar', 'firstname', 'lastname'];
    for (const [key, value] of Object.entries(user)) {
        if (allowed.includes(key)) {
            if (key === 'avatar' && typeof value !== 'string') {
                fd.append(key, value);
            } else {
                fd.append(key, value);
            }
        }
    }

    const options = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: token,
        },
        body: fd,
    };

    fetch(`${REACT_APP_API_SERVER}/user`, options)
        .then((res) => res.json())
        .then((payload) => {
            const { success, msg, user } = payload;

            if (!success) {
                dispatch(errorLoginSignup(msg));
            } else {
                dispatch(successModifyUser(user));
                dispatch(getUserInfo(token));
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(errorLoginSignup('Error updating user'));
        });
};

export const getUserInfo = (token) => (dispatch) => {
    dispatch(startModifyUser());

    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        },
    };

    fetch(`${REACT_APP_API_SERVER}/user`, options)
        .then((res) => res.json())
        .then((payload) => {
            const { success, msg, user } = payload;

            if (!success) {
                dispatch(errorModifyUser(msg));
            } else {
                dispatch(successModifyUser(user));
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(errorModifyUser('Error fetching user info'));
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

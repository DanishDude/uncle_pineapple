const initialState = {
    loading: false,
    recipes: [],
    error: '',
};

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_GET_ALL_RECIPES':
            return { ...state, loading: true };
        case 'SUCCESS_GET_ALL_RECIPES':
            return { ...state, recipes: action.recipes, loading: false, error: '' };
        case 'ERROR_GET_ALL_RECIPES':
            return { ...state, loading: false, error: action.err };
        default:
            return state;
    }
};

export default recipes;

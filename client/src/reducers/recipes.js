const initialState = {
    loading: false,
    recipe: {},
    recipes: [],
    error: '',
};

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_GET_RECIPE':
            return { ...state, loading: true, error: '' };
        case 'SUCCESS_GET_RECIPE':
            return { ...state, recipe: action.recipe, loading: false, error: '' };
        case 'ERROR_GET_RECIPE':
            return { ...state, loading: false, error: action.err };
        case 'LOADING_GET_ALL_RECIPES':
            return { ...state, loading: true, error: '' };
        case 'SUCCESS_GET_ALL_RECIPES':
            return { ...state, recipes: action.recipes, loading: false, error: '' };
        case 'ERROR_GET_ALL_RECIPES':
            return { ...state, loading: false, error: action.err };
        default:
            return state;
    }
};

export default recipes;

import recipes from '../reducers/recipes';

export const startGetAllRecipes = () => ({
    type: 'LOADING_GET_ALL_RECIPES',
});

export const successGetAllRecipes = (recipes) => ({
    type: 'SUCCESS_GET_ALL_RECIPES',
    recipes,
});

export const errorGetAllRecipes = (err) => ({
    type: 'ERROR_GET_ALL_RECIPES',
    err,
});

export const getAllRecipes = () => (dispatch) => {
    dispatch(startGetAllRecipes());

    fetch('http://localhost:5000/api/recipe/search?ids')
        .then((res) => res.json())
        .then((payload) => {
            const { success, msg, recipes } = payload;

            if (!success) {
                dispatch(errorGetAllRecipes(`Error: ${msg}`));
            } else {
                dispatch(successGetAllRecipes(recipes));
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(errorGetAllRecipes(error));
        });
};

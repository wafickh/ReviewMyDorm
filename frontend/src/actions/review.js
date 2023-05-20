import * as api from '../api'


export const createReview = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createReview(formData);
        dispatch({ type: 'Create_Review', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}




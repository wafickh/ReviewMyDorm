import * as api from '../api'

export const getAllReviews = () => async (dispatch) => {
    try {
        const { data } = await api.getReviews();
        dispatch({ type: 'FETCH_REVIEWS', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

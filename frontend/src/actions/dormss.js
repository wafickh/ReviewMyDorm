import * as api from '../api'

export const getAllDorms = () => async (dispatch) => {
    try {
        const { data } = await api.getDorms();
        dispatch({ type: 'FETCH_DORMS', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

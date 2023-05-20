import * as api from '../api'

export const getDormById = (id) => async (dispatch) => {
    try {
        const { data } = await api.GetDorm(id);
        dispatch({ type: 'FETCH_Dorm', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}


import * as api from '../api'


export const createDorm = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createDorm(formData);
        dispatch({ type: 'Create_Dorm', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}




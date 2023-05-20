import * as api from '../api'


export const UpdateDorm = (id) => async (dispatch) => {
    try {
        const { data } = await api.approvedorms(id);
        dispatch({ type: 'Update_Dorm', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
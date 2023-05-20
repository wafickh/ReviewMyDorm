import * as api from '../api'


export const updatereview = (id,dormid) => async (dispatch) => {
    try {
        const { data } = await api.approvereviews(id,dormid);
        dispatch({ type: 'Update_Review', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
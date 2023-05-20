import * as api from '../api'


export const DeleteDorm = (schoolid,dormid,userid) => async (dispatch) => {
    try {
        const { data } = await api.deletedorms(schoolid, dormid, userid);
        dispatch({ type: 'Delete_Dorm', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
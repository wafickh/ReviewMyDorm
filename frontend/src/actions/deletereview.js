import * as api from '../api'


export const deleteReview = ( dormid, userid, reviewid) => async (dispatch) => {
    try {
        const { data } = await api.deletereviews( dormid, userid,reviewid);
        dispatch({ type: 'Delete_Review', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
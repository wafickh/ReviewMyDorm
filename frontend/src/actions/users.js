import * as api from '../api'

export const allusers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: 'FETCH_Users', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

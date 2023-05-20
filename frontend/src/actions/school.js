import * as api from '../api'


export const getSchoolByName = (Name) => async (dispatch) => {
    try {
        const { data } = await api.fetchSchoolName(Name);
        dispatch({ type: 'FETCH_Name', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
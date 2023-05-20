import * as api from '../api'

export const getSchools=()=> async (dispatch) =>{
    try{
        const {data}=await api.fetchSchools();
        dispatch({ type: 'FETCH_ALL', payload: data })
    }catch(error){
        console.log(error.message)
    }
}



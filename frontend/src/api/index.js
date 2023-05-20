import axios from 'axios';

const url = 'http://localhost:5000/api/schools'

export const fetchSchools = () => axios.get(url);

export const fetchSchoolName = (Name) => axios.get(`http://localhost:5000/api/schools/findName/${Name}`, Name);

export const getDorms = () => axios.get(`http://localhost:5000/api/dorms`)

export const getReviews = () => axios.get(`http://localhost:5000/api/reviews`)

export const getUsers = () => axios.get('http://localhost:5000/api/users')

export const GetDorm = (id) => axios.get(`http://localhost:5000/api/dorms/find/${id}`, id);

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const approvedorms = (id) => axios.put(`http://localhost:5000/api/dorms/${id}`, id)
export const deletedorms = (schoolid, dormid, userid) => axios.delete(`http://localhost:5000/api/dorms/${schoolid}/${dormid}/${userid}`, schoolid, dormid, userid)

export const approvereviews = (id, dormid) => axios.put(`http://localhost:5000/api/reviews/${id}/${dormid}`, id, dormid)
export const deletereviews = (dormid, userid, reviewid) => axios.delete(`http://localhost:5000/api/reviews/${dormid}/${userid}/${reviewid}`, dormid, userid, reviewid)


export const createDorm = (formData) => API.post('/dorms', formData);
export const createReview = (formData) => API.post('/reviews', formData);


import { combineReducers } from 'redux';
import schools from './schools';
import school from './school';
import authReducer from './Auth';
import dorms from './dorms';
import dormss from './dormss';
import reviews from './reviews'
import users from './users'
import dormi from './approvedorm'
import dormii from './deletedorm'
import reviewi from './approvereview'
import reviewii from './deletereview'
export default combineReducers({dormii,reviewii, reviewi, schools, school, authReducer, dorms, dormss, reviews,users,dormi });
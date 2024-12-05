import { combineReducers } from 'redux'
import authReducer from '../features/authSlice.js'
import { authApi } from '@/features/api/authApi.js'
import { courseApi } from '@/features/api/courseApi.js'


const rootReducer = combineReducers({
 auth: authReducer,
 [authApi.reducerPath]:authApi.reducer,
 [courseApi.reducerPath]:courseApi.reducer,
})

export default rootReducer;
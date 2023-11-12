import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import counterSlice from '../features/counter/counterSlice'
// import { applyMiddleware } from 'redux'


export default configureStore({
  reducer: {
    counter : counterSlice
  },
  middleware : [thunkMiddleware]
}
)
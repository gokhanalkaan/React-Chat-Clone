import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authRedux'
import chatReducer from './chatRedux'
import socketReducer from './socketRedux'
import darkModeReducer from './darkModeRedux'




export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat:chatReducer,
    socket:socketReducer,
    darkMode:darkModeReducer
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});


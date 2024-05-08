// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../features/authSlice'; 
import courseReducer from '../features/courseSlice'; 

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can specify a whitelist or blacklist of reducers
  // whitelist: ['auth', 'courses'] // Only 'auth' and 'courses' will be persisted
  // blacklist: ['reducerToIgnore'] // 'reducerToIgnore' will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store); // Create the persistor once the store is configured

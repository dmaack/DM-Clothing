import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // we want to use local storage as default storage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';

const persistConfig = {
    key: 'root',
    storage, 
    whitelist: ['cart'] // the only thing we want to persist is the cart
}

const rootReducer = combineReducers ({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer
});

// Modified version of rootReducer and the persistance capabalities from redux-persist
export default persistReducer(persistConfig, rootReducer);
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart:(state, action)=>{
            return action.payload
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://backend-ecommerce-production-645d.up.railway.app/api/v1/cart', getConfig())
        .then((res) => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartProduct = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://backend-ecommerce-production-645d.up.railway.app/api/v1/cart/${id}`,getConfig())
        .then(() => dispatch(dispatch(getCartThunk())))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://backend-ecommerce-production-645d.up.railway.app/api/v1/cart',product, getConfig())
        .then(() => dispatch(dispatch(getCartThunk())))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://backend-ecommerce-production-645d.up.railway.app/api/v1/order',{},getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const {  setCart } = cartSlice.actions;

export default cartSlice.reducer;

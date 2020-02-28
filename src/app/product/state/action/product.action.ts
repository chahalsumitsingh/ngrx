import { createAction, props } from '@ngrx/store'
import { ProductActionTypes } from '../models/action.type';
import { ProductModel } from 'src/app/models/product';

export const TOGGLE_PRODUCT_CODE = createAction(ProductActionTypes.TOGGLE_PRODUCT_CODE, props<{ data: boolean }>());
export const ADD_PRODUCT = createAction(ProductActionTypes.ADD_PRODUCT, props<{ data: ProductModel }>());
export const ADD_PRODUCT_SUCCESS = createAction(ProductActionTypes.ADD_PRODUCT_SUCCESS, props<{ data: boolean }>());
export const ADD_PRODUCT_ERROR = createAction(ProductActionTypes.ADD_PRODUCT_ERROR, props<{ data: string }>());
export const SET_CURRENT_PRODUCT = createAction(ProductActionTypes.SET_CURRENT_PRODUCT, props<{ data: number }>());
export const UPDATE_PRODUCT = createAction(ProductActionTypes.UPDATE_PRODUCT, props<{ data: ProductModel }>());
export const SELECT_PRODUCT = createAction(ProductActionTypes.SELECT_PRODUCT, props<{ data: number }>());
export const LOAD_PRODUCTS_SUCCESS = createAction(ProductActionTypes.LOAD_PRODUCTS_SUCCESS, props<{ data: Array<ProductModel> }>());
export const LOAD_PRODUCTS_ERROR = createAction(ProductActionTypes.LOAD_PRODUCTS_ERROR, props<{ data: any }>());
export const LOAD_PRODUCTS = createAction(ProductActionTypes.LOAD_PRODUCTS);
export const UPDATE_PRODUCT_SUCCESS = createAction(ProductActionTypes.UPDATE_PRODUCT_SUCCESS, props<{ data: ProductModel }>());
export const UPDATE_PRODUCT_ERROR = createAction(ProductActionTypes.UPDATE_PRODUCT_ERROR, props<{ data: string }>());
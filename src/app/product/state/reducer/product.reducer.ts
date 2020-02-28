import { createReducer, on, State } from "@ngrx/store";
import { TOGGLE_PRODUCT_CODE, ADD_PRODUCT, UPDATE_PRODUCT, SELECT_PRODUCT, LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_ERROR, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, ADD_PRODUCT_ERROR } from '../action/product.action';
import { ProductState } from '../models/product.state';
import { Action } from 'rxjs/internal/scheduler/Action';

export const initialState: ProductState = {
    showProductCode: false,
    products: [],
    currentProductId: 0,
    error: ''
}
const _productReducer = createReducer(initialState,
    on(TOGGLE_PRODUCT_CODE, (state, action): ProductState => {
        return {
            ...state,
            showProductCode: action.data
        }
    }),
    // on(ADD_PRODUCT, (state, action): ProductState => {
    //     return {
    //         ...state,
    //         products: [...state.products, action.data]
    //     }
    // }),
    on(ADD_PRODUCT_ERROR, (state, action): ProductState => {
        return {
            ...state,
            error: action.data
        }
    }),
    on(SELECT_PRODUCT, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.data
        }
    }),
    on(UPDATE_PRODUCT_SUCCESS, (state, action): ProductState => {
        let updatedProducts = state.products.map(item => item.Id === action.data.Id ? action.data : item);
        return {
            ...state,
            products: updatedProducts,
            error: '',
            currentProductId: action.data.Id
        }
    }),
    on(UPDATE_PRODUCT_ERROR, (state, action): ProductState => {
        return {
            ...state,
            error: action.data

        }
    }),
    // on(UPDATE_PRODUCT, (state, action) => {
    //     let updatedProducts = state.products.map(item => item.Id === action.data.Id ? action.data : item);
    //     return {
    //         ...state,
    //         products: updatedProducts,
    //         currentProductId: action.data.Id
    //     }
    // //   let index = state.products.map(x => x.Id).indexOf(action.data.Id);
    // //   return {
    // //       ...state,
    // //       products: [...state.products]
    // //   }
    // }),
    on(LOAD_PRODUCTS_SUCCESS, (state, action): ProductState => {
        return {
            ...state,
            products: action.data,
            error: ''
        }
    }),
    on(LOAD_PRODUCTS_ERROR, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.data
        }
    }));


export function productReducer(state, action) {
    return _productReducer(state, action)
}
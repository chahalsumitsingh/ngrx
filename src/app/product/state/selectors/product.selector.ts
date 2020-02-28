import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { ProductState } from '../models/product.state';
import { ProductModel } from 'src/app/models/product';

const productSelector = createFeatureSelector<ProductState>('products');

export const selectshowProductCode = createSelector(
    productSelector,
    (state: ProductState) => state.showProductCode
)

export const selectProcuctLoadError = createSelector(
    productSelector,
    (state: ProductState) => state.error
)

export const selectProductList = createSelector(
    productSelector,
    (state: ProductState) => {
        return state.products
    }
)



export const selectCurrentProduct = createSelector(
    productSelector,
    (state: ProductState) => {
        if (state.currentProductId > 0) {
            return state.products.find(x => x.Id === state.currentProductId);
        } else {
            return new ProductModel()
        }
    }
)
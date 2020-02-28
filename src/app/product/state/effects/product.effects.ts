import { Injectable } from "@angular/core";
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_ERROR, UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, ADD_PRODUCT, ADD_PRODUCT_ERROR } from '../action/product.action';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ProductModel } from 'src/app/models/product';

@Injectable()
export class ProductEffects {

    constructor(private action$: Actions, private productService: ProductService) {

    }

   // @Effect()
    loadProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_PRODUCTS),
            mergeMap(() => this.productService.getProducts()
                .pipe(
                    map(res => LOAD_PRODUCTS_SUCCESS({ data: res })),
                    catchError(async (res) => LOAD_PRODUCTS_ERROR({ data: res }))
                )
            )
        ));


   // @Effect()
    updateProduct$ = createEffect(() => this.action$.pipe(
        ofType(UPDATE_PRODUCT),
        map(action => action.data),
        mergeMap((data: ProductModel) =>
            this.productService.putProduct(data).pipe(
                map(res => UPDATE_PRODUCT_SUCCESS({ data: res })),
                catchError(async err => UPDATE_PRODUCT_ERROR({ data: err }))
            ))
    ))

  //  @Effect()
    addProduct$ = createEffect(() => this.action$.pipe(
        ofType(ADD_PRODUCT),
        map(action => {
            console.log('add effect')
            return action.data}),
        mergeMap((data: ProductModel) =>
            this.productService.createProduct(data).pipe(
                map(res => LOAD_PRODUCTS()),
                catchError(async err => ADD_PRODUCT_ERROR({ data: err }))
            ))
    ))


    //     @Effect()
    //    updateProduct$ = createEffect(() = this.action$.pipe(
    //        ofType(UPDATE_PRODUCT),
    //        mergeMap(() => this.productService.putProduct())
    //    ))
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TOGGLE_PRODUCT_CODE, SELECT_PRODUCT, LOAD_PRODUCTS } from '../state/action/product.action';
import * as fromProduct from './../state/models/product.state';
import * as fromProductSelector from './../state/selectors/product.selector';
import { ProductModel } from 'src/app/models/product';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  errorMessage$: Observable<string>;
  componentActive = true;
  products = []
  productCodeStore$: any;
  productListStore$: any;
  productDisplayCode: boolean = true;
  addProduct: boolean = false;
  selectedProduct: {
    type: boolean,
    product: any
  };
  constructor(private store: Store<{ products: fromProduct.ProductState }>) {
    this.productCodeStore$ = store.pipe(select(fromProductSelector.selectshowProductCode), takeWhile(() => this.componentActive));
    this.productListStore$ = store.pipe(select(fromProductSelector.selectProductList), takeWhile(() => this.componentActive));
    this.errorMessage$ = store.pipe(select(fromProductSelector.selectProcuctLoadError), takeWhile(() => this.componentActive));
  }
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit() {

    this.store.dispatch(LOAD_PRODUCTS())

    this.productCodeStore$.subscribe((showProductCode: boolean) => {
      this.productDisplayCode = showProductCode;
    })


    this.productListStore$.subscribe((products: Array<ProductModel>) => {
      this.products = products;
      this.addProduct = false;
    });
  }

  checkChanged(value: boolean) {
    console.log(value);
    this.store.dispatch(TOGGLE_PRODUCT_CODE({ data: value }));
  }

  editRecord(product: ProductModel) {
    this.addProduct = true;
    this.store.dispatch(SELECT_PRODUCT({data: product.Id}));
  }

  addNewProduct(){
    this.store.dispatch(SELECT_PRODUCT({data: 0}));
  }

}

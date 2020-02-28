import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Store, select } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product';
import { ADD_PRODUCT, UPDATE_PRODUCT } from '../state/action/product.action';
import { selectCurrentProduct } from '../state/selectors/product.selector';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  productForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private store: Store<{ data: ProductModel }>) {

    this.productForm = this.formbuilder.group({
      Id: [0],
      Name: [''],
      ProductCode: ['']
    });

  }

  ngOnInit() {

    this.store.pipe(select(selectCurrentProduct)).subscribe(res => {
      if (res.Id) {
        this.productForm.patchValue(res);
      }else{
        this.productForm.reset();
      }
    })
  }

  onSubmit() {

    if (!this.productForm.value.Id) {
      let productInfo = {
        Id: Math.random(),
        Name: this.productForm.value.Name,
        ProductCode: this.productForm.value.ProductCode
      }
      console.log('on component')
      this.store.dispatch(ADD_PRODUCT({ data: productInfo }));
    } else {
      this.store.dispatch(UPDATE_PRODUCT({ data: this.productForm.value }));
    }
  }

}

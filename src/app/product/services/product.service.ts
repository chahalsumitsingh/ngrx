import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductModule } from '../product.module';
import { ProductModel } from 'src/app/models/product';

@Injectable()
export class ProductService {
    apiUrl = 'http://localhost:3000'
    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<Array<ProductModel>> {
        return this.http.get<Array<ProductModel>>(this.apiUrl);
        // return this.http.get(this.apiUrl);
    }

    putProduct(product: ProductModel): Observable<ProductModel> {
        return this.http.put<ProductModel>(this.apiUrl, product);
    }

    deleteProduct(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiUrl + '/' + productId);
    }

    createProduct(product: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>(this.apiUrl, product);
    }
}
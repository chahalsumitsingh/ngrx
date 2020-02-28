import { ProductModel } from 'src/app/models/product';
import * as fromRoot from 'src/app/state/app.state';

export interface ProductState extends fromRoot.State{
    showProductCode: boolean;
    currentProductId: number;
    products: ProductModel[];
    error: string;
}
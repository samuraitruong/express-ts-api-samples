import { ICart, ICartItem } from '../models/cart';
import { OZSaleService } from './ozsale-service';
import { ShoppingCartRepository } from '../repositories/shopping-cart-repository';

export class ShoppingCartService {
    constructor(private repository : ShoppingCartRepository, private ozSaleService : OZSaleService) {}
    public async addItem(item : ICartItem) {
        // fetching cart detail
        item.productDetail = await this
            .ozSaleService
            .getSaleProductDetail(item.productId);
        return await this
            .repository
            .addCartItem(item);
    }
    public async GetMyCart() : Promise < ICart > {
        const item = await this
            .repository
            .getCardByUserId();
        return item || {
            items: []
        }
    }
}
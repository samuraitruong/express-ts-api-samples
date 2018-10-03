import {ICart, ICartItem} from "../models/cart";
import {ShoppingCartRepository} from "../repositories/shopping-cart-repository";
import {OZSaleService} from "./ozsale-service";

export class ShoppingCartService {
    constructor(private repository: ShoppingCartRepository, private ozSaleService: OZSaleService) {}
    public async addItem(item: ICartItem) {
        // fetching cart detail
        console.log("card item", item);
        item.productDetail = await this
            .ozSaleService
            .getSaleProductDetail(item.saleId, item.productId);
        return await this
            .repository
            .addCartItem(item);
    }
    public async GetMyCart(): Promise<ICart> {
        return await this.repository.getCardByUserId();
    }
}
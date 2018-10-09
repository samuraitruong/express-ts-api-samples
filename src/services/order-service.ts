import { IOrder } from "../models/order";
import { ShoppingCartRepository } from "../repositories/shopping-cart-repository";

export class OrderService {
    constructor(private cartRepository: ShoppingCartRepository) {

    }
    public async convertShoppingCartToOrder(): Promise<IOrder> {
        const cart = this.cartRepository.getCardByUserId();
        return null;
    }
}
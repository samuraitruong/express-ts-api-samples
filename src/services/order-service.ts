import {
    IOrder,
    IOrderModel,
    Order,
    OrderStatus,
    } from "../models/order";
import { ShoppingCartRepository } from "../repositories/shopping-cart-repository";

export class OrderService {
    constructor(private cartRepository: ShoppingCartRepository) {

    }
    public async convertShoppingCartToOrder(): Promise<IOrderModel> {
        const cart = await this.cartRepository.getCardByUserId();
        if (cart != null) {
            const cartId = cart._id.toString();
            const order = await Order.findOneAndDelete({ cartId});
            const newOrder: IOrder = {
                cartId,
                items: cart.items,
                orderNumber: "",
                status: OrderStatus.DRAFT,
                userId: cart.userId,

            };
            const createdModel = await Order.create(newOrder);

            return createdModel;
        }
        return null;
    }
}
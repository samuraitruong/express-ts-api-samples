import { IUser } from "../models";
import {
    ICart,
    ICartItem,
    ICartModel,
    ShoppingCart,
} from "../models/cart";
export class ShoppingCartRepository {
    constructor(private user: IUser) { }
    public async addCartItem(item: ICartItem): Promise<ICart> {
        try {
            let cart: ICartModel = await ShoppingCart.findOne({ userId: this.user.userId });
            if (cart == null) {
                const newCart: ICart = {
                    items: [item],
                    userId: this.user.userId,
                };
                await ShoppingCart.create(newCart);
            } else {
                cart
                    .items
                    .push(item);
                const result = await ShoppingCart.findOneAndUpdate({
                    _id: cart._id,
                }, cart);
            }

            cart = await ShoppingCart.findOne({ userId: this.user.userId });
            return cart.simplify();
        } catch (err) {
            console.log(err);
        }
    }
    public async getCardByUserId(userId?: string): Promise<ICartModel> {
        try {
            const cart: ICartModel = await ShoppingCart.findOne({ userId: this.user.userId });
            if (cart === null) {
                return null;
            }
            return cart; // .simplify();
        } catch (err) {
            console.log(err);
        }
    }
    public async update(item: ICart): Promise<ICart> {
        try {
            const cart: ICartModel = await ShoppingCart.findOneAndUpdate({
                userId: this.user.userId,
            }, item);
            return cart;
        } catch (err) {
            console.log(err);
        }
    }
}
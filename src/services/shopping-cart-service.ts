import * as moment from "moment";
import { ICart, ICartItem } from "../models/cart";
import { NotFoundError } from "../common/errors";
import { OZSaleService } from "./ozsale-service";
import { ShoppingCartRepository } from "../repositories/shopping-cart-repository";

export class ShoppingCartService {
    constructor(private repository: ShoppingCartRepository, private ozSaleService: OZSaleService) { }
    public async addItem(item: ICartItem): Promise<ICart> {
        // fetching cart detail
        const cart = await this.GetMyCart();
        console.log("item.size", item.size)
        if (cart && cart.items && cart.items.find((x) => x.productId === item.productId && x.size === item.size)) {
            // update quatity only
            const filter = cart
                .items
                .filter((x) => x.productId === item.productId);
            filter[0].quantity += item.quantity;
            return await this
                .repository
                .update(cart);
        }

        item.productDetail = await this
            .ozSaleService
            .getSaleProductDetail(item.productId);
        return await this
            .repository
            .addCartItem(item);
    }

    public async updateItem(item: ICartItem): Promise<ICart> {
        // fetching cart detail
        const cart = await this.GetMyCart();
        if (cart && cart.items && cart.items.find((x) => x.productId === item.productId)) {
            // update quatity only
            const filter = cart
                .items
                .filter((x) => x.productId === item.productId);
            filter[0].quantity = item.quantity;
            return await this
                .repository
                .update(cart);
        }

        throw new NotFoundError("Not Found - Could not found requested cart item");
    }

    public async GetMyCart(): Promise<ICart> {
        const item = await this
            .repository
            .getCardByUserId();
        return item || {
            items: [],
            userId: "",
        };
    }

    public async removeItem(itemId: string): Promise<ICart> {
        const item = await this
            .repository
            .getCardByUserId();
        if (item && item.items) {
            item.items = item
                .items
                .filter((x) => x.productId !== itemId);
        }
        item.updatedOn = moment()
            .utc()
            .unix();
        await this
            .repository
            .update(item);
        return item;
    }

}
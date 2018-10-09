import * as moment from "moment";
import {
    Document,
    Model,
    model,
    Schema,
} from "mongoose";
export type UserStatus = 0 | 1 | 2;
// read more at -
// https://medium.com/@brianalois/build-node-mongo-rest-api-2018-jwt-eff0e4f41007
export interface ICartItem {
    productId: string;
    quantity: number;
    price: number;
    size: string;
    productDetail: any;

}
export interface ICart {
    userId: string;
    updatedOn?: number;
    items: ICartItem[];

}

export interface ICartModel extends ICart, Document {
    simplify(): ICart;
}
export const CartItemSchema: Schema = new Schema({
    size: String, price: Number,
    productId: String, quantity: Number, productDetail: Schema.Types.Mixed,
});
export const CartSchema: Schema = new Schema({
    items: [CartItemSchema],
    updateOn: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});
// tslint:disable-next-line:only-arrow-functions
CartSchema.pre<ICartModel>("save", function(next, documents) {
    this.updatedOn = moment()
        .utc()
        .unix();
    next();
});
// tslint:disable-next-line:only-arrow-functions
CartSchema.methods.simplify = function() {
    const { userId, updatedOn, items } = this;
    return { userId, updatedOn, items };
};
export const ShoppingCart: Model<ICartModel> = model<ICartModel>("cart", CartSchema);
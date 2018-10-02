import { ObjectID } from "bson";
import * as moment from "moment";
import { Document, Model, model, Schema } from "mongoose";
export type UserStatus = 0 | 1 | 2;
// read more at - https://medium.com/@brianalois/build-node-mongo-rest-api-2018-jwt-eff0e4f41007
export interface ICartItem {
    productId: string;
    saleId: string;
    quatity: number;
    price: number;

}
export interface ICart {
    userId: string;
    updatedOn: number;
    items: ICartItem[];
}

export interface ICartModel extends ICart, Document {
}
export const CartItemSchema: Schema = new Schema({
    price: Number,
    productId: String,
    quatity: Number,
    saleId: String,
});
export const CartSchema: Schema = new Schema({
    items: [CartItemSchema],
    updateOn: Number,
    userId: ObjectID,
});
// tslint:disable-next-line:only-arrow-functions
CartSchema.pre<ICartModel>("save", function(next, documents) {
    this.updatedOn = moment().utc().unix();
    next();
});
export const ShoppingCart: Model<ICartModel> = model<ICartModel>("cart", CartSchema);
import {
    Document,
    model,
    Model,
    Schema,
    } from "mongoose";
import { Utils } from "../common/utils";
import { CartSchema, ICart } from "./cart";
export interface IOrder extends ICart {
    orderNumber: string;
}

export interface IOrderModel extends IOrder, Document {
}

export const OrderSchema = Utils.extendSchema(CartSchema, {
    orderNumber: String,
});

export const Order: Model<IOrderModel> = model<IOrderModel>("order", OrderSchema);
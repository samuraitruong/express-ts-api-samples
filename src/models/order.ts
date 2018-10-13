import {
    Document,
    model,
    Model,
    Schema,
} from "mongoose";
import { Utils } from "../common/utils";
import { CartSchema, ICart } from "./cart";
export enum OrderStatus {
    DRAFT = "draft",
    PAID = "paid",
    INREVIEW = "inreview",
    COMPLETED = "completed",
}
export interface IOrder extends ICart {
    orderNumber: string;
    cartId: string;
    status: OrderStatus;
}

export interface IOrderModel extends IOrder, Document {
}

export const OrderSchema = Utils.extendSchema(CartSchema, {
    orderNumber: String,
    cartId: String,
});

export const Order: Model<IOrderModel> = model<IOrderModel>("order", OrderSchema);
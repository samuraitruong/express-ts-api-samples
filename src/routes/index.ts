import { apiRoute } from "./api";
import { authRoute } from "./auth";
import { cartRoute } from "./cart";
import { orderRoute } from "./order";
import { userRoute } from "./user";
import { webhookRoute } from "./webhook";
export const Routes = [apiRoute, userRoute, authRoute, cartRoute, webhookRoute, orderRoute];
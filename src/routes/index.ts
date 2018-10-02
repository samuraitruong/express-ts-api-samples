import { apiRoute } from "./api";
import { authRoute } from "./auth";
import { cartRoute } from "./cart";
import { userRoute } from "./user";
export const Routes = [
    apiRoute,
    userRoute,
    authRoute,
    cartRoute,
];
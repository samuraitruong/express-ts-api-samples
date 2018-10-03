import {default as Axios} from "axios";
import * as Cheerio from "cheerio";
import {appConfigs} from "../config";
import {getProductDetail} from "../controllers/api-controller";
import {IMenu} from "../models/menu";
import {ISoldoutItem} from "../models/ozsale";
export class OZSaleService {
    private URL = "https://ozsale.com.au";
    public async getMenuList() : Promise < IMenu[] > {
        const url = `https://www.ozsale.com.au/api/shop/shop/v2/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/categorytree`;
        console.log("url", url)
        const response = await Axios.get(url);
        return response.data;
    }

    public async getCategoryData(category : string, limit : number, lastGroupType?: string, lastGroupOffset?: number) : Promise < any > {
        let url = `https://www.ozsale.com.au/api/sale/sale/v3/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/banners/grouped/?limit=${limit}&category=${category}`;
        if (lastGroupType) {
            url += "&lastGroupType=" + lastGroupType;
        }

        if (lastGroupOffset) {
            url += "&lastGroupOffset=" + lastGroupOffset;
        }
        console.log("request url", url)
        const resposne = await Axios.get(url);
        //const list = resposne.data.d.List;
        return resposne.data;
    }

    public async getSoldoutItem(catId : string) : Promise < ISoldoutItem[] > {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSoldOutItems?saleID=" + catId + "&languageID=en&countryID=AS&userGroup=Member";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value as ISoldoutItem[];
    }

    public async getSaleItem(itemId : string) : Promise < any > {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleItems?saleID=" + itemId.trim() + "&imageSize=100&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        const soldout = await this.getSoldoutItem(itemId);
        console.log("sold out", soldout);
        if (resposne && resposne.data && resposne.data.d && resposne.data.d.List && resposne.data.d.List.length > 0) {
            const list = resposne.data.d.List[0];

            list.SubCategories = list
                .SubCategories
                .map((cat : any) => {
                    cat.Items = cat
                        .Items
                        .map((item : any) => {
                            item.SoldOut = soldout.filter((x) => x.ID === item.ID).length > 0;
                            return item;
                        });
                    return cat;
                });
            return list;
        }
        return [];
    }
    public async getSaleItemCategories(itemId : string) : Promise < any > {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleCategories?saleID=" + itemId + "&getSizes=true&getSaleInfo=true&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }

    public async getSaleProductDetail(saleId : string, productId : string) : Promise < any > {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicItemDetails?itemID=" + productId + "&saleID= " + saleId + "&getBigImages=true&includePrices=true&languageID=en&countryID=AS&countryID=AS&us" +
                "erGroup=";
        const resposne = await Axios.get(url);
        const product = resposne.data.d.Value;
        const publicDetails = await this.getSalePublicDetails(saleId);
        return {
            ...product,
            publicDetails
        };
    }

    public async getSalePublicDetails(saleId : string) : Promise < any > {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleDetails?saleID=" + saleId + "&languageID=en&countryID=AS&countryID=AS&userGroup=Member";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }

    public async getSaleProductQuantity(saleId : string, productId : string) : Promise < any > {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicItemQuantity?itemID=" + productId + "&saleID= " + saleId + "&getBigImages=true&includePrices=true&languageID=en&countryID=AS&countryID=AS&us" +
                "erGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }
}
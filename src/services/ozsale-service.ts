import * as Cheerio from "cheerio";
import { appConfigs } from "../config";
import { default as Cache } from "./cache-service";
import { default as Axios } from "axios";
import { getFacets, getProductDetail } from "../controllers/api-controller";
import { IMenu } from "../models/menu";
import { ISoldoutItem } from "../models/ozsale";
; export class OZSaleService {
    private URL = "https://ozsale.com.au";
    public async getMenuList(): Promise<IMenu[]> {
        const url = `https://www.ozsale.com.au/api/shop/shop/v2/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/categorytree`;
        console.log("url", url);
        const response = await Axios.get(url);
        return response.data;
    }

    public async getCategoryData(category: string, limit: number, lastGroupType?: string, lastGroupOffset?: number): Promise<any> {
        let url = `https://www.ozsale.com.au/api/sale/sale/v3/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/banners/grouped/?limit=${limit}`;
        if (category) {
            url += `&category=${category}`;
        }
        if (lastGroupType) {
            url += "&lastGroupType=" + lastGroupType;
        }

        if (lastGroupOffset) {
            url += "&lastGroupOffset=" + lastGroupOffset;
        }
        console.log("request url", url);
        return await this.get(url);
    }
    public async getFacets(): Promise<any> {
        const url = `https://www.ozsale.com.au/api/shop/shop/v2/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/facets`;

        const resposne = await Axios.get(url);
        // const list = resposne.data.d.List;
        return resposne.data;
    }
    public async getSorting(): Promise<any> {
        const url = `https://www.ozsale.com.au/api/shop/shop/v2/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/sorting`;

        const resposne = await Axios.get(url);
        // const list = resposne.data.d.List;
        return resposne.data;
    }
    public async getOurPay(amount: number): Promise<any> {
        const url = `https://www.ozsale.com.au/api/shop/product/v1/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/ourpaydata?currencyId=AUD&amount=${amount}`;

        const resposne = await Axios.get(url);
        // const list = resposne.data.d.List;
        return resposne.data;
    }
    public async getSaleItems(page: number, pageSize: number, category: string, filters: string = "{}", query: string = "", sort: string = "quantitySoldDesc"): Promise<any> {
        let url = "https://www.ozsale.com.au/api/shop/shop/v2/accounts/" + appConfigs.OZSALE_ACCOUNT_ID + `/products?q=${encodeURIComponent(query)}&pn=${page}&ps=${pageSize}`;
        if (category) {
            url += "&c=" + encodeURIComponent(category);
        }
        if (filters) {
            url += "&ff" + encodeURIComponent(filters);
        } else {
            url += "&ff=%7B%7D";
        }
        url += "&sa=" + sort;
        try {
            console.log("Request URl", url);
            const resposne = await Axios.get(url);
            return resposne.data;

        } catch (err) {
            // console.log(err);
        }
        return {};
    }
    public async getSaleItemCategories(itemId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleCategories?saleID="
            + itemId + "&getSizes=true&getSaleInfo=true&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }

    public async getSaleProductDetail(productId: string): Promise<any> {
        const url = `https://www.ozsale.com.au/api/shop/product/v1/accounts/${appConfigs.OZSALE_ACCOUNT_ID}/products/${productId}`;
        console.log("Request URL", url);
        const resposne = await Axios.get(url);
        const product = resposne.data;
        product.ourPayInfo = await this.getOurPay(product.price.value);
        return product;
    }

    public async getSalePublicDetails(saleId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleDetails?saleID=" + saleId + "&languageID=en&countryID=AS&countryID=AS&userGroup=Member";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }

    public async getSaleProductQuantity(saleId: string, productId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicItemQuantity?itemID=" + productId + "&saleID= " + saleId + "&getBigImages=true&includePrices=true&languageID=en&countryID=AS&countryID=AS&us" +
            "erGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }
    public async get(url: string): Promise<any> {
        const value = Cache.get(url);
        if (value !== null) return value;

        const resposne = await Axios.get(url);
        Cache.set(url, resposne.data);
        return resposne.data;
    }
}
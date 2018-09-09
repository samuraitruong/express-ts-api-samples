import { default as Axios } from "axios";
import * as Cheerio from "cheerio";
import { getProductDetail } from "../controllers/api-controller";
import { IMenu } from "../models/menu";
export class OZSaleService {
    private URL = "https://ozsale.com.au";
    public async getMenuList(): Promise<IMenu[]> {
        const response = await Axios.get(this.URL);
        const $ = Cheerio.load(response.data);
        const links = $(".sale-categories-wrapper a");
        const result: IMenu[] = [];
        links.each((order, el) => {
            result.push({
                catId: $(el).attr("data-category-id"),
                name: $(el).text(),
                order,
            });
        });
        return result;
    }
    public async getCategoryData(catId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSalesBanners?saleCategoryID=" + catId
            + "&topSalesCount=3&useOzsaleSize=true&getPromotion=true&groupNo=&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.List;
    }
    public async getSaleItem(itemId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleItems?saleID=" + itemId
            + "&imageSize=100&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.List[0];
    }
    public async getSaleItemCategories(itemId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleCategories?saleID=" + itemId
            + "&getSizes=true&getSaleInfo=true&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }

    public async getSaleProductDetail(saleId: string, productId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicItemDetails?itemID=" + productId +
            "&saleID= " + saleId
            + "&getBigImages=true&includePrices=true&languageID=en&countryID=AS&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }

    public async getSaleProductQuantity(saleId: string, productId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicItemQuantity?itemID=" + productId +
            "&saleID= " + saleId
            + "&getBigImages=true&includePrices=true&languageID=en&countryID=AS&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.Value;
    }
}
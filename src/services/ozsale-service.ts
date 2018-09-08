import { default as Axios } from "axios";
import * as Cheerio from "cheerio";
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
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSalesBanners?saleCategoryID=" + catId + "&topSalesCount=3&useOzsaleSize=true&getPromotion=true&groupNo=&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.List;
    }
    public async getSaleItem(itemId: string): Promise<any> {
        const url = "https://www.ozsale.com.au/ApacHandlers.ashx/GetPublicSaleItems?saleID=" + itemId + "&imageSize=100&languageID=en&countryID=AS&userGroup=";
        const resposne = await Axios.get(url);
        return resposne.data.d.List[0];
    }
}
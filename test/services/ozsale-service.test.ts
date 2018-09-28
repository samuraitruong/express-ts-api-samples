import { assert, expect } from "chai";
import "mocha";
import { IMenu } from "../../src/models";
import { OZSaleService } from "../../src/services/ozsale-service";
describe("OZSale web api proxy tests", () => {
    const service = new OZSaleService();
    describe("getMenuList() tests", () => {
        it("getMenuList should return list menu items", async () => {
            const menu = await service.getMenuList();
            expect(menu).not.eq(null);
            expect(menu.length).to.gt(0);
            expect(menu[menu.length - 1].important).to.eq(true)
        });
    });
    function testSingleItem(item: IMenu) {
        it(`getCategoryData for ${item.name} should success`, async () => {
            const result = await service.getCategoryData(item.catId);
            expect(result).not.eq(null);
        });
    }
    describe("GetCategoryData() tests", async () => {
        const menus: IMenu[] = require("./data/menu");
        for (const item of menus) {
            testSingleItem(item);
        }
    });

    describe("getSaleItem() tests", async () => {
        const category = require("./data/category1");
        let count = 0;
        for (const item of category) {
            for (const sale of item.Sales) {
                if (++count > 50) {
                    break;
                }
                it(`getSaleItem("${sale.ID}") should success `, async () => {
                    try {
                        const result = await service.getSaleItem(sale.ID);
                        expect(result).not.eq(null);
                    } catch (err) {
                        console.error(err)
                    }
                });
            }
        }
    });
    describe("getSaleItemCategories() tests", async () => {
        const category = require("./data/category1");
        let count = 0;
        for (const item of category) {
            for (const sale of item.Sales) {
                if (++count > 50) {
                    break;
                }
                it(`getSaleItemCategories("${sale.ID}") should success `, async () => {
                    try {
                        const result = await service.getSaleItemCategories(sale.ID);
                        expect(result).not.eq(null);
                    } catch (err) {
                        console.error(err)
                    }
                });
            }
        }
    });
    // it("hacked", () => {
    //     expect(1).to.eq(1)
    // })

});
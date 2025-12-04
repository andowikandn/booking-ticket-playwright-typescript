import { Locator, Page, test, expect } from "@playwright/test";
import { ListTicketLocator } from "../locators/list_ticket";

export class ListTicketPage {
    readonly page: Page;
    readonly priceTrain: Locator;
    readonly typeTrain: Locator;
    readonly nameTrain: Locator;
    readonly pesanButton: Locator;
    readonly totalPrice: Locator;
    readonly departureInfo: Locator;
    readonly passengerInfo: Locator;
    readonly timeArrival: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceTrain = page.locator(ListTicketLocator.priceTrain).first();
        this.typeTrain = page.locator(ListTicketLocator.typeTrain).first();
        this.nameTrain = page.locator(ListTicketLocator.nameTrain).first();
        this.pesanButton = page.locator(ListTicketLocator.pesanButton)
        this.totalPrice = page.locator(ListTicketLocator.totalPrice).first();
        this.departureInfo = page.locator(ListTicketLocator.departureInfo).first();
        this.passengerInfo = page.locator(ListTicketLocator.passengerInfo).first();
        this.timeArrival = page.locator(ListTicketLocator.timeArrival).first();    
    }

    async tapOnListTicket() {
        await test.step('User click in the box area list ticket', async () => {
            await this.nameTrain.scrollIntoViewIfNeeded();
            await expect(this.nameTrain).toBeVisible({ timeout: 15000 });
            await this.nameTrain.click();
        });
    }

    async verifyListTicket() {
        await test.step('Verify list ticket based on input', async () => {
            await expect(this.priceTrain).toBeVisible();
            await expect(this.typeTrain).toBeVisible();
            await expect(this.nameTrain).toBeVisible();
        });
    }

    async verifyDetaiTicketTrain() {
        await test.step('Verify detail order the ticket train', async () => {
            await expect(this.totalPrice).toBeVisible();
            await expect(this.departureInfo).toBeVisible();
            await expect(this.passengerInfo).toBeVisible();
            await expect(this.timeArrival).toBeVisible();
        });
    }
}
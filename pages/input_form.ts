import { Locator, Page, test } from "@playwright/test";
import { InputLocator } from "../locators/input_form";
import { BASE_URL } from "../utils/env";

export class InputPage {
    readonly page: Page;
    readonly inputDepartureStation: Locator;
    readonly inputDestinationStation: Locator;
    readonly inputDepartureDate: Locator;
    readonly inputPassenger: Locator;
    readonly inputAdult: Locator;
    readonly cariPesanTicketBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputDepartureStation = page.locator(InputLocator.inputDepartureStation);
        this.inputDestinationStation = page.locator(InputLocator.inputDestinationStation);
        this.inputDepartureDate = page.locator(InputLocator.inputDepartureDate);
        this.inputPassenger = page.locator(InputLocator.inputPassenger);
        this.inputAdult = page.locator(InputLocator.inputAdult);
        this.cariPesanTicketBtn = page.locator(InputLocator.cariPesanTicketBtn);
    }

    async goto() {
        await test.step('Navigate booking ticket page', async () => {
            // await this.page.goto(BASE_URL)
            try {
                await this.page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
            } catch (e) {
                console.log('Retrying...');
                await this.page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
            }
        });
    }

    async inputDeparture(departure: string) {
        await test.step('User input departure station', async () => {
            await this.inputDepartureStation.fill(departure)
            await this.inputDepartureStation.waitFor({state: 'visible', timeout: 30000});
            await this.page.locator(`text=${departure}`).click()
        });
    }

    async inputDestination(destination: string) {
        await test.step('User input destination station', async () => {
            await this.inputDestinationStation.fill(destination)
            await this.page.locator(`text=${destination}`).click()
        });
    }

    async departureDateInput(date: string) {
        await test.step(`Input departure date manually: ${date}`, async () => {
            await this.page.evaluate((dateValue) => {
                const element = document.querySelector('#departure_dateh') as HTMLInputElement;
                element.value = dateValue;
                element.dispatchEvent(new Event("input", { bubbles: true }));
                element.dispatchEvent(new Event("change", { bubbles: true }));
            }, date);
        });
    }

    async passengerInput(passenger: string) {
        await test.step('User input passenger', async () => {
            await this.inputPassenger.fill('')
            await this.inputPassenger.fill(passenger)
        });
    }

    async adultPassenger(adult: string) {
        await test.step('User input adult', async () => {
            await this.inputAdult.fill('')
            await this.inputAdult.fill(adult)
        });
    }

    async tapCariPesanTicket() {
        await test.step('User click cari pesan tiket button', async () => {
            await this.cariPesanTicketBtn.click()
        });
    }
}
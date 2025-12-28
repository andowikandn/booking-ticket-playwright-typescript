import { test } from '@playwright/test';
import { InputPage } from '../pages/input_form';
import { ListTicketPage } from '../pages/list_ticket';

test.describe('Searching the ticket train', () => {
    test('User input form searching ticket train', async ({ page }) => {
        const searchPage = new InputPage(page);
        const listTicket = new ListTicketPage(page);

        await searchPage.goto();
        await searchPage.inputDeparture('Gambir');
        await searchPage.inputDestination('Surabaya Gubeng');
        await searchPage.departureDateInput('02-Januari-2026');
        await searchPage.passengerInput('2');
        await searchPage.adultPassenger('1');
        await searchPage.tapCariPesanTicket();
        await listTicket.verifyListTicket();
    });

    test('User view detail order ticket train', async ({ page }) => {
        const searchPage = new InputPage(page);
        const listTicket = new ListTicketPage(page);

        await searchPage.goto();
        await searchPage.inputDeparture('Gambir');
        await searchPage.inputDestination('Surabaya Gubeng');
        await searchPage.departureDateInput('02-Januari-2026');
        await searchPage.passengerInput('2');
        await searchPage.adultPassenger('1');
        await searchPage.tapCariPesanTicket();
        await listTicket.verifyListTicket();
        await listTicket.tapOnListTicket();
        await listTicket.verifyDetaiTicketTrain();
    });
});
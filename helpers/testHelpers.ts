import { expect } from "@playwright/test";
import { FRONTEND_URL, TEST_FIRST_NAME, TEST_LAST_NAME } from "./constants";

// PURCHASING ITEMS //

export async function purchaseItem(
  page: any,
  quantity: string,
  itemName: string
) {
  await page.goto(`${FRONTEND_URL}/Catalogue`);
  await page.getByLabel("Select an item to purchase:").selectOption(quantity);
  await page.getByRole("button", { name: itemName }).click();
  await page.getByLabel(`Enter quantity of ${itemName} to buy:`).fill(quantity);
  await page.getByRole("button", { name: "Submit" }).click();
}

export async function verifyPurchase(
  page: any,
  itemBought: string,
  itemNotBought: string
) {
  await page.goto(`${FRONTEND_URL}/Inventory`);
  await expect(page.getByText(`1 ${itemBought} purchased`)).toBeVisible();
  await expect(
    page.getByText(`1 ${itemNotBought} purchased`)
  ).not.toBeVisible();
}

export async function removeASinglePurchase(page: any) {
  await page.goto(`${FRONTEND_URL}/InventoryList`);
  await page.locator("//*[@class='primaryBtn']").click();
  await page.getByRole("button", { name: `Remove` }).click();
}

// HOMEPAGE VERIFICATION //

export async function verifyHomePage(page: any) {
  // ARRANGE - ACT
  await page.goto(FRONTEND_URL);

  // ASSERT
  await expect(page).toHaveTitle("SchemeServe QA Tech Test");
  await expect(
    page.getByRole("heading", { name: "Welcome to SchemeServe QA Tech Test" })
  ).toBeVisible();
}

// ADDING A NEW CONTACT //

export async function addContact(
  page: any,
  essential_details_provided: boolean
) {
  // ARRANGE
  await page.goto(`${FRONTEND_URL}/ContactForm`);

  // ACT
  if (essential_details_provided) {
    await page.getByLabel("First Name:").fill(TEST_FIRST_NAME);
    await page.getByLabel("Last Name:").fill(TEST_LAST_NAME);
    await page.locator("//*[@name='agree']").check();
  }
  await page.getByRole("button", { name: `Submit` }).click();

  // ASSERT
  if (!essential_details_provided) {
    await expect(
      page.getByText(
        "First Name, Last Name are required and you must agree to Terms of Service."
      )
    ).toBeVisible();
  } else {
    await expect(
      page.getByText("Thank you for your submission!")
    ).toBeVisible();
  }
}

// FILTERING A GENERAL LEDGER //

export async function filterAGeneralLedger(page: any, search_term: string) {
  // ARRANGE
  await page.goto(`${FRONTEND_URL}/Reports`);

  // ACT
  await page.getByRole("button", { name: "General Ledger" }).click();
  await page.getByPlaceholder("Search general ledger...").fill(search_term);

  // ASSERT
  await expect(page.getByText("Cash")).toBeVisible();
}

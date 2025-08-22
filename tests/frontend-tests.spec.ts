import { test } from "@playwright/test";
import {
  addContact,
  filterAGeneralLedger,
  purchaseItem,
  removeASinglePurchase,
  verifyHomePage,
  verifyPurchase,
} from "../helpers/testHelpers";
test.describe("COFEE SHOP FRONTEND TESTS", () => {
  test.beforeEach(async ({ page }) => {
    await verifyHomePage(page);
  });

  test("a user can select an item to purchase and verify that it was bought", async ({
    page,
  }) => {
    await purchaseItem(page, "1", "Coffee Beans");
    await verifyPurchase(page, "Coffee Beans", "Coffee Filters");
    await removeASinglePurchase(page);
  });

  test("a user can update the quantity of an already purchased item", async ({
    page,
  }) => {
    await purchaseItem(page, "2", "Milk Frother");
    await verifyPurchase(page, "Milk", "Coffee Beans");
    await removeASinglePurchase(page);
  });

  test("a user can filter a general ledger to display cash-related accounts", async ({
    page,
  }) => {
    await filterAGeneralLedger(page, "cash");
  });

  test("a user cannot enter a new contact via the contact form without providing essential details", async ({
    page,
  }) => {
    await addContact(page, false);
  });

  test("a user can successfully add a new contact via the contact form", async ({
    page,
  }) => {
    await addContact(page, true);
  });
});

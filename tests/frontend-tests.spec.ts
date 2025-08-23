import { test } from "@playwright/test";
import {
  addContact,
  changeQuantityOfPurchasedItem,
  filterAGeneralLedger,
  purchaseItem,
  removePurchase,
  verifyHomePage,
  verifyItemsAreVisible,
  verifyPurchase,
  verifyOtherItemsHaveNotBeenPurchased,
} from "../helpers/testHelpers";
test.describe("COFFEE SHOP FRONTEND TESTS", () => {
  test.beforeEach(async ({ page }) => {
    await verifyHomePage(page);
  });
  test("a user can purchase an item and verify that others have not been bought", async ({
    page,
  }) => {
    // ARRANGE
    let unpurchasedItems = [
      "Coffee Beans",
      "Coffee Syrup",
      "Small coffee disposable cup",
      "Large coffee disposable cup",
      "Espresso Machine Cleaner",
      "Milk Frother",
      "Coffee Filters",
      "Decaf Coffee Beans",
      "Coffee Grinder",
    ];

    let purchasedItem = "Reusable Coffee Cup";
    let purchaseItemValue = "9";
    let purchasedQuantity = "1";

    // ACT
    await purchaseItem(
      page,
      purchaseItemValue,
      purchasedItem,
      purchasedQuantity
    );

    // ASSERT
    await verifyPurchase(page, purchasedQuantity, purchasedItem);
    await verifyOtherItemsHaveNotBeenPurchased(page, unpurchasedItems);

    // Delete test data
    await removePurchase(page, purchasedQuantity, purchasedItem);
  });

  test("a user can update the quantity of an already purchased item", async ({
    page,
  }) => {
    // ASSIGN
    let purchasedItem = "Milk Frother";
    let purchaseItemValue = "6";
    let quantities = ["2", "1"];

    // ACT
    await purchaseItem(page, purchaseItemValue, purchasedItem, quantities[0]);

    await changeQuantityOfPurchasedItem(page, purchasedItem);

    // ASSERT
    await verifyPurchase(page, quantities[1], purchasedItem);

    // Delete test data
    await removePurchase(page, quantities[1], purchasedItem);
  });

  test("a user can buy multiple items and verify that they have been bought", async ({
    page,
  }) => {
    // ASSIGN
    let purchasedItems = ["Coffee Beans", "Coffee Grinder"];
    let itemValues = ["1", "10"];
    let quantity = "1";

    // ACT
    for (let i = 0; i < 2; i++) {
      await purchaseItem(page, itemValues[i], purchasedItems[i], quantity);
    }

    // ASSERT
    await verifyItemsAreVisible(page, purchasedItems[0], purchasedItems[1]);

    // Delete test data -> could not find a way to automate the input field
    for (let i = 0; i < 2; i++) {
      await removePurchase(page, quantity, purchasedItems[i]);
    }
  });

  test("a user can filter a general ledger report to display cash-related accounts", async ({
    page,
  }) => {
    await filterAGeneralLedger(page, "cash");
  });

  test("a user cannot add a new contact via the contact form without providing contact essential details and agreeing to the terms and conditions ", async ({
    page,
  }) => {
    // ETA: This has been broken down into a single test, for the sake of easier code maintenance.
    await addContact(page, false);
  });

  test("a user can successfully add a new contact via the contact form when providing essential contact details and agreeing to the terms of service ", async ({
    page,
  }) => {
    await addContact(page, true);
  });
});

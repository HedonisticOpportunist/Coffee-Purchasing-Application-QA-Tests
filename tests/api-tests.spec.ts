import { test, expect } from "@playwright/test";
import {
  API_CATALOGUE_ENTRY,
  API_JOURNAL_ENTRY,
  API_JOURNAL_NON_CASH_ENTRY,
  API_NEW_CONTACT_ENTRY,
  BACKEND_URL,
} from "../helpers/constants";

test.describe("COFFEE SHOP API TESTS", () => {
  test("GET - retrieve all items from the catalogue endpoint", async ({
    request,
  }) => {
    // ARRANGE - ACT
    const response = await request.get(`${BACKEND_URL}/catalogue`);
    const body = await response.json();

    // ASSERT
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toEqual(API_CATALOGUE_ENTRY);
  });

  test("GET - retrieve all items from the journal entries endpoint that use cash", async ({
    request,
  }) => {
    // ARRANGE - ACT
    const response = await request.get(`${BACKEND_URL}/journalEntries`, {
      params: { credit: "Cash" },
    });

    const body = await response.json();

    // ASSERT
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toEqual(API_JOURNAL_ENTRY);
    expect(body[3]).not.toEqual(API_JOURNAL_NON_CASH_ENTRY);
  });

  test("GET - retrieve all items from the journal entries endpoint", async ({
    request,
  }) => {
    // ETA: Added the test for the sake of completeness.

    // ARRANGE - ACT
    const response = await request.get(`${BACKEND_URL}/journalEntries`);
    const body = await response.json();

    // ASSERT
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toEqual(API_JOURNAL_ENTRY);
    expect(body[3]).toEqual(API_JOURNAL_NON_CASH_ENTRY);
  });

  test("POST - create a new contact", async ({ request }) => {
    // ARRANGE - ACT
    const response = await request.post(`${BACKEND_URL}/contacts`, {
      data: JSON.stringify(API_NEW_CONTACT_ENTRY),
    });
    const body = await response.json();

    // ASSERT
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    expect(body).toEqual(API_NEW_CONTACT_ENTRY);
  });

  test("GET - retrieve all items from the contacts endpoint", async ({
    request,
  }) => {
    // ARRANGE - ACT
    const response = await request.get(`${BACKEND_URL}/contacts`);
    const body = await response.json();

    // ASSERT
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });
});

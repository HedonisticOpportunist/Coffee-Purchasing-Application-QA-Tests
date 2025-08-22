// URLS
export const FRONTEND_URL = "http://localhost:5173";
export const BACKEND_URL = "http://localhost:3030";

// TEST-RELATED CONSTANTS
export const TEST_FIRST_NAME = "Ghost";
export const TEST_LAST_NAME = "Simmonds";

// API-RELATED JSON CONSTANTS
export const API_NEW_CONTACT_ENTRY = {
  id: "1",
  firstName: "Snow",
  lastName: "Simmonds",
  address1: "10 Knox Street",
  address2: "Margam, Port Talbot",
  address3: "Neath",
  address4: "SA13 2DR",
  pet: "no",
  agree: true,
};

export const API_CATALOGUE_ENTRY = {
  id: "1",
  name: "Coffee Beans",
  price: "£20.00",
};

export const API_JOURNAL_ENTRY = {
  id: "1",
  date: "2023-01-05",
  description: "Office Supplies Purchase",
  debit: "Accounts Payable",
  credit: "Cash",
  amount: 150,
};

export const API_JOURNAL_NON_CASH_ENTRY = {
  id: "4",
  date: "2023-01-20",
  description: "Consulting Services",
  debit: "Accounts Receivable",
  credit: "Service Revenue",
  amount: 2500,
};

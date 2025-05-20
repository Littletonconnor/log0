export const DOCUMENTS = [
  {
    name: "File 1",
    id: "1",
    createdAt: "2023-10-01",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "document",
  },
  {
    name: "A Really long file name that should go on and on and on and on and on and on and on and on and on",
    id: "2",
    createdAt: "2023-10-02",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "document",
  },
];

export const RESOURCES = [
  {
    name: "Resource 1",
    id: "3",
    url: "https://wealthfront.com",
    createdAt: "2023-10-03",
    type: "resource",
  },
  {
    name: "Resource 2",
    id: "4",
    url: "https://wealthfront.com",
    createdAt: "2023-11-03",
    type: "resource",
  },
];

export const FILES = [...DOCUMENTS, ...RESOURCES];

const transactions = [
	{
		id: 1001,
		customerName: "Customer 1",
    customerId: "C1",
		item: "Item 1",
		value: 80,
		date: new Date("05/22/2022").toISOString(),
	},
	{
    id: 1002,
		customerName: "Customer 2",
    customerId: "C2",
		item: "Item 2",
		value: 120,
		date: new Date("06/02/2022").toISOString(),
	},
	{
    id: 1003,
		customerName: "Customer 1",
    customerId: "C1",
		item: "Item 3",
		value: 250,
		date: new Date("07/22/2022").toISOString(),
	},
	{
    id: 1004,
		customerName: "Customer 2",
    customerId: "C2",
		item: "Item 4",
		value: 40,
		date: new Date("07/14/2022").toISOString(),
	},
];

export const mockAPI = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(transactions), 1000);
  });
};
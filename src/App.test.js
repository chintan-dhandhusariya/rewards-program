import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test("render the customer filter", () => {
	render(<App />);

	const customerEl = screen.getByTestId(/customer-select/);
	expect(customerEl).toBeInTheDocument();
});

test("render the time period filter", () => {
	render(<App />);

	const timePeriodEl = screen.getByTestId(/time-period-select/);
	expect(timePeriodEl).toBeInTheDocument();
});

test("render loader in the beginning", () => {
	render(<App />);

	// const timePeriodEl = screen.getByTestId(/table/);
	const loaderEl = screen.getByTestId(/loader/);
  expect(loaderEl).toBeInTheDocument();
});

test("render data after loading", async () => {
	render(<App />);

  await waitFor(() => {
		const customerName = screen.getByText("Customer Name");
		expect(customerName).toBeInTheDocument();
	}, {timeout: 1500});
});

test("render total rewards value after loading data", async () => {
	render(<App />);

  await waitFor(() => {
		const rewardsValue = screen.getByText("Total Reward points:");
		expect(rewardsValue).toBeInTheDocument();
	}, {timeout: 1500});
});

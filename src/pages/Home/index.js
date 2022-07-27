import React, { useEffect, useState } from "react";
import { getTransactions } from "../../apiClient";
import "./styles.css";

const TIME_PERIODS = [
  { id: 0, label: "All (3 Months)" },
	{ id: 1, label: "Last Month" },
];

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedTime, setSelectedTime] = useState(TIME_PERIODS[0].id);

  const fetchCustomersData = async () => {
    let transactions = await getTransactions();
    transactions = transactions.map((trans) => ({
			...trans,
			date: new Date(trans.date),
		}));
    setTransactions(transactions);
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  useEffect(() => {
    setFilteredTransactions(transactions);
    const customers = [{id: "", name: "All"}];
    transactions.forEach(trans => {
      if(!customers.find(customer => trans.customerId === customer.id)) {
        customers.push({
					name: trans.customerName,
					id: trans.customerId,
				});
      }
    });
    setCustomers(customers);
  }, [transactions]);

  useEffect(() => {
    let updatedTransactions = transactions;
    if(selectedCustomer) {
      updatedTransactions = updatedTransactions.filter(
				(trans) => trans.customerId === selectedCustomer
			);
    }
    if(Number(selectedTime) === 1) {
      const now = new Date();
      const oneMonthAgo = new Date().setDate(now.getDate() - 30);
      updatedTransactions = updatedTransactions.filter(trans => {
        return trans.date > oneMonthAgo
      });
    }
    setFilteredTransactions(updatedTransactions);
  }, [selectedCustomer, selectedTime]);

  const getTotalRewards = (transactions) => {
    return transactions.reduce((acc, trans) => {
      if(trans.value > 100) {
        acc += 2*(trans.value - 100);
        acc += 1*50;
      } else if (trans.value <= 100 && trans.value > 50) {
        acc += 1*(trans.value - 50);
      }
      return acc;
    }, 0);
  };

  return (
		<main className="home">
			<header>
				<div className="header">
					<div>
						<label>Customer: </label>
						<select
							data-testid="customer-select"
							defaultValue={customers[0]?.id}
							onChange={(e) => setSelectedCustomer(e.target.value)}
						>
							{customers.map((customer) => (
								<option key={customer.id} value={customer.id}>
									{customer.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label>Time period: </label>
						<select
							data-testid="time-period-select"
							defaultValue={TIME_PERIODS[0].id}
							onChange={(e) => setSelectedTime(e.target.value)}
						>
							{TIME_PERIODS.map((timePeriod) => (
								<option key={timePeriod.id} value={timePeriod.id}>
									{timePeriod.label}
								</option>
							))}
						</select>
					</div>
				</div>
			</header>
			<div className="container">
				<section>
					{filteredTransactions.length > 0 ? (
						<>
							<div className="table" data-testid="table">
								<div className="header-row">
									<div className="cell">Customer Name</div>
									<div className="cell">Purchase Item</div>
									<div className="cell">Amount</div>
									<div className="cell">Date</div>
								</div>
								{filteredTransactions.map((trans) => (
									<div className="row" key={trans.id}>
										<div className="cell">{trans.customerName}</div>
										<div className="cell">{trans.item}</div>
										<div className="cell">{trans.value}</div>
										<div className="cell">
											{trans.date.toLocaleDateString()}
										</div>
									</div>
								))}
							</div>
							<div style={{ marginTop: 40 }}>
								Total Reward points:{" "}
								<span data-testid="rewards-value">
									{getTotalRewards(filteredTransactions)}
								</span>
							</div>
						</>
					) : (
						<center data-testid="loader">Loading...</center>
					)}
				</section>
			</div>
		</main>
	);
};

export default Home;
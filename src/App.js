import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [conversionRates, setConversionRates] = useState("10, 15, 20, 25, 30");
  const [cashCollected, setCashCollected] = useState("3000, 4000, 5000, 6000");
  const [numberOfCalls, setNumberOfCalls] = useState("100");
  const [commissionRate, setCommissionRate] = useState("10"); // Default 10%
  const [transactionFeeRate, setTransactionFeeRate] = useState("3"); // Default 3%
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    document.title = 'Sales Table Calculator';
  }, []);
  // Automatically generate the table when any input changes
  useEffect(() => {
    generateTable();
  }, [conversionRates, cashCollected, numberOfCalls, commissionRate, transactionFeeRate]);

  const generateTable = () => {
    const rates = conversionRates.split(",").map(rate => parseFloat(rate.trim()));
    const cashValues = cashCollected.split(",").map(cash => parseFloat(cash.trim()));
    const calls = parseInt(numberOfCalls.trim(), 10);
    const commissionPercent = parseFloat(commissionRate) / 100;
    const transactionFeePercent = parseFloat(transactionFeeRate) / 100;

    const data = [];
    rates.forEach(rate => {
      cashValues.forEach(cash => {
        const closes = (rate / 100) * calls;
        const totalCash = closes * cash;
        const commission = totalCash * commissionPercent;
        const transactionFees = totalCash * transactionFeePercent;
        const netTotal = totalCash - commission - transactionFees;
        data.push({
          conversionRate: `${rate}%`,
          avgCashCollected: cash,
          closes: closes.toFixed(2),
          totalCashCollected: totalCash.toFixed(2),
          commission: commission.toFixed(2),
          transactionFees: transactionFees.toFixed(2),
          netTotal: netTotal.toFixed(2),
        });
      });
    });

    setTableData(data);
  };

  return (
    <div className="App">
      <h1>Conversion Rate Table Generator</h1>
      <div className="inputs">
        <div>
          <label>Conversion Rates (comma separated): </label>
          <input
            type="text"
            value={conversionRates}
            onChange={(e) => setConversionRates(e.target.value)}
            placeholder="e.g., 10, 15, 20"
          />
        </div>
        <div>
          <label>Average Cash Collected (comma separated): </label>
          <input
            type="text"
            value={cashCollected}
            onChange={(e) => setCashCollected(e.target.value)}
            placeholder="e.g., 3000, 4000, 5000"
          />
        </div>
        <div>
          <label>Number of Calls: </label>
          <input
            type="number"
            value={numberOfCalls}
            onChange={(e) => setNumberOfCalls(e.target.value)}
            placeholder="e.g., 100"
          />
        </div>
        <div>
          <label>Commission Percentage (%): </label>
          <input
            type="number"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            placeholder="e.g., 10"
          />
        </div>
        <div>
          <label>Transaction Fee Percentage (%): </label>
          <input
            type="number"
            value={transactionFeeRate}
            onChange={(e) => setTransactionFeeRate(e.target.value)}
            placeholder="e.g., 3"
          />
        </div>
      </div>

      {tableData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Conversion Rate</th>
              <th>Avg Cash Collected</th>
              <th>Closes (per {numberOfCalls} calls)</th>
              <th>Total Cash Collected</th>
              <th>Commission</th>
              <th>Transaction Fees</th>
              <th>Net Total</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.conversionRate}</td>
                <td>{row.avgCashCollected}</td> 
                <td>{row.closes}</td>
                <td><strong>{row.totalCashCollected}</strong></td>
                <td>{row.commission}</td>
                <td>{row.transactionFees}</td>
                <td>{row.netTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import "../Css/Dashboard.css";

const Dashboard = () => {
  // Mock data for recent bills
  const recentBills = [
    {
      id: 1,
      vendor: "Grocery Store ABC",
      date: "2025-04-10",
      amount: 78.95,
      category: "Groceries",
    },
    {
      id: 2,
      vendor: "Utility Company XYZ",
      date: "2025-04-05",
      amount: 145.3,
      category: "Utilities",
    },
    {
      id: 3,
      vendor: "Gas Station",
      date: "2025-04-02",
      amount: 42.5,
      category: "Transportation",
    },
    {
      id: 4,
      vendor: "Restaurant DEF",
      date: "2025-03-28",
      amount: 68.75,
      category: "Dining",
    },
    {
      id: 5,
      vendor: "Internet Provider",
      date: "2025-03-25",
      amount: 89.99,
      category: "Utilities",
    },
  ];

  // Mock data for expense breakdown
  const expenseBreakdown = [
    { category: "Groceries", amount: 312.45, percentage: 30 },
    { category: "Utilities", amount: 235.29, percentage: 23 },
    { category: "Rent", amount: 1200.0, percentage: 15 },
    { category: "Transportation", amount: 102.5, percentage: 12 },
    { category: "Dining", amount: 183.25, percentage: 10 },
    { category: "Entertainment", amount: 85.99, percentage: 7 },
    { category: "Other", amount: 53.72, percentage: 3 },
  ];

  // Format date string to a more readable format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's an overview of your expenses</p>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3>Total Expenses</h3>
            <p className="card-value">$2,172.20</p>
            <p className="card-period">This Month</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <h3>Bills Processed</h3>
            <p className="card-value">21</p>
            <p className="card-period">This Month</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">💸</div>
          <div className="card-content">
            <h3>Highest Expense</h3>
            <p className="card-value">$1,200.00</p>
            <p className="card-period">Rent</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-bills section-card">
          <div className="section-header">
            <h2>Recent Bills</h2>
            <Link to="/upload" className="btn btn-primary">
              Upload New Bill
            </Link>
          </div>

          <div className="bills-list">
            <table className="bills-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.vendor}</td>
                    <td>{formatDate(bill.date)}</td>
                    <td>{bill.category}</td>
                    <td>{formatCurrency(bill.amount)}</td>
                    <td>
                      <button className="btn-icon" title="View Details">
                        👁️
                      </button>
                      <button className="btn-icon" title="Edit">
                        ✏️
                      </button>
                      <button className="btn-icon" title="Delete">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="view-all">
              <a href="#">View All Bills →</a>
            </div>
          </div>
        </div>

        <div className="expense-breakdown section-card">
          <h2>Expense Breakdown</h2>

          <div className="chart-container">
            {/* In a real app, you would use a chart library here */}
            <div className="mock-chart">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-label">{item.category}</div>
                  <div className="chart-bar-bg">
                    <div
                      className="chart-bar"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: getColorForCategory(item.category),
                      }}
                    ></div>
                  </div>
                  <div className="chart-value">
                    {formatCurrency(item.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/upload" className="action-card">
          <div className="action-icon">📸</div>
          <div className="action-text">Scan New Bill</div>
        </Link>

        <Link to="/chat" className="action-card">
          <div className="action-icon">💬</div>
          <div className="action-text">Ask Assistant</div>
        </Link>

        <a href="#" className="action-card">
          <div className="action-icon">📄</div>
          <div className="action-text">Generate Report</div>
        </a>

        <a href="#" className="action-card">
          <div className="action-icon">⚙️</div>
          <div className="action-text">Settings</div>
        </a>
      </div>
    </div>
  );
};

// Helper function to get colors for categories
function getColorForCategory(category) {
  const colors = {
    Groceries: "#4a90e2",
    Utilities: "#50c878",
    Rent: "#ff6b6b",
    Transportation: "#ffa500",
    Dining: "#9370db",
    Entertainment: "#40e0d0",
    Other: "#a9a9a9",
  };

  return colors[category] || "#a9a9a9";
}

export default Dashboard;

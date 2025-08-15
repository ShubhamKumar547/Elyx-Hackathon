import React from 'react';
import './App.css';

function Dashboard() {
  // Example health data
  const healthData = {
    heartRate: 72,
    steps: 10500,
    calories: 2200,
    sleep: '7h 30m',
  };

  return (
    <div className="dashboard-container">
      <h2>Health Dashboard</h2>
      <ul>
        <li><strong>Heart Rate:</strong> {healthData.heartRate} bpm</li>
        <li><strong>Steps:</strong> {healthData.steps}</li>
        <li><strong>Calories:</strong> {healthData.calories}</li>
        <li><strong>Sleep:</strong> {healthData.sleep}</li>
      </ul>
    </div>
  );
}

export default Dashboard;

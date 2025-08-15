import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, AreaChart, Area, ComposedChart, Scatter
} from 'recharts';
import './Dashboard.css';

// Enhanced data structure
const healthData = {
  overview: {
    score: 84,
    trend: 'up',
    riskFactors: [
      { name: 'Cardiovascular', level: 'moderate', trend: 'improving' },
      { name: 'Metabolic', level: 'low', trend: 'stable' },
      { name: 'Genetic', level: 'APOE4 Carrier', trend: 'monitoring' }
    ],
    categories: [
      {
        section: 'General Health',
        icon: '🩺',
        items: [
          { name: 'Clinical History', value: 85, trend: 'up' },
          { name: 'Physical Exam', value: 90, trend: 'stable' },
          { name: 'Vital Signs', value: 88, trend: 'up' },
          { name: 'Blood Tests', value: 92, trend: 'up' },
          { name: 'Urinalysis', value: 87, trend: 'stable' }
        ]
      },
      {
        section: 'Cancer Screening',
        icon: '🦠',
        items: [
          { name: 'Colorectal', value: 78, trend: 'up' },
          { name: 'Cervical', value: 85, trend: 'stable' },
          { name: 'Breast', value: 82, trend: 'up' }
        ]
      },
      {
        section: 'Cardiovascular',
        icon: '❤️',
        items: [
          { name: 'ECG', value: 91, trend: 'stable' },
          { name: 'Calcium Score', value: 86, trend: 'up' },
          { name: 'Echocardiogram', value: 89, trend: 'up' },
          { name: 'CIMT Scan', value: 84, trend: 'up' }
        ]
      },
      {
        section: 'Fitness',
        icon: '🏋️',
        items: [
          { name: 'VO2 Max', value: 76, trend: 'up' },
          { name: 'Grip Strength', value: 82, trend: 'stable' },
          { name: 'Movement', value: 79, trend: 'up' },
          { name: 'Spirometry', value: 85, trend: 'stable' }
        ]
      }
    ]
  },
  analytics: {
    biomarkers: [
      { name: 'Cholesterol', value: 190, optimal: 200, unit: 'mg/dL' },
      { name: 'Blood Pressure', value: 125, optimal: 120, unit: 'mmHg' },
      { name: 'Glucose', value: 92, optimal: 100, unit: 'mg/dL' },
      { name: 'BMI', value: 24, optimal: 25, unit: '' },
      { name: 'CRP', value: 1.2, optimal: 3, unit: 'mg/L' }
    ],
    distribution: [
      { name: 'General', value: 88.4, color: '#8884d8' },
      { name: 'Cancer', value: 81.7, color: '#82ca9d' },
      { name: 'Cardio', value: 87.5, color: '#ffc658' },
      { name: 'Fitness', value: 80.5, color: '#ff8042' }
    ]
  },
  trends: {
    monthly: [
      { month: 'Jan', health: 72, cardio: 68, metabolic: 75 },
      { month: 'Feb', health: 75, cardio: 72, metabolic: 76 },
      { month: 'Mar', health: 78, cardio: 75, metabolic: 78 },
      { month: 'Apr', health: 82, cardio: 79, metabolic: 81 },
      { month: 'May', health: 85, cardio: 83, metabolic: 83 },
      { month: 'Jun', health: 88, cardio: 86, metabolic: 85 }
    ],
    weekly: [
      { week: 'W1', health: 80, cardio: 78, metabolic: 82 },
      { week: 'W2', health: 82, cardio: 80, metabolic: 83 },
      { week: 'W3', health: 85, cardio: 83, metabolic: 84 },
      { week: 'W4', health: 88, cardio: 86, metabolic: 85 }
    ]
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('biomarkers');
  const [activeTrendTab, setActiveTrendTab] = useState('monthly');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <span className="trend-up">↑</span>;
      case 'down': return <span className="trend-down">↓</span>;
      default: return <span className="trend-stable">→</span>;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>
            <span className="health-icon">🌡️</span> 
            Health Intelligence Dashboard
          </h1>
          <p className="last-updated">Last updated: {new Date().toLocaleString()}</p>
        </div>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">📊</span> Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="tab-icon">🔍</span> Analytics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            <span className="tab-icon">📈</span> Trends
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-view">
            <div className="health-summary">
              <div className="summary-card primary">
                <div className="score-container">
                  <h3>Overall Health Score</h3>
                  <div className="score-circle">
                    <span>{healthData.overview.score}</span>
                    <span className="trend-badge up">+5%</span>
                  </div>
                  <p className="score-description">Good • Above average for your age group</p>
                </div>
                <div className="score-details">
                  <div className="detail-item">
                    <span className="detail-label">Last Month</span>
                    <span className="detail-value">79</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">6 Month Avg</span>
                    <span className="detail-value">81</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Goal</span>
                    <span className="detail-value">90+</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-card risk-factors">
                <h3>Risk Factors</h3>
                <ul className="risk-list">
                  {healthData.overview.riskFactors.map((factor, i) => (
                    <li key={i} className={`risk-item ${factor.level}`}>
                      <span className="risk-name">{factor.name}</span>
                      <span className="risk-level">{factor.level}</span>
                      <span className={`risk-trend ${factor.trend}`}>
                        {factor.trend === 'improving' ? '↗ Improving' : 
                         factor.trend === 'stable' ? '→ Stable' : '⚠ Monitoring'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="dashboard-sections">
              {healthData.overview.categories.map((category, idx) => (
                <div key={idx} className="dashboard-section">
                  <div 
                    className="section-header"
                    onClick={() => toggleSection(category.section)}
                  >
                    <div className="section-title">
                      <span className="section-icon">{category.icon}</span>
                      <h2>{category.section}</h2>
                    </div>
                    <div className="section-summary">
                      <span className="section-score">
                        {(category.items.reduce((sum, item) => sum + item.value, 0) / category.items.length).toFixed(1)}
                      </span>
                      <span className="toggle-icon">
                        {expandedSection === category.section ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                  
                  {expandedSection === category.section && (
                    <div className="section-content">
                      <div className="section-chart">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={category.items}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip 
                              contentStyle={{
                                background: 'rgba(255, 255, 255, 0.96)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                border: 'none'
                              }}
                            />
                            <Bar 
                              dataKey="value" 
                              radius={[4, 4, 0, 0]}
                              animationDuration={1500}
                            >
                              {category.items.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={entry.trend === 'up' ? '#82ca9d' : 
                                        entry.trend === 'down' ? '#ff6b6b' : '#8884d8'} 
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="metrics-details">
                        <h4>Detailed Metrics</h4>
                        <ul className="metrics-list">
                          {category.items.map((item, i) => (
                            <li key={i} className="metric-item">
                              <div className="metric-info">
                                <span className="metric-name">{item.name}</span>
                                <span className="metric-value">
                                  {item.value}
                                  <span className="metric-unit">/100</span>
                                </span>
                              </div>
                              <div className="metric-trend">
                                {renderTrendIcon(item.trend)}
                                <div 
                                  className="metric-bar" 
                                  style={{ 
                                    width: `${item.value}%`,
                                    background: item.trend === 'up' ? '#82ca9d' : 
                                               item.trend === 'down' ? '#ff6b6b' : '#8884d8'
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-view">
            <div className="analytics-subtabs">
              <button
                className={`subtab-btn ${activeAnalyticsTab === 'biomarkers' ? 'active' : ''}`}
                onClick={() => setActiveAnalyticsTab('biomarkers')}
              >
                Biomarkers
              </button>
              <button
                className={`subtab-btn ${activeAnalyticsTab === 'distribution' ? 'active' : ''}`}
                onClick={() => setActiveAnalyticsTab('distribution')}
              >
                Category Distribution
              </button>
            </div>
            
            {activeAnalyticsTab === 'biomarkers' && (
              <div className="analytics-content">
                <div className="analytics-card">
                  <h3>Biomarker Analysis</h3>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart 
                        outerRadius={150} 
                        data={healthData.analytics.biomarkers}
                        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                      >
                        <PolarGrid radialLines={false} />
                        <PolarAngleAxis 
                          dataKey="name" 
                          tick={{ fill: '#666', fontSize: 12 }}
                        />
                        <PolarRadiusAxis 
                          angle={30} 
                          domain={[0, 250]} 
                          tickCount={6}
                          tick={{ fill: '#999', fontSize: 10 }}
                        />
                        <Radar 
                          name="Your Values" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          fill="#8884d8" 
                          fillOpacity={0.4} 
                          animationDuration={1500}
                        />
                        <Radar 
                          name="Optimal" 
                          dataKey="optimal" 
                          stroke="#82ca9d" 
                          fill="#82ca9d" 
                          fillOpacity={0.1} 
                          animationDuration={2000}
                        />
                        <Tooltip 
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.96)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            border: 'none'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{
                            paddingTop: '20px'
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="biomarkers-table">
                  <h4>Biomarker Details</h4>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Biomarker</th>
                          <th>Your Value</th>
                          <th>Optimal Range</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {healthData.analytics.biomarkers.map((bio, i) => (
                          <tr key={i}>
                            <td>{bio.name}</td>
                            <td>
                              <strong>{bio.value}</strong> {bio.unit}
                            </td>
                            <td>
                              {bio.name === 'BMI' 
                                ? `${bio.optimal - 5}-${bio.optimal}` 
                                : `< ${bio.optimal}`} {bio.unit}
                            </td>
                            <td>
                              <span className={`status-badge ${
                                bio.value < bio.optimal ? 'good' : 'warning'
                              }`}>
                                {bio.value < bio.optimal ? 'Normal' : 'High'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeAnalyticsTab === 'distribution' && (
              <div className="analytics-content">
                <div className="analytics-card">
                  <h3>Health Category Distribution</h3>
                  <div className="chart-row">
                    <div className="chart-container half-width">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={healthData.analytics.distribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            animationDuration={1500}
                          >
                            {healthData.analytics.distribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`Score: ${value}`, '']}
                            contentStyle={{
                              background: 'rgba(255, 255, 255, 0.96)',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                              border: 'none'
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="chart-container half-width">
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart
                          layout="vertical"
                          data={healthData.analytics.distribution}
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                          <CartesianGrid stroke="#f5f5f5" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip 
                            contentStyle={{
                              background: 'rgba(255, 255, 255, 0.96)',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                              border: 'none'
                            }}
                          />
                          <Bar 
                            dataKey="value" 
                            barSize={30} 
                            fill="#8884d8" 
                            radius={[0, 4, 4, 0]}
                            animationDuration={1500}
                          />
                          <Scatter dataKey="value" fill="#ff7300" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="trends-view">
            <div className="trends-subtabs">
              <button
                className={`subtab-btn ${activeTrendTab === 'monthly' ? 'active' : ''}`}
                onClick={() => setActiveTrendTab('monthly')}
              >
                Monthly Trends
              </button>
              <button
                className={`subtab-btn ${activeTrendTab === 'weekly' ? 'active' : ''}`}
                onClick={() => setActiveTrendTab('weekly')}
              >
                Weekly Trends
              </button>
            </div>
            
            <div className="trends-content">
              <div className="trends-card">
                <h3>
                  {activeTrendTab === 'monthly' ? '6-Month Health Progress' : '4-Week Health Progress'}
                </h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                      data={activeTrendTab === 'monthly' 
                        ? healthData.trends.monthly 
                        : healthData.trends.weekly}
                      margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
                    >
                      <defs>
                        <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCardio" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMetabolic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis 
                        dataKey={activeTrendTab === 'monthly' ? "month" : "week"} 
                        tick={{ fill: '#666' }}
                      />
                      <YAxis 
                        domain={[50, 100]} 
                        tick={{ fill: '#666' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'rgba(255, 255, 255, 0.96)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          border: 'none'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{
                          paddingTop: '20px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="health" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorHealth)" 
                        name="Overall Health"
                        animationDuration={1500}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cardio" 
                        stroke="#82ca9d" 
                        fillOpacity={1} 
                        fill="url(#colorCardio)" 
                        name="Cardiovascular"
                        animationDuration={1700}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="metabolic" 
                        stroke="#ffc658" 
                        fillOpacity={1} 
                        fill="url(#colorMetabolic)" 
                        name="Metabolic"
                        animationDuration={1900}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="trends-insights">
                <h4>Key Insights</h4>
                <div className="insights-grid">
                  <div className="insight-card">
                    <div className="insight-header">
                      <span className="insight-icon">📈</span>
                      <h5>Consistent Improvement</h5>
                    </div>
                    <p>
                      Your health score has increased by <strong>16 points</strong> over the last 
                      {activeTrendTab === 'monthly' ? ' 6 months' : ' 4 weeks'}, showing 
                      consistent positive trend.
                    </p>
                  </div>
                  
                  <div className="insight-card">
                    <div className="insight-header">
                      <span className="insight-icon">❤️</span>
                      <h5>Cardiovascular Progress</h5>
                    </div>
                    <p>
                      Cardiovascular metrics show the most rapid improvement (+18%), 
                      likely due to your increased exercise regimen.
                    </p>
                  </div>
                  
                  <div className="insight-card">
                    <div className="insight-header">
                      <span className="insight-icon">🍽️</span>
                      <h5>Dietary Impact</h5>
                    </div>
                    <p>
                      Metabolic markers stabilized after your dietary changes in 
                      {activeTrendTab === 'monthly' ? ' March' : ' Week 2'}.
                    </p>
                  </div>
                  
                  <div className="insight-card">
                    <div className="insight-header">
                      <span className="insight-icon">🎯</span>
                      <h5>Projection</h5>
                    </div>
                    <p>
                      At current trajectory, you'll reach your <strong>90+ goal</strong> in 
                      {activeTrendTab === 'monthly' ? ' 3 months' : ' 2 weeks'}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
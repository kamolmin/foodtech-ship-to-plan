'use client';

import { useState, useEffect } from 'react';

// User credentials (hardcoded)
const USERS = {
  'Kamoliddin Rustamov': 'pass123',
  'Rustam': 'pass123',
  'Bobur': 'pass123',
  'Asadbek': 'pass123',
  'Samandar': 'pass123',
  'Bohodir': 'pass123'
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeScreen, setActiveScreen] = useState('create'); // create, actuals, dashboard
  
  const [suppliers, setSuppliers] = useState([]);
  const [skus, setSkus] = useState([]);
  const [plans, setPlans] = useState([]);
  
  // Load data from JSON and localStorage
  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => {
        setSuppliers(data.suppliers);
        setSkus(data.skus);
      });
    
    const savedPlans = localStorage.getItem('foodtech_plans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);
  
  // Save plans to localStorage whenever they change
  useEffect(() => {
    if (plans.length > 0) {
      localStorage.setItem('foodtech_plans', JSON.stringify(plans));
    }
  }, [plans]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (USERS[username] && USERS[username] === password) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setUsername('');
    setPassword('');
  };
  
  // Login Screen
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ margin: '0 0 10px', fontSize: '28px', color: '#333' }}>FoodTech</h1>
          <p style={{ margin: '0 0 30px', color: '#666' }}>Ship-to-Plan System</p>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Username</label>
              <select 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
                required
              >
                <option value="">Select user...</option>
                {Object.keys(USERS).map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
                required
              />
            </div>
            {loginError && <p style={{ color: '#e53e3e', fontSize: '14px', marginBottom: '16px' }}>{loginError}</p>}
            <button 
              type="submit"
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
            >
              Login
            </button>
          </form>
          <p style={{ marginTop: '20px', fontSize: '12px', color: '#999', textAlign: 'center' }}>Default password: pass123</p>
        </div>
      </div>
    );
  }
  
  // Main App
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>FoodTech Ship-to-Plan</h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>Logged in as: <strong>{currentUser}</strong></p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ padding: '10px 20px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
        >
          Logout
        </button>
      </div>
      
      {/* Navigation */}
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '0 24px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setActiveScreen('create')}
          style={{ padding: '16px 24px', background: activeScreen === 'create' ? '#667eea' : 'transparent', color: activeScreen === 'create' ? 'white' : '#666', border: 'none', borderBottom: activeScreen === 'create' ? '3px solid #667eea' : '3px solid transparent', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}
        >
          Create Plan
        </button>
        <button
          onClick={() => setActiveScreen('actuals')}
          style={{ padding: '16px 24px', background: activeScreen === 'actuals' ? '#667eea' : 'transparent', color: activeScreen === 'actuals' ? 'white' : '#666', border: 'none', borderBottom: activeScreen === 'actuals' ? '3px solid #667eea' : '3px solid transparent', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}
        >
          Input Actuals
        </button>
        <button
          onClick={() => setActiveScreen('dashboard')}
          style={{ padding: '16px 24px', background: activeScreen === 'dashboard' ? '#667eea' : 'transparent', color: activeScreen === 'dashboard' ? 'white' : '#666', border: 'none', borderBottom: activeScreen === 'dashboard' ? '3px solid #667eea' : '3px solid transparent', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}
        >
          Dashboard
        </button>
      </div>
      
      {/* Content */}
      <div style={{ padding: '24px' }}>
        {activeScreen === 'create' && (
          <CreatePlanScreen 
            suppliers={suppliers} 
            skus={skus} 
            plans={plans} 
            setPlans={setPlans}
            currentUser={currentUser}
          />
        )}
        {activeScreen === 'actuals' && (
          <InputActualsScreen 
            plans={plans} 
            setPlans={setPlans}
            skus={skus}
          />
        )}
        {activeScreen === 'dashboard' && (
          <DashboardScreen 
            plans={plans}
            skus={skus}
          />
        )}
      </div>
    </div>
  );
}

// Screen 1: Create Plan
function CreatePlanScreen({ suppliers, skus, plans, setPlans, currentUser }) {
  const [client, setClient] = useState('');
  const [skuCode, setSkuCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('2026');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedSku = skus.find(s => s.code === skuCode);
    if (!selectedSku) return;
    
    const newPlan = {
      id: Date.now().toString(),
      client,
      skuCode,
      skuName: selectedSku.name,
      uom: selectedSku.uom,
      price: selectedSku.price,
      currency: selectedSku.currency,
      quantity: parseFloat(quantity),
      month,
      year,
      actual: 0,
      createdBy: currentUser,
      createdAt: new Date().toISOString()
    };
    
    setPlans([...plans, newPlan]);
    
    // Reset form
    setClient('');
    setSkuCode('');
    setQuantity('');
    setMonth('');
    
    alert('Plan created successfully!');
  };
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '32px' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '22px', color: '#333' }}>Create Monthly Plan</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Client</label>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
              required
            >
              <option value="">Select client...</option>
              {suppliers.map((supplier, idx) => (
                <option key={idx} value={supplier}>{supplier}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>SKU</label>
            <select
              value={skuCode}
              onChange={(e) => setSkuCode(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
              required
            >
              <option value="">Select SKU...</option>
              {skus.map((sku, idx) => (
                <option key={idx} value={sku.code}>
                  {sku.code} - {sku.name} ({sku.uom})
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Quantity</label>
            <input
              type="number"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
                required
              >
                <option value="">Select month...</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
          >
            Create Plan
          </button>
        </form>
      </div>
      
      {/* Recent Plans */}
      <div style={{ marginTop: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#333' }}>Recent Plans ({plans.length})</h3>
        {plans.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px' }}>No plans created yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Client</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>SKU</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>Quantity</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Period</th>
                </tr>
              </thead>
              <tbody>
                {plans.slice(-10).reverse().map((plan) => (
                  <tr key={plan.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>{plan.client}</td>
                    <td style={{ padding: '12px' }}>{plan.skuCode} - {plan.skuName}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{plan.quantity.toLocaleString()} {plan.uom}</td>
                    <td style={{ padding: '12px' }}>{plan.month} {plan.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Screen 2: Input Actuals
function InputActualsScreen({ plans, setPlans, skus }) {
  const [filterMonth, setFilterMonth] = useState('');
  const [filterClient, setFilterClient] = useState('');
  
  const filteredPlans = plans.filter(plan => {
    if (filterMonth && plan.month !== filterMonth) return false;
    if (filterClient && plan.client !== filterClient) return false;
    return true;
  });
  
  const handleActualChange = (planId, value) => {
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { ...plan, actual: parseFloat(value) || 0 }
        : plan
    ));
  };
  
  const uniqueClients = [...new Set(plans.map(p => p.client))];
  const uniqueMonths = [...new Set(plans.map(p => p.month))];
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '32px' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '22px', color: '#333' }}>Input Actual Sales</h2>
        
        {/* Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Filter by Month</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="">All months</option>
              {uniqueMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px', fontWeight: '500' }}>Filter by Client</label>
            <select
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="">All clients</option>
              {uniqueClients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Plans Table */}
        {filteredPlans.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px' }}>No plans found. Create plans first.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Client</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>SKU</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>Plan</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>Actual</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Period</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>{plan.client}</td>
                    <td style={{ padding: '12px' }}>{plan.skuCode} - {plan.skuName.substring(0, 30)}...</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{plan.quantity.toLocaleString()} {plan.uom}</td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="number"
                        step="0.01"
                        value={plan.actual}
                        onChange={(e) => handleActualChange(plan.id, e.target.value)}
                        style={{ width: '120px', padding: '8px', border: '2px solid #e0e0e0', borderRadius: '4px', textAlign: 'right' }}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>{plan.month} {plan.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Screen 3: Dashboard
function DashboardScreen({ plans, skus }) {
  const [filterMonth, setFilterMonth] = useState('');
  
  const filteredPlans = plans.filter(plan => {
    if (filterMonth && plan.month !== filterMonth) return false;
    return true;
  });
  
  const plansWithMetrics = filteredPlans.map(plan => ({
    ...plan,
    fillRate: plan.quantity > 0 ? (plan.actual / plan.quantity) : 0,
    status: plan.quantity > 0 ? (plan.actual / plan.quantity >= 0.5 ? 'good' : 'low') : 'none'
  }));
  
  const uniqueMonths = [...new Set(plans.map(p => p.month))];
  
  const totalPlan = plansWithMetrics.reduce((sum, p) => sum + p.quantity, 0);
  const totalActual = plansWithMetrics.reduce((sum, p) => sum + p.actual, 0);
  const avgFillRate = totalPlan > 0 ? (totalActual / totalPlan) : 0;
  
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '24px' }}>
          <p style={{ margin: '0 0 8px', color: '#666', fontSize: '14px' }}>Total Plans</p>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#333' }}>{filteredPlans.length}</p>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '24px' }}>
          <p style={{ margin: '0 0 8px', color: '#666', fontSize: '14px' }}>Average Fill Rate</p>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: avgFillRate >= 0.5 ? '#48bb78' : '#e53e3e' }}>
            {(avgFillRate * 100).toFixed(1)}%
          </p>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '24px' }}>
          <p style={{ margin: '0 0 8px', color: '#666', fontSize: '14px' }}>Plans ≥50% Fill Rate</p>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#667eea' }}>
            {plansWithMetrics.filter(p => p.fillRate >= 0.5).length}
          </p>
        </div>
      </div>
      
      {/* Main Dashboard */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#333' }}>Ship-to-Plan Dashboard</h2>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            style={{ padding: '10px 16px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px' }}
          >
            <option value="">All months</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        
        {plansWithMetrics.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px' }}>No data to display. Create plans and input actuals first.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Client</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>SKU</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>UOM</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>Plan</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>Actual</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>Fill Rate</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#666' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Period</th>
                </tr>
              </thead>
              <tbody>
                {plansWithMetrics.map((plan) => (
                  <tr key={plan.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>{plan.client}</td>
                    <td style={{ padding: '12px' }}>{plan.skuCode}</td>
                    <td style={{ padding: '12px' }}>{plan.uom}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{plan.quantity.toLocaleString()}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{plan.actual.toLocaleString()}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: plan.fillRate >= 0.5 ? '#48bb78' : '#e53e3e' }}>
                      {(plan.fillRate * 100).toFixed(1)}%
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ 
                        display: 'inline-block',
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        fontWeight: '600',
                        background: plan.status === 'good' ? '#c6f6d5' : '#fed7d7',
                        color: plan.status === 'good' ? '#22543d' : '#742a2a'
                      }}>
                        {plan.status === 'good' ? '✓ On Track' : '✗ Below Target'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{plan.month} {plan.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

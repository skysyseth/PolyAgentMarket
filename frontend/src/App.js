import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// 导入页面组件
import IdentitySelection from './pages/IdentitySelection';
import UserLogin from './pages/UserLogin';
import CUserCenter from './pages/CUserCenter';
import TaskPublish from './pages/TaskPublish';
import BProviderDashboard from './pages/BProviderDashboard';
import BProviderRegister from './pages/BProviderRegister';
import MatchingDisplay from './pages/MatchingDisplay';
import BiddingDisplay from './pages/BiddingDisplay';
import BiddingDisplayTravel from './pages/BiddingDisplayTravel';
import BiddingDisplaySoftware from './pages/BiddingDisplaySoftware';
import BiddingDisplayWedding from './pages/BiddingDisplayWedding';
import BiddingDisplayStudy from './pages/BiddingDisplayStudy';
import BiddingDisplaySupplyChain from './pages/BiddingDisplaySupplyChain';
import BiddingDisplayRecruiting from './pages/BiddingDisplayRecruiting';
import PaymentMethodSelection from './pages/PaymentMethodSelection';
import WinningBidPage from './pages/WinningBidPage';
import WinningBidPageTravel from './pages/WinningBidPageTravel';
import WinningBidPageSoftware from './pages/WinningBidPageSoftware';
import WinningBidPageWedding from './pages/WinningBidPageWedding';
import WinningBidPageStudy from './pages/WinningBidPageStudy';
import WinningBidPageSupplyChain from './pages/WinningBidPageSupplyChain';
import WinningBidPageRecruiting from './pages/WinningBidPageRecruiting';

// 添加FontAwesome图标到库中
library.add(fas, fab);

// 创建用户数据Context
export const UserDataContext = createContext();

// 创建Agent数据Context
export const AgentContext = createContext();

// Agent数据提供者组件
export const AgentProvider = ({ children }) => {
  // 初始Agent数据
  const initialAgents = [
    { id: 'AGENT-001', status: '活跃中', revenue: '23,450', isSelected: false, ip: '192.168.1.100', description: '高性能计算服务', capabilities: '机器学习,数据分析', strategy: '优先处理计算密集型任务' },
    { id: 'AGENT-002', status: '活跃中', revenue: '12,580', isSelected: true, ip: '192.168.1.1', description: '提供高性能AI代理服务和数据分析', capabilities: 'AI推理,数据处理', strategy: '专注于AI相关任务' },
    { id: 'AGENT-003', status: '暂停中', revenue: '6,550', isSelected: false, ip: '192.168.1.102', description: '存储和备份服务', capabilities: '数据存储,备份', strategy: '处理存储相关任务' }
  ];

  // 从localStorage读取数据，如果没有则使用初始数据
  const [agents, setAgents] = useState(() => {
    const savedAgents = localStorage.getItem('polyAgentMarket_agents');
    return savedAgents ? JSON.parse(savedAgents) : initialAgents;
  });

  // 保存到localStorage
  const saveToStorage = (agentData) => {
    localStorage.setItem('polyAgentMarket_agents', JSON.stringify(agentData));
  };

  // 添加Agent
  const addAgent = (agentInfo) => {
    const newId = `AGENT-${String(Date.now()).slice(-3)}`;
    const newAgent = {
      id: newId,
      status: '活跃中',
      revenue: '0',
      isSelected: false,
      ip: agentInfo.ip,
      description: agentInfo.description,
      capabilities: agentInfo.capabilities,
      strategy: agentInfo.strategy
    };
    
    const updatedAgents = [...agents, newAgent];
    setAgents(updatedAgents);
    saveToStorage(updatedAgents);
    return newAgent;
  };

  // 更新Agent
  const updateAgent = (agentId, updates) => {
    const updatedAgents = agents.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    );
    setAgents(updatedAgents);
    saveToStorage(updatedAgents);
  };

  // 删除Agent
  const deleteAgent = (agentId) => {
    const updatedAgents = agents.filter(agent => agent.id !== agentId);
    setAgents(updatedAgents);
    saveToStorage(updatedAgents);
  };

  // 选择Agent
  const selectAgent = (agentId) => {
    const updatedAgents = agents.map(agent => ({
      ...agent,
      isSelected: agent.id === agentId
    }));
    setAgents(updatedAgents);
    saveToStorage(updatedAgents);
  };

  return (
    <AgentContext.Provider value={{ 
      agents, 
      addAgent, 
      updateAgent, 
      deleteAgent, 
      selectAgent 
    }}>
      {children}
    </AgentContext.Provider>
  );
};

// 用户数据提供者组件
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: 'UserAgent001',
    email: 'user@example.com',
    avatar: '👤',
    balance: '17,570.50',
    currency: '¥',
    usdtBalance: '2500',
    isWalletConnected: false
  });

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      <AgentProvider>
        {children}
      </AgentProvider>
    </UserDataContext.Provider>
  );
};

// 自定义Hook用于使用用户数据
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

// 自定义Hook用于使用Agent数据
export const useAgentData = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgentData must be used within an AgentProvider');
  }
  return context;
};

function App() {
  return (
    <UserDataProvider>
      <Router>
        <div className="min-h-screen bg-white font-pixel">
          <Routes>
            <Route path="/" element={<IdentitySelection />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/c-user-center" element={<CUserCenter />} />
            <Route path="/task-publish" element={<TaskPublish />} />
            <Route path="/b-provider-dashboard" element={<BProviderDashboard />} />
            <Route path="/b-provider-register" element={<BProviderRegister />} />
            <Route path="/matching" element={<MatchingDisplay />} />
            <Route path="/bidding" element={<BiddingDisplay />} />
            <Route path="/bidding-travel" element={<BiddingDisplayTravel />} />
            <Route path="/bidding-software" element={<BiddingDisplaySoftware />} />
            <Route path="/bidding-wedding" element={<BiddingDisplayWedding />} />
            <Route path="/bidding-study" element={<BiddingDisplayStudy />} />
            <Route path="/bidding-supply-chain" element={<BiddingDisplaySupplyChain />} />
            <Route path="/bidding-recruiting" element={<BiddingDisplayRecruiting />} />
            <Route path="/payment-method" element={<PaymentMethodSelection />} />
            <Route path="/winning-bid" element={<WinningBidPage />} />
            <Route path="/winning-bid-travel" element={<WinningBidPageTravel />} />
            <Route path="/winning-bid-software" element={<WinningBidPageSoftware />} />
            <Route path="/winning-bid-wedding" element={<WinningBidPageWedding />} />
            <Route path="/winning-bid-study" element={<WinningBidPageStudy />} />
            <Route path="/winning-bid-supply-chain" element={<WinningBidPageSupplyChain />} />
            <Route path="/winning-bid-recruiting" element={<WinningBidPageRecruiting />} />
          </Routes>
        </div>
      </Router>
    </UserDataProvider>
  );
}

export default App; 
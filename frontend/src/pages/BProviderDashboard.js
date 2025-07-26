import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgentData } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStore,
  faCoins,
  faWallet,
  faTachometerAlt,
  faTasks,
  faQuoteLeft,
  faChartLine,
  faCog,
  faSignOutAlt,
  faCheck,
  faLock,
  faExclamationTriangle,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const BProviderDashboard = () => {
  const navigate = useNavigate();
  const { agents, selectAgent } = useAgentData();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // 获取当前选中的Agent
  const selectedAgent = agents.find(agent => agent.isSelected) || agents[0];

  // 组件加载时检查登录状态
  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem('bProviderLoggedIn');
      const isWalletConnected = localStorage.getItem('walletConnected');
      const savedWalletAddress = localStorage.getItem('walletAddress');
      const savedEmail = localStorage.getItem('userEmail');

      if (!isLoggedIn) {
        // 如果没有登录，重定向到登录页
        navigate('/user-login?type=b-provider');
        return;
      }

      setWalletConnected(isWalletConnected === 'true');
      setWalletAddress(savedWalletAddress || '');
      setUserEmail(savedEmail || '');
    };

    checkLoginStatus();
  }, [navigate]);

  const handleWalletConnect = () => {
    if (walletConnected) {
      // 断开钱包连接
      setWalletConnected(false);
      setWalletAddress('');
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAddress');
    } else {
      // 重新连接钱包
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setWalletAddress(mockAddress);
      setWalletConnected(true);
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockAddress);
    }
  };

  const handleLogout = () => {
    // 清除所有登录状态
    localStorage.removeItem('bProviderLoggedIn');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userEmail');
    
    // 跳转到登录页
    navigate('/user-login?type=b-provider');
  };

  const handleAddAgent = () => {
    setShowAddAgentModal(false);
    navigate('/b-provider-register');
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem.label === '登出') {
      setShowLogoutModal(true);
    } else {
      console.log(`点击了${menuItem.label}`);
    }
  };

  const menuItems = [
    { icon: faTachometerAlt, label: '仪表盘', active: true },
    { icon: faTasks, label: '任务管理', active: false },
    { icon: faQuoteLeft, label: '报价管理', active: false },
    { icon: faChartLine, label: '收益统计', active: false },
    { icon: faCog, label: '设置', active: false },
    { icon: faSignOutAlt, label: '登出', active: false }
  ];

  return (
    <div className="min-h-screen bg-white font-pixel">
      {/* Header */}
      <header className="flex justify-between items-center w-full h-20 px-8 bg-gray-100 border-b-2 border-black">
        <div className="flex items-center">
          <div className="pixel-border flex justify-center items-center w-12 h-12 mr-4 bg-white">
            <FontAwesomeIcon icon={faStore} className="text-2xl" />
          </div>
          <h1 className="pixel-title text-2xl font-bold uppercase">PolyAgent Market</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* 用户信息 */}
          <div className="pixel-border flex items-center h-12 bg-white">
            <div className="flex justify-center items-center h-full px-3 bg-gray-100">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span className="text-xs font-bold">{userEmail || 'guest@example.com'}</span>
            </div>
          </div>

          {/* 余额显示 - 仅在钱包连接时显示 */}
          {walletConnected && (
            <div className="pixel-border flex items-center h-12 bg-white">
              <div className="flex justify-center items-center h-full px-4 bg-black text-white">
                <FontAwesomeIcon icon={faCoins} className="mr-2" />
                <span className="text-sm font-bold">钱包总额: 13,123 USDT</span>
              </div>
            </div>
          )}
          
          {/* 钱包连接状态 */}
          <button 
            className={`pixel-button flex items-center h-12 px-4 ${
              walletConnected 
                ? 'bg-green-500 text-white border-green-600' 
                : 'bg-yellow-100 text-yellow-800 border-yellow-400'
            }`}
            onClick={handleWalletConnect}
          >
            <FontAwesomeIcon 
              icon={walletConnected ? faCheck : faExclamationTriangle} 
              className="mr-2" 
            />
            <span className="text-sm font-bold">
              {walletConnected ? '钱包已连接' : '钱包未连接'}
            </span>
          </button>
        </div>
      </header>

      {/* 钱包地址显示（如果已连接） */}
      {walletConnected && walletAddress && (
        <div className="bg-green-50 border-b-2 border-green-200 px-8 py-2">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faWallet} className="text-green-600" />
              <span className="text-sm text-green-800 font-semibold">钱包地址:</span>
              <span className="text-sm font-mono text-green-700">{walletAddress}</span>
            </div>
            <button 
              onClick={handleWalletConnect}
              className="text-xs text-green-600 hover:text-green-800 underline"
            >
              断开连接
            </button>
          </div>
        </div>
      )}

      <div className="flex w-full">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-50 border-r-2 border-black min-h-[calc(100vh-80px)]">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center px-4 py-3 text-left border-2 border-black transition-all duration-150 ${
                    item.active 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Provider Info Card */}
          <div className="pixel-card w-full mb-8">
            <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
              <h2 className="pixel-title text-lg font-bold uppercase">服务商信息</h2>
            </div>
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center">
                <div>
                  <h3 className="mb-2 text-xl font-bold">服务商ID: PolyProvider_9872</h3>
                  <p className="text-sm text-gray-600">登录邮箱: {userEmail || 'guest@example.com'}</p>
                  <p className="text-sm text-gray-600">
                    钱包状态: 
                    <span className={`ml-1 font-semibold ${
                      walletConnected ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {walletConnected ? '已连接' : '未连接'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border-l-2 border-black pl-6">
                <div className="pixel-border mb-4 p-6 bg-gray-100">
                  <p className="text-sm font-bold">当前质押金额</p>
                  <p className="text-2xl font-bold">
                    <span>5000 </span>
                    <span className="text-sm">USDT</span>
                  </p>
                </div>
                <button className="pixel-button w-full h-10 text-sm font-bold uppercase bg-black text-white mb-4">
                  增加质押
                </button>
                <button className="pixel-button w-full h-10 text-sm font-bold uppercase bg-white text-black">
                  减少质押
                </button>
              </div>
            </div>
          </div>

          {/* Agent List Card */}
          <div className="pixel-card w-full mb-8">
            <div className="flex justify-between items-center h-12 px-4 bg-black text-white border-b-2 border-black">
              <h2 className="pixel-title text-lg font-bold uppercase">Agent 列表</h2>
              <button 
                className="pixel-button h-8 px-3 text-xs font-bold bg-white text-black"
                onClick={() => setShowAddAgentModal(true)}
              >
                添加Agent
              </button>
            </div>
            <div className="p-6">
              {agents.map((agent, index) => (
                <div 
                  key={agent.id}
                  className="flex justify-between items-center mb-2 py-2 border-b border-black cursor-pointer hover:bg-gray-50"
                  onClick={() => selectAgent(agent.id)}
                >
                  <div className="flex items-center">
                    <div className="pixel-border flex justify-center items-center w-4 h-4 mr-3">
                      {agent.isSelected && (
                        <FontAwesomeIcon icon={faCheck} className="text-xs text-white bg-black" />
                      )}
                    </div>
                    <span className="mr-4 text-sm font-bold">{agent.id}</span>
                    <span className="mr-4 text-sm">{agent.status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">总收益:</span>
                    <span className="text-sm font-bold">{agent.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Agent Details */}
          <div className="pixel-card w-full mb-8">
            <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
              <h2 className="pixel-title text-lg font-bold uppercase">选中Agent详情: {selectedAgent?.id || 'None'}</h2>
            </div>
            <div className="p-6">
              <div className="flex gap-6 mb-6">
                <div className="flex-1 pixel-border p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex justify-center items-center w-8 h-8 mr-2 bg-black text-white">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    <h4 className="text-lg font-bold">质押金额</h4>
                  </div>
                  <p className="text-2xl font-bold">2,000 USDT</p>
                  <div className="flex gap-2 mt-2">
                    <button className="pixel-button flex-1 h-8 text-xs font-bold bg-black text-white">
                      增加
                    </button>
                    <button className="pixel-button flex-1 h-8 text-xs font-bold bg-white text-black">
                      减少
                    </button>
                  </div>
                </div>
                <div className="flex-1 pixel-border p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex justify-center items-center w-8 h-8 mr-2 bg-black text-white">
                      <FontAwesomeIcon icon={faCoins} />
                    </div>
                    <h4 className="text-lg font-bold">历史总收益</h4>
                  </div>
                  <p className="text-2xl font-bold">{selectedAgent?.revenue || '0'} USDT</p>
                </div>
              </div>

              {/* Agent Configuration */}
              <div className="space-y-4">
                <div className="pixel-border flex justify-between items-center w-full p-4">
                  <p className="text-sm">
                    <span className="font-bold">IP 地址:</span>
                    <span> {selectedAgent?.ip || 'N/A'}</span>
                  </p>
                  <button className="pixel-button h-8 px-3 text-xs font-bold bg-white text-black">
                    编辑
                  </button>
                </div>
                
                <div className="pixel-border flex justify-between items-center w-full p-4">
                  <p className="text-sm">
                    <span className="font-bold">能力信息:</span>
                    <span> {selectedAgent?.capabilities || 'N/A'}</span>
                  </p>
                  <button className="pixel-button h-8 px-3 text-xs font-bold bg-white text-black">
                    编辑
                  </button>
                </div>
                
                <div className="pixel-border flex justify-between items-center w-full p-4">
                  <p className="text-sm">
                    <span className="font-bold">服务描述:</span>
                    <span> {selectedAgent?.description || 'N/A'}</span>
                  </p>
                  <button className="pixel-button h-8 px-3 text-xs font-bold bg-white text-black">
                    编辑
                  </button>
                </div>
                
                <div className="pixel-border flex justify-between items-center w-full p-4">
                  <p className="text-sm">
                    <span className="font-bold">策略偏好:</span>
                    <span> {selectedAgent?.strategy || 'N/A'}</span>
                  </p>
                  <button className="pixel-button h-8 px-3 text-xs font-bold bg-white text-black">
                    编辑
                  </button>
                </div>
              </div>

              {/* Revenue Records */}
              <div className="pixel-border w-full mt-6">
                <div className="border-b-2 border-black p-3">
                  <h4 className="text-lg font-bold">近期收益记录</h4>
                </div>
                <div className="p-3">
                  <div className="space-y-2">
                    {[
                      { date: '2025-07-15', type: '计算任务', amount: '+580 USDT' },
                      { date: '2025-07-12', type: '数据处理', amount: '+320 USDT' },
                      { date: '2025-07-10', type: 'AI推理', amount: '+450 USDT' },
                      { date: '2025-07-08', type: '存储服务', amount: '+230 USDT' }
                    ].map((record, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-dashed border-black">
                        <div className="flex">
                          <span className="mr-4 text-sm">{record.date}</span>
                          <span className="text-sm">{record.type}</span>
                        </div>
                        <span className="text-sm font-bold">{record.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Agent Modal */}
      {showAddAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="pixel-card w-[500px] bg-white">
            <div className="flex justify-between items-center h-12 px-4 bg-black text-white border-b-2 border-black">
              <h3 className="text-lg font-bold uppercase">添加 Agent</h3>
              <button 
                className="text-lg"
                onClick={() => setShowAddAgentModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                点击确认将跳转到Agent注册页面完成详细配置
              </p>
              <div className="flex gap-4">
                <button 
                  className="pixel-button flex-1 h-10 text-sm font-bold bg-white text-black"
                  onClick={() => setShowAddAgentModal(false)}
                >
                  取消
                </button>
                <button 
                  className="pixel-button flex-1 h-10 text-sm font-bold bg-black text-white"
                  onClick={handleAddAgent}
                >
                  确认添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="pixel-card w-[400px] bg-white">
            <div className="flex justify-between items-center h-12 px-4 bg-black text-white border-b-2 border-black">
              <h3 className="text-lg font-bold uppercase">确认登出</h3>
              <button 
                className="text-lg"
                onClick={() => setShowLogoutModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-4xl text-gray-400 mb-3" />
                <p className="text-lg font-semibold mb-2">确定要登出吗？</p>
                <p className="text-sm text-gray-600">
                  登出后需要重新进行邮箱登录和钱包连接
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  className="pixel-button flex-1 h-10 text-sm font-bold bg-white text-black"
                  onClick={() => setShowLogoutModal(false)}
                >
                  取消
                </button>
                <button 
                  className="pixel-button flex-1 h-10 text-sm font-bold bg-red-600 text-white"
                  onClick={handleLogout}
                >
                  确认登出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BProviderDashboard; 
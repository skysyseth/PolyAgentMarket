import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCoins,
  faUser,
  faRoute,
  faArrowRight,
  faCheck,
  faCube,
  faArrowLeft,
  faWallet,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const WinningBidPageSoftware = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, updateUserData } = useUserData();
  
  // 软件开发领域的任务信息
  const taskInfo = {
    title: '毕设系统开发服务',
    description: ' 为本科生和研究生提供专业的毕业设计系统开发服务，包含源码和完整文档',
    requirements: ' 源码交付/详细文档/技术支持/按时完成/答辩指导'
  };
  
  // 中标信息 - 软件开发领域
  const [winningBid] = useState(() => {
    return location.state?.selectedBid || {
      id: 1,
      providerName: '云智科技',
      successRate: 95,
      price: 6050,
      services: [
        '系统架构：B/S架构，支持多终端访问，响应式设计适配手机和电脑',
        '核心功能：基础员工管理、财务记账、进销存管理、简易CRM',
        '安全保障：数据加密传输与存储，多级权限控制，定期备份',
        '系统定制：可根据企业实际需求进行功能模块调整和界面定制'
      ]
    };
  });

  // 可调整的服务项目 - 软件开发领域
  const [adjustableServices, setAdjustableServices] = useState([
    { id: 1, name: '高级UI设计', description: '响应式界面设计，多终端适配', price: 1500, included: true },
    { id: 2, name: '数据迁移服务', description: '现有系统数据导入与整理', price: 800, included: true },
    { id: 3, name: '员工培训', description: '系统使用培训，操作手册制作', price: 600, included: true },
    { id: 4, name: '一年维护', description: '系统维护，技术支持，功能升级', price: 1200, included: true },
    { id: 5, name: '移动端APP', description: '配套移动应用开发', price: 2000, included: false },
    { id: 6, name: '高级报表', description: '自定义报表系统', price: 800, included: false }
  ]);

  // 不再需要预订信息

  // 计算总价
  const getTotalPrice = () => {
    const basePrice = 1950; // 基础服务费
    const additionalPrice = adjustableServices
      .filter(service => service.included)
      .reduce((sum, service) => sum + service.price, 0);
    return basePrice + additionalPrice;
  };

  // 切换服务项目
  const toggleService = (serviceId) => {
    setAdjustableServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, included: !service.included }
          : service
      )
    );
  };

  // 不再需要处理输入变化

  const handleBack = () => {
    navigate(-1);
  };

  const handleConnectWallet = () => {
    updateUserData({ isWalletConnected: !userData.isWalletConnected });
  };

  // 确认支付
  const handleConfirmPayment = () => {
    const totalAmount = getTotalPrice();
    const userBalance = parseFloat(userData.balance.replace(',', ''));
    
    if (userBalance < totalAmount) {
      alert('账户余额不足，请充值后再试！');
      return;
    }

    // 不再需要验证联系信息

    if (window.confirm(`确认支付 ¥${totalAmount} 完成此次服务预订吗？`)) {
      // 模拟支付处理
      alert('支付成功！服务已确认，稍后客服将与您联系确认项目细节。');
      navigate('/c-user-center');
    }
  };

  return (
    <div className="min-h-screen bg-white font-pixel">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b-2 border-black">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo and Back */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleBack}
              className="back-button flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>返回</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black flex items-center justify-center">
                <FontAwesomeIcon icon={faCube} className="text-white text-sm" />
              </div>
              <h1 className="pixel-title text-xl">POLYAGENT MARKET</h1>
            </div>
          </div>
          
          {/* User Info and Wallet */}
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <span className="text-xl">{userData.avatar}</span>
              <span className="text-sm font-bold">{userData.username}</span>
            </div>
            
            {/* Wallet Status */}
            <button 
              onClick={handleConnectWallet}
              className={`px-4 py-2 flex items-center space-x-2 border-2 border-black font-bold transition-colors duration-150 ${
                userData.isWalletConnected 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon icon={faWallet} />
              <span>{userData.isWalletConnected ? '钱包已连接' : '连接钱包'}</span>
              {userData.isWalletConnected && (
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 ml-1" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="w-full pt-6 px-8 pb-32">
        {/* 中标服务信息 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">中标服务信息</h2>
          </div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-start">
              <div className="pixel-border flex justify-center items-center w-16 h-16 mr-4">
                <FontAwesomeIcon icon={faUser} className="text-3xl text-indigo-600" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">{taskInfo.title}</h3>
                <p className="mb-1 text-sm">
                  <span className="font-bold">描述:</span>
                  <span> {taskInfo.description}</span>
                </p>
                <p className="text-sm">
                  <span className="font-bold">要求:</span>
                  <span> {taskInfo.requirements}</span>
                </p>
              </div>
            </div>
            <div className="border-l-2 border-black pl-4">
              <p className="text-sm">
                <span className="font-bold">中标服务商:</span>
                <span> {winningBid.providerName}</span>
              </p>
              <p className="text-sm">
                <span className="font-bold">成功率:</span>
                <span> {winningBid.successRate}%</span>
              </p>
              <div className="flex items-center mt-2">
                <span className="mr-2 text-sm font-bold">状态:</span>
                <span className="bg-black text-white px-2 py-1 text-xs font-bold">已中标</span>
              </div>
            </div>
          </div>
        </div>

        {/* 服务细节 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">服务细节</h2>
          </div>
          <div className="p-4">
            <div className="border bg-gray-100 p-3 mb-4">
              <ul className="text-sm">
                {winningBid.services.map((service, index) => (
                  <li key={index} className="mb-1">• {service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 功能模块与费用 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">功能模块与费用</h2>
          </div>
          <div className="p-4">
            <h3 className="mb-3 pl-1 text-sm font-bold">可选功能模块</h3>
            {adjustableServices.map((service) => (
              <div key={service.id} className="flex justify-between items-center mb-3 p-3 border border-gray-200">
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold">{service.name}</p>
                    <button 
                      className="pixel-border flex justify-center items-center w-6 h-6"
                      onClick={() => toggleService(service.id)}
                    >
                      {service.included && (
                        <FontAwesomeIcon icon={faCheck} className="text-xs text-green-600" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">{service.description}</p>
                </div>
                <div className={`text-right w-20 ml-4 text-sm font-bold ${
                  service.included ? 'text-black' : 'text-gray-400 line-through'
                }`}>
                  ¥{service.price}
                </div>
              </div>
            ))}
          </div>
        </div>


      </main>

      {/* 固定底部支付栏 */}
      <div className="fixed-bottom p-8 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-6">
              <p className="mb-1 text-sm">服务总价</p>
              <p className="text-2xl font-bold">¥{getTotalPrice()}</p>
            </div>
            <div className="border-l-2 border-black pl-6">
              <p className="mb-1 text-sm">账户余额</p>
              <div className="text-right">
                <p className="text-sm font-bold">{userData.usdtBalance} USDT</p>
                <p className="text-lg font-bold text-blue-600">¥{userData.balance}</p>
              </div>
            </div>
          </div>
          <button 
            className="pixel-button flex items-center h-15 px-8 text-lg font-bold uppercase bg-black text-white"
            onClick={handleConfirmPayment}
          >
            <span>确认支付</span>
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinningBidPageSoftware; 
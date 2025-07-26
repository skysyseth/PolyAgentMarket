import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCube,
  faWallet,
  faCheckCircle,
  faExclamationTriangle,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { 
  faAlipay
} from '@fortawesome/free-brands-svg-icons';
import { useUserData } from '../App';

const PaymentMethodSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, updateUserData } = useUserData();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'blockchain-wallet',
      name: '区块链钱包支付',
      icon: faCube,
      description: '使用加密货币进行支付，安全透明',
      details: [
        '支持 USDT、ETH、BTC 等主流币种',
        '交易记录区块链存证',
        '手续费低，到账快速',
        '支持智能合约自动执行'
      ],
      advantages: '去中心化，安全性高',
      status: userData.isWalletConnected ? 'available' : 'need_connect',
      isConnected: userData.isWalletConnected
    },
    {
      id: 'alipay',
      name: '支付宝支付',
      icon: faAlipay,
      description: '功能开发中，即将上线',
      details: [
        '功能正在开发中',
        '即将支持人民币支付',
        '敬请期待'
      ],
      advantages: '支持人民币的快速支付',
      status: 'developing',
      isConnected: false
    }
  ];

  const handleConnectWallet = () => {
    updateUserData({ isWalletConnected: !userData.isWalletConnected });
  };

  const handleMethodSelect = (methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    
    if (method.status === 'developing') {
      alert('支付宝功能正在开发中，敬请期待！');
      return;
    }
    
    if (method.status === 'need_connect') {
      if (window.confirm('需要先连接钱包才能使用区块链支付，是否现在连接？')) {
        handleConnectWallet();
      }
      return;
    }
    
    setSelectedMethod(methodId);
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('请选择支付方式');
      return;
    }

    setIsProcessing(true);
    
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false);
      
      // 获取选中的竞价信息（如果有的话）
      const selectedBid = location.state?.selectedBid;
      const domain = location.state?.domain;
      const taskInfo = location.state?.taskInfo;
      
      if (selectedBid) {
        // 如果有选中的竞价信息，根据领域跳转到对应的中标页面
        let winningBidRoute = '/winning-bid';
        if (domain === 'travel') {
          winningBidRoute = '/winning-bid-travel';
        } else if (domain === 'enterprise') {
          winningBidRoute = '/winning-bid-software';
        } else if (domain === 'wedding') {
          winningBidRoute = '/winning-bid-wedding';
        } else if (domain === 'study') {
          winningBidRoute = '/winning-bid-study';
        } else if (domain === 'supply-chain') {
          winningBidRoute = '/winning-bid-supply-chain';
        } else if (domain === 'recruiting') {
          winningBidRoute = '/winning-bid-recruiting';
        }
        
        navigate(winningBidRoute, { 
          state: { 
            selectedBid,
            domain,
            taskInfo
          } 
        });
      } else {
        // 否则跳转到用户中心
        navigate('/c-user-center');
      }
    }, 2000);
  };

  const handleBack = () => {
    navigate(-1);
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

      <main className="max-w-4xl mx-auto p-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="pixel-title text-3xl font-bold uppercase mb-4">
            选择支付方式
          </h2>
          <div className="w-[300px] h-[2px] bg-black mx-auto mb-6"></div>
          <p className="text-gray-600">
            请选择您偏好的支付方式完成任务发布
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`pixel-card p-6 cursor-pointer transition-all duration-200 ${
                selectedMethod === method.id ? 'ring-4 ring-blue-500 bg-blue-50' : 
                method.status === 'developing' ? 'opacity-60 cursor-not-allowed' :
                method.status === 'need_connect' ? 'border-yellow-400' : ''
              }`}
              onClick={() => handleMethodSelect(method.id)}
            >
              {/* Method Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 border-2 border-black flex items-center justify-center ${
                  method.isConnected ? 'bg-green-100' : 
                  method.status === 'developing' ? 'bg-gray-200' : 'bg-gray-100'
                }`}>
                  <FontAwesomeIcon 
                    icon={method.icon} 
                    className={`text-2xl ${
                      method.isConnected ? 'text-green-600' : 
                      method.status === 'developing' ? 'text-gray-500' :
                      method.id === 'alipay' ? 'text-blue-500' : 'text-gray-600'
                    }`}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                
                {/* Status Indicator */}
                <div className="flex flex-col items-end space-y-1">
                  {method.status === 'available' && (
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-lg" />
                  )}
                  {method.status === 'need_connect' && (
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-lg" />
                  )}
                  {method.status === 'developing' && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">开发中</span>
                  )}
                  
                  {selectedMethod === method.id && (
                    <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Method Details */}
              <div className="mb-4">
                <h4 className="font-bold mb-2">功能特点:</h4>
                <ul className="text-sm space-y-1">
                  {method.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className={method.status === 'developing' ? 'text-gray-500' : ''}>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages */}
              <div className={`pixel-border p-3 ${
                method.status === 'developing' ? 'bg-gray-50' : 'bg-blue-50'
              }`}>
                <p className="text-sm font-bold">
                  优势: {method.advantages}
                </p>
              </div>

              {/* Connection Status */}
              {method.status === 'need_connect' && (
                <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded">
                  <p className="text-sm text-yellow-700">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                    需要先连接钱包才能使用此支付方式
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment Button */}
        <div className="text-center">
          <button
            className={`pixel-button px-12 py-4 text-xl font-bold uppercase ${
              !selectedMethod || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="mr-2">处理中...</span>
                <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faWallet} className="mr-2" />
                确认
              </>
            )}
          </button>
          
          {selectedMethod && !isProcessing && (
            <p className="mt-4 text-sm text-gray-600">
              您选择了: {paymentMethods.find(m => m.id === selectedMethod)?.name}
            </p>
          )}
        </div>

        {/* Tips */}
        <div className="mt-12 pixel-card p-6 bg-gray-50">
          <h3 className="font-bold mb-3 flex items-center">
            💡 支付提示
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• 支付完成后，任务将立即发布到平台</li>
            <li>• 区块链支付安全透明，交易记录不可篡改</li>
            <li>• 如有支付问题，请联系客服获得帮助</li>
            <li>• 支付宝功能正在开发中，敬请期待</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default PaymentMethodSelection; 
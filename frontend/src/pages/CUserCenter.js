import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCube, 
  faWallet,
  faPlus,
  faCog,
  faQuestionCircle,
  faChevronRight,
  faCheckCircle,
  faExclamationTriangle,
  faEdit,
  faUpload,
  faHistory,
  faShield,
  faFileText,
  faSignOutAlt,
  faBell,
  faGift,
  faShare,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { 
  faAlipay
} from '@fortawesome/free-brands-svg-icons';
import { useUserData } from '../App';

const CUserCenter = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  
  // 用户信息编辑状态
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  // 支付方式配置
  const paymentMethods = [
    {
      id: 'blockchain-wallet',
      name: '区块链钱包',
      icon: faCube,
      status: userData.isWalletConnected ? '已连接' : '未连接',
      description: userData.isWalletConnected ? '0x1234...5678' : '连接钱包以使用加密货币支付',
      isConnected: userData.isWalletConnected,
      type: 'primary'
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: faAlipay,
      status: '未绑定',
      description: '绑定支付宝便于快速支付',
      isConnected: false,
      type: 'secondary'
    }
  ];

  // 更多操作配置
  const moreOperations = [
    {
      id: 'account-settings',
      icon: faCog,
      title: '账户设置',
      description: '修改密码、安全设置',
      action: () => console.log('账户设置')
    },
    {
      id: 'help-center',
      icon: faQuestionCircle,
      title: '帮助中心',
      description: '使用指南、常见问题',
      action: () => console.log('帮助中心')
    },
    {
      id: 'task-history',
      icon: faHistory,
      title: '任务历史',
      description: '查看发布和完成的任务',
      action: () => console.log('任务历史')
    },
    {
      id: 'security',
      icon: faShield,
      title: '安全中心',
      description: '验证身份、设备管理',
      action: () => console.log('安全中心')
    },
    {
      id: 'notifications',
      icon: faBell,
      title: '消息通知',
      description: '系统消息、任务提醒',
      action: () => console.log('消息通知')
    },
    {
      id: 'terms',
      icon: faFileText,
      title: '服务条款',
      description: '用户协议、隐私政策',
      action: () => console.log('服务条款')
    },
    {
      id: 'rewards',
      icon: faGift,
      title: '奖励中心',
      description: '积分兑换、活动奖励',
      action: () => console.log('奖励中心')
    },
    {
      id: 'referral',
      icon: faShare,
      title: '邀请好友',
      description: '邀请奖励、推广链接',
      action: () => console.log('邀请好友')
    },
    {
      id: 'logout',
      icon: faSignOutAlt,
      title: '退出登录',
      description: '安全退出当前账户',
      action: () => {
        if (window.confirm('确定要退出登录吗？')) {
          navigate('/');
        }
      }
    }
  ];

  const handleConnectWallet = () => {
    // 模拟连接钱包
    updateUserData({ isWalletConnected: !userData.isWalletConnected });
  };

  const handlePublishTask = () => {
    navigate('/task-publish');
  };

  const handleBackToTasks = () => {
    navigate('/task-publish');
  };

  const handlePaymentMethodAction = (methodId) => {
    console.log('处理支付方式操作:', methodId);
    if (methodId === 'blockchain-wallet') {
      if (!userData.isWalletConnected) {
        handleConnectWallet();
      } else {
        // 钱包管理逻辑
        console.log('管理区块链钱包');
      }
    } else if (methodId === 'alipay') {
      // 支付宝功能待开发
      alert('支付宝功能正在开发中，敬请期待！');
    }
  };

  const handleAvatarUpload = () => {
    // 模拟头像上传
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // 这里应该处理文件上传
        console.log('上传头像:', file.name);
        // 模拟更新头像
        updateUserData({ avatar: '🆕' });
      }
    };
    input.click();
  };

  const handleUsernameEdit = () => {
    setTempUsername(userData.username);
    setIsEditingUsername(true);
  };

  const handleUsernameSave = () => {
    if (tempUsername.trim()) {
      updateUserData({ username: tempUsername.trim() });
    }
    setIsEditingUsername(false);
  };

  const handleUsernameCancel = () => {
    setTempUsername('');
    setIsEditingUsername(false);
  };

  return (
    <div className="min-h-screen bg-white font-pixel">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b-2 border-black">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <FontAwesomeIcon icon={faCube} className="text-white text-sm" />
            </div>
            <h1 className="pixel-title text-xl">POLYAGENT MARKET</h1>
          </div>
          
          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {/* Back to Tasks Button */}
            <button
              onClick={handleBackToTasks}
              className="px-4 py-2 flex items-center space-x-2 border-2 border-black font-bold bg-white text-black hover:bg-gray-100 transition-colors duration-150"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>返回任务</span>
            </button>

            {/* Connect Wallet Button */}
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
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {/* Account Overview Card */}
        <div className="pixel-card p-8 mb-8">
          <div className="flex items-center justify-between">
            {/* Left: Avatar and Username */}
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 bg-gray-100 border-2 border-black flex items-center justify-center text-3xl cursor-pointer hover:bg-gray-200 transition-colors duration-150">
                  {userData.avatar}
                </div>
                <button
                  onClick={handleAvatarUpload}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-black text-white border border-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-150"
                  title="上传头像"
                >
                  <FontAwesomeIcon icon={faUpload} className="text-xs" />
                </button>
              </div>
              
              {/* Username */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-3 mb-2">
                  {isEditingUsername ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="pixel-input px-3 py-1 text-xl font-bold"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleUsernameSave();
                          if (e.key === 'Escape') handleUsernameCancel();
                        }}
                      />
                      <button
                        onClick={handleUsernameSave}
                        className="pixel-button px-2 py-1 text-xs"
                      >
                        保存
                      </button>
                      <button
                        onClick={handleUsernameCancel}
                        className="pixel-border px-2 py-1 text-xs bg-white text-black"
                      >
                        取消
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold">{userData.username}</h2>
                      <button
                        onClick={handleUsernameEdit}
                        className="text-gray-500 hover:text-black transition-colors duration-150"
                        title="编辑昵称"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>
            
            {/* Right: Balance and Actions */}
            <div className="flex items-center space-x-6">
              {/* Balance - 只在钱包连接时显示 */}
              {userData.isWalletConnected && (
                <div className="pixel-border px-6 py-4 bg-blue-50 text-center">
                  <p className="text-xs text-gray-600 mb-2">账户余额</p>
                  <div className="font-bold text-lg">
                    {userData.usdtBalance} USDT
                  </div>
                  <div className="font-bold text-xl text-blue-600">
                    {userData.currency}{userData.balance}
                  </div>
                </div>
              )}
              
              {/* Publish Task Button */}
              <button 
                onClick={handlePublishTask}
                className="pixel-button px-8 py-4 text-lg"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                发布新任务
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 uppercase tracking-pixel">
            支付方式管理
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="account-card p-6 cursor-pointer"
                onClick={() => handlePaymentMethodAction(method.id)}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 border-2 border-black flex items-center justify-center ${
                    method.isConnected ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <FontAwesomeIcon 
                      icon={method.icon} 
                      className={`${method.isConnected ? 'text-green-600' : 'text-gray-600'} ${
                        method.id === 'alipay' ? 'text-blue-500' : ''
                      }`}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold">{method.name}</h4>
                      {method.type === 'primary' && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          主要
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      {method.isConnected ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-sm" />
                      ) : (
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-sm" />
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${
                        method.isConnected 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {method.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Payment Methods Info */}
          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded">
            <h4 className="font-bold mb-2 text-blue-800">💡 支付方式说明</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>区块链钱包</strong>：支持加密货币支付，安全透明</li>
              <li>• <strong>支付宝</strong>：支持人民币支付，快速便捷</li>
              <li>• 建议同时绑定两种支付方式，以便灵活选择</li>
            </ul>
          </div>
        </div>

        {/* More Operations Section */}
        <div className="pixel-card p-6">
          <h3 className="text-lg font-bold mb-6 uppercase tracking-pixel">
            更多操作
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moreOperations.map((operation) => (
              <button
                key={operation.id}
                onClick={operation.action}
                className={`pixel-border p-4 bg-white hover:bg-gray-50 transition-all duration-150 text-left ${
                  operation.id === 'logout' ? 'hover:bg-red-50 hover:border-red-300' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <FontAwesomeIcon 
                    icon={operation.icon} 
                    className={`text-xl ${
                      operation.id === 'logout' ? 'text-red-500' : 'text-gray-700'
                    }`} 
                  />
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${
                      operation.id === 'logout' ? 'text-red-700' : ''
                    }`}>
                      {operation.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {operation.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CUserCenter; 
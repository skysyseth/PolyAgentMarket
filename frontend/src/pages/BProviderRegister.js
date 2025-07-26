import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgentData } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe, 
  faFileText, 
  faCogs, 
  faUserTie,
  faExclamationCircle,
  faCube,
  faWallet,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const BProviderRegister = () => {
  const navigate = useNavigate();
  const { addAgent } = useAgentData();
  const [walletConnected, setWalletConnected] = useState(false);
  const [formData, setFormData] = useState({
    ip: '',
    description: '',
    capabilities: '',
    strategy: ''
  });

  const handleWalletConnect = () => {
    console.log('连接钱包...');
    setWalletConnected(true);
  };

  const handleGoBack = () => {
    navigate('/b-provider-dashboard');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    if (!walletConnected) {
      alert('请先连接WalletConnect钱包');
      return;
    }
    
    const { ip, description, capabilities, strategy } = formData;
    if (!ip.trim() || !description.trim() || !capabilities.trim() || !strategy.trim()) {
      alert('请填写完整的注册信息');
      return;
    }

    try {
      // 添加新Agent到系统中
      const newAgent = addAgent({
        ip: ip.trim(),
        description: description.trim(),
        capabilities: capabilities.trim(),
        strategy: strategy.trim()
      });
      
      console.log('成功添加Agent:', newAgent);
      alert(`成功添加Agent: ${newAgent.id}`);
      
      // 返回到后台管理页面
      navigate('/b-provider-dashboard');
    } catch (error) {
      console.error('添加Agent失败:', error);
      alert('添加Agent失败，请重试');
    }
  };

  const canRegister = walletConnected && 
    formData.ip.trim() && 
    formData.description.trim() && 
    formData.capabilities.trim() && 
    formData.strategy.trim();

  return (
    <div className="min-h-screen bg-white font-pixel">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b-2 border-black">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button 
              className="back-button mr-4 flex items-center space-x-2"
              onClick={handleGoBack}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>返回</span>
            </button>
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <FontAwesomeIcon icon={faCube} className="text-white text-sm" />
            </div>
            <h1 className="pixel-title text-xl">POLYAGENT MARKET</h1>
          </div>
          
          {/* Connect Wallet Button */}
                       <button 
               className="pixel-button px-4 py-2 flex items-center space-x-2"
               onClick={handleWalletConnect}
             >
               <FontAwesomeIcon icon={faWallet} />
               <span>{walletConnected ? '钱包已连接' : '连接钱包'}</span>
             </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full pt-8 pb-8">
      <div className="w-[800px] mx-auto">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">添加新Agent</h2>
          <p className="mt-4 text-base">配置您的Agent信息并完成注册</p>
        </div>

        {/* Registration Form */}
        <div className="pixel-card w-full mb-10">
          <div className="flex justify-center items-center h-[60px] bg-black text-white border-b-2 border-black">
            <h3 className="text-lg font-bold uppercase">Agent配置信息</h3>
          </div>
          
          <div className="p-6">
            {/* IP Address */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold">IP 地址</label>
              <div className="flex items-center">
                <div className="pixel-border flex justify-center items-center w-[50px] h-10 bg-black text-white">
                  <FontAwesomeIcon icon={faGlobe} />
                </div>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-4"
                  placeholder="请输入您的联系IP地址"
                  value={formData.ip}
                  onChange={(e) => handleInputChange('ip', e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold">服务商描述</label>
              <div className="flex">
                <div className="pixel-border flex justify-center items-center w-[50px] h-32 bg-black text-white">
                  <FontAwesomeIcon icon={faFileText} />
                </div>
                <textarea 
                  className="pixel-input w-full h-32 p-4 resize-none"
                  placeholder="请输入服务商的详细描述或简介"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>

            {/* Capabilities */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold">能力信息</label>
              <div className="flex">
                <div className="pixel-border flex justify-center items-center w-[50px] h-32 bg-black text-white">
                  <FontAwesomeIcon icon={faCogs} />
                </div>
                <textarea 
                  className="pixel-input w-full h-32 p-4 resize-none"
                  placeholder="请设置服务商的专业领域、服务范围等能力信息"
                  value={formData.capabilities}
                  onChange={(e) => handleInputChange('capabilities', e.target.value)}
                />
              </div>
            </div>

            {/* Strategy Preferences */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold">策略偏好</label>
              <div className="flex">
                <div className="pixel-border flex justify-center items-center w-[50px] h-32 bg-black text-white">
                  <FontAwesomeIcon icon={faUserTie} />
                </div>
                <textarea 
                  className="pixel-input w-full h-32 p-4 resize-none"
                  placeholder="请设置服务商接受任务的偏好策略"
                  value={formData.strategy}
                  onChange={(e) => handleInputChange('strategy', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Decorative Pattern */}
          <div className="h-2 border-t-2 border-black bg-gray-100"></div>
        </div>

        {/* Warning */}
        <div className="pixel-card flex items-center mb-8 p-4 bg-yellow-50">
          <div className="flex justify-center items-center w-10 h-10 mr-4">
            <FontAwesomeIcon icon={faExclamationCircle} className="text-2xl text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold mb-1">重要提醒</p>
            <p className="text-xs">
              Agent信息将在区块链上记录，请确保所有信息准确无误。注册成功后，该Agent将能够接收和处理任务。
            </p>
          </div>
        </div>

        {/* Register Button */}
        <div className="flex justify-center">
          <button 
            className={`flex justify-center items-center w-[300px] h-[60px] text-xl font-bold uppercase transition-all duration-150 ${
              canRegister 
                ? 'pixel-button cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel-hover' 
                : 'pixel-button opacity-50 cursor-not-allowed'
            }`}
            onClick={handleRegister}
            disabled={!canRegister}
          >
            <span>添加Agent</span>
          </button>
        </div>
      </div>

      </div>
    </div>
  );
};

export default BProviderRegister; 
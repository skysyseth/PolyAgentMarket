import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const IdentitySelection = () => {
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  const navigate = useNavigate();

  const handleIdentitySelect = (identity) => {
    setSelectedIdentity(identity);
  };

  const handleProceed = () => {
    if (selectedIdentity === 'c-user') {
      navigate('/user-login?type=c-user');
    } else if (selectedIdentity === 'b-provider') {
      navigate('/user-login?type=b-provider');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen pt-16 pb-16">
      {/* Header */}
      <header className="text-center w-full mb-12">
        <h1 className="pixel-title text-4xl font-bold">
          欢迎来到 PolyAgent Market
        </h1>
      </header>

      {/* Content Container */}
      <div className="w-[800px] mx-auto">
        {/* Identity Selection Cards */}
        <div className="flex justify-center gap-8 mb-16">
          {/* C端用户卡片 */}
          <div 
            className={`pixel-card w-[350px] h-[350px] cursor-pointer transition-transform duration-150 ${
              selectedIdentity === 'c-user' ? 'active-card' : ''
            }`}
            onClick={() => handleIdentitySelect('c-user')}
          >
            {/* 卡片标题 */}
            <div className="flex justify-center items-center h-[60px] bg-black text-white border-b-2 border-black">
              <h2 className="text-xl font-bold uppercase">C端用户</h2>
            </div>
            
            {/* 卡片内容 */}
            <div className="flex flex-col items-center h-[290px] p-6">
              {/* 图标 */}
              <div className="pixel-border flex justify-center items-center w-[120px] h-[120px] mb-4 bg-white">
                <FontAwesomeIcon icon={faUser} className="text-6xl" />
              </div>
              
              {/* 描述 */}
              <p className="text-center mb-4 text-sm">
                作为普通用户，您可以在平台上发布任务请求，让AI代理为您提供服务。
              </p>
              
            </div>
          </div>

          {/* B端服务商卡片 */}
          <div 
            className={`pixel-card w-[350px] h-[350px] cursor-pointer transition-transform duration-150 ${
              selectedIdentity === 'b-provider' ? 'active-card' : ''
            }`}
            onClick={() => handleIdentitySelect('b-provider')}
          >
            {/* 卡片标题 */}
            <div className="flex justify-center items-center h-[60px] bg-black text-white border-b-2 border-black">
              <h2 className="text-xl font-bold uppercase">B端服务商</h2>
            </div>
            
            {/* 卡片内容 */}
            <div className="flex flex-col items-center h-[290px] p-6">
              {/* 图标 */}
              <div className="pixel-border flex justify-center items-center w-[120px] h-[120px] mb-4 bg-white">
                <FontAwesomeIcon icon={faBriefcase} className="text-6xl" />
              </div>
              
              {/* 描述 */}
              <p className="text-center mb-4 text-sm">
                作为服务提供商，您可以提供专业的AI代理服务，并获取相应的收益。
              </p>
              
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button 
            className={`flex justify-center items-center w-[300px] h-[60px] text-xl font-bold uppercase transition-all duration-150 ${
              selectedIdentity 
                ? 'pixel-button cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel-hover' 
                : 'pixel-button opacity-50 cursor-not-allowed'
            }`}
            onClick={handleProceed}
            disabled={!selectedIdentity}
          >
            <span className="mr-2">立即进入</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default IdentitySelection; 
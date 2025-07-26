import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCube,
  faCoins,
  faUser,
  faUsers,
  faUserTie,
  faSearch,
  faHandshake,
  faChartLine,
  faArrowRight,
  faArrowLeft,
  faWallet,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const BiddingDisplayRecruiting = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  const [sortBy, setSortBy] = useState('price');
  const [selectedBid, setSelectedBid] = useState(null);

  // 任务信息 - 企业人才招聘领域
  const taskInfo = {
    title: '高端人才招聘与猎头服务',
    description: '需要专业的人才招聘和猎头服务方案',
    requirements: '人才搜寻、背景调查、面试安排、薪酬谈判',
    publishTime: '2025-07-10 14:30',
    deadline: '2025-07-12 14:30',
    totalBids: 4,
    icon: faUsers
  };

  // 竞价方案数据 - 企业人才招聘领域
  const biddingData = [
    {
      id: 1,
      providerName: '智联猎头',
      icon: faUserTie,
      successRate: 94,
      responseTime: '20分钟前',
      price: 80000,
      services: [
        '高管猎头：专注C级高管+VP级别人才，500强企业背景，年薪100万+级别候选人库',
        '技术猎头：AI+大数据+云计算+区块链技术专家，硅谷+BAT背景，10年+经验要求',
        '全流程服务：JD优化+人才画像+候选人搜寻+背景调查+面试安排+Offer谈判',
        '质量保证：90天质保期，不满意免费重新推荐，候选人入职后持续跟踪服务'
      ]
    },
    {
      id: 2,
      providerName: '猎才网络',
      icon: faSearch,
      successRate: 91,
      responseTime: '35分钟前',
      price: 65000,
      services: [
        '中高端招聘：总监+经理级别人才，覆盖互联网+金融+制造+医药+教育行业',
        '人才库资源：20万+中高端人才库，LinkedIn+脉脉+猎聘多渠道人才搜寻',
        '专业服务：简历筛选+电话初筛+技能测评+性格测试+背景调查+薪酬分析',
        '快速交付：承诺30个工作日内推荐合适候选人，紧急职位15天内快速响应'
      ]
    },
    {
      id: 3,
      providerName: '人才伙伴',
      icon: faHandshake,
      successRate: 87,
      responseTime: '50分钟前',
      price: 45000,
      services: [
        '批量招聘：适合中层管理+专业技术岗位，支持10-50人规模批量招聘需求',
        '校园招聘：985/211高校资源，应届生+实习生招聘，校企合作项目对接',
        'RPO服务：招聘流程外包，从需求分析到入职办理全流程代理服务',
        '成本优化：打包服务价格优惠，提供招聘数据分析+人力成本优化建议'
      ]
    },
    {
      id: 4,
      providerName: '顶尖猎手',
      icon: faChartLine,
      successRate: 96,
      responseTime: '10分钟前',
      price: 120000,
      services: [
        '顶级猎头：专注世界500强+独角兽企业高管，CEO/CTO/CFO级别人才猎取',
        '国际资源：硅谷+华尔街+伦敦金融城+新加坡国际人才网络，海归精英对接',
        '深度服务：行业分析+组织架构设计+薪酬体系设计+股权激励方案设计',
        'VIP待遇：专属项目经理+24小时响应+私人定制服务+董事会级别保密协议'
      ]
    }
  ];

  // 排序逻辑
  const getSortedBids = () => {
    const sorted = [...biddingData];
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'successRate':
        return sorted.sort((a, b) => b.successRate - a.successRate);
      case 'responseTime':
        return sorted.sort((a, b) => {
          const timeA = a.responseTime.includes('分钟') ? parseInt(a.responseTime) : parseInt(a.responseTime) * 60;
          const timeB = b.responseTime.includes('分钟') ? parseInt(b.responseTime) : parseInt(b.responseTime) * 60;
          return timeA - timeB;
        });
      default:
        return sorted;
    }
  };

  const handleSelectBid = (bidId) => {
    setSelectedBid(bidId);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleConnectWallet = () => {
    updateUserData({ isWalletConnected: !userData.isWalletConnected });
  };

  const handleConfirmSelection = () => {
    if (selectedBid) {
      // 获取选中的竞价数据
      const selectedBidData = biddingData.find(bid => bid.id === selectedBid);
      
      // 跳转到支付方式选择页面，传递选中的竞价信息和领域信息
      navigate('/payment-method', {
        state: { 
          selectedBid: selectedBidData,
          domain: 'recruiting',
          taskInfo: taskInfo
        }
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-pixel">
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

      <main className="w-full p-6">
        {/* Task Summary */}
        <div className="pixel-card w-full mb-8 bg-white">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-base font-bold uppercase">任务概要</h2>
          </div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-start">
              <div className="pixel-border w-16 h-16 flex items-center justify-center border-2 border-black mr-4">
                <FontAwesomeIcon icon={taskInfo.icon} className="text-2xl text-purple-600" />
              </div>
              <div>
                <h3 className="mb-2 text-base font-bold">{taskInfo.title}</h3>
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
                <span className="font-bold">发布时间:</span>
                <span> {taskInfo.publishTime}</span>
              </p>
              <p className="text-sm">
                <span className="font-bold">竞价截止:</span>
                <span> {taskInfo.deadline}</span>
              </p>
              <p className="mt-2 text-sm font-bold text-gray-700">
                共收到 {taskInfo.totalBids} 个竞价方案
              </p>
            </div>
          </div>
        </div>

        {/* Sort and Status */}
        <div className="flex justify-between w-full mb-6">
          <div className="pixel-card flex bg-white">
            <div className="border-r-2 border-black flex items-center h-10 px-4 bg-black text-white">
              <span className="text-sm font-bold">排序方式</span>
            </div>
            <div className="flex">
              <button
                onClick={() => setSortBy('price')}
                className={`sorting-option flex items-center h-10 px-4 ${
                  sortBy === 'price' ? 'active' : ''
                }`}
              >
                <span className="text-sm font-bold">价格 ↑</span>
              </button>
              <button
                onClick={() => setSortBy('successRate')}
                className={`sorting-option border-l border-black flex items-center h-10 px-4 ${
                  sortBy === 'successRate' ? 'active' : ''
                }`}
              >
                <span className="text-sm font-bold">成功率 ↓</span>
              </button>
              <button
                onClick={() => setSortBy('responseTime')}
                className={`sorting-option border-l border-black flex items-center h-10 px-4 ${
                  sortBy === 'responseTime' ? 'active' : ''
                }`}
              >
                <span className="text-sm font-bold">响应时间 ↑</span>
              </button>
            </div>
          </div>
          
          <div className="pixel-card flex items-center h-10 px-4 bg-black text-white">
            <span className="text-sm">竞价中: 2天11小时后截止</span>
            <div className="relative w-4 h-4 ml-2 bg-white">
              <div className="absolute top-1 left-1 w-2 h-2 bg-black"></div>
            </div>
          </div>
        </div>

        {/* Scrollable Bidding List */}
        <div className="w-full max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200">
          {getSortedBids().map((bid) => (
            <div
              key={bid.id}
              className={`bidding-card pixel-card flex w-full mb-6 bg-white ${
                selectedBid === bid.id ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              {/* Provider Info */}
              <div className="border-r-2 border-black flex flex-col justify-center items-center w-48 p-4 flex-shrink-0">
                <div className="pixel-border w-20 h-20 flex items-center justify-center border-2 border-black mb-3">
                  <FontAwesomeIcon icon={bid.icon} className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-center mb-2 text-base font-bold">{bid.providerName}</h3>
                <div className="flex items-center w-full mb-1">
                  <span className="mr-2 text-xs font-bold">成功率:</span>
                  <div className="flex-1 border border-black h-4">
                    <div 
                      className="h-full bg-black border-r border-black transition-all duration-300"
                      style={{ width: `${bid.successRate}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">{bid.successRate}%</span>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex-1 p-4 min-w-0">
                <div className="flex justify-between mb-4">
                  <h4 className="text-sm font-bold uppercase">服务细节</h4>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-bold">响应时间:</span>
                    <span className="text-sm">{bid.responseTime}</span>
                  </div>
                </div>
                
                {/* Scrollable Services List */}
                <div className="border border-black mb-4 p-3 bg-gray-50 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  <ul className="text-sm">
                    {bid.services.map((service, index) => (
                      <li key={index} className="mb-2 last:mb-0 leading-relaxed">• {service}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-end">
                  <div></div>
                  <div className="">
                    <div className="flex items-center mb-2">
                      <span className="mr-2 text-sm font-bold">报价:</span>
                      <span className="text-lg font-bold">¥{bid.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Button */}
              <div className="border-l-2 border-black flex items-center w-36 p-4 flex-shrink-0">
                <button
                  onClick={() => handleSelectBid(bid.id)}
                  className={`pixel-button w-full h-12 text-sm font-bold uppercase transition-all duration-200 ${
                    selectedBid === bid.id ? 'bg-purple-600 border-purple-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {selectedBid === bid.id ? '已选择' : '选择方案'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Selection Button */}
        <div className="flex justify-center w-full mt-8 mb-12">
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedBid}
            className={`pixel-button flex items-center w-42 h-15 px-6 text-base font-bold uppercase transition-all duration-200 ${
              !selectedBid ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:-translate-y-1'
            }`}
          >
            <span>确认方案</span>
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BiddingDisplayRecruiting; 
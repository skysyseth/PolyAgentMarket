import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCube,
  faCoins,
  faUser,
  faCogs,
  faIndustry,
  faTruckLoading,
  faShippingFast,
  faBoxes,
  faArrowRight,
  faArrowLeft,
  faWallet,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const BiddingDisplaySupplyChain = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  const [sortBy, setSortBy] = useState('price');
  const [selectedBid, setSelectedBid] = useState(null);

  // 任务信息 - 硬件供应链领域
  const taskInfo = {
    title: '电子设备硬件供应链解决方案',
    description: '需要完整的硬件采购和供应链管理方案',
    requirements: '元器件采购、质量管控、物流配送、成本优化',
    publishTime: '2025-07-10 14:30',
    deadline: '2025-07-12 14:30',
    totalBids: 4,
    icon: faCogs
  };

  // 竞价方案数据 - 硬件供应链领域
  const biddingData = [
    {
      id: 1,
      providerName: '华强供应链',
      icon: faIndustry,
      successRate: 95,
      responseTime: '30分钟前',
      price: 150000,
      services: [
        '元器件采购：覆盖全球3000+优质供应商，包含芯片、电阻、电容、连接器等全品类器件',
        '质量管控：ISO9001质量体系，incoming检验+FAI首件检验+SPC统计控制，合格率99.5%',
        '库存管理：智能库存系统，安全库存预警+VMI寄售管理+呆滞料处理，库存周转率优化',
        '物流配送：全国15个仓储中心，当日发货+次日达服务，支持JIT精准供应+紧急件加急'
      ]
    },
    {
      id: 2,
      providerName: '智造供应',
      icon: faTruckLoading,
      successRate: 92,
      responseTime: '45分钟前',
      price: 125000,
      services: [
        '采购整合：整合亚太地区500+认证供应商，专注消费电子+工业自动化+汽车电子领域',
        '品质保证：六西格玛质量管理，来料检验+制程监控+出货检验，提供COC质量证书',
        '成本优化：批量采购+长期合约+汇率锁定，综合成本降低15-20%，季度成本review',
        '技术支持：原厂技术对接+替代料推荐+设计优化建议，技术问题24小时响应'
      ]
    },
    {
      id: 3,
      providerName: '精益链条',
      icon: faShippingFast,
      successRate: 88,
      responseTime: '1小时前',
      price: 98000,
      services: [
        '供应商网络：华南地区200+本土供应商，主要覆盖SMT贴片+DIP插件+电子组装',
        '交期管理：ERP系统实时追踪，承诺7-15个工作日交期，急单3-5天加急处理',
        '包装物流：专业防静电包装+温湿度控制运输，珠三角地区当日配送服务',
        '账期灵活：支持30-60天账期，月结算+季度返利，中小企业友好的付款条件'
      ]
    },
    {
      id: 4,
      providerName: '全球链网',
      icon: faBoxes,
      successRate: 97,
      responseTime: '20分钟前',
      price: 200000,
      services: [
        '全球采购：覆盖欧美日韩台等5000+原厂授权分销商，提供原厂原包正品器件保证',
        '高端方案：支持高端芯片+军工级器件+特殊定制件采购，提供全球寻源+样品确认',
        '风险管控：供应链金融+货物保险+汇率避险，建立BCP业务连续性计划',
        'EMS整合：提供设计制造一体化服务，PCB设计+SMT贴片+整机组装+测试包装'
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
          domain: 'supply-chain',
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
                <FontAwesomeIcon icon={taskInfo.icon} className="text-2xl text-orange-600" />
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
                selectedBid === bid.id ? 'ring-4 ring-orange-500' : ''
              }`}
            >
              {/* Provider Info */}
              <div className="border-r-2 border-black flex flex-col justify-center items-center w-48 p-4 flex-shrink-0">
                <div className="pixel-border w-20 h-20 flex items-center justify-center border-2 border-black mb-3">
                  <FontAwesomeIcon icon={bid.icon} className="text-3xl text-orange-600" />
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
                    selectedBid === bid.id ? 'bg-orange-600 border-orange-600 text-white' : 'hover:bg-gray-100'
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

export default BiddingDisplaySupplyChain; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCube,
  faCoins,
  faUser,
  faHeart,
  faCamera,
  faGem,
  faMusic,
  faGlassCheers,
  faArrowRight,
  faArrowLeft,
  faWallet,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const BiddingDisplayWedding = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  const [sortBy, setSortBy] = useState('price');
  const [selectedBid, setSelectedBid] = useState(null);

  // 任务信息 - 婚礼统筹领域
  const taskInfo = {
    title: '梦幻婚礼全程统筹策划',
    description: '需要一个完整的婚礼策划方案',
    requirements: '场地布置、摄影摄像、音响设备、流程管控',
    publishTime: '2025-07-10 14:30',
    deadline: '2025-07-12 14:30',
    totalBids: 4,
    icon: faHeart
  };

  // 竞价方案数据 - 婚礼统筹领域
  const biddingData = [
    {
      id: 1,
      providerName: '梦想婚礼',
      icon: faGem,
      successRate: 98,
      responseTime: '15分钟前',
      price: 28000,
      services: [
        '婚礼场地：五星级酒店宴会厅豪华装饰（鲜花拱门+梦幻灯光+红毯铺设）全包',
        '摄影摄像：专业双机位4K摄像团队，婚礼全程跟拍（含航拍），当天出精修照片',
        '音响设备：专业婚礼音响系统，现场调音师全程服务，背景音乐+麦克风设备',
        '统筹服务：资深婚礼统筹师现场把控，流程安排+时间管理+突发应急处理'
      ]
    },
    {
      id: 2,
      providerName: '浪漫时刻',
      icon: faCamera,
      successRate: 95,
      responseTime: '30分钟前',
      price: 22000,
      services: [
        '场地布置：户外草坪婚礼风格，欧式花艺设计，白色帐篷+香槟色桌布+鲜花装饰',
        '摄影服务：专业婚礼摄影师全天跟拍，提供200张精修照片+婚礼相册制作',
        '音乐表演：现场小提琴演奏+专业主持人，营造浪漫氛围，含音响设备租赁',
        '婚礼统筹：专业策划师提前1个月开始准备，现场全程协调各环节无缝对接'
      ]
    },
    {
      id: 3,
      providerName: '完美典礼',
      icon: faMusic,
      successRate: 90,
      responseTime: '1小时前',
      price: 18000,
      services: [
        '场地装饰：室内教堂风格布置，鲜花+蜡烛+丝带装饰，营造温馨神圣氛围',
        '摄影摄像：婚礼摄影+摄像套餐，提供100张精修照片+婚礼视频剪辑成片',
        '音响主持：专业婚礼主持人+音响设备，流程把控+现场气氛调节+互动环节',
        '服务保障：婚礼助理团队3人，负责现场服务+客人接待+物品管理+时间提醒'
      ]
    },
    {
      id: 4,
      providerName: '尊享婚典',
      icon: faGlassCheers,
      successRate: 92,
      responseTime: '10分钟前',
      price: 35000,
      services: [
        '奢华场地：顶级婚礼会所全包服务，360度环绕LED屏+3D全息投影+智能灯光系统',
        '顶级摄制：好莱坞级别摄制团队，无人机航拍+多角度4K摄制+同日快剪成片',
        '豪华配置：专业乐队现场演奏+知名主持人+红酒香槟无限供应+定制婚礼蛋糕',
        '管家服务：专属婚礼管家全程1对1服务，包含彩排安排+嘉宾接待+礼品管理'
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
          domain: 'wedding',
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
                <FontAwesomeIcon icon={taskInfo.icon} className="text-2xl text-red-500" />
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
                selectedBid === bid.id ? 'ring-4 ring-red-500' : ''
              }`}
            >
              {/* Provider Info */}
              <div className="border-r-2 border-black flex flex-col justify-center items-center w-48 p-4 flex-shrink-0">
                <div className="pixel-border w-20 h-20 flex items-center justify-center border-2 border-black mb-3">
                  <FontAwesomeIcon icon={bid.icon} className="text-3xl text-red-500" />
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
                    selectedBid === bid.id ? 'bg-red-600 border-red-600 text-white' : 'hover:bg-gray-100'
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

export default BiddingDisplayWedding; 
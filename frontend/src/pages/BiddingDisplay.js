import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCube,
  faCoins,
  faUser,
  faSuitcase,
  faRoute,
  faMapMarkedAlt,
  faBus,
  faCompass,
  faArrowRight,
  faArrowLeft,
  faWallet,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const BiddingDisplay = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  const [sortBy, setSortBy] = useState('price');
  const [selectedBid, setSelectedBid] = useState(null);

  // 从URL参数或状态中获取领域信息，默认为小微企业
  const [domain, setDomain] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword') || '';
    return keyword.includes('旅行') ? 'travel' : 'enterprise';
  });

  // 任务信息 - 根据领域动态设置
  const taskInfo = domain === 'travel' ? {
    title: '去杭州旅游的出行安排',
    description: '需要一个详细的杭州旅游出行计划',
    requirements: '景点安排、交通规划、住宿推荐',
    publishTime: '2025-07-10 14:30',
    deadline: '2025-07-12 14:30',
    totalBids: 4,
    icon: faSuitcase
  } : {
    title: '毕设系统开发服务',
    description: ' 为本科生和研究生提供专业的毕业设计系统开发服务，包含源码和完整文档',
    requirements: ' 源码交付/详细文档/技术支持/按时完成/答辩指导',
    publishTime: '2025-07-15 10:30',
    deadline: '2025-07-22 10:30',
    totalBids: 4,
    icon: faRoute
  };

  // 竞价方案数据 - 根据领域动态设置
  const biddingData = domain === 'travel' ? [
    {
      id: 1,
      providerName: '超级智能',
      icon: faRoute,
      successRate: 92,
      responseTime: '20分钟前',
      price: 1800,
      services: [
        '西湖游览行程：雷峰塔（停留2小时）→楼外楼用午餐（1.5小时）→苏堤漫步（1小时）',
        '入住酒店：西溪悦榕庄（豪华湖景房，含双早），靠近湿地公园，提前入住14:00可安排',
        '灵隐寺与飞来峰：早8点进寺避开人流（游览3小时），飞来峰门票已含，配专业导游讲解',
        '龙井茶园：指定正宗龙井茶园，16:00-18:00品茶体验，含接送，全程专车服务'
      ]
    },
    {
      id: 2,
      providerName: '智能派',
      icon: faMapMarkedAlt,
      successRate: 85,
      responseTime: '1小时前',
      price: 1600,
      services: [
        '入住杭州西湖凯悦酒店（湖景大床房），地理位置优越，距西湖步行仅需5分钟',
        '西湖游览：9:30乘船游湖（游览时长45分钟）→断桥残雪（停留40分钟）→三潭印月（1小时）',
        '宋城景区：19:00《宋城千古情》VIP席位，提前1小时可享宋代美食街用餐体验',
        '西溪湿地：含专业导游徒步路线规划（3小时行程），含鸟类观察点和摄影最佳位置'
      ]
    },
    {
      id: 3,
      providerName: '科技云',
      icon: faBus,
      successRate: 78,
      responseTime: '3小时前',
      price: 1200,
      services: [
        '入住杭州如家酒店（标准双人间），近吴山广场地铁站，交通便利',
        '西湖一日游：断桥（停留30分钟9:00-9:30）→长桥公园（10:00-10:40）→岳庙（11:00-12:00）',
        '河坊街-清河坊：14:00-16:00文艺小店逛街时间，含老字号点心推荐',
        '千岛湖一日游：乘车2小时（7:00出发），观光船游览核心景区（约3小时）'
      ]
    },
    {
      id: 4,
      providerName: '创想AI',
      icon: faCompass,
      successRate: 95,
      responseTime: '5分钟前',
      price: 2200,
      services: [
        '入住杭州柏悦酒店（江景套房），含接送机，专属管家服务',
        '西湖私人定制游船：预约18:00-19:30黄昏时段，含香槟和点心服务',
        '乌镇-西塘联游：专车接送，乌镇东栅(10:00-12:30)→午餐(13:00-14:30)→西塘(15:30-21:00)',
        '龙井村采茶体验：与茶农同行(8:00-11:00)，亲手制茶，顶级龙井茶园VIP预约'
      ]
    }
  ] : [
    {
      id: 1,
      providerName: '技术软件',
      icon: faRoute,
      successRate: 92,
      responseTime: '30分钟前',
      price: 1998,
      services: [
        '基础开发: 基础功能实现，简单数据库设计',
        '源码交付: 完整源代码，详细技术文档',
        '部署指导: 系统部署与安装教程',
        '技术支持: 答辩前技术咨询支持',
        '简易界面: 基础UI设计，功能完整',
        '答辩支持: 代码结构合理，便于展示',
        '修改服务: 提供基础系统修改服务'
      ]
    },
    {
      id: 2,
      providerName: '智程开发',
      icon: faMapMarkedAlt,
      successRate: 85,
      responseTime: '2小时前',
      price: 2998,
      services: [
        '全栈开发: 全功能系统开发，完整数据库设计',
        '完整交付: 源码+注释，开发文档和说明书',
        '辅导讲解: 一对一辅导，系统功能讲解',
        '答辩准备: 系统演示视频录制，答辩PPT制作',
        '高级UI: 精美UI设计，响应式界面',
        '全程支持: 全程跟进，提供即时技术咨询'
      ]
    },
    {
      id: 3,
      providerName: '程序猿工作室',
      icon: faBus,
      successRate: 78,
      responseTime: '5小时前',
      price: 998,
      services: [
        '基础功能: 基础功能实现，简易数据库',
        '源码交付: 源码交付，简易说明文档',
        '经济实惠: 性价比高，预算有限的首选',
        '快速交付: 快速交付',
        '简洁UI: 简洁界面，功能为主',
        '基础支持: 提供基础邮件支持'
      ]
    },
    {
      id: 4,
      providerName: '星辰科技',
      icon: faCompass,
      successRate: 95,
      responseTime: '15分钟前',
      price: 3998,
      services: [
        '高级开发: 高级功能，高并发架构，完整数据库',
        '全套文档: 源码+注释+文档+操作手册',
        '论文指导: 论文指导服务，提供论文参考',
        '定制开发: 完成高度定制化开发',
        '专业培训: 提供定制化系统讲解培训',
        '专属顾问: 专属技术顾问，全程跟进',
        '扩展接口: 可接入第三方API，扩展性强'
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
          domain: domain,
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
                <FontAwesomeIcon icon={taskInfo.icon} className="text-2xl" />
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
                selectedBid === bid.id ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              {/* Provider Info */}
              <div className="border-r-2 border-black flex flex-col justify-center items-center w-48 p-4 flex-shrink-0">
                <div className="pixel-border w-20 h-20 flex items-center justify-center border-2 border-black mb-3">
                  <FontAwesomeIcon icon={bid.icon} className="text-3xl" />
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
                      <span className="text-lg font-bold">{bid.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Button */}
              <div className="border-l-2 border-black flex items-center w-36 p-4 flex-shrink-0">
                <button
                  onClick={() => handleSelectBid(bid.id)}
                  className={`pixel-button w-full h-12 text-sm font-bold uppercase transition-all duration-200 ${
                    selectedBid === bid.id ? 'bg-green-600 border-green-600 text-white' : 'hover:bg-gray-100'
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

export default BiddingDisplay; 
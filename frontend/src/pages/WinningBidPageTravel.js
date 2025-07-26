import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCoins,
  faUser,
  faRoute,
  faArrowRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const WinningBidPageTravel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUserData();
  
  // 旅游领域的任务信息
  const taskInfo = {
    title: '去杭州旅游的出行安排',
    description: '需要一个详细的杭州旅游出行计划',
    requirements: '景点安排、交通规划、住宿推荐'
  };
  
  // 中标信息 - 旅游领域
  const [winningBid] = useState(() => {
    return location.state?.selectedBid || {
      id: 1,
      providerName: '超级智能',
      successRate: 92,
      price: 1800,
      services: [
        '西湖游览行程：雷峰塔（停留2小时）→楼外楼用午餐（1.5小时）→苏堤漫步（1小时）',
        '入住酒店：西溪悦榕庄（豪华湖景房，含双早），靠近湿地公园，提前入住14:00可安排',
        '灵隐寺与飞来峰：早8点进寺避开人流（游览3小时），飞来峰门票已含，配专业导游讲解',
        '龙井茶园：指定正宗龙井茶园，16:00-18:00品茶体验，含接送，全程专车服务'
      ]
    };
  });

  // 可调整的服务项目 - 旅游领域
  const [adjustableServices, setAdjustableServices] = useState([
    { id: 1, name: '酒店住宿安排', description: '西溪悦榕庄（豪华湖景房，含双早）', price: 600, included: true },
    { id: 2, name: '专车接送服务', description: '全程专车接送服务，含机场往返', price: 200, included: true },
    { id: 3, name: '专业导游讲解', description: '包含灵隐寺与飞来峰专业导游服务', price: 150, included: true },
    { id: 4, name: '高级餐厅预定', description: '楼外楼特色菜单预定（含VIP位置）', price: 50, included: true }
  ]);

  // 预订信息 - 旅游领域
  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    phone: '',
    travelers: '',
    specialRequests: ''
  });

  // 计算总价
  const getTotalPrice = () => {
    const basePrice = 800; // 基础服务费
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

  // 处理输入变化
  const handleInputChange = (field, value) => {
    setBookingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 确认支付
  const handleConfirmPayment = () => {
    const totalAmount = getTotalPrice();
    const userBalance = parseFloat(userData.balance.replace(',', ''));
    
    if (userBalance < totalAmount) {
      alert('账户余额不足，请充值后再试！');
      return;
    }

    if (!bookingInfo.name.trim() || !bookingInfo.phone.trim() || !bookingInfo.travelers.trim()) {
      alert('请填写完整的预订信息！');
      return;
    }

    if (window.confirm(`确认支付 ¥${totalAmount} 完成此次服务预订吗？`)) {
      // 模拟支付处理
      alert('支付成功！服务已确认，稍后客服将与您联系确认详细行程。');
      navigate('/c-user-center');
    }
  };

  return (
    <div className="min-h-screen bg-white font-pixel">
      {/* Header */}
      <header className="flex justify-between items-center w-full h-20 px-8 border-b-2 border-black">
        <div className="flex items-center">
          <div className="pixel-border flex justify-center items-center w-12 h-12 mr-4">
            <FontAwesomeIcon icon={faGavel} className="text-2xl" />
          </div>
          <h1 className="pixel-title text-2xl font-bold uppercase">PolyAgent Market</h1>
        </div>
        <div className="flex items-center">
          <div className="pixel-border flex items-center h-12 mr-4 bg-white">
            <div className="flex justify-center items-center h-full px-4 bg-black text-white">
              <FontAwesomeIcon icon={faCoins} className="mr-2" />
                             <div className="text-center">
                 <div className="text-xs">{userData.usdtBalance} USDT</div>
                 <div className="text-sm font-bold">¥{userData.balance}</div>
               </div>
            </div>
          </div>
          <div className="pixel-border flex items-center h-12 bg-white">
            <div className="flex justify-center items-center h-full px-4 bg-black text-white">
              <span className="text-xl mr-2">{userData.avatar}</span>
              <span className="text-sm font-bold">{userData.username}</span>
            </div>
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
                <FontAwesomeIcon icon={faRoute} className="text-3xl text-green-600" />
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
                <span className="font-bold">中标代理:</span>
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

        {/* 费用明细与调整 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">费用明细与调整</h2>
          </div>
          <div className="p-4">
            <h3 className="mb-3 pl-1 text-sm font-bold">可调整服务项目</h3>
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

        {/* 预订信息 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">预订信息</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold">姓名</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入您的姓名"
                  value={bookingInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">电话</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入您的电话"
                  value={bookingInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">出行人数</label>
                <input 
                  type="number"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入出行人数"
                  value={bookingInfo.travelers}
                  onChange={(e) => handleInputChange('travelers', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">特殊需求</label>
                <textarea 
                  className="pixel-input w-full p-3 h-20 resize-none"
                  placeholder="如有特殊需求请在此说明"
                  value={bookingInfo.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                />
              </div>
            </div>
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

export default WinningBidPageTravel; 
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCoins,
  faUser,
  faHeart,
  faArrowRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const WinningBidPageWedding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUserData();
  
  // 婚礼统筹领域的任务信息
  const taskInfo = {
    title: '梦幻婚礼全程统筹策划',
    description: '需要一个完整的婚礼策划方案',
    requirements: '场地布置、摄影摄像、音响设备、流程管控'
  };
  
  // 中标信息 - 婚礼统筹领域
  const [winningBid] = useState(() => {
    return location.state?.selectedBid || {
      id: 1,
      providerName: '梦想婚礼',
      successRate: 98,
      price: 28000,
      services: [
        '婚礼场地：五星级酒店宴会厅豪华装饰（鲜花拱门+梦幻灯光+红毯铺设）全包',
        '摄影摄像：专业双机位4K摄像团队，婚礼全程跟拍（含航拍），当天出精修照片',
        '音响设备：专业婚礼音响系统，现场调音师全程服务，背景音乐+麦克风设备',
        '统筹服务：资深婚礼统筹师现场把控，流程安排+时间管理+突发应急处理'
      ]
    };
  });

  // 可调整的服务项目 - 婚礼统筹领域
  const [adjustableServices, setAdjustableServices] = useState([
    { id: 1, name: '豪华场地装饰', description: '鲜花拱门+梦幻灯光+红毯铺设', price: 8000, included: true },
    { id: 2, name: '航拍摄影升级', description: '专业无人机航拍团队跟拍', price: 3000, included: true },
    { id: 3, name: '现场乐队演奏', description: '专业四人乐队现场演奏', price: 2000, included: true },
    { id: 4, name: '婚车装饰服务', description: '新人婚车专业装饰+司机', price: 1500, included: true }
  ]);

  // 预订信息 - 婚礼统筹领域
  const [bookingInfo, setBookingInfo] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    guestCount: '',
    venue: '',
    specialRequests: ''
  });

  // 计算总价
  const getTotalPrice = () => {
    const basePrice = 14500; // 基础服务费
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

    if (!bookingInfo.brideName.trim() || !bookingInfo.groomName.trim() || 
        !bookingInfo.weddingDate.trim() || !bookingInfo.guestCount.trim()) {
      alert('请填写完整的婚礼信息！');
      return;
    }

    if (window.confirm(`确认支付 ¥${totalAmount.toLocaleString()} 完成此次婚礼服务预订吗？`)) {
      // 模拟支付处理
      alert('支付成功！婚礼服务已确认，婚礼统筹师将在24小时内与您联系，开始筹备您的梦幻婚礼。');
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
                <FontAwesomeIcon icon={faHeart} className="text-3xl text-red-500" />
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
                  ¥{service.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 婚礼信息 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">婚礼信息</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold">新娘姓名</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入新娘姓名"
                  value={bookingInfo.brideName}
                  onChange={(e) => handleInputChange('brideName', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">新郎姓名</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入新郎姓名"
                  value={bookingInfo.groomName}
                  onChange={(e) => handleInputChange('groomName', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">婚礼日期</label>
                <input 
                  type="date"
                  className="pixel-input w-full h-10 px-3"
                  value={bookingInfo.weddingDate}
                  onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">宾客人数</label>
                <input 
                  type="number"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="预计宾客人数"
                  value={bookingInfo.guestCount}
                  onChange={(e) => handleInputChange('guestCount', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">首选场地</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入首选婚礼场地（如有）"
                  value={bookingInfo.venue}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">特殊需求</label>
                <textarea 
                  className="pixel-input w-full p-3 h-20 resize-none"
                  placeholder="婚礼主题、色彩偏好、忌讳事项等特殊需求"
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
              <p className="text-2xl font-bold">¥{getTotalPrice().toLocaleString()}</p>
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

export default WinningBidPageWedding; 
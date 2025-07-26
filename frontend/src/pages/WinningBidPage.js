import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCoins,
  faUser,
  faRoute,
  faArrowRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const WinningBidPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUserData();
  
  // 从路由状态获取领域和任务信息
  const domain = location.state?.domain || 'enterprise';
  const taskInfo = location.state?.taskInfo || {
    title: '小微企业管理系统定制开发',
    description: '为小微企业提供的一体化管理系统解决方案',
    requirements: '员工管理、财务记账、库存管理、客户关系管理'
  };
  
  // 从路由状态获取中标信息，如果没有则使用默认数据
  const [winningBid] = useState(() => {
    return location.state?.selectedBid || (domain === 'travel' ? {
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
    } : {
      id: 1,
      providerName: '云智科技',
      successRate: 95,
      price: 6050,
      services: [
        '系统架构：B/S架构，支持多终端访问，响应式设计适配手机和电脑',
        '核心功能：基础员工管理、财务记账、进销存管理、简易CRM',
        '安全保障：数据加密传输与存储，多级权限控制，定期备份',
        '系统定制：可根据企业实际需求进行功能模块调整和界面定制'
      ]
    });
  });

  // 可调整的服务项目 - 根据领域动态设置
  const [adjustableServices, setAdjustableServices] = useState(() => {
    if (domain === 'travel') {
      return [
        { id: 1, name: '酒店住宿安排', description: '西溪悦榕庄（豪华湖景房，含双早）', price: 600, included: true },
        { id: 2, name: '专车接送服务', description: '全程专车接送服务，含机场往返', price: 200, included: true },
        { id: 3, name: '专业导游讲解', description: '包含灵隐寺与飞来峰专业导游服务', price: 150, included: true },
        { id: 4, name: '高级餐厅预定', description: '楼外楼特色菜单预定（含VIP位置）', price: 50, included: true }
      ];
    } else {
      return [
        { id: 1, name: '高级UI设计', description: '响应式界面设计，多终端适配', price: 1500, included: true },
        { id: 2, name: '数据迁移服务', description: '现有系统数据导入与整理', price: 800, included: true },
        { id: 3, name: '员工培训', description: '系统使用培训，操作手册制作', price: 600, included: true },
        { id: 4, name: '一年维护', description: '系统维护，技术支持，功能升级', price: 1200, included: true },
        { id: 5, name: '移动端APP', description: '配套移动应用开发', price: 2000, included: false },
        { id: 6, name: '高级报表', description: '自定义报表系统', price: 800, included: false }
      ];
    }
  });

  // 预订信息 - 根据领域动态设置字段
  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    phone: '',
    travelers: domain === 'travel' ? '' : '',
    company: domain === 'enterprise' ? '' : undefined,
    specialRequests: ''
  });

  // 计算总价
  const getTotalPrice = () => {
    const basePrice = domain === 'travel' ? 800 : 1950; // 基础服务费
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

    // 根据领域验证不同的必填字段
    if (domain === 'travel') {
      if (!bookingInfo.name.trim() || !bookingInfo.phone.trim() || !bookingInfo.travelers.trim()) {
        alert('请填写完整的预订信息！');
        return;
      }
    } else {
      if (!bookingInfo.name.trim() || !bookingInfo.phone.trim() || !bookingInfo.company.trim()) {
        alert('请填写完整的项目联系信息！');
        return;
      }
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
                <FontAwesomeIcon icon={domain === 'travel' ? faRoute : faUser} className="text-3xl" />
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
                <span className="font-bold">{domain === 'travel' ? '中标代理' : '中标服务商'}:</span>
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
            <h2 className="pixel-title text-lg font-bold uppercase">{domain === 'travel' ? '费用明细与调整' : '功能模块与费用'}</h2>
          </div>
          <div className="p-4">
            <h3 className="mb-3 pl-1 text-sm font-bold">{domain === 'travel' ? '可调整服务项目' : '可选功能模块'}</h3>
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
                        <FontAwesomeIcon icon={faTimes} className="text-xs" />
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
            <h2 className="pixel-title text-lg font-bold uppercase">{domain === 'travel' ? '预订信息' : '项目联系信息'}</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold">{domain === 'travel' ? '姓名' : '联系人姓名'}</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder={domain === 'travel' ? '请输入您的姓名' : '请输入联系人姓名'}
                  value={bookingInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">{domain === 'travel' ? '电话' : '联系电话'}</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder={domain === 'travel' ? '请输入您的电话' : '请输入联系电话'}
                  value={bookingInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              {domain === 'travel' ? (
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
              ) : (
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-bold">企业名称</label>
                  <input 
                    type="text"
                    className="pixel-input w-full h-10 px-3"
                    placeholder="请输入企业名称"
                    value={bookingInfo.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
              )}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">{domain === 'travel' ? '特殊需求' : '项目备注/特殊需求'}</label>
                <textarea 
                  className="pixel-input w-full p-3 h-20 resize-none"
                  placeholder={domain === 'travel' ? '如有特殊需求请在此说明' : '如有特殊需求或项目备注请在此说明'}
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

export default WinningBidPage; 
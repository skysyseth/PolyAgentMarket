import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCoins,
  faUser,
  faCogs,
  faArrowRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const WinningBidPageSupplyChain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUserData();
  
  // 硬件供应链领域的任务信息
  const taskInfo = {
    title: '电子设备硬件供应链解决方案',
    description: '需要完整的硬件采购和供应链管理方案',
    requirements: '元器件采购、质量管控、物流配送、成本优化'
  };
  
  // 中标信息 - 硬件供应链领域
  const [winningBid] = useState(() => {
    return location.state?.selectedBid || {
      id: 1,
      providerName: '华强供应链',
      successRate: 95,
      price: 150000,
      services: [
        '元器件采购：覆盖全球3000+优质供应商，包含芯片、电阻、电容、连接器等全品类器件',
        '质量管控：ISO9001质量体系，incoming检验+FAI首件检验+SPC统计控制，合格率99.5%',
        '库存管理：智能库存系统，安全库存预警+VMI寄售管理+呆滞料处理，库存周转率优化',
        '物流配送：全国15个仓储中心，当日发货+次日达服务，支持JIT精准供应+紧急件加急'
      ]
    };
  });

  // 可调整的服务项目 - 硬件供应链领域
  const [adjustableServices, setAdjustableServices] = useState([
    { id: 1, name: '高端器件采购', description: '军工级+车规级+工业级高端器件采购', price: 25000, included: true },
    { id: 2, name: '全球寻源服务', description: '稀缺料件全球寻源+现货库存查询', price: 15000, included: true },
    { id: 3, name: '质量认证升级', description: 'TS16949+IPC标准认证+第三方检测', price: 12000, included: true },
    { id: 4, name: '库存金融服务', description: '供应链金融+VMI寄售+账期延长', price: 8000, included: true }
  ]);

  // 项目信息 - 硬件供应链领域
  const [projectInfo, setProjectInfo] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    productType: '',
    monthlyVolume: '',
    budget: '',
    specialRequests: ''
  });

  // 计算总价
  const getTotalPrice = () => {
    const basePrice = 90000; // 基础服务费
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
    setProjectInfo(prev => ({
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

    if (!projectInfo.companyName.trim() || !projectInfo.contactPerson.trim() || 
        !projectInfo.phone.trim() || !projectInfo.email.trim()) {
      alert('请填写完整的项目信息！');
      return;
    }

    if (window.confirm(`确认支付 ¥${totalAmount.toLocaleString()} 完成此次供应链服务预订吗？`)) {
      // 模拟支付处理
      alert('支付成功！供应链服务已确认，专业采购经理将在8小时内与您联系，开始制定您的专属供应链方案。');
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
                <FontAwesomeIcon icon={faCogs} className="text-3xl text-orange-600" />
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

        {/* 项目信息 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">项目信息</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold">公司名称</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入公司名称"
                  value={projectInfo.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">联系人姓名</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入联系人姓名"
                  value={projectInfo.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">联系电话</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入联系电话"
                  value={projectInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">邮箱地址</label>
                <input 
                  type="email"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入邮箱地址"
                  value={projectInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">产品类型</label>
                <select 
                  className="pixel-input w-full h-10 px-3"
                  value={projectInfo.productType}
                  onChange={(e) => handleInputChange('productType', e.target.value)}
                >
                  <option value="">请选择产品类型</option>
                  <option value="消费电子">消费电子</option>
                  <option value="工业设备">工业设备</option>
                  <option value="汽车电子">汽车电子</option>
                  <option value="医疗器械">医疗器械</option>
                  <option value="通信设备">通信设备</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">月需求量</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入预估月需求量"
                  value={projectInfo.monthlyVolume}
                  onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">预算范围</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入项目预算范围（如：50-100万）"
                  value={projectInfo.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">特殊需求</label>
                <textarea 
                  className="pixel-input w-full p-3 h-20 resize-none"
                  placeholder="特殊器件需求、认证要求、交期要求等特殊需求"
                  value={projectInfo.specialRequests}
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

export default WinningBidPageSupplyChain; 
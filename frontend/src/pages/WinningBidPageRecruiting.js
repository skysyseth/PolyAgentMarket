import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCoins,
  faUser,
  faUsers,
  faArrowRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const WinningBidPageRecruiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUserData();
  
  // 企业人才招聘领域的任务信息
  const taskInfo = {
    title: '高端人才招聘与猎头服务',
    description: '需要专业的人才招聘和猎头服务方案',
    requirements: '人才搜寻、背景调查、面试安排、薪酬谈判'
  };
  
  // 中标信息 - 企业人才招聘领域
  const [winningBid] = useState(() => {
    return location.state?.selectedBid || {
      id: 1,
      providerName: '智联猎头',
      successRate: 94,
      price: 80000,
      services: [
        '高管猎头：专注C级高管+VP级别人才，500强企业背景，年薪100万+级别候选人库',
        '技术猎头：AI+大数据+云计算+区块链技术专家，硅谷+BAT背景，10年+经验要求',
        '全流程服务：JD优化+人才画像+候选人搜寻+背景调查+面试安排+Offer谈判',
        '质量保证：90天质保期，不满意免费重新推荐，候选人入职后持续跟踪服务'
      ]
    };
  });

  // 可调整的服务项目 - 企业人才招聘领域
  const [adjustableServices, setAdjustableServices] = useState([
    { id: 1, name: '高管背景调查', description: '深度背景调查+征信查询+工作履历验证', price: 8000, included: true },
    { id: 2, name: '薪酬咨询服务', description: '行业薪酬分析+激励方案设计+谈判策略', price: 6000, included: true },
    { id: 3, name: '候选人评估', description: '专业性格测试+管理能力评估+文化匹配', price: 5000, included: true },
    { id: 4, name: '入职后跟踪', description: '试用期跟踪+适应性辅导+风险预警', price: 4000, included: true }
  ]);

  // 招聘需求信息 - 企业人才招聘领域
  const [recruitmentInfo, setRecruitmentInfo] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    position: '',
    level: '',
    urgency: '',
    salaryRange: '',
    requirements: ''
  });

  // 计算总价
  const getTotalPrice = () => {
    const basePrice = 57000; // 基础服务费
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
    setRecruitmentInfo(prev => ({
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

    if (!recruitmentInfo.companyName.trim() || !recruitmentInfo.contactPerson.trim() || 
        !recruitmentInfo.phone.trim() || !recruitmentInfo.email.trim()) {
      alert('请填写完整的招聘需求信息！');
      return;
    }

    if (window.confirm(`确认支付 ¥${totalAmount.toLocaleString()} 完成此次招聘服务预订吗？`)) {
      // 模拟支付处理
      alert('支付成功！招聘服务已确认，专业猎头顾问将在6小时内与您联系，开始制定您的专属招聘方案。');
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
                <FontAwesomeIcon icon={faUsers} className="text-3xl text-purple-600" />
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

        {/* 招聘需求信息 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">招聘需求信息</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold">公司名称</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入公司名称"
                  value={recruitmentInfo.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">联系人姓名</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入联系人姓名"
                  value={recruitmentInfo.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">联系电话</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入联系电话"
                  value={recruitmentInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">邮箱地址</label>
                <input 
                  type="email"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入邮箱地址"
                  value={recruitmentInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">招聘职位</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入招聘职位名称"
                  value={recruitmentInfo.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">职位级别</label>
                <select 
                  className="pixel-input w-full h-10 px-3"
                  value={recruitmentInfo.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                >
                  <option value="">请选择职位级别</option>
                  <option value="高管">高管(VP/SVP/CXO)</option>
                  <option value="总监">总监级别</option>
                  <option value="经理">经理级别</option>
                  <option value="主管">主管级别</option>
                  <option value="专员">专员级别</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">紧急程度</label>
                <select 
                  className="pixel-input w-full h-10 px-3"
                  value={recruitmentInfo.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                >
                  <option value="">请选择紧急程度</option>
                  <option value="非常紧急">非常紧急(15天内)</option>
                  <option value="紧急">紧急(30天内)</option>
                  <option value="一般">一般(60天内)</option>
                  <option value="不紧急">不紧急(90天内)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">薪资范围</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入薪资范围（如：50-80万/年）"
                  value={recruitmentInfo.salaryRange}
                  onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">职位要求</label>
                <textarea 
                  className="pixel-input w-full p-3 h-20 resize-none"
                  placeholder="学历要求、工作经验、技能要求、行业背景等详细要求"
                  value={recruitmentInfo.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
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

export default WinningBidPageRecruiting; 
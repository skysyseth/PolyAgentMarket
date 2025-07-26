import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel,
  faCoins,
  faUser,
  faGraduationCap,
  faArrowRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const WinningBidPageStudy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUserData();
  
  // 留学申请领域的任务信息
  const taskInfo = {
    title: '美国硕士留学申请全程服务',
    description: '需要完整的美国研究生申请方案',
    requirements: '学校选择、文书写作、申请提交、签证办理'
  };
  
  // 中标信息 - 留学申请领域
  const [winningBid] = useState(() => {
    return location.state?.selectedBid || {
      id: 1,
      providerName: '名校直通',
      successRate: 96,
      price: 38000,
      services: [
        '学校申请：Top30美国名校申请包（10所学校），含MIT、斯坦福等顶级院校申请策略',
        '文书写作：个人陈述+推荐信+简历专业写作，前招生官审核，保证原创性和针对性',
        '背景提升：科研项目推荐+实习安排+学术论文发表指导，全面提升申请竞争力',
        '签证服务：F-1学生签证全程办理+面试培训+材料准备，签证通过率98%以上'
      ]
    };
  });

  // 可调整的服务项目 - 留学申请领域
  const [adjustableServices, setAdjustableServices] = useState([
    { id: 1, name: '顶级名校冲刺', description: 'Top10常春藤名校申请包升级', price: 8000, included: true },
    { id: 2, name: '专业文书润色', description: '前招生官1对1文书深度修改', price: 3000, included: true },
    { id: 3, name: '科研背景包装', description: '顶级实验室科研项目推荐', price: 5000, included: true },
    { id: 4, name: '签证面试培训', description: '模拟面试+专业指导培训', price: 2000, included: true }
  ]);

  // 申请信息 - 留学申请领域
  const [applicationInfo, setApplicationInfo] = useState({
    studentName: '',
    phone: '',
    email: '',
    currentEducation: '',
    targetMajor: '',
    gpa: '',
    testScores: '',
    specialRequests: ''
  });

  // 计算总价
  const getTotalPrice = () => {
    const basePrice = 20000; // 基础服务费
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
    setApplicationInfo(prev => ({
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

    if (!applicationInfo.studentName.trim() || !applicationInfo.phone.trim() || 
        !applicationInfo.email.trim() || !applicationInfo.currentEducation.trim()) {
      alert('请填写完整的申请信息！');
      return;
    }

    if (window.confirm(`确认支付 ¥${totalAmount.toLocaleString()} 完成此次留学申请服务预订吗？`)) {
      // 模拟支付处理
      alert('支付成功！留学申请服务已确认，专业顾问将在12小时内与您联系，开始制定您的专属留学方案。');
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
                <FontAwesomeIcon icon={faGraduationCap} className="text-3xl text-blue-600" />
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

        {/* 申请信息 */}
        <div className="pixel-card w-full mb-8">
          <div className="flex items-center h-12 px-4 bg-black text-white border-b-2 border-black">
            <h2 className="pixel-title text-lg font-bold uppercase">申请信息</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold">学生姓名</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入学生姓名"
                  value={applicationInfo.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">联系电话</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入联系电话"
                  value={applicationInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">邮箱地址</label>
                <input 
                  type="email"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入邮箱地址"
                  value={applicationInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">当前学历</label>
                <select 
                  className="pixel-input w-full h-10 px-3"
                  value={applicationInfo.currentEducation}
                  onChange={(e) => handleInputChange('currentEducation', e.target.value)}
                >
                  <option value="">请选择当前学历</option>
                  <option value="高中">高中</option>
                  <option value="本科在读">本科在读</option>
                  <option value="本科毕业">本科毕业</option>
                  <option value="硕士在读">硕士在读</option>
                  <option value="硕士毕业">硕士毕业</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">目标专业</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入目标申请专业"
                  value={applicationInfo.targetMajor}
                  onChange={(e) => handleInputChange('targetMajor', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">GPA成绩</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="请输入GPA（如3.5/4.0）"
                  value={applicationInfo.gpa}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">标准化考试成绩</label>
                <input 
                  type="text"
                  className="pixel-input w-full h-10 px-3"
                  placeholder="托福/雅思/GRE/GMAT成绩（如托福110，GRE320）"
                  value={applicationInfo.testScores}
                  onChange={(e) => handleInputChange('testScores', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold">特殊需求</label>
                <textarea 
                  className="pixel-input w-full p-3 h-20 resize-none"
                  placeholder="目标院校偏好、专业方向、预算要求等特殊需求"
                  value={applicationInfo.specialRequests}
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

export default WinningBidPageStudy; 
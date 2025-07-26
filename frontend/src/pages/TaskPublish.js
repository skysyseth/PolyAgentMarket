import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet,
  faCube, 
  faTasks, 
  faHourglassHalf, 
  faExclamationCircle, 
  faPaperPlane,
  faCheckCircle,
  faSuitcase,
  faLaptopCode,
  faUser,
  faHeart,
  faGraduationCap,
  faCogs,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

const TaskPublish = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  
  const [taskData, setTaskData] = useState({
    description: '',
    ttl: {
      days: 0,
      hours: 1,
      minutes: 0
    },
    selectedTemplate: null
  });

  // 预设任务模板
  const presetTasks = [
    {
      id: 'travel',
      title: '去杭州旅游的出行安排',
      description: '需要一个详细的杭州旅游出行计划，包含景点安排、交通规划、住宿推荐等完整方案',
      icon: faSuitcase,
      route: '/bidding-travel'
    },
    {
      id: 'software',
      title: '毕设系统开发服务',
      description: '为本科生和研究生提供专业的毕业设计系统开发服务，包含源码交付、详细文档、技术支持、按时完成、答辩指导等服务',
      icon: faLaptopCode,
      route: '/bidding-software'
    },
    {
      id: 'wedding',
      title: '梦幻婚礼全程统筹策划',
      description: '需要一个完整的婚礼策划方案，包含场地布置、摄影摄像、音响设备、流程管控等全方位婚礼服务',
      icon: faHeart,
      route: '/bidding-wedding'
    },
    {
      id: 'study',
      title: '美国硕士留学申请全程服务',
      description: '需要完整的美国研究生申请方案，包含学校选择、文书写作、申请提交、签证办理等留学服务',
      icon: faGraduationCap,
      route: '/bidding-study'
    },
    {
      id: 'supply-chain',
      title: '电子设备硬件供应链解决方案',
      description: '需要完整的硬件采购和供应链管理方案，包含元器件采购、质量管控、物流配送、成本优化等供应链服务',
      icon: faCogs,
      route: '/bidding-supply-chain'
    },
    {
      id: 'recruiting',
      title: '高端人才招聘与猎头服务',
      description: '需要专业的人才招聘和猎头服务方案，包含人才搜寻、背景调查、面试安排、薪酬谈判等招聘服务',
      icon: faUsers,
      route: '/bidding-recruiting'
    }
  ];

  const handleWalletConnect = () => {
    // 模拟连接钱包
    updateUserData({ isWalletConnected: !userData.isWalletConnected });
  };

  const handleUserCenter = () => {
    navigate('/c-user-center');
  };

  const handleInputChange = (field, value) => {
    setTaskData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTTLChange = (unit, value) => {
    setTaskData(prev => ({
      ...prev,
      ttl: {
        ...prev.ttl,
        [unit]: parseInt(value)
      }
    }));
  };

  // 选择预设任务
  const handlePresetTaskSelect = (task) => {
    if (!userData.isWalletConnected) {
      alert('请先连接钱包');
      return;
    }
    
    // 填充任务描述和模板信息
    setTaskData(prev => ({
      ...prev,
      description: task.description,
      selectedTemplate: task // 保存选中的模板信息
    }));
  };

  const handlePublishTask = () => {
    if (!userData.isWalletConnected) {
      alert('请先连接钱包');
      return;
    }
    
    const totalMinutes = taskData.ttl.days * 24 * 60 + taskData.ttl.hours * 60 + taskData.ttl.minutes;
    
    if (!taskData.description.trim() || totalMinutes === 0) {
      alert('请填写完整的任务信息');
      return;
    }

    console.log('发布任务:', {
      ...taskData,
      totalTTLMinutes: totalMinutes
    });
    // 任务发布成功，跳转到撮合展示页面
    // 如果是从模板选择的，传递模板信息
    if (taskData.selectedTemplate) {
      navigate('/matching', { 
        state: { 
          fromTemplate: true,
          templateInfo: taskData.selectedTemplate 
        } 
      });
    } else {
      navigate('/matching');
    }
  };

  const totalMinutes = taskData.ttl.days * 24 * 60 + taskData.ttl.hours * 60 + taskData.ttl.minutes;
  const canPublish = userData.isWalletConnected && taskData.description.trim() && totalMinutes > 0;

  // 生成选项数组
  const dayOptions = Array.from({ length: 31 }, (_, i) => i); // 0-30天
  const hourOptions = Array.from({ length: 24 }, (_, i) => i); // 0-23小时
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i); // 0-59分钟

  return (
    <div className="w-full min-h-screen bg-white font-pixel">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b-2 border-black">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <FontAwesomeIcon icon={faCube} className="text-white text-sm" />
            </div>
            <h1 className="pixel-title text-xl">POLYAGENT MARKET</h1>
          </div>
          
          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {/* Connect Wallet Button */}
            <button 
              className={`px-4 py-2 flex items-center space-x-2 border-2 border-black font-bold transition-colors duration-150 ${
                userData.isWalletConnected 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
              onClick={handleWalletConnect}
            >
              <FontAwesomeIcon icon={faWallet} />
              <span>{userData.isWalletConnected ? '钱包已连接' : '连接钱包'}</span>
              {userData.isWalletConnected && (
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 ml-1" />
              )}
            </button>

            {/* User Center Button */}
            <button
              className="px-4 py-2 flex items-center space-x-2 border-2 border-black font-bold bg-white text-black hover:bg-gray-100 transition-colors duration-150"
              onClick={handleUserCenter}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>个人中心</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full p-8">
        <div className="w-[800px] mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h2 className="pixel-title mb-2 text-3xl font-bold uppercase">
              发布新任务
            </h2>
          </div>

          {/* 预设任务选择 */}
          <div className="pixel-card mb-8">
            <div className="flex items-center h-[50px] px-4 bg-black text-white border-b-2 border-black">
              <h3 className="text-base font-bold uppercase">快速选择任务模板</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                {presetTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handlePresetTaskSelect(task)}
                    className={`pixel-card flex items-center p-4 h-20 text-left transition-all duration-200 ${
                      userData.isWalletConnected 
                        ? 'hover:bg-gray-100 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="pixel-border flex justify-center items-center w-12 h-12 bg-black text-white mr-4">
                      <FontAwesomeIcon icon={task.icon} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold mb-1">{task.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center">点击选择模板，系统将自动填充任务详情并跳转到相应页面</p>
            </div>
          </div>

          {/* Task Form */}
          <div className="pixel-card mb-8">
            <div className="flex items-center h-[50px] px-4 bg-black text-white border-b-2 border-black">
              <h3 className="text-base font-bold uppercase">自定义任务详情</h3>
            </div>
            
            <div className="p-6">
              {/* Task Description */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold">任务详情</label>
                <div className="flex">
                  <div className="pixel-border flex justify-center items-center w-[50px] h-40 bg-black text-white">
                    <FontAwesomeIcon icon={faTasks} />
                  </div>
                  <textarea 
                    className="pixel-input w-full h-40 p-4 resize-none"
                    placeholder="请输入任务详情，包括预算、时间窗口、地点以及需求偏好等信息"
                    value={taskData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>

              {/* Task TTL */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold">任务有效时间(TTL)</label>
                <div className="flex items-center">
                  <div className="pixel-border flex justify-center items-center w-[50px] h-16 bg-black text-white">
                    <FontAwesomeIcon icon={faHourglassHalf} />
                  </div>
                  
                  {/* TTL Selector Container */}
                  <div className="pixel-border flex-1 h-16 bg-white flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                      {/* Days Selector */}
                      <div className="flex items-center space-x-2">
                        <select
                          value={taskData.ttl.days}
                          onChange={(e) => handleTTLChange('days', e.target.value)}
                          className="pixel-border w-16 h-10 text-center bg-white cursor-pointer focus:outline-none focus:shadow-pixel-focus"
                        >
                          {dayOptions.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <span className="text-sm font-bold">天</span>
                      </div>

                      {/* Hours Selector */}
                      <div className="flex items-center space-x-2">
                        <select
                          value={taskData.ttl.hours}
                          onChange={(e) => handleTTLChange('hours', e.target.value)}
                          className="pixel-border w-16 h-10 text-center bg-white cursor-pointer focus:outline-none focus:shadow-pixel-focus"
                        >
                          {hourOptions.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                          ))}
                        </select>
                        <span className="text-sm font-bold">小时</span>
                      </div>

                      {/* Minutes Selector */}
                      <div className="flex items-center space-x-2">
                        <select
                          value={taskData.ttl.minutes}
                          onChange={(e) => handleTTLChange('minutes', e.target.value)}
                          className="pixel-border w-16 h-10 text-center bg-white cursor-pointer focus:outline-none focus:shadow-pixel-focus"
                        >
                          {minuteOptions.map(minute => (
                            <option key={minute} value={minute}>{minute}</option>
                          ))}
                        </select>
                        <span className="text-sm font-bold">分钟</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* TTL Preview */}
                <div className="mt-2 text-xs text-gray-600">
                  {totalMinutes > 0 ? (
                    <span>
                      总计：{totalMinutes}分钟 
                      {taskData.ttl.days > 0 && ` (${taskData.ttl.days}天`}
                      {taskData.ttl.hours > 0 && ` ${taskData.ttl.hours}小时`}
                      {taskData.ttl.minutes > 0 && ` ${taskData.ttl.minutes}分钟`}
                      {taskData.ttl.days > 0 && ')'}
                    </span>
                  ) : (
                    <span className="text-red-500">请设置有效时间</span>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative Pattern */}
            <div className="h-2 border-t-2 border-black bg-gray-100"></div>
          </div>

          {/* Warning */}
          <div className="pixel-card flex items-center mb-8 p-4 ">
            <div className="flex justify-center items-center w-10 h-10 mr-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-2xl" />
            </div>
            <p className="text-xs">
              请注意：任务发布后将在区块链上不可篡改。请确保您已连接WalletConnect钱包并确认所有信息准确无误。
            </p>
          </div>

          {/* Publish Button */}
          <div className="flex justify-center">
            <button 
              className={`flex justify-center items-center w-[300px] h-[60px] text-xl font-bold uppercase transition-all duration-150 ${
                canPublish 
                  ? 'pixel-button cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel-hover' 
                  : 'pixel-button opacity-50 cursor-not-allowed'
              }`}
              onClick={handlePublishTask}
              disabled={!canPublish}
            >
              <span className="mr-2">提交</span>
            </button>
          </div>
        </div>
      </main>


    </div>
  );
};

export default TaskPublish; 
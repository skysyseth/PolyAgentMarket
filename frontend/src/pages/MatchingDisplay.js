import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCube,
  faNetworkWired,
  faUser,
  faServer,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faSpinner,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../App';

// 动画组件
const AnimationAreaWithMovingDot = ({ currentStage }) => {
  const [currentDot, setCurrentDot] = useState(null);

  // 节点位置配置
  const userPosition = { x: 80, y: 200 }; // C端用户位置
  const nodePositions = [
    { x: 800, y: 40, id: 'A' }, // 节点A
    { x: 800, y: 150, id: 'B' }, // 节点B  
    { x: 800, y: 260, id: 'C' }, // 节点C
    { x: 800, y: 360, id: 'D' }  // 节点D
  ];

  // 绿色光点发射动画
  useEffect(() => {
    if (currentStage < 1) return;

    const sendDotToRandomNode = () => {
      // 如果已经有光点在移动，则不发射新的
      if (currentDot) return;

      const randomNodeIndex = Math.floor(Math.random() * nodePositions.length);
      const targetNode = nodePositions[randomNodeIndex];
      
      // 创建新的光点，从用户中心开始
      setCurrentDot({
        x: userPosition.x,
        y: userPosition.y,
        targetX: targetNode.x,
        targetY: targetNode.y,
        isMoving: true
      });
      
      // 移动光点到目标节点
      setTimeout(() => {
        setCurrentDot(prev => prev ? {
          ...prev,
          x: targetNode.x,
          y: targetNode.y,
          isMoving: false
        } : null);
        
        // 光点到达后停留一段时间然后消失
        setTimeout(() => {
          setCurrentDot(null);
        }, 1000); // 在目标节点停留0.8秒后消失
      }, 50);
    };

    // 立即发射第一个光点
    sendDotToRandomNode();
    
    // 设置定时器，每3秒检查并发射新光点
    const interval = setInterval(() => {
      sendDotToRandomNode();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStage, currentDot]);

  return (
    <div className="relative w-full h-full">
      {/* C端用户节点 */}
      <div className="absolute flex flex-col items-center" style={{ left: `${userPosition.x - 32}px`, top: `${userPosition.y - 32}px` }}>
        <div className="pixel-border w-16 h-16 bg-white flex items-center justify-center border-2 border-black shadow-lg">
          <FontAwesomeIcon icon={faUser} className="text-2xl" />
        </div>
        <span className="node-label mt-2 text-xs font-bold uppercase">C端用户</span>
      </div>

      {/* B端节点 */}
      {nodePositions.map((node, index) => (
        <div 
          key={node.id} 
          className="absolute flex flex-col items-center" 
          style={{ left: `${node.x - 24}px`, top: `${node.y - 24}px` }}
        >
          <div className="pixel-border w-12 h-12 bg-white flex items-center justify-center border-2 border-black shadow-md">
            <FontAwesomeIcon icon={faServer} className="text-lg" />
          </div>
          <span className="node-label mt-2 text-xs font-bold uppercase">节点 {node.id}</span>
        </div>
      ))}

      {/* 连接线 - 从框边缘到框边缘 */}
      {currentStage >= 1 && nodePositions.map((node, index) => {
        // 计算从C端用户框右边缘到节点框左边缘的连接线
        const userRightEdge = { x: userPosition.x + 32, y: userPosition.y };
        const nodeLeftEdge = { x: node.x - 24, y: node.y };
        
        const dx = nodeLeftEdge.x - userRightEdge.x;
        const dy = nodeLeftEdge.y - userRightEdge.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        return (
          <div
            key={`line-${index}`}
            className="absolute bg-gray-800 opacity-60"
            style={{
              left: `${userRightEdge.x}px`,
              top: `${userRightEdge.y - 1}px`,
              width: `${length}px`,
              height: '2px',
              transformOrigin: '0 50%',
              transform: `rotate(${angle}deg)`
            }}
          />
        );
      })}

      {/* 单个移动的绿色光点 */}
      {currentStage >= 1 && currentDot && (
        <div
          className="absolute w-4 h-4 bg-green-500 rounded-full shadow-lg transition-all duration-1500 ease-in-out"
          style={{
            left: `${currentDot.x - 8}px`,
            top: `${currentDot.y - 8}px`,
            boxShadow: '0 0 15px rgba(34, 197, 94, 0.9), 0 0 30px rgba(34, 197, 94, 0.5)',
            zIndex: 10
          }}
        >
          {/* 内层发光核心 */}
          <div className="absolute inset-1 w-2 h-2 bg-green-300 rounded-full"></div>
          {/* 外层光晕效果 */}
          <div className="absolute -inset-1 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-40"></div>
        </div>
      )}

      {/* 网络活动指示器 */}
      {currentStage >= 1 && (
        <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 bg-black text-white text-xs font-bold rounded">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>网络传输中</span>
        </div>
      )}
    </div>
  );
};

const MatchingDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, updateUserData } = useUserData();
  const [currentStage, setCurrentStage] = useState(1);
  const [stageDescription, setStageDescription] = useState('C端用户已发出任务请求，内容正在广播至B端节点网络。');
  const [isAutoDemo, setIsAutoDemo] = useState(true);
  
  // 获取传递的模板信息
  const fromTemplate = location.state?.fromTemplate || false;
  const templateInfo = location.state?.templateInfo || null;

  // 撮合阶段配置
  const stages = [
    {
      id: 1,
      title: '阶段 1: 任务广播',
      status: 'completed',
      description: 'C端用户已发出任务请求，内容正在广播至B端节点网络。节点A、B、C和D已接收到任务信息，正在评估任务需求与自身能力的匹配度。预计将有3-4个节点响应此次任务请求。'
    },
    {
      id: 2,
      title: '阶段 2: 节点响应',
      status: 'active',
      description: '各个B端节点正在分析任务需求，评估自身能力匹配度。节点A和节点B已确认具备相关能力，节点C正在进行深度分析，节点D响应中。预计在接下来的30秒内完成所有节点响应。'
    },
    {
      id: 3,
      title: '阶段 3: 组队阶段',
      status: 'pending',
      description: '响应的节点将根据任务复杂度进行协作分工。系统会自动匹配互补能力的节点，形成最优的服务团队组合。预计组建2-3个竞争团队。'
    },
    {
      id: 4,
      title: '阶段 4: 实时竞拍',
      status: 'pending',
      description: '各个团队正在制定详细的服务方案和报价策略。系统会综合考虑服务质量、响应时间、成本效益等因素，为每个团队生成竞价方案。'
    },
    {
      id: 5,
      title: '阶段 5: 结果反馈',
      status: 'pending',
      description: '竞拍完成，所有竞价方案已生成。系统将向C端用户展示所有可选方案，包括服务细节、报价信息和服务商信誉等关键信息。'
    }
  ];

  // 自动演示逻辑
  useEffect(() => {
    if (!isAutoDemo) return;

    // 根据是否来自模板设置不同的动画时长
    const stageDuration = fromTemplate ? 3000 : 3000; // 每阶段时长 (模板来源:15秒总时长/5阶段=3秒每阶段)
    const finalDelay = fromTemplate ? 0 : 2000; // 最后跳转延迟 (模板来源:立即跳转)

    const timer = setTimeout(() => {
      if (currentStage < 5) {
        setCurrentStage(prev => prev + 1);
      } else {
        // 自动跳转到竞价展示页
        setTimeout(() => {
          if (fromTemplate && templateInfo) {
            // 从模板来的，跳转到对应的竞价页面
            navigate(templateInfo.route);
          } else {
            // 普通任务，跳转到默认竞价页面
            navigate('/bidding');
          }
        }, finalDelay);
      }
    }, stageDuration);

    return () => clearTimeout(timer);
  }, [currentStage, isAutoDemo, navigate, fromTemplate, templateInfo]);

  // 更新当前阶段描述
  useEffect(() => {
    const stage = stages.find(s => s.id === currentStage);
    if (stage) {
      setStageDescription(stage.description);
    }
  }, [currentStage]);

  const handlePrevious = () => {
    if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
      setIsAutoDemo(false);
    }
  };

  const handleNext = () => {
    if (currentStage < 5) {
      setCurrentStage(prev => prev + 1);
      setIsAutoDemo(false);
    } else {
      if (fromTemplate && templateInfo) {
        // 从模板来的，跳转到对应的竞价页面
        navigate(templateInfo.route);
      } else {
        // 普通任务，跳转到默认竞价页面
        navigate('/bidding');
      }
    }
  };

  const getStageStatus = (stageId) => {
    if (stageId < currentStage) return 'completed';
    if (stageId === currentStage) return 'active';
    return 'pending';
  };

  const handleConnectWallet = () => {
    updateUserData({ isWalletConnected: !userData.isWalletConnected });
  };

  return (
    <div className="w-full min-h-screen bg-white font-pixel">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b-2 border-black">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FontAwesomeIcon icon={faCube} className="text-white text-lg" />
            </div>
            <h1 className="pixel-title text-xl font-bold uppercase">POLYAGENT MARKET</h1>
          </div>
          
          {/* User Info and Wallet */}
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{userData.avatar}</span>
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
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 ml-1" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center w-full p-8">
        {/* Page Title */}
        <div className="text-center w-full mb-8">
          <h2 className="pixel-title mb-2 text-3xl font-bold uppercase">实时竞拍任务进行中</h2>
        </div>

        {/* Animation Container */}
        <div className="pixel-card w-full max-w-4xl h-[500px] mb-8 bg-white">
          {/* Animation Header */}
          <div className="flex items-center justify-between h-12 px-4 bg-black text-white border-b-2 border-black">
            <h3 className="text-base font-bold uppercase">竞拍过程</h3>
            <div className="flex items-center">
              <span className="mr-2 text-xs">竞拍状态:</span>
              <span className="text-xs font-bold text-green-400">进行中</span>
            </div>
          </div>
          
          {/* Animation Area */}
          <div className="relative flex-1 p-4 h-[438px]">
            <AnimationAreaWithMovingDot currentStage={currentStage} />
          </div>

          {/* Decorative Bottom Border */}
          <div className="h-2 border-t-2 border-black bg-gray-100"></div>
        </div>

        {/* Status and Description Cards */}
        <div className="flex gap-4 w-full max-w-4xl">
          {/* Matching Status */}
          <div className="pixel-card flex-1 bg-white">
            <div className="flex items-center h-10 px-4 bg-black text-white border-b-2 border-black">
              <h4 className="text-sm font-bold uppercase">竞拍状态</h4>
            </div>
            <div className="p-4">
              {stages.map((stage) => (
                <div key={stage.id} className="flex items-center mb-2">
                  <div className={`w-4 h-4 mr-2 ${
                    getStageStatus(stage.id) === 'completed' ? 'bg-black' : 
                    getStageStatus(stage.id) === 'active' ? 'bg-black' : 'border-2 border-black bg-white'
                  }`}></div>
                  <span className={`text-sm ${
                    getStageStatus(stage.id) === 'active' ? 'font-bold' : ''
                  }`}>
                    {stage.title}
                  </span>
                  {getStageStatus(stage.id) === 'completed' && (
                    <FontAwesomeIcon icon={faCircleCheck} className="ml-2 text-green-500 text-sm" />
                  )}
                  {getStageStatus(stage.id) === 'active' && (
                    <FontAwesomeIcon icon={faSpinner} className="ml-2 animate-spin text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Description */}
          <div className="pixel-card flex-1 bg-white">
            <div className="flex items-center h-10 px-4 bg-black text-white border-b-2 border-black">
              <h4 className="text-sm font-bold uppercase">当前描述</h4>
            </div>
            <div className="p-4">
              <div className="text-sm h-20 overflow-y-auto">
                <p>{stageDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MatchingDisplay; 
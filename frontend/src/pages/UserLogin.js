import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCube,
  faEnvelope,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGoogle
} from '@fortawesome/free-brands-svg-icons';

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState('c-user'); // 默认为C端用户
  const [isEmailLoggedIn, setIsEmailLoggedIn] = useState(false);

  // 根据URL参数或路径判断用户类型
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    
    if (type === 'b-provider') {
      setUserType('b-provider');
    } else if (location.pathname.includes('b-provider')) {
      setUserType('b-provider');
    } else {
      setUserType('c-user');
    }
  }, [location]);

  // 根据用户类型获取配置信息
  const getConfig = () => {
    if (userType === 'b-provider') {
      return {
        title: '服务商登录',
        subtitle: '请登录您的B端服务商账户',
        signUpText: '还没有服务商账户? ',
        signUpAction: '申请注册',
        footerNote: '登录后，您可以管理您的Agent服务并获取收益',
        redirectPath: '/b-provider-dashboard'
      };
    } else {
      return {
        title: '用户登陆',
        subtitle: '请登录您的用户邮箱账户',
        signUpText: "Don't have an account? ",
        signUpAction: 'Sign up',
        footerNote: '登录后，支付方式支持支付宝和区块链钱包',
        redirectPath: '/task-publish'
      };
    }
  };

  const config = getConfig();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // 模拟登录过程
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailLoggedIn(true);
      
      // 保存登录状态
      if (userType === 'b-provider') {
        localStorage.setItem('bProviderLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
      }
      
      // 登录成功后直接跳转
      navigate(config.redirectPath);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // 模拟Google登录
    console.log(`${userType} Google登录`);
    setIsEmailLoggedIn(true);
    
    // 保存登录状态
    if (userType === 'b-provider') {
      localStorage.setItem('bProviderLoggedIn', 'true');
      localStorage.setItem('userEmail', 'google-login@example.com');
    }
    
    // 登录成功后直接跳转
    navigate(config.redirectPath);
  };

  const handleSignUp = () => {
    // 跳转到注册页面或显示注册表单
    console.log('跳转注册');
    if (userType === 'b-provider') {
      navigate('/b-provider-register');
    }
  };

  return (
    <div className="min-h-screen bg-white font-pixel">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="w-full max-w-md">
          {/* Welcome Title */}
          <h2 className="text-4xl font-bold text-center mb-4 tracking-wide">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="text-center text-gray-600 mb-12">
              {config.subtitle}
            </p>
          )}
          {!config.subtitle && <div className="mb-8"></div>}

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors duration-200"
                required
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={!email || isLoading}
              className="w-full py-4 text-lg font-semibold text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? '登录中...' : 'Continue'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">{config.signUpText}</span>
            <button 
              onClick={handleSignUp}
              className="text-blue-600 hover:underline font-semibold"
            >
              {config.signUpAction}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 text-lg font-semibold border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-xl" />
            <span>Continue with Google</span>
          </button>

          {/* Footer Note */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>{config.footerNote}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogin; 
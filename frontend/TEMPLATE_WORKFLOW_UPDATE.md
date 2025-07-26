# 模板任务工作流更新

## 🔄 更新需求

用户要求修改模板任务的工作流程：
1. 点击模板任务时，填充内容但停留在TaskPublish页面
2. 点击"提交"按钮进入matching页面
3. 从模板任务进来的matching页面动画时长为15秒，然后自动跳转到对应的竞价页面

## 📝 实现方案

### 1. TaskPublish.js 修改

#### 预设任务选择逻辑变更
**原逻辑**:
- 点击模板 → 填充描述 → 500ms后自动跳转到对应竞价页面

**新逻辑**:
- 点击模板 → 填充描述 + 保存模板信息 → 停留在当前页面

```javascript
// 修改前
const handlePresetTaskSelect = (task) => {
  // ...
  setTaskData(prev => ({
    ...prev,
    description: task.description
  }));
  
  setTimeout(() => {
    navigate(task.route);
  }, 500);
};

// 修改后
const handlePresetTaskSelect = (task) => {
  // ...
  setTaskData(prev => ({
    ...prev,
    description: task.description,
    selectedTemplate: task // 保存选中的模板信息
  }));
};
```

#### 提交按钮逻辑更新
**新增功能**:
- 检测是否来自模板选择
- 传递模板信息到matching页面

```javascript
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
```

### 2. MatchingDisplay.js 修改

#### 新增状态管理
```javascript
const location = useLocation();
const fromTemplate = location.state?.fromTemplate || false;
const templateInfo = location.state?.templateInfo || null;
```

#### 动画时长调整
- **从模板来源**: 15秒总时长 (5阶段 × 3秒/阶段 + 0秒跳转延迟)
- **普通任务**: 原有时长 (5阶段 × 3秒/阶段 + 2秒跳转延迟)

```javascript
const stageDuration = fromTemplate ? 3000 : 3000; // 每阶段3秒
const finalDelay = fromTemplate ? 0 : 2000; // 模板来源立即跳转
```

#### 智能跳转逻辑
- **自动跳转**: 动画完成后根据来源跳转到正确页面
- **手动跳转**: 点击"下一步"也能正确识别跳转目标

```javascript
if (fromTemplate && templateInfo) {
  navigate(templateInfo.route); // 跳转到模板对应的竞价页面
} else {
  navigate('/bidding'); // 跳转到默认竞价页面
}
```

## 🎯 新的用户体验流程

### 模板任务流程
1. **TaskPublish页面** - 用户点击任务模板
2. **TaskPublish页面** - 自动填充任务描述，停留在页面
3. **TaskPublish页面** - 用户点击"提交"按钮
4. **MatchingDisplay页面** - 15秒动画演示撮合过程
5. **对应竞价页面** - 自动跳转到模板对应的竞价页面

### 自定义任务流程
1. **TaskPublish页面** - 用户手动填写任务信息
2. **TaskPublish页面** - 用户点击"提交"按钮  
3. **MatchingDisplay页面** - 完整动画演示撮合过程
4. **默认竞价页面** - 跳转到通用竞价页面

## 🔧 技术实现要点

### 状态传递
- 使用React Router的`location.state`传递模板信息
- 保持组件间的数据一致性

### 时间控制
- 精确控制动画时长达到15秒
- 区分不同来源的用户体验

### 路由管理
- 动态决定跳转目标
- 保持导航的灵活性

## ✅ 验证要点

1. **模板选择**: 点击模板应该填充内容但不跳转
2. **提交流程**: 提交后应该进入15秒的matching动画
3. **自动跳转**: 15秒后应该跳转到正确的竞价页面
4. **手动控制**: 手动点击"下一步"也应该正确跳转
5. **普通任务**: 非模板任务应该保持原有行为

这样的设计既满足了用户对模板任务快速流程的需求，又保持了系统的灵活性和一致性。 
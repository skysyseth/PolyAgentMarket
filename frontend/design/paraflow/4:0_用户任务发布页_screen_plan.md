## 用户任务发布页
允许C端用户连接WalletConnect钱包并发布任务，采用好玩的像素风设计风格。

Layout Hierarchy:
- Header (Full-width):
  - Navigation/WalletConnect Status
- Main Content Area (Form-centric):
  - Task Publishing Form
  - Action Button

### Navigation/WalletConnect Status
显示当前WalletConnect钱包连接状态，并提供连接/断开钱包的选项。

### Task Publishing Form
包含以下任务发布输入框：
- 预算：任务的预期费用。
- 时间窗口：任务的起止时间范围。
- 地点：任务的发生地点或服务地点。
- 需求偏好：对服务商或任务完成方式的特定要求。
- 任务有效时间(TTL)设置：任务的有效期限。

### Action Button
一个"发布任务"按钮，点击后发布任务，系统将任务广播至B端服务商并进入撮合阶段。
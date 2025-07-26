## 小微企业中标页面
展示已中标的小微企业管理系统服务细节，并允许用户自定义功能模块后进行支付。
Layout Hierarchy:
- Header
- Main Content Area:
  - Awarded Service Summary Card
  - Service Details Overview Card
  - Cost & Module Selection Card
  - Project Contact Information Card
- Fixed Bottom Payment Bar

### Header
与现有中标页面保持一致的顶部导航区域，包含品牌Logo、网站标题、用户余额和用户角色信息。

### Awarded Service Summary Card
显示用户已选择的小微企业管理系统服务的概要信息。
- 项目标题：例如“小微企业管理系统定制开发”
- 项目描述：已中标项目的简要描述
- 中标服务商信息：服务商名称、成功率、当前状态（已中标）

### Service Details Overview Card
详细展示中标服务商提供的系统服务总览。
- 服务商提供的核心服务内容描述，例如系统架构、主要功能模块概览等。

### Cost & Module Selection Card
详细列出系统功能模块和价格明细，并允许用户选择或取消选择功能模块，总价随之变化。
- **核心功能模块**: 列出中标方案中不可移除的基础功能模块及其价格。
- **可选功能模块与价格**: 以列表形式展示可供用户自主选择的额外功能模块，每个模块包含名称、描述、价格，并提供选择/取消选择的切换（例如复选框或开关）。总金额将根据用户的选择实时更新。
- **实施与支持费用明细**:
    - 系统实施周期：中标方案中承诺的实施响应时间
    - 后续维护支持方案：详细的维护和支持内容及对应费用

### Project Contact Information Card
收集系统实施所需的项目对接和联系信息。
- 联系人姓名输入框
- 联系电话输入框
- 企业名称输入框
- 项目备注/特殊需求文本区域

### Fixed Bottom Payment Bar
底部固定区域，显示当前总金额和支付按钮。
- 服务总价：根据用户选择的功能模块动态更新的总金额
- 账户余额：用户的当前账户余额
- 确认支付按钮：点击后进入支付流程
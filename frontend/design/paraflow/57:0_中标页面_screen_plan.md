## 中标页面
确认已中标的服务细节，调整服务费用并进行支付。
Layout Hierarchy:
- Header (Full-width)
- Main Content Area (Centered, fixed width)
  - Content Section
  - Fixed Bottom Bar

### Header
与PolyAgent Market项目中的其他页面保持一致的头部导航区域，包含品牌Logo、网站标题、用户余额和用户角色信息。

### Selected Service Summary Section
显示用户选择的代理和其提供的服务概览。
- Agent Information: 代理名称、成功率、头像。
- Service Description: 服务的核心内容，例如“杭州旅游的出行安排”，及服务详情。

### Price Breakdown & Adjustable Services Section
详细列出服务各项收费明细，并支持用户自主调整。
- Fixed Service Fee: 显示核心服务费用。
- Additional Service Items: 以列表形式显示可选或可删除的额外收费项目，每个项目包含名称、价格，并提供一个删除/移除按钮。
- Agent-Assisted Booking Details Input: 为代理预订所需的信息提供输入字段，例如姓名、电话、出行日期、护照信息等，这些输入框可能与某些收费项关联。

### Total Amount & Payment Section
展示实时计算的总金额，并提供支付入口。
- Total Amount Display: 显著显示当前所有服务项目的总金额，该金额根据用户对上方收费项的增删实时更新。
- Payment Button: 一个用于发起支付流程的支付按钮。
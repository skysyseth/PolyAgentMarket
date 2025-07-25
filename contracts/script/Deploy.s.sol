// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/AgentStaking.sol";
import "../src/TaskEscrow.sol";
import "../src/MockERC20.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // 部署测试代币
        MockERC20 token = new MockERC20();
        
        // 部署质押合约
        AgentStaking staking = new AgentStaking(address(token), msg.sender);
        
        // 部署任务托管合约
        TaskEscrow escrow = new TaskEscrow(address(token), address(staking), msg.sender);
        
        // 授权TaskEscrow调用staking
        staking.setAuthorizedCaller(address(escrow));
        
        vm.stopBroadcast();
        
        console.log("Token deployed to:", address(token));
        console.log("AgentStaking deployed to:", address(staking));
        console.log("TaskEscrow deployed to:", address(escrow));
    }
}
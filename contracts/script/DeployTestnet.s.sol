// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/AgentStaking.sol";
import "../src/TaskEscrow.sol";

// 测试网部署脚本 - 使用现有代币
contract DeployTestnet is Script {
    // 测试网代币地址
    address public constant TOKEN_ADDRESS = 0xff8257Dc41a52563EEe05bFf24dE4De39C1e68c0;
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // 如果TOKEN_ADDRESS是0地址，部署新代币
        address tokenAddress;
        if (TOKEN_ADDRESS == address(0)) {
            // 这里可以部署新代币，或者使用现有代币
            revert("TOKEN_ADDRESS is not set");
        } else {
            tokenAddress = TOKEN_ADDRESS;
        }
        
        // 部署质押合约
        AgentStaking staking = new AgentStaking(tokenAddress, deployerAddress);
        
        // 部署任务托管合约
        TaskEscrow escrow = new TaskEscrow(tokenAddress, address(staking), deployerAddress);
        
        // 授权TaskEscrow调用staking
        staking.setAuthorizedCaller(address(escrow));
        
        vm.stopBroadcast();
        
        console.log("Token Address:", tokenAddress);
        console.log("AgentStaking Address:", address(staking));
        console.log("TaskEscrow Address:", address(escrow));
        console.log("Deployer Address:", deployerAddress);
    }
}
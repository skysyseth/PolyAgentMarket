// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/AgentStaking.sol";

contract AgentStakingTest is Test {
    AgentStaking public staking;
    MockERC20 public token;
    
    address public user = address(0x123);
    address public agent = address(0x456);
    
    function setUp() public {
        token = new MockERC20("Test Token", "TST");
        staking = new AgentStaking(address(token), address(this));
        
        token.mint(user, 1000 * 10**18);
        token.mint(agent, 1000 * 10**18);
    }
    
    function testStake() public {
        vm.startPrank(user);
        token.approve(address(staking), 200 * 10**18);
        staking.stake(200 * 10**18);
        
        assertEq(staking.getStake(user), 200 * 10**18);
        assertEq(staking.getReputation(user), 100);
    }
    
    function testUnstake() public {
        vm.startPrank(user);
        token.approve(address(staking), 200 * 10**18);
        staking.stake(200 * 10**18);
        
        vm.warp(block.timestamp + 8 days);
        staking.unstake();
        
        assertEq(staking.getStake(user), 0);
    }
    
    function testSlash() public {
        vm.startPrank(user);
        token.approve(address(staking), 200 * 10**18);
        staking.stake(200 * 10**18);
        vm.stopPrank();
        
        vm.prank(address(staking.owner()));
        staking.slash(user, 50 * 10**18);
        
        assertEq(staking.getStake(user), 150 * 10**18);
        assertEq(staking.getReputation(user), 90);
    }
}

contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        
        return true;
    }
}
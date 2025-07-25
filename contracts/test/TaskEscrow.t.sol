// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/TaskEscrow.sol";
import "../src/AgentStaking.sol";

contract TaskEscrowTest is Test {
    TaskEscrow public escrow;
    AgentStaking public staking;
    MockERC20 public token;
    
    address public user = address(0x123);
    address public agent = address(0x456);
    
    function setUp() public {
        token = new MockERC20("Test Token", "TST");
        staking = new AgentStaking(address(token), address(this));
        escrow = new TaskEscrow(address(token), address(staking), address(this));
        
        token.mint(user, 1000 * 10**18);
        token.mint(agent, 1000 * 10**18);
        
        // 设置agent质押
        vm.startPrank(agent);
        token.approve(address(staking), 200 * 10**18);
        staking.stake(200 * 10**18);
        vm.stopPrank();
        
        staking.setAuthorizedCaller(address(escrow));
    }
    
    function testCreateTask() public {
        vm.startPrank(user);
        token.approve(address(escrow), 100 * 10**18);
        
        bytes32 taskHash = keccak256("test task");
        bytes32 taskId = escrow.createTask(taskHash, 100 * 10**18, block.timestamp + 1 days);
        
        TaskEscrow.Task memory task = escrow.getTask(taskId);
        assertEq(task.creator, user);
        assertEq(task.bounty, 100 * 10**18);
        assertEq(uint(task.status), uint(TaskEscrow.TaskStatus.Created));
    }
    
    function testAssignTask() public {
        vm.startPrank(user);
        token.approve(address(escrow), 100 * 10**18);
        bytes32 taskHash = keccak256("test task");
        bytes32 taskId = escrow.createTask(taskHash, 100 * 10**18, block.timestamp + 1 days);
        vm.stopPrank();
        
        vm.prank(agent);
        escrow.assignTask(taskId);
        
        TaskEscrow.Task memory task = escrow.getTask(taskId);
        assertEq(task.assignedAgent, agent);
        assertEq(uint(task.status), uint(TaskEscrow.TaskStatus.Assigned));
    }
    
    function testCompleteTask() public {
        vm.startPrank(user);
        token.approve(address(escrow), 100 * 10**18);
        bytes32 taskHash = keccak256("test task");
        bytes32 taskId = escrow.createTask(taskHash, 100 * 10**18, block.timestamp + 1 days);
        vm.stopPrank();
        
        vm.prank(agent);
        escrow.assignTask(taskId);
        
        vm.prank(user);
        escrow.completeTask(taskId);
        
        assertEq(token.balanceOf(agent), 900 * 10**18);
    }
    
    function testMarkTaskFailed() public {
        vm.startPrank(user);
        token.approve(address(escrow), 100 * 10**18);
        bytes32 taskHash = keccak256("test task");
        bytes32 taskId = escrow.createTask(taskHash, 100 * 10**18, block.timestamp + 1 days);
        vm.stopPrank();
        
        vm.prank(agent);
        escrow.assignTask(taskId);
        
        vm.prank(user);
        escrow.markTaskFailed(taskId);
        
        assertEq(token.balanceOf(user), 1000 * 10**18);
        assertEq(staking.getStake(agent), 150 * 10**18);
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
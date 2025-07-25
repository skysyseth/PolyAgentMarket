// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TaskEscrow is Ownable {
    IERC20 public immutable token;
    IAgentStaking public immutable staking;
    
    enum TaskStatus { Created, Assigned, Completed, Failed, Cancelled }
    
    struct Task {
        address creator;
        uint256 bounty;
        address assignedAgent;
        TaskStatus status;
        bytes32 taskHash;
        uint256 deadline;
    }
    
    mapping(bytes32 => Task) public tasks;
    
    event TaskCreated(bytes32 indexed taskId, address indexed creator, uint256 bounty);
    event TaskAssigned(bytes32 indexed taskId, address indexed agent);
    event TaskCompleted(bytes32 indexed taskId, address indexed agent);
    event TaskFailed(bytes32 indexed taskId);
    event TaskCancelled(bytes32 indexed taskId);
    
    constructor(address _token, address _staking, address initialOwner) Ownable(initialOwner) {
        token = IERC20(_token);
        staking = IAgentStaking(_staking);
    }
    
    function createTask(bytes32 taskHash, uint256 bounty, uint256 deadline) external returns (bytes32) {
        require(bounty > 0, "Bounty must be positive");
        require(deadline > block.timestamp, "Invalid deadline");
        
        bytes32 taskId = keccak256(abi.encodePacked(msg.sender, taskHash, block.timestamp));
        
        tasks[taskId] = Task({
            creator: msg.sender,
            bounty: bounty,
            assignedAgent: address(0),
            status: TaskStatus.Created,
            taskHash: taskHash,
            deadline: deadline
        });
        
        require(token.transferFrom(msg.sender, address(this), bounty), "Transfer failed");
        
        emit TaskCreated(taskId, msg.sender, bounty);
        return taskId;
    }
    
    function assignTask(bytes32 taskId) external {
        Task storage task = tasks[taskId];
        require(task.status == TaskStatus.Created, "Task not available");
        require(staking.getStake(msg.sender) >= 100 * 10**18, "Insufficient stake");
        require(block.timestamp < task.deadline, "Deadline passed");
        
        task.assignedAgent = msg.sender;
        task.status = TaskStatus.Assigned;
        
        emit TaskAssigned(taskId, msg.sender);
    }
    
    function completeTask(bytes32 taskId) external {
        Task storage task = tasks[taskId];
        require(msg.sender == task.creator, "Only creator");
        require(task.status == TaskStatus.Assigned, "Task not assigned");
        require(block.timestamp <= task.deadline, "Deadline passed");
        
        task.status = TaskStatus.Completed;
        
        require(token.transfer(task.assignedAgent, task.bounty), "Transfer failed");
        
        staking.increaseReputation(task.assignedAgent, 5);
        
        emit TaskCompleted(taskId, task.assignedAgent);
    }
    
    function markTaskFailed(bytes32 taskId) external {
        Task storage task = tasks[taskId];
        require(msg.sender == task.creator, "Only creator");
        require(task.status == TaskStatus.Assigned, "Task not assigned");
        
        task.status = TaskStatus.Failed;
        
        require(token.transfer(task.creator, task.bounty), "Transfer failed");
        
        staking.slash(task.assignedAgent, 50 * 10**18);
        
        emit TaskFailed(taskId);
    }
    
    function cancelTask(bytes32 taskId) external {
        Task storage task = tasks[taskId];
        require(msg.sender == task.creator, "Only creator");
        require(task.status == TaskStatus.Created, "Task not cancellable");
        
        task.status = TaskStatus.Cancelled;
        
        require(token.transfer(task.creator, task.bounty), "Transfer failed");
        
        emit TaskCancelled(taskId);
    }
    
    function getTask(bytes32 taskId) external view returns (Task memory) {
        return tasks[taskId];
    }
}

interface IAgentStaking {
    function getStake(address user) external view returns (uint256);
    function increaseReputation(address user, uint256 points) external;
    function slash(address user, uint256 amount) external;
}
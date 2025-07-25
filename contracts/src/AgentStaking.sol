// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AgentStaking is Ownable {
    IERC20 public immutable token;
    
    struct StakeInfo {
        uint256 amount;
        uint256 lockedUntil;
    }
    
    mapping(address => StakeInfo) public stakes;
    mapping(address => uint256) public reputation;
    
    address public authorizedCaller;
    uint256 public constant LOCK_PERIOD = 7 days;
    uint256 public constant MIN_STAKE = 100 * 10**18; // 100 tokens
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event Slashed(address indexed user, uint256 amount);
    event ReputationUpdated(address indexed user, uint256 newScore);
    
    constructor(address _token, address initialOwner) Ownable(initialOwner) {
        token = IERC20(_token);
    }

    function setAuthorizedCaller(address _authorizedCaller) external onlyOwner {
        authorizedCaller = _authorizedCaller;
    }
    
    function stake(uint256 amount) external {
        require(amount >= MIN_STAKE, "Stake too low");
        require(stakes[msg.sender].amount == 0, "Already staked");
        
        stakes[msg.sender] = StakeInfo({
            amount: amount,
            lockedUntil: block.timestamp + LOCK_PERIOD
        });
        
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        if (reputation[msg.sender] == 0) {
            reputation[msg.sender] = 100;
        }
        
        emit Staked(msg.sender, amount);
    }
    
    function unstake() external {
        StakeInfo memory info = stakes[msg.sender];
        require(info.amount > 0, "No stake");
        require(block.timestamp >= info.lockedUntil, "Still locked");
        
        delete stakes[msg.sender];
        require(token.transfer(msg.sender, info.amount), "Transfer failed");
        
        emit Unstaked(msg.sender, info.amount);
    }
    
    function slash(address user, uint256 amount) external {
        require(msg.sender == owner() || msg.sender == authorizedCaller, "Unauthorized");
        require(stakes[user].amount >= amount, "Insufficient stake");
        stakes[user].amount -= amount;
        reputation[user] = reputation[user] > 10 ? reputation[user] - 10 : 0;
        
        require(token.transfer(owner(), amount), "Transfer failed");
        
        emit Slashed(user, amount);
        emit ReputationUpdated(user, reputation[user]);
    }
    
    function increaseReputation(address user, uint256 points) external {
        require(msg.sender == owner() || msg.sender == authorizedCaller, "Unauthorized");
        reputation[user] += points;
        emit ReputationUpdated(user, reputation[user]);
    }
    
    function getStake(address user) external view returns (uint256) {
        return stakes[user].amount;
    }
    
    function getReputation(address user) external view returns (uint256) {
        return reputation[user];
    }
}
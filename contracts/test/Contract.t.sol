// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/Contract.sol";

contract TestContract is Test {
    function testBar() public pure {
        assertTrue(true);
    }
    
    function testFoo(uint256 x) public pure {
        assertEq(x, x);
    }
}
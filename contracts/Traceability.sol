// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract OneDistrictOneProduct {
    string public author = "ArC";

    struct Checkpoint {
        uint256 id;
        uint256 productId;
        uint256 timestamp;
        string location;
        string description;
    }

    struct CheckpointDetails {
        uint256 id;
        uint256 timestamp;
        string location;
        string description;
    }

    mapping(uint256 => Checkpoint) public checkpoints;
    uint256[] public checkPointKeys;

    function getAuthor() public view returns (string memory) {
        return author;
    }

    function addCheckpoint(
        uint256 _id,
        uint256 _productId,
        uint256 _unitTime,
        string memory _location,
        string memory _description
    ) public payable {
        require(_id > 0, "Invalid checkpoint ID");
        require(
            checkpoints[_id].id == 0,
            "Checkpoint with this ID already exists"
        );

        checkpoints[_id] = Checkpoint(
            _id,
            _productId,
            _unitTime,
            _location,
            _description
        );
        // console.log("Checkpoint Mapped");
        checkPointKeys.push(_id);
        // console.log("Key added to ds");
    }

    function getCheckpoint(
        uint256 _id
    ) public view returns (CheckpointDetails memory) {
        require(_id > 0, "Invalid checkpoint ID");
        Checkpoint memory checkpoint = checkpoints[_id];

        require(checkpoint.id != 0, "Checkpoint with this ID DOESN'T exists");

        CheckpointDetails memory res = CheckpointDetails(
            checkpoint.id,
            checkpoint.timestamp,
            checkpoint.location,
            checkpoint.description
        );

        return res;
    }

    function getCheckpointsByProductId(
        uint256 _productId
    ) public view returns (CheckpointDetails[] memory) {
        CheckpointDetails[] memory result = new CheckpointDetails[](
            checkPointKeys.length
        );
        uint256 count = 0;

        for (uint256 i = 0; i < checkPointKeys.length; i++) {
            if (checkpoints[checkPointKeys[i]].productId == _productId) {
                result[count] = CheckpointDetails(
                    checkpoints[checkPointKeys[i]].id,
                    checkpoints[checkPointKeys[i]].timestamp,
                    checkpoints[checkPointKeys[i]].location,
                    checkpoints[checkPointKeys[i]].description
                );
                count++;
            }
        }

        assembly {
            mstore(result, count)
        }

        return result;
    }
}

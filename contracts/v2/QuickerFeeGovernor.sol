// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Quicker.sol";

/// @custom:security-contact james98099@gmail.com
contract QuickerFeeGovernor is Ownable, AccessControl {
    bytes32 public constant ADD_TOTAL_INCOME_ROLE = keccak256("ADD_TOTAL_INCOME_ROLE");
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    event changedRound(uint256);
    event updatedVote(bool);
    event addTotalIncomeData(uint256);

    IERC20 public QkrwToken;
    IERC20 public QuickerToken;
    IERC20 public vQuickerToken; // 투표권 역할 토큰
    address public quickerDelivery; // 배송 컨트랙

    uint256 public insuranceFeeRate; // 보험 수수료는 관리자만 조정 가능
    uint256 public currentRound; // 현재 라운드
    uint256 public nextSundayMidnight; // 다음 일요일 자정(한국 시간)
    uint16 public changeFeeIndex; // 수수료 변동값 ex) 5 -> 0.5%
    uint256 public finishRoundRewards;

    // 투표 주제별 수량 정보
    struct Topic {
        uint256 totalVotedIncrease; // 수수료 인상
        uint256 totalVotedFreeze; // 수수료 동결
        uint256 totalVotedDecrease; // 수수료 인하
    }

    // 유권자가 투표한 수량 정보
    struct Voter { 
        Topic treasuryFee;
        Topic securityDepositFee;
        uint256 lastVoteRound; // 0 -> 투표 x 상태, 개별 라운드 정보 업데이트 여부 판별
    }

    // 개별 라운드 정보 (주제별 득표량, Qkrw수익금)
    struct RoundInfo {
        Topic treasuryFee; // 정수
        Topic securityDepositFee; // 정수
        uint256 totalIncome; // 단위 : 1e18
    }

    // 라운드 기록
    mapping(uint256 => RoundInfo) public roundLog;
    // 유권자 투표 정보
    mapping(address => Voter) private voters;

    constructor (uint256 _startRound, uint256 _nextSundayMidnight, uint16 _changeFeeIndex, uint256 _finishRoundRewards) Ownable() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADD_TOTAL_INCOME_ROLE, msg.sender);
        currentRound = _startRound;
        nextSundayMidnight = _nextSundayMidnight;
        changeFeeIndex = _changeFeeIndex;
        finishRoundRewards = _finishRoundRewards;
    }

    // 추가 투표 함수
    // 수수료 정산
    // refresh lastClaimedRound
    // _treasury -> [인상, 동결, 인하], _securityDeposit -> [인상, 동결, 인하]
    function castVote(uint256[] memory _treasury, uint256[] memory _securityDeposit) external returns(bool) {
        /* 파라미터가 vQuicekr토큰 밸런스 보다 작거나 같은지 체크
        lastVoteRound 확인 (currentRound == lastVoteRound)
            true -> 추가투표: 이미 사용한 투표량과 vQuicekr토큰 밸런스 비교
            false -> 처음투표: claimRewards 부터 실행 후 currentRound = lastVoteRound
        **/
        return true;
    }

    // 수수료 정산 함수
    // refresh lastClaimedRound
    function claimRewards() public returns(bool) {
        /* 투표했는지 확인 -> 투표량 == 0 && return
        lastVoteRound == currentRound
            true -> 보상을 이미 받은 거니 return
            false -> lastVoteRound의 라운드 정보를 통해 보상 계산
            
            투표량 0으로 저장
        **/

    }

    // 라운드 넘기는 함수 - 일요일 자정 이후로 호출 가능
    function finishRound() external returns(bool) {
        require(block.timestamp >= nextSundayMidnight, "Not sundayMidnight");
        (uint16 currentPlatform, uint16 currentSecu) = getCommissionRate();
        uint16[2] memory voteResult = getTopVotedTopics();
        uint16 nextPlatformFee = currentPlatform;
        uint16 nextSecuFee = currentSecu;
        if (voteResult[0] == 1) {
            nextPlatformFee = currentPlatform + changeFeeIndex;
        } else if (voteResult[0] == 3) {
            nextPlatformFee = currentPlatform - changeFeeIndex;
        }
        if (voteResult[1] == 1) {
            nextSecuFee = currentSecu + changeFeeIndex;
        } else if (voteResult[1] == 3) {
            nextSecuFee = currentSecu - changeFeeIndex;
        }
        (bool isSetPlatform, ) = address(quickerDelivery).call(
            abi.encodeWithSignature(
                "changeCommissionRate(uint8,uint16)",
                0,
                nextPlatformFee
            )
        );
        (bool isSetSecu, ) = address(quickerDelivery).call(
            abi.encodeWithSignature(
                "changeCommissionRate(uint8,uint16)",
                2,
                nextSecuFee
            )
        );
        (bool mintSuccess, ) = address(QuickerToken).call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                finishRoundRewards
            )
        );
        nextSundayMidnight = nextSundayMidnight.add(604800);
        currentRound = currentRound.add(1);
        emit changedRound(currentRound.add(1)); // 다음 라운드 값 방출
        return true;
    }

    // 현재 라운드 totalIncome 추가 함수 (QuickerDelivery 컨트랙이 QKRW 토큰 전송 후 호출)
    function addTotalIncome(uint256 _income) external onlyRole(ADD_TOTAL_INCOME_ROLE) {
        roundLog[currentRound].totalIncome = roundLog[currentRound].totalIncome.add(_income);
        emit addTotalIncomeData(_income);
    }

    // QuickerDelivery 컨트랙의 플랫폼 수수료 호출 함수
    function getCommissionRate() internal view returns (uint16 platformFeeRate, uint16 securityDepositRate) {
        QuickerDelivery quickerDrvy = QuickerDelivery(quickerDelivery);
        QuickerDelivery.Commission memory commission = quickerDrvy.getCommissionRate();
        return (commission.platformFeeRate, commission.securityDepositRate);
    }

    // 주제별 최다 득표 반환 함수, 1 -> 인상, 2 -> 동결, 3 -> 인하
    function getTopVotedTopics() internal view returns (uint16[2] memory) {
        uint16[2] memory topVotedTopics;
        RoundInfo memory roundInfo = roundLog[currentRound];
        // 플랫폼 수수료 투표 결과
        if (roundInfo.treasuryFee.totalVotedIncrease >= roundInfo.treasuryFee.totalVotedFreeze && roundInfo.treasuryFee.totalVotedIncrease >= roundInfo.treasuryFee.totalVotedDecrease) {
            topVotedTopics[0] = 1;
        } else if (roundInfo.treasuryFee.totalVotedFreeze >= roundInfo.treasuryFee.totalVotedIncrease && roundInfo.treasuryFee.totalVotedFreeze >= roundInfo.treasuryFee.totalVotedDecrease) {
            topVotedTopics[0] = 2;
        } else {
            topVotedTopics[0] = 3;
        }
        // 보증금 투표 결과
        if (roundInfo.securityDepositFee.totalVotedIncrease >= roundInfo.securityDepositFee.totalVotedFreeze && roundInfo.securityDepositFee.totalVotedIncrease >= roundInfo.securityDepositFee.totalVotedDecrease) {
            topVotedTopics[1] = 1;
        } else if (roundInfo.securityDepositFee.totalVotedFreeze >= roundInfo.securityDepositFee.totalVotedIncrease && roundInfo.securityDepositFee.totalVotedFreeze >= roundInfo.securityDepositFee.totalVotedDecrease) {
            topVotedTopics[1] = 2;
        } else {
            topVotedTopics[1] = 3;
        }
        return topVotedTopics;
    }
    // 보험 수수료 설정 함수
    function setInsuranceFee(uint256 _rate) external onlyOwner {
        insuranceFeeRate = _rate;
    }

    // 수수료 변동률 설정 함수
    function setChangeFeeIndex(uint16 _rate) external onlyOwner {
        changeFeeIndex = _rate;
    }

    // finishRound 함수 실행 보상 수량 설정 함수
    function setFinishRoundRewards(uint256 _amount) external onlyOwner {
        finishRoundRewards = _amount;
    }
}

/**
roundLog[currentRound].treasuryFee.totalVotedIncrease = roundLog[currentRound].treasuryFee.totalVotedIncrease.add(_increase);
        roundLog[currentRound].treasuryFee.totalVotedFreeze = roundLog[currentRound].treasuryFee.totalVotedFreeze.add(_freeze);
        roundLog[currentRound].treasuryFee.totalVotedDecrease = roundLog[currentRound].treasuryFee.totalVotedDecrease.add(_decrease);
*/
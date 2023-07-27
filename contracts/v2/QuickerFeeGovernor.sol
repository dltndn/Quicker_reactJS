// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @custom:security-contact james98099@gmail.com
contract QuickerFeeGovernor is Ownable, AccessControl {
    bytes32 public constant ADD_TOTAL_INCOME = keccak256("ADD_TOTAL_INCOME");
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    event changedRound(bool);
    event updatedVote(bool);
    event addTotalIncomeData(uint256);

    IERC20 public QkrwToken;
    IERC20 public QuickerToken;
    IERC20 public vQuickerToken; // 투표권 역할 토큰
    address public QuickerDelivery; // 배송 컨트랙

    uint256 public insuranceFeeRate; // 보험 수수료는 관리자만 조정 가능
    uint256 public currentRound; // 현재 라운드
    uint256 public nextSundayMidnight; // 다음 일요일 자정(한국 시간)

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
        Topic treasuryFee;
        Topic securityDepositFee;
        uint256 totalIncome;
    }

    // 라운드 기록
    mapping(uint256 => RoundInfo) public roundLog;
    // 유권자 투표 정보
    mapping(address => Voter) private voters;

    constructor () {

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

    // 라운드 넘기는 함수
    function finishRound() external view returns(bool) {
        /* 현재 시간 >= nextSundayMidnight
            currentRound++
            득표 결과에 따라 QuickerDelivery 수수료 변경
            msg.sender에게 Quicker 토큰 보상       
            nextSundayMidnight += 604800
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

    // 현재 라운드 totalIncome 추가 함수 (QuickerDelivery 컨트랙이 호출)
    function addTotalIncome(uint256 _income) external onlyRole(ADD_TOTAL_INCOME) {
        /*
        현재 라운드의 totalIncome 추가
        **/
    }

    // 보험 수수료 설정 함수
    function setInsuranceFee(uint256 _rate) external onlyOwner {
        insuranceFeeRate = _rate;
    }
}
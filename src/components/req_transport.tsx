import styles from "../css/req_transport.module.css"

const walk = require('../image/walk.png')
const bike = require('../image/bike.png')
const kickboard = require('../image/kickboard.png')
const motorcycle = require('../image/motorcycle.png')
const car = require('../image/car.png')
const truck = require('../image/truck.png')

function Req_transport() {
    return (
        <section>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div>
                            <span className={styles.reqfont}>운송수단 (1개 이상 선택)</span>
                        </div>
                        <div className={styles.btdiv}>
                            <ul className={styles.btul}>
                                <li>
                                    <button>
                                        <span className={styles.icon}>
                                        <img src={walk} alt="" /></span>
                                        <span style={styles.reqtx}>도보</span>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <span className={styles.icon}>
                                        <img src={bike} alt="" /></span>
                                        <span style={styles.reqtx}>자전거</span>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <span className={styles.icon}>
                                        <img src={kickboard} alt="" /></span>
                                        <span style={styles.reqtx}>킥보드</span>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <span className={styles.icon}>
                                        <img src={motorcycle} alt="" /></span>
                                        <span style={styles.reqtx}>오토바이</span>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <span className={styles.icon}>
                                        <img src={car} alt="" /></span>
                                        <span style={styles.reqtx}>승용차</span>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <span className={styles.icon}>
                                        <img src={truck} alt="" /></span>
                                        <span style={styles.reqtx}>트럭</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </section>
    );
  }
  
  export default Req_transport;
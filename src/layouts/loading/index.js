import { connect } from 'dva';
import { Spin } from 'antd';
import styles from './index.css';

export default connect()(props => {
    props.dispatch({ type: 'user/info'});
    return <div className={styles.spin}><Spin /></div>
})

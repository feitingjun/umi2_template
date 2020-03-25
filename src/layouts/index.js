import router from 'umi/router';
import Login from './login';
import Home from './home';
import Loading from './loading';
import { connect } from 'dva';

export default connect(state => {
    const { user, isLogin } = state.user;
    return { user, isLogin };
})(props => {
    const { children, location, isLogin, user } = props;
    if(!user && !isLogin){
        router.push('/login');
        return <Login />
    }
    if(!user && location.pathname.indexOf('/login') === -1){
        return <Loading />
    }
    let Container = location.pathname.indexOf('/login') === -1  ? Home : Login;
    return (
        <Container>{children}</Container>
    );
})

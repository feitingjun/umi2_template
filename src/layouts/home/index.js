import React from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import router from 'umi/router';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './index.css';
import logoImg from '@/assets/11.jpg';
import headImg from '@/assets/22.jpg';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Page extends React.Component{

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
        collapsed: !this.state.collapsed,
        });
    };
    //生成菜单结构
    getMenu = (list) => {
        let menus = [];
        list.map((v,i) => {
            if(v.children && v.children.length>0){
                    menus.push(<SubMenu
                    title={<span>{v.icon && <Icon type={v.icon} />}<span>{v.name}</span></span>}
                    key={v.route}
                    className='home-menuitem'
                >
                    {this.getMenu(v.children)}
                </SubMenu>)
            }else{
                menus.push(<Menu.Item key={v.route}>
                    <Link to={v.route}>
                        {v.icon && <Icon type={v.icon} />}
                        <span>{v.name}</span>
                    </Link>
                </Menu.Item>)
            }
        })
        return menus;
    }
    switchTheme = () => {
        const themes = window.umi_plugin_ant_themeVar;
        const menuItems = themes.map((v,i) => {
            return <Menu.Item key={v.key} onClick={() => {
                let styleLink = document.getElementById('theme-style');
                let body = document.getElementsByTagName('body')[0];
                if (!styleLink) { // 假如存在id为theme-style 的link标签，直接修改其href
                    styleLink = document.createElement('link');
                    styleLink.type = 'text/css';
                    styleLink.rel = 'stylesheet';
                    styleLink.id = 'theme-style';
                    body.append(styleLink);
                }
                styleLink.href = `/theme/${v.fileName}`;
                body.className = `body-wrap-${v.key}`;
                localStorage.setItem('theme', v.key);
            }}>{v.name}</Menu.Item>
        })
        return menuItems;
    }
    render(){
        const { user } = this.props;
        const { username, menuList } = user;
        const menu = (
            <Menu mode='vertical'>
                <Menu.Item>
                    修改密码
                </Menu.Item>
                <SubMenu
                    title='切换主题'
                >{this.switchTheme()}</SubMenu>
                <Menu.Item onClick={() => {
                    router.push('/login')
                }}>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        const pathname = this.props.location.pathname;
        let openKeys = [];
        const getOpenKey = (list, keys) => {
            list.map(v => {
                if(v.children && v.children.length>0){
                    getOpenKey(v.children, [...keys, v.route])
                }else{
                    if(v.route === pathname){
                        openKeys = keys;
                    }
                }
            })
        }
        getOpenKey(menuList, []);
        return (
            <Layout className={styles.container}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className={styles.logo}>
                        <img className={styles.logoImg} src={logoImg} alt=""/>
                        {!this.state.collapsed&&<span>老年大学</span>}
                    </div>
                    {menuList && <Menu theme='dark' mode='inline' selectedKeys={[pathname]} defaultOpenKeys={openKeys}>
                        {this.getMenu(menuList)}
                    </Menu>}
                </Sider>
                <Layout>
                <Header className={styles.header}>
                    <Icon
                        className={styles.trigger}
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <Dropdown
                        overlayClassName={styles.dropdown}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        overlay={menu}
                        placement='bottomCenter'
                    >
                    <div className={styles.usernameBox}>
                        <span className={styles.headBox}><img src={headImg} alt=""/></span>
                        <span>{username}</span>
                    </div>
                    </Dropdown>
                </Header>
                <Content
                    className={styles.content}
                >
                    <Breadcrumbs />
                    {this.props.children}
                </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.user;
    return { user }
}
// withRouter 在不是通过路由切换的页面中，将react-router 的 history、location、match 三个对象传入props对象上
export default withRouter(connect(mapStateToProps)(Page));

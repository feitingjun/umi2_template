import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

class Page extends React.Component {
    state = {
        
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'user/save'
        })
        const userInfo = localStorage.getItem('_r') && JSON.parse(localStorage.getItem('_r')) || {};
        this.props.form.setFieldsValue(userInfo);
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'user/login',
                    payload: {
                        username: values.username,
                        password: values.password
                    }
                }).then(data => {
                    if(data){
                        if(values.remember){
                            localStorage.setItem('_r', JSON.stringify(values))
                        }else{
                            localStorage.setItem('_r', null)
                        }
                        router.push({ pathname: '/' })
                    }
                })
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.login}>
                <div className={styles.content}>
                    <div className={styles.title}>后台系统</div>
                    <Form className={styles.form} onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ 
                                    required: true, message: '请输入用户名' 
                                },{
                                    pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/, message: '用户名格式错误'
                                }]
                            })(
                                <Input
                                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder='用户名'
                                />,
                            )}
                            </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ 
                                    required: true, message: '请输入密码' 
                                },{
                                    // pattern: /^(\w){6,20}$/, message: '密码格式不正确'
                                }],
                            })(
                                <Input
                                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder='密码'
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                            })(<Checkbox>记住密码</Checkbox>)}
                        </FormItem>
                        <Button size='large' className={styles.btn} type='primary' htmlType='submit'>
                            登录
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Form.create()(connect()(Page));

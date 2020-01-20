import React from 'react'
import './index.less'
import {Route, NavLink} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import baseConfig from '@config/base'

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="light" style={{height: '100%'}} mode="inline" defaultSelectedKeys={['0']}>
            {
              baseConfig.map((item, idx) => (
                <Menu.Item key={idx} onClick={() => this.props.history.push(item.path)}>
                  <Icon type={item.iconType} />
                  <span>{item.name}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              style={{paddingLeft: 30}}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {
              baseConfig.map((config, idx) => (
                <Route
                  key={idx}
                  exact={config.defaultPage}
                  path={config.path}
                  component={require(`../../pages/${config.componentName}`).default}/>
                ))
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App
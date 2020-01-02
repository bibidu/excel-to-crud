import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Table, Button, Select } from 'antd';
import api from '../api'

const { Option } = Select
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class ContentTitle extends React.Component {

  render() {
    const { options, changeFilter } = this.props
    return (
      <div className="table-operations">
        <span style={{marginRight: '5px', fontWeight: 'bold'}}>Sort By</span>
        <Select style={{ width: 120, marginRight: 10 }} onChange={changeFilter}>
          {
            options.map((option, idx) => <Option key={idx} value={option}>{option}</Option>)
          }
        </Select>
        {/* <Button onClick={this.clearFilters}>Clear filters</Button> */}
      </div>
    )
  }
}
// class MyTable extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       attrs: [],
//       datas: []
//     }
//   }

//   componentDidMount() {
//     const widths = [150, 150, 300];
//     api.list().then(results => {
//       let { data: datas, code } = results
//       let attrs = Object.keys(datas[0])
//       attrs = attrs.map((item, idx) => ({
//         title: item,
//         dataIndex: item,
//         width: widths[idx]
//       }));
//       datas = datas.map((item, idx) => ({
//         key: idx,
//         ...item
//       }))

//       this.setState({
//         attrs,
//         datas,
//       })
//     })
//   }

//   render() {
//     const { attrs, datas } = this.state
//     return <Table
//       columns={attrs}
//       dataSource={datas}
//       pagination={{ pageSize: 10 }}
//       position="both"
//     />
//   }
// }

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attrs: [],
      datas: [],
      options: []
    }
  }

  fetchListAndSet = (queryConditions) => {
    const widths = [150, 150, 300];
    api.list(queryConditions).then(results => {
      let { data: datas, code } = results
      let attrs = Object.keys(datas[0])
      attrs = attrs.map((item, idx) => ({
        title: item,
        dataIndex: item,
        width: widths[idx]
      }));
      datas = datas.map((item, idx) => ({
        key: idx,
        ...item
      }))

      this.setState({
        attrs,
        datas,
      })
    })
  }

  fetchFilterAttrList = () => {
    api.getCanFilterAttrNames('list').then(results => {
      console.log('fetchFilterAttrList ', results.data)
      this.setState({
        options: results.data.map(item => item.column_name).filter(item => item !== 'uniqueid')
      })
    })
  }

  changeFilter = (value) => {
    this.fetchListAndSet({ orderBy: value })
  }

  componentDidMount() {
    // 查询所有filter可选项
    this.fetchFilterAttrList()
    // 查询列表数据
    this.fetchListAndSet()
  }

  getTableColumnByattrName = (options) => {
    return options.map(option => ({ title: option, dataIndex: option }))
  }

  render() {
    const { attrs, datas, options } = this.state
    console.log(attrs)
    return (
      <Layout style={{height: '100%'}}>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            {/* 筛选条件 */}
            <div style={{ marginBottom: 10, display: 'flex' }}>
              <ContentTitle
                options={options}
                changeFilter={this.changeFilter}
              />
              {/* <Button>添加</Button> */}
            </div>

            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Table
                columns={this.getTableColumnByattrName(options)}
                dataSource={datas}
                pagination={{ pageSize: 10 }}
                position="both"
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
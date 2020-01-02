import React from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Table,
  Button,
  Select,
  Modal,
  Form,
  Input,
} from 'antd'
import api from '../api'

const { Option } = Select
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

class ContentTitle extends React.Component {
  render() {
    const { options, changeFilter, value } = this.props
    return (
      <div className="table-operations">
        <span style={{marginRight: '5px', fontWeight: 'bold'}}>Sort By</span>
        <Select value={value} style={{ width: 120, marginRight: 10 }} onChange={changeFilter}>
          {
            options.map((option, idx) => <Option key={idx} value={option}>{option}</Option>)
          }
        </Select>
        {/* <Button onClick={this.clearFilters}>Clear filters</Button> */}
      </div>
    )
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.form)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values)
      }
    });
  }
  render() {
    const { options, form, handleSubmit } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          options.map((option, idx) => (
            <Form.Item label={option} key={idx}>
              {getFieldDecorator(option, {
                rules: [{ required: false, }],
              })(
              <Input
                placeholder={`Please Input ${option}`}
              />
            )}
            </Form.Item>
          ))
        }
        <Form.Item style={{textAlign: 'center'}}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datas: [],
      options: [],
      showAddModal: false,
      filterValue: '',
    }
  }

  fetchListAndSet = (queryConditions) => {
    const widths = [150, 150, 300];
    api.list(queryConditions).then(results => {
      let { data: datas, code } = results
      datas = datas.map((item, idx) => ({
        key: idx,
        ...item
      }))

      this.setState({
        datas,
      })
    })
  }

  fetchFilterAttrList = () => {
    api.getCanFilterAttrNames('list').then(results => {
      console.log('fetchFilterAttrList ', results.data)
      const columnList = results.data.map(item => item.column_name)
      this.setState({
        options: columnList.filter(item => item !== 'uniqueid'),
      })
    })
  }

  changeFilter = (value) => {
    this.setState({ filterValue: value })
    this.fetchListAndSet({ orderBy: value })
  }

  clearFilter = () => {
    this.setState({
      filterValue: ''
    })
    this.fetchListAndSet()
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

  showAddModal = () => {
    this.setState({
      showAddModal: true
    })
  }

  handleSubmit = (values) => {
    api.add(values).then(res => {
      console.log('api add ', res)
      this.setState({
        showAddModal: false
      })
    })
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const { datas, options, filterValue, showAddModal } = this.state
    return (
      <Layout style={{height: '100%'}}>
        {/* 添加功能 模态窗 */}
        <Modal
          title="添加"
          centered
          visible={showAddModal}
          footer={null}
          onCancel={() => this.setState({ showAddModal: false })}
        >
          <WrappedHorizontalLoginForm
            options={options}
            handleSubmit={this.handleSubmit}
          />
        </Modal>
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
                value={filterValue}
                options={options}
                changeFilter={this.changeFilter}
              />
              <Button style={{ marginRight: 10}} onClick={this.clearFilter}>清空筛选</Button>
              <Button type="primary" onClick={this.showAddModal}>添加</Button>
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
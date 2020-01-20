import React from 'react'
import { BarsOutlined, DownOutlined } from '@ant-design/icons'
import './index.less'
import data from '../../config/data'
import {
  mock,
} from '../../utils'
import {
  Input,
  Dropdown,
  Cascader,
  Button,
  Table,
  Menu,
  Modal,
  message,
  Form,
} from 'antd'
const {
  Search,
} = Input

function FormModal({
  title,
  visible,
  onClose,
  children
}) {
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onClose}
      footer={null}
    >
      {children}
    </Modal>
  )
}

function FormBody({
  form,
  handleSubmit = () => {},
  onOk,
}) {
  const { getFieldDecorator } = form
  return (
    <Form onSubmit={handleSubmit} style={{overflow: 'hidden'}}>
      {
        data.map((item, idx) => (
          <Form.Item label={item.title} key={idx}>
            {getFieldDecorator(item.key, {
              rules: [],
            })(<Input />)}
          </Form.Item>
        ))
      }
      <Form.Item style={{float: 'right', marginBottom: 0}}>
        <Button key="submit" type="primary" htmlType="submit" onClick={() => {
          form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              onOk(values)
            }
          });
        }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

const FormWithValidate = Form.create({ name: 'form' })(FormBody)

export default class extends React.Component {
  state = {
    formModal: {
      show: false,
      title: '新增',
    },
    tableData: [],
    selectedRowKeys: []
  }

  onTableSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  onPageSizeChange = (pageSize) => {
    console.log(pageSize)
  }

  fetchTableData = () => {
    return new Promise(resolve => {
      const dataKeys = data.map(item => item.dataIndex)
      const mockResult = mock({
        dataKeys,
        number: 22,
      }).map((item, idx) => ({...item, key: idx}))
      resolve(mockResult)
    })
  }

  onOkFormModal = () => {
    this.setState({ formModal: {...this.state.formModal, show: false } })
  }

  onCancelFormModal = () => {
    this.setState({ formModal: {...this.state.formModal, show: false } })
  }
  
  onClickMenuOperation = ({ key }) => {
    if (key === 'delete') {
      return message.success('删除成功');
    }
    if (key === 'update') {
      this.setState({
        formModal: {
          ...this.state.formModal,
          show: true,
          title: '编辑'
        }
      })
    }
  }

  onCreateItem = () => {
    this.setState({
      formModal: {
        ...this.state.formModal,
        show: true,
        title: '新增'
      }
    })
  }
  componentDidMount() {
    this.fetchTableData().then(tableData => {
      this.setState({ tableData })
    })

  }

  render() {
    const {
      tableData,
      selectedRowKeys,
      formModal,
    } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onTableSelectChange,
    }
    return <div>
      {/* 编辑、新增弹窗 */}
      <FormModal
        title={formModal.title}
        onClose={this.onCancelFormModal}
        visible={formModal.show}
      >
        <FormWithValidate
          onOk={this.onOkFormModal}
          onClose={this.onCancelFormModal}
        />
      </FormModal>
      {/* 筛选条件区域 */}
      <div className="filter-area">
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 300, marginRight: 20 }}
        >
        </Search>
        <Cascader options={data.map(({key}) => ({ value: key, label: key}))} placeholder="Choose Filters" />
        <Button type="primary" className="sep-btn">Search</Button>
        <Button plain="true">Reset</Button>
        <div className="create-btn">
          <Button plain="true" onClick={this.onCreateItem}>Create</Button>
        </div>
      </div>
      {/* 列表主体区域 */}
      <div className="table-area">
        <Table
          tableLayout="auto"
          columns={(() => {
            const t = data.concat({
              title: 'Operation',
              // fixed: 'right',
              render: (text, record) => {
                return (
                  <Dropdown
                    overlay={<Menu onClick={this.onClickMenuOperation}>
                      <Menu.Item key='update'>Update</Menu.Item>
                      <Menu.Item key='delete'>Delete</Menu.Item>
                    </Menu>}
                  >
                    <Button style={{ border: 'none' }}>
                      <BarsOutlined style={{ marginRight: 2 }} />
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                )
              }
            })
            return t
          })()}
          dataSource={tableData}
          rowSelection={rowSelection}
          // scroll={{ x: 1000 }}
          pagination={{
            showSizeChanger: true,
            onShowSizeChange: this.onPageSizeChange,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: total => `Total ${total} Items`
          }}
        />
      </div>
    </div>
  }
}
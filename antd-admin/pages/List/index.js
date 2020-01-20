import React from 'react'
import BaseList from '@components/BaseList'
import configList from '@config/list'
import {
  mock,
} from '@utils'

export default class extends React.Component{

  fetchTableData = (ctx) => {
    const { configList: list } = ctx.props
    return new Promise(resolve => {
      const dataKeys = list.map(item => item.dataIndex)
      const mockResult = mock({
        dataKeys,
        number: 22,
      }).map((item, idx) => ({...item, key: idx}))
      resolve(mockResult)
    })
  }

  render() {
    return <BaseList
      configList={configList}
      fetchTableData={this.fetchTableData}
    />
  }
}
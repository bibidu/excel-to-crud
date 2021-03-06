const path = require('path')
const fs = require('fs')
const excelParse = require('excel').default

const apis = [
  { type: 'get', url: '/list', resultType: 'LIST' },
  { type: 'get', url: '/getById', resultType: 'GET_BY_ID' },
]

class App {
  constructor(targetExcelPath) {
    this.targetExcelPath = targetExcelPath
    this.attrNames = []
    this.datas = []
  }

  checkAttrNames(data) {
    const [attrNames, ...datas] = data

    if (!datas) {
      return { error: true, msg: '至少需要一条数据!' }
    }

    const set = new Set()
    attrNames.forEach(item => set.add(item))
    if ([...set].length !== attrNames.length) {
      return { error: true, msg: '字段名不能重复!' }
    }

    if (attrNames.some(item => item === '')) {
      return { error: true, msg: '字段名不能为空!' }
    }
    console.log(attrNames)
    if (attrNames.some(item => !(/[a-zA-Z]/.test(String(item).charAt(0))))) {
      return { error: true, msg: '字段名开头必须是字母!' }
    }

    return { error: false, msg: '' }
  }
  parse() {
    return excelParse(this.targetExcelPath).then((data) => {
      const [attrNames, ...datas] = data
      const { msg, error } = this.checkAttrNames(data)
      if (error) {
        throw Error(msg)
      }
      this.attrNames = attrNames
      this.datas = datas.filter(item => !item.every(i => !i))
    });
  }

  create(type, result) {
    let _path
    if (type === 'router') {
      _path = path.resolve('.', './koaManageServer/routers/index.js')
      return fs.writeFileSync(_path, result, 'utf8')
    }
    if (type === 'createTable') {
      _path = path.resolve('.', './koaManageServer/tasks/index.js')
      return fs.writeFileSync(_path, result, 'utf8')
    }
    if (type === 'frontApi') {
      _path = path.resolve('.', './reactManagePlatform/src/api/index.js')
      return fs.writeFileSync(_path, result, 'utf8')
    }
  }

  getRequestByType(resultType) {
    switch(resultType) {
      case 'LIST': {
        return `select * from list`
      }
      default:
        return ``
    }
  }

  generateDB() {
    let tasks = []
    // 1；删除存在的表
    const dropTableString = `query("drop table if exists list")`
    // 2；创建表
    let createTableString = `query("create table list (`
    createTableString += `uniqueid INT auto_increment primary key, `
    this.attrNames.forEach((item, idx) => {
      const splitSymbol = idx === this.attrNames.length - 1 ? '' : ', '
      createTableString += `${item} VARCHAR(255)${splitSymbol}`
    })
    createTableString += ')")'
    // 3；添加初始数据
    const addInitialData = `query('insert into list(${this.attrNames.join(',')}) values ${this.datas.map(data => '(' + data.map(item => `"${item}"`).join(',') + ')').join(',')}')`

    const sqlString = `
    const query = require('../utils/mysql')
    module.exports = function() {
      return ${dropTableString}.then(() => {
        return ${createTableString}
      }).then(() => {
        return ${addInitialData}
      })
    }`

    this.create('createTable', sqlString)
  }

  generateCode() {
    this.generateDB()
    this.generateApi()
    this.generateData()
  }

  generateApi() {
    const apiJSONS = []
    apis.forEach(({ type, url, resultType }) => {
      apiJSONS.push({ type, url, sqlString: this.getRequestByType(resultType) })
    })

    const generateRouter = require('./generate/router')
    const routerResult = generateRouter(apiJSONS)
    this.create('router', routerResult)
  }
  // const apis = [
  //   { type: 'get', url: '/list', resultType: 'LIST' },
  //   { type: 'get', url: '/getById', resultType: 'GET_BY_ID' },
  // ]
  generateData() {
    const result = []
    apis.forEach(({ url, type }) => {
      result.push({ apiName: url.slice(1), type  })
    })

    const generateFrontApi = require('./generate/page')
    const frontApiResult = generateFrontApi(result)
    this.create('frontApi', frontApiResult)
  }

}

module.exports = App
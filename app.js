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

  parse() {
    return excelParse(this.targetExcelPath).then((data) => {
      const [attrNames, ...datas] = data
      if (!datas) {
        throw Error('至少需要一条数据!')
      }
      this.attrNames = attrNames
      this.datas = datas
    });
  }

  create(type, result) {
    let _path
    if (type === 'router') {
      _path = path.resolve('.', './koaManageServer/routers/index.js')
      return fs.writeFileSync(_path, result, 'utf8')
    }
    if (type === 'frontApi') {
      _path = path.resolve('.', './reactManagePlatform/src/api/index.js')
      return fs.writeFileSync(_path, result, 'utf8')
    }
  }

  getResultByType(resultType) {
    switch(resultType) {
      case 'LIST': {
        return this.datas.map((item, index) => {
          const obj = {}
          item.map((i, idx) => {
            const attrName = this.attrNames[idx]
            obj[attrName] = i
          })
          return obj
        })
      }
    }
  }

  generateCode() {
    this.generateApi()
    // TODO: 接入数据库后移除
    this.generateData()
  }

  generateApi() {
    const apiJSONS = []
    apis.forEach(({ type, url, resultType }) => {
      apiJSONS.push({ type, url, result: this.getResultByType(resultType) })
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
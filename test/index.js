const App = require('../app')

const targetExcelPath = './test.xlsx'

const app = new App(targetExcelPath)


app.parse().then(() => {
  app.generateCode()
})

    const query = require('../utils/mysql')
    module.exports = function() {
      return query("drop table if exists list").then(() => {
        return query("create table list (uniqueid INT auto_increment primary key, number VARCHAR(255), userId VARCHAR(255), score_number VARCHAR(255), phone VARCHAR(255), regist_time VARCHAR(255), last_login_time VARCHAR(255), sex VARCHAR(255), bind_phone VARCHAR(255), identity VARCHAR(255), d VARCHAR(255), f VARCHAR(255), fss1 VARCHAR(255), zz VARCHAR(255), fe VARCHAR(255))")
      }).then(() => {
        return query('insert into list(number,userId,score_number,phone,regist_time,last_login_time,sex,bind_phone,identity,d,f,fss1,zz,fe) values ("T193781-13","杜宪章","18","177181939323","42990","43171","男","是","员工","","","","","")')
      })
    }

    const query = require('../utils/mysql')
    module.exports = function() {
      return query("drop table if exists list").then(() => {
        return query("create table list (uniqueid INT auto_increment primary key, id VARCHAR(255), name VARCHAR(255), age VARCHAR(255), address VARCHAR(255), phone VARCHAR(255))")
      }).then(() => {
        return query('insert into list(id,name,age,address,phone) values ("1","杜宪章","18","金寨县","177181939323"),("2","赵冰冰","27","富阳镇","18373847234"),("3","李会烦","31","安庆市","103934947892")')
      })
    }
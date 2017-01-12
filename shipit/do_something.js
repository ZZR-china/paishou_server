var utils = require('shipit-utils')
module.exports = function(shipit) {
  utils.registerTask(shipit, 'do_something', task)
  function task() {
    shipit.config = shipit.config || {}; // 读取相关配置
    var cmd = 'cd /tmp/deploy/current;\
               npm install;\
               pm2 kill;\
               pm2 start ./bin/backend.json' // 你想要执行的命令
    return shipit.remote(cmd); // 当触发do_something后，就会在服务器上执行cmd。
  }
}

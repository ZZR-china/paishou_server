var utils = require('shipit-utils')
module.exports = function (shipit) {
  shipit = utils.getShipit(shipit);
  require('./do_something')(shipit);
  shipit.on('published', function () { // 监听published事件，触发后就执行do_something任务。
    shipit.start('do_something');
  });
};

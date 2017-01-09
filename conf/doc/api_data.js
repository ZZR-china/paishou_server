define({ "api": [  {    "type": "get",    "url": "/app/series",    "title": "赛事日历",    "group": "Series",    "description": "<p>缓存时间30秒</p>",    "version": "1.0.0",    "filename": "api/app/controllers/series/index.js",    "groupTitle": "Series",    "name": "GetAppSeries",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/app/series/detail/:id",    "title": "赛事详情（热门、非热门）",    "group": "Series",    "description": "<p>缓存时间30秒</p>",    "version": "1.0.0",    "filename": "api/app/controllers/series/index.js",    "groupTitle": "Series",    "name": "GetAppSeriesDetailId",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/app/series/hot",    "title": "热门赛事",    "group": "Series",    "description": "<p>缓存时间30秒、204-返回值为空</p>",    "version": "1.0.0",    "filename": "api/app/controllers/series/hot.js",    "groupTitle": "Series",    "name": "GetAppSeriesHot",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/app/series/hot/inroduce/:id",    "title": "赛事介绍（热门）",    "group": "Series",    "description": "<p>缓存时间30秒</p>",    "version": "1.0.0",    "filename": "api/app/controllers/series/hot.js",    "groupTitle": "Series",    "name": "GetAppSeriesHotInroduceId",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/app/user",    "title": "获取个人信息",    "group": "User",    "version": "1.0.0",    "filename": "api/app/controllers/user/index.js",    "groupTitle": "User",    "name": "GetAppUser",    "header": {      "fields": {        "": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>用户标识</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n  'authorization': 'Bearer {token}'\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/app/user/login",    "title": "登录",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>密码</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\nBody:\n{\n  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......'\n}",          "type": "json"        }      ]    },    "version": "1.0.0",    "filename": "api/app/controllers/user/index.js",    "groupTitle": "User",    "name": "PostAppUserLogin"  },  {    "type": "post",    "url": "/app/user/logout",    "title": "退出",    "group": "User",    "version": "1.0.0",    "filename": "api/app/controllers/user/index.js",    "groupTitle": "User",    "name": "PostAppUserLogout",    "header": {      "fields": {        "": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>用户标识</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n  'authorization': 'Bearer {token}'\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/app/user/register/getsmscode",    "title": "注册-申请短信码",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          }        ]      }    },    "description": "<p>10分钟内可以申请2次</p>",    "version": "1.0.0",    "filename": "api/app/controllers/user/register.js",    "groupTitle": "User",    "name": "PostAppUserRegisterGetsmscode",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/app/user/register/setPassword",    "title": "注册-设置密码",    "group": "User",    "description": "<p>密码长度：6-16位</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>密码</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "tem_token",            "description": "<p>临时token</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\nBody:\n{\n  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......'\n}",          "type": "json"        }      ]    },    "version": "1.0.0",    "filename": "api/app/controllers/user/register.js",    "groupTitle": "User",    "name": "PostAppUserRegisterSetpassword"  },  {    "type": "post",    "url": "/app/user/register/verifySmscode",    "title": "注册-验证短信码",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "sms_code",            "description": "<p>短信码</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\nBody:\n{\n  'tem_token': 'f37db6e2-fa96-4b48-9a18-91e82666083f'\n}",          "type": "json"        }      ]    },    "version": "1.0.0",    "filename": "api/app/controllers/user/register.js",    "groupTitle": "User",    "name": "PostAppUserRegisterVerifysmscode"  },  {    "type": "post",    "url": "/app/user/retrieve/getsmscode",    "title": "找回-申请短信码",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          }        ]      }    },    "description": "<p>10分钟内可以申请2次</p>",    "version": "1.0.0",    "filename": "api/app/controllers/user/retrieve.js",    "groupTitle": "User",    "name": "PostAppUserRetrieveGetsmscode",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/app/user/retrieve/verifySmscode",    "title": "找回-验证短信码",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "smscode",            "description": "<p>短信码</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\nBody:\n{\n  'tem_token': 'f37db6e2-fa96-4b48-9a18-91e82666083f'\n}",          "type": "json"        }      ]    },    "version": "1.0.0",    "filename": "api/app/controllers/user/retrieve.js",    "groupTitle": "User",    "name": "PostAppUserRetrieveVerifysmscode"  },  {    "type": "post",    "url": "/app/user/thirdparty/wechat/login",    "title": "微信登录",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\nBody:\n{\n  'smscode': '2005'\n}",          "type": "json"        }      ]    },    "version": "1.0.0",    "filename": "api/app/controllers/user/thirdparty/wechat.js",    "groupTitle": "User",    "name": "PostAppUserThirdpartyWechatLogin"  },  {    "type": "put",    "url": "/app/user/retrieve/setPassword",    "title": "找回-设置密码",    "group": "User",    "description": "<p>密码长度：6-16位</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>手机号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "tem_token",            "description": "<p>临时token</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>短信码</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\nBody:\n{\n  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......'\n}",          "type": "json"        }      ]    },    "version": "1.0.0",    "filename": "api/app/controllers/user/retrieve.js",    "groupTitle": "User",    "name": "PutAppUserRetrieveSetpassword"  },  {    "type": "put",    "url": "/app/user/revise",    "title": "修改密码",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "old_password",            "description": "<p>原密码</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "new_password",            "description": "<p>新密码</p>"          }        ]      }    },    "version": "1.0.0",    "filename": "api/app/controllers/user/index.js",    "groupTitle": "User",    "name": "PutAppUserRevise",    "header": {      "fields": {        "": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>用户标识</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n  'authorization': 'Bearer {token}'\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": '请求成功',\n}",          "type": "json"        }      ]    }  }] });

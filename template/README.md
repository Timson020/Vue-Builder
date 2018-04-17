
[TOC]

# {{name}}
> {{description}}

# Author: {{author}}

# 使用框架
 vue + vue-router + vue-resource + vuex

# 简单的目录说明
- src（源码文件）
	- common（工具库）
	- components（项目组件）
	- reducers（reducer）
	- routes（页面）
	- App.js（入口文件）
- tools（工具库）
- node_modules （第三方依赖）
- package.json （配置文件）
- .eslintrc （eslint 代码 规范）
- .babelrc （解析器）
- .gitignore （git 忽略文件）


# 项目命令说明

```
npm run dev (开启本地开发模式)

npm run build (打包生产环境源码)

npm run c XXX （生成组件模版）

npm run r XXX （生成路由页面模版）
```

# 简要规范说明
- 模版生成规范
	- 生成组件都必须要首字母大写
	- 生成页面都必须要首字母大写
- 业务逻辑
	- 除了钩子函数还有属性字段 可以写在.vue文件里面 所有的逻辑代码 都要写到module.js里面

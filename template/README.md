
[TOC]

# {{name}}
> {{description}}

## Author: {{author}}

## 使用框架
 vue + vue-router + vue-resource + vuex + immutable

## 目录结构说明

### 简单的目录说明
- src（源码文件）
- tools（工具库）
- package.json （配置文件）
- webpack.config.js（webpack配置文件，包含生产环境，开发环境）
- .babelrc （babel 解析器）
- .editorconfig（编辑器配置文件）
- .eslintignore （eslint 代码 规范 忽略文件）
- .eslintrc （eslint 代码 规范）
- .gitignore （git 忽略文件）

### src目录说明

|名称|说明|
|:--:|:--:|
|assets|图片资源文件|
|common|工具库|
|components|项目全局组件|
|config|配置vuex,router|
|routes|页面|
|scss|Scss源码|
|main.js|入口文件|

## 项目命令说明

```
# (开启本地开发模式)
npm run dev 

# (打包生产环境源码)
npm run build 

# (生成组件模版)
npm run c XXX 

# (生成路由页面模版)
npm run r XXX 
```

## 简要规范说明
- 模版生成规范
	- 生成组件都必须要首字母大写
	- 生成页面都必须要首字母大写
- 业务逻辑
	- 除了钩子函数还有属性字段 可以写在.vue文件里面 所有的逻辑代码 都要写到module.js里面

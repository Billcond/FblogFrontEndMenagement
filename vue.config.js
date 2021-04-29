
let proxyObj = {}

proxyObj['/']={
    //ws是websocket
    ws:false,//这个后面要通信，所以定义

    target:'http://localhost:3000',//要代理到那里去  也就是后端的目标地址
    //target:'https://mock.mengxuegu.com/mock/606d2220e34b2e50a355d041', //网上找的接口设置网址
    // target:'http://localhost:3000',
    //发送请求头host被设置成target
    changeOrigin:true,

    //不重写请求地址
    pathReWrite:{
        '^/':'/'
    }
}


module.exports = {
    //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
    //zhengkai.blog.csdn.net
    runtimeCompiler: true,
    devServer:{
      host:'localhost',
      port:8000,
      proxy:proxyObj
  }
  }
  
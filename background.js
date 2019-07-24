chrome.webRequest.onBeforeRequest.addListener(route,{urls: ["http://*/*","https://*/*"]},["blocking"])


// 标签页ID
var tabId=null
// 标签页切换时 , 重新设置标签页ID
chrome.tabs.onActiveChanged.addListener(function (id){
    tabId=id
    // document.body.innerHTML = tabId
})


function route(req){
    log(req)

    var urlReq=urlReplace(req.url)
    if(urlReq){
        
        return {redirectUrl : urlReq}
    }
}

function urlReplace(url){
    var urlReq

    for(var i in datas){

        if(datas[i] instanceof RegExp ||  typeof datas[i] == 'string'){
            urlReq=url.replace(datas[i],i)
        }
        else if(datas[i] instanceof Function){
            urlReq=datas[i](url,i) || url
        }
        else{
            continue
        }

        if(urlReq!=url){
            return urlReq
        }
    }
}







var datas={
    // 本地资源 : 远程链接

    // 用法一 : 直接url字符串对换
    'http://localhost:8080/banner/images/1.jpg' : 'https://www.baidu.com/img/bd_logo1.png?qua=high',

    'https://safa.gitee.io/egret-typescript.js' : 'http://developer.egret.com/cn/tpl/simplebootx/Public/simpleboot/examples/vscode/js/typescript.js'

    // 用法二 : 正则
    // 'http://localhost:8888/a.js' : /http:\/\/www.google-analytics.com\/\w+.js/,

    // 用法三 : 正则形式的字符串 , 会自动转换成正则
    // 'http://localhost:8888/a.js' : 'Reg:http://www.google-analytics.com/\\w+.js',

    // 用法四 : 函数 , 如果函数有返回值 , 使用该返回值 , 否则跳过
    // 'http://localhost:8888/a.js' : function (url , selfUrl){
    //     if(url == 'http://www.google-analytics.com/ga.js'){
    //         log(url)
    //         return selfUrl
    //     }
    // },
}


setTimeout(()=>{
    log(chrome.runtime.getURL('./routes.json'))
},1000)

// 将方法三的字符串变成正则
for(var i in datas){
    if(typeof datas[i]=='string' && datas[i].indexOf('Reg:')==0){
        datas[i]=new RegExp(datas[i].slice(4))
    }
}

// 通知前台的js打印日志
function log(){
    console.log(...arguments)
    // chrome.tabs.sendMessage(tabId,arguments,function () {
        // var a=arguments
        // setTimeout(function(){
        //     log(a)
        // },1000)
    // })
}
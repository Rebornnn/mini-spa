/**
 * REST参数的输入解析中间件
 * @param {Object} opt为配置参数  
 */
export function rest(opt){
    //将传入的REST参数格式化
    let  matchers=opt.matchers||[];
    matchers.forEach((item,index,arr)=>{
        arr[index]=str2matcher(item);
    });

    //格式化REST参数的函数
    function str2matcher(url){
        let ret={
            url:url,
            keys:[]
        };

        //将‘:uid’转化为‘([^\/]+?)’
        let reg=url.replace(/:(.+?)(?=[\/|$])/g,function(p1){
            ret.keys.push(p1);
            return '([^\/]+?)'; 
        });

        //将‘/user/:uid’转化为‘^/user/:uid$’
        ret.matcher=new RegExp('^'+reg+'$','gi');

        return ret;
    }

    //获取参数
    function getParams(path) {
        let ret={};

        //对格式化后的REST参数进行迭代
        matchers.forEach(item => {
            //用正则表达式方法将path中的参数取出
            let res=item.matcher.exec(path);
            if(res){
                //将取出的参数与参数名对应
                item.keys.forEach(key,index => {
                    ret[key]=res[index+1]||'';
                });
            }

        });

        return ret;
    }

    return function(context,next){
        let req=context.request;
        req.restParams=getParams(req.pathname);

        next();
    }
}
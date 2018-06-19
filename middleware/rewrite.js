/**
 * REST地址重写到模块地址的重写规则处理中间件
 * @param {Object} opt为配置参数 
 */
export function rewrite(opt){
    let rules=opt.rules||[];
    //将传入的配置规则进行格式化处理
    rules.forEach(item => {
        let target=item.target;
        if(typeof target!=='function'){
            item.target=function(){
                return target;
            };
        }

        let matcher=item.matcher;
        if(typeof matcher==='function'){
            return;
        }
        if(typeof matcher=='string'){
            item.matcher=function(ctx){
                return ctx.request.pathname=matcher;
            };
            return;
        }
        if(matcher instanceof RegExp){
            item.matcher=function(ctx){
                var boo=matcher.test(ctx.request.hash.slice(1));
                console.log(boo);
                return boo;
            };
            
            return;
        }
    });

    return function(context,next){
        let ret=rules.find(item => item.matcher(context));

        //重新定位到目标地址
        if(!!ret){
            let target=ret.target();
            context.request.pathname=target;
            if(!!context.hash){
                context.hash.pathname=target;
            }
        }

        next();
    }
}
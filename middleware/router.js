/**
 * 路由器中间件
 */

import {Module} from './module/Module.js'
 
export function router(opt){
    let routes=opt.routes||{};
    let current=null;

    return function(context,next){
        let name=context.request.pathname;
        let module=routes[name];
        if(!module){
            alert('请求不正确哦。');
            return;
        }

        //模块还没构建时先构建
        if(!(module instanceof Module)){
            module=new module(context);
            routes[name]=module;
            module.build(context);
        }

        //是当前模块则更新，不是，则隐藏，并展示新模块
        if(module===current){
            module.refresh(context);
        }else{
            if(current){
                current.hide();
            }
            current=module;
            current.show(context);
        }
    }
}
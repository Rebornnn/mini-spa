/**
 * 主框架
 */
let middlewares=[];

export let spa={
    add:function(mw){
        if(typeof mw ==='function'){
            middlewares.push(mw);
        }
    },
    dispatch:function(context){
        let index=0;
        let next=function(){
            let mw=middlewares[index];
            index++;
            if(!!mw){
                return mw(context,next);
            }
        };
        next();
    }
};
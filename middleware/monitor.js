/**
 * URL变化触发器
 * @param {Object} opt为配置参数 
 */

export function Monitor(opt){
    opt=opt||{};

    let last=null;

    //检查URL的函数,当有差别时执行opt.onchange
    let runURLCheck=function(){
        let newValue=location.href;
        if(last!==newValue){
            let event={
                lastURL:last,
                newURL:newValue
            };
            last=newValue;
            if(typeof opt.onchange==='function'){
                opt.onchange(event);
            }
        } 
    };

    //每500ms检查一次URL
    window.setInterval(runURLCheck,500);
}
/**
 * 调度框架和中间件整合统一后提供接口
 */

import {Monitor} from './middleware/monitor.js';
import {spa} from './middleware/spa.js';
import {rest} from './middleware/rest.js';
import {history} from './middleware/history.js';
import {rewrite} from './middleware/rewrite.js';
import {filter} from './middleware/filter/filter.js';
import {AuthFilter} from './middleware/filter/AuthFilter.js';
import {router} from './middleware/router.js';
import {User} from './middleware/module/User.js';
import {Group} from './middleware/module/Group.js';

let app={
    start:function(options){
        spa.add(rest(options));
        //spa.add(history(options));
        spa.add(rewrite(options));
        filter.add(AuthFilter);
        spa.add(filter.mw);
        spa.add(router);

        let monitor=new Monitor({
            onchange:function(event){
                let context={
                    request:new URL(event.newValue),
                    parent:document.getElementById('app')
                };
                spa.dispatch(context);
            }
        });
    }
};


//调用接口并传入参数
app.start({
    matchers:['user/:id','/group/:gid/user/:uid/'],
    rules:[{
        matcher: /\/group\/[\d]+\/user\/[\d]+\//i,
        target: '/user/'
    }],
    routes:{
        '/user/': User,
        '/group/': Group
    }
});
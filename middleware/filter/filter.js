/**
 * 过滤器中间件
 */

 let filters=[];

 export let filter={
     add:function(ft){
         if(ft instanceof Array){
             ft.forEach(item =>{
                 filter.add(item);
             });
         }

         filters.push(ft);
     },
     mw:function(context,next){
         let index=0;
         let chain=function(){
             let Filter=filters[index];
             index++;
             if(!!Filter){
                 let ft=new Filter(context,next,chain);
                 ft.doFilter();
             }
         }
         chain();
     }
 };
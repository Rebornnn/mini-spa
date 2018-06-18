/**
 * 登录过滤器
 */
import Filter from './baseFilter';

export class AuthFilter extends Filter{
    doFilter(){
        //重写父类
        super.next();
    }
}
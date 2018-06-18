/**
 * 过滤器基类
 */

export class Filter{
    constructor(context,next,chain){
        this._context=context;
        this._next=next;
        this._chain=chain;
    }

    next(){
        if(this._next){
            this._next();
        }
    }

    chain(){
        if(this._chain){
            this._chain();
        }
    }

    doFilter(){
        //被子类重写
    }
}
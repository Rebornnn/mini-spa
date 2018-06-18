/**
 * 模块抽象
 */

 
export class Module {
    constructor(config) {
        this._parent = config.parent;
    }

    build(options) {
        //do something
        //子类生成this._body
    }

    show() {
        //do something
        if(this._body){
            this._parent.appendChild(this._body);
        }
    }


    refresh() {
        //do something 
    }

    hide() {
        //do something
        let fragment=document.createDocumentFragment();
        if (this._body) {
            fragment.appendChild(this._body);
        }
    }

    destroy() {
        //do something
    }
}
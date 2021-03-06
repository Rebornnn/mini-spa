/**
 * 团队展示模块
 */

import { Module } from "./Module.js";

export class Group extends Module{
    build(options){
        super.build(options);
        this._body=document.createElement('div');
        this._unode=document.createElement('p');
        this._body.appendChild(this._unode);
    }

    show(context){
        super.show(context);
        let req=context.request;
        this._doUpdateUser(req.restParams.gid);
        this._parent.appendChild(this._body);
    }

    refresh(context){
        super.refresh(context);
        let req = context.request;
        this._doUpdateUser(req.restParams.gid);
    }

    _doUpdateUser(gid){
        this._unode.innerHTML = '<p>大家好，我们是团队' + gid + '</p>';
    }
}
export default new class Observer {
    constructor() {
        this.handlers = {};
    }

    on(name, callback, scope) {
        (this.handlers[name] = this.handlers[name] || []).push({
            name: name,
            callback: callback,
            scope: scope
        });
    }

    un(name, callback, scope) {
        if(! this.handlers[name])
            return ;

        var handlers = this.handlers[name],
            i = handlers.length;

        while(i --) {
            var handler = handlers[i];

            if(handler.callback == callback && handler.scope == scope)
                handlers.splice(i, 1);
        }
    }

    fire(name) {
        var handlers = this.handlers[name];

        if(! handlers)
            return ;

        var args = [].slice.call(arguments, 1);
        
        for(var i=0, item; item=handlers[i]; i++) {
            item.callback.apply(item.scope, args);
        }
    }
}
var simProxyHandler = {

    getProxy: true,

    get: function(target,key) {
        if(this.getProxy && target[key] && typeof target[key] === "object") {
            if(proxyMap.toProxy.get(target[key]) === undefined) {
                var proxy = new Proxy(target[key],simProxyHandler);
                proxyMap.toProxy.set(target[key],proxy);
                proxyMap.toObject.set(proxy,target[key]);
                return proxy;
            }

            else {
                return proxyMap.toProxy.get(target[key]);
            }
        }

        else {
            return target[key];
        }

    },

    apply: function(target,thisArg,argList) {

        if(target.name === "indexOf") {
            target(proxyMap.toObject(argList[0]));
        }

        else {
            return target.apply(thisArg,argList);
        }

    },

    set: function(target,key,value) {

        target[key] = value;

        /**if(target[key] && typeof target[key] === "object" && key !== "parentObj" && (target.regPolygon || target.circle || target.rectangle || target.Polygon)) {
            target[key].
        }**/

        return true;

    },

    /** 

    deleteProperty: function(target,key) {

        if(Array.isArray(target)) {
            target.splice(key,1);
        }

        else {
            delete target[key];
        }

    }

    */



}



var proxyMap = {
    toProxy: new Map(),
    toObject: new Map()
}

export default simProxyHandler;
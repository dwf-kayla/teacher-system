define(function(){
    return {
        //功能：将url中所有的参数信息，转换成对应的对象
        //以后获取指定的参数内容的时候，直接访问对象的属性即可！
        getQueryObj:function(){
            //将?key=value&key=value转成对象
            var kvp=location.search.slice(1).split('&');
            var result={};
            //下面的kvp容易错写成result
            for(var i=0;i<kvp.length;i++){
                var kv=kvp[i].split("=");
                result[kv[0]]=kv[1];
            }
            return result;
        },
        getQuery:function(key){
            //注意：这里必须加上this,如果没有this就会报错，因为getQuery里面的 getQueryObj不是全局函数
            return this.getQueryObj()[key];
        }
    }
})
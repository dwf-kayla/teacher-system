define(["jquery","cookie","form"],function($){
    $(function(){
        
        //1.获取表单，注册表单提交事件
        $('form').submit(function(){
            //校验用户输入是否合法
            if($('input[name=tc_name]').val().trim()==""){ //用户输入空格或者没输入东西
                alert('请输入用户名');
                return false;
            }
            if($('input[name=tc_pass]').val().trim()==""){
                alert('请输入密码');
                return false;
            }
            //第一种写法：
            // var data=$(this).serialize();
            // console.log(data);  
            // $.ajax({  
            //     url:'/api/login',//这里如果直接把接口文档提供的地址（http://api.botue.com/login）拿过来，就会产生跨域问题，因此需要换成http://studyit.com/api/login或者简写成/api/login（第一个/表示从网站根目录开始，如果写成api/login就表示从dashboard开始）
            //     type:'post',
            //     data:data,//在es6里面，当属性名和属性值相同的时候，可以简写成data就可以了。
            //     success:function(data){
            //         if(data.code==200){
            //             $.cookie("userinfo",JSON.stringify(data.result),{path:'/',expires: 365});//JSON.stringify是将JSON对象转成字符串
            //             location.href='/';//一个/就表示跳转到首页，就相当于studyit.com/
            //         }
    
            //     }
            // })
           //第二种写法：
            $(this).ajaxSubmit({
                url:"/api/login",
                type:"post",
                success:function(data){
                    if(data.code==200){
                        $.cookie("userinfo",JSON.stringify(data.result),{path:"/",expires:365});
                        location.href="/";
                    }
                }
            })

            return false;//阻止默认事件，不让表单自己提交，因为我们要发送ajax请求
            //既能阻止冒泡，也能阻止默认事件。还可以用e.preventdefault
        });
    })
})

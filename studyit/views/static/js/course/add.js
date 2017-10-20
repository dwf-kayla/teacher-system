define(["jquery","form"],function($){
    $(function(){
        //给表单注册提交事件
        $('form').submit(function(){
            // alert(1)
            $(this).ajaxSubmit({
                url:'/api/course/create',
                type:'post',
                success:function(data){
                    console.log(data);
                    if(data.code==200){
                         //由于要进入下一个页面对课程基本信息做编辑操作
                        //所以进入下个页面之后，需要知道，要编辑的课程究竟是谁
                        //所以，我们需要将当前创建课程成功之后，后台返回给我们的id
                        //通过url连接，交给下一个基本信息编辑页面
                        location.href="/course/basic?id="+data.result.cs_id;
                    }
 
                }
            })
            return false;//这里千万要注意，一定要加上return false,否则无法正常提交数据。
        })
    })
})
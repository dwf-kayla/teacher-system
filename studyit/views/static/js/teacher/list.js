define(["jquery","template","nprogress","bootstrap"],function($,template,nprogress){
    // $(function(){  
        //使用过滤器
    //语法 {{数据 | 过滤器名称}}

    //最终在页面上使用这个过滤器的时候
    //{{v.tc_birthday | getage}}
    template.defaults.imports.getage=function(value){
        return new Date().getFullYear()-new Date(value).getFullYear();
    };
   
    console.log("4");
    $.ajax({
        url:"/api/teacher",
        success:function(data){
            if(data.code==200){
                console.log(5)
                var html=template("teacher-list-tpl",data);
                $("#teacher-list").html(html);
            }
        }
    })
    //给所有查看按钮注册点击事件（委托）

    $("#teacher-list").on('click','.btn-checkinfo',function(){
        var id=$(this).parent().data('id');
        $.ajax({
            url:"/api/teacher/view",
            data:{tc_id:id},
            success:function(data){
                if(data.code==200){
                    var html=template('teacher-info-tpl',data.result);
                    $('#teacher-info').html(html);
                    $('#teacherModal').modal("show");
                }
            }
        })

    })

    //讲师注销和启用功能的实现：
    
    //讲师账号的状态：
    //已启用： tc_status == 0     按钮： 注销
    //已注销： tc_status == 1     按钮： 启用

    $("#teacher-list").on('click','.btn-status',function(){
        var id=$(this).parent().data('id');
        var status=$(this).data('status');
        var that=this;
        $.ajax({
            url:'/api/teacher/handle',
            type:'post',
            data:{
                tc_id:id,
                tc_status:status
            },
            success:function(data){
                if(data.code==200){
                    var enable=data.result.tc_status==0

                    $(that).text(enable?"注销":"启用")
                           .removeClass(enable?"btn-success":"btn-warning")
                           .addClass(enable?"btn-warning":"btn-success")
                           .data("status",data.result.tc_status)  
                }
            }
        })
    })
    // })
})
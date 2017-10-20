define(['jquery','template'],function($,template){
 //入口函数
 $(function(){
    $.ajax({
        url:'/api/course',
        success:function(data){
            if(data.code==200){
                // console.log(data);
                // console.log(data.result);
                var html=template('course-tpl',data.result);
                $('.courses').html(html);
            }
           
        }
    })
 })
})
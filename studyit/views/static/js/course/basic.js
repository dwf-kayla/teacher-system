define(['jquery','template','utils','ckeditor','form'],function($,template,utils,CKEDITOR){
   $(function(){
       //1、从url中获取用户传入的id
       var id=utils.getQuery('id');
       //2、向后台发送ajax请求，获取当前要编辑的课程的基本信息
       $.ajax({
           url:'/api/course/basic',
           data:{
               cs_id:id
           },
           success:function(data){
               if(data.code==200){
                   console.log(data);
                   var html=template('basic-tpl',data.result);
                   $('.steps').html(html);
                   //插件的加载操作
                   CKEDITOR.replace('cs_brief');

               }
           }
       })
//修改的保存操作，这里不给“保存”按钮注册事件而是给表单注册事件：给大盒子用事件委托
       $('.steps').on('submit','form',function(){
           $(this).ajaxSubmit({
               //更新基本信息的地址
               url:'/api/course/update/basic',
               type:'post',
               data:{
                   cs_id:id
               },
               success:function(data){
                   if(data.code==200){
                       location.href='/course/cover?id='+data.result.cs_id;
                   }
               }
           })
           return false;
       })

   })    
})
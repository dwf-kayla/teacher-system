define(['jquery','template','utils','uploadify','jcrop','form'],function($,template,utils){
   $(function(){
       //上面的utils用来获取url中的id,uploadify用来上传图片
      var id=utils.getQuery('id');
      var jcrop_api=null;//由于jcrop_api里面有destory方法，所以需要设置成全局变量。
      $.ajax({
    // 向后台发送请求，获取当前课程封面数据
      url:'/api/course/picture',
      data:{cs_id:id},
      success:function(data){
        if(data.code==200){
            console.log(data.result);
            var html=template('cover-tpl',data.result);
            $('.steps').html(html);
            //给选择图片按钮，加载uploadify插件
            $("#upload-btn").uploadify({
                swf: "/views/assets/uploadify/uploadify.swf",
                uploader: "/api/uploader/cover",
                fileObjName: "cs_cover_original",
                buttonText: "选择图片",
                buttonClass: "btn btn-success btn-sm",
                itemTemplate: "<p></p>",
                width: 70,
                height: 30,
                formData: {cs_id: id}, //给后台附加的数据
                onUploadSuccess: function(file, data, response){
                    data = JSON.parse(data);
                    if(data.code == 200){
                        // console.log(data);
                        //上传图片成功之后，需要将后台返回的图片的地址
                        //赋值给页面中原图标签
                        $(".preview>img").attr("src", data.result.path);

                        //将裁切按钮设置为启用状态
                        $("#crop-btn").prop("disabled", false);
                          //判断jcrop_api有没有内容，如果有就证明页面上已经有裁切插件在显示了，那么需要将其摧毁，然后显示重新选择的图片
                                //如果没有内容，就什么都不用做
                        jcrop_api&&jcrop_api.destroy();  //这一行如果不加，就会导致在剪切图片的时候，如果我要换另外一张进行编辑了，那么就会导致另外一张图片显示不出来（其实是上传上来了的，就是显示不出来）
                         //由于jcrop自带的destory方法并不能将之前生成的缩略图移除
                         //所以我们手动将其移除
                        $('.jcrop-thumb').remove();
                        //因为重新上传图片之后，按钮得变成裁切功能
                        $('#crop-btn').text('裁剪图片').data('type','crop');
                    }
                }
            });
            //由于uploadify插件生成的按钮默认有一个line-height 是30px
                    //会导致文字显示不正常，所以我们通过jquery直接将其修改为正常的样式1.5
                    $("#upload-btn-button").css("line-height", 1.5)

                    //4.给裁剪插件注册相应事件
                    $('.preview').on('cropstart cropmove cropend',function(e,s,c){
                        $("input[name='x']").val(c.x);
                        $("input[name='y']").val(c.y);
                        $("input[name='w']").val(c.w);
                        $("input[name='h']").val(c.h);
                    })

                    //3.给裁剪按钮注册点击事件
                    $('#crop-btn').click(function(){
                        //我们在按钮中新增一个属性data-type
                        //这个属性表示当前按钮功能
                        var type=$(this).data('type');
                        if(type=='crop'){
                            //使用图片裁剪插件
                            $('.preview>img').Jcrop({
                                setSelect:[0,0,200,200],
                                aspectRatio:2,
                                boxWidth:400
                            },function(){
                                jcrop_api=this;
                                var thumb=jcrop_api.initComponent('Thumbnailer',{width:240,height:120,container:".thumb"})
                            })
                            $(this).text('保存按钮');
                            $(this).data('type','save')
                        }else{
                            //保存功能
                            $('form').ajaxSubmit({
                                url:'/api/course/update/picture',
                                type:'post',
                                data:{cs_id:id},
                                success:function(data){
                                    if(data.code==200){
                                        location.href='/course/lessons?id'+data.result.cs_id;
                                }
                            }
                        })
                    }

                            
                        
                })
        

            }
        }
     })
    })
})
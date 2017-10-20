define(["jquery","template","nprogress","cookie"],function($,template,nprogress){
	//页面一上来就显示进度条
	nprogress.start();
	$(function(){  //jq入口函数
		//当页面文档结构加载完成之后，调用done结束进度条的显示
		nprogress.done();
		//如果不是在登录页面，才需要从cookie中获取用户数据然后展示在页面
		if(location.pathname != "/dashboard/login"){ 
			//上面其实也可以写成http://studyit.com/dashboard/login，
			//但是如果后期域名发生变化的话，就会受到影响。所以用pathname合适。
				//不是登录页面的地址（因为登录页面没有侧边栏，不需要模板渲染。
				//如果不加这个判断的话，登录页面会报错：模板错误）
			//从cookie中获取userinfo的信息

			if(!$.cookie('PHPSESSID')){
				location.href="/dashboard/login"
				//href是用来跳转的，这里和上面的if判断条件里面那里不一样，
				//这里会自动拼接上我们当前页面的域名，所以不会受到域名变化的影响。
			}
			var userinfo = $.cookie("userinfo");
			console.log(userinfo);
			userinfo = JSON.parse(userinfo);
			console.log(userinfo);
	
			//使用模板引擎将获取到的信息展示到侧边栏
			var html = template("profile-tpl", userinfo);
			$("#user-info").html(html);
		}

		//给退出登录按钮注册点击事件：
		$('#btn-logout').click(function(){
			$.ajax({
				url:'/api/logout',
				type:'post',
				success:function(data){
					if(data.code==200){
						//跳转到登录页面
						location.href="/dashboard/login"
					}
				}
			})

		})


		//给导航栏菜单注册事件，实现点击父菜单展示子菜单(这里是让有子菜单的父元素才执行这部操作)
		$('.navs>ul>li>ul').parent().click(function(){
			$(this).children('ul').slideToggle();
		})

		//让当前页面对应的导航栏中的a标签加上active类样式
		var activeA=$(".navs a[href='"+location.pathname+"']")
		activeA.addClass("active");
		
	//因为只有是子菜单的ul才会有一个兄弟元素a
	//就判断当前a标签所在的菜单是否有兄弟元素a
	//如果有，就证明当前a标签是在一个子菜单中
	//那么直接让子菜单显示即可
	//这一步为了当点击下拉菜单里面的两个a标签时，页面跳转后让子菜单显示出来，而不是页面一上来就是display:none的状态！
		if(activeA.parent().parent().siblings("a").length>0){
			activeA.parent().parent().show();
		}
		
//注册ajax全局事件，在全局事件中开启和结束进度条
		console.log("1");
		
	$(document).ajaxStart(function(){			
		console.log("2")
		nprogress.start();
		$("#mask").show();				
	}).ajaxStop(function(){
		console.log("3")
		nprogress.done();
		$("#mask").hide();
	})

	
	})
	
		
})

(function($) {
	$.extend({       
		urlGet: function() {
			var aQuery = window.location.href.split("?");  //取得Get参数
			var aGET = new Array();
			if(aQuery.length > 1)
			{
				var aBuf = aQuery[1].split("&");
				for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
				{
					var aTmp = aBuf[i].split("=");  //分离key与Value
					aGET[aTmp[0]] = aTmp[1];
				}
			}
			return aGET;
		}
	});
})(jQuery);

var AVATAR_PREFIX_URL = "//atts.w3cschool.cn/attachments/avatar2/";
var GET = $.urlGet();

var myQR;
var _hmt = _hmt || [];
var isStudyTimeLock = 0;
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?a3c0d937c858fbe264753596e485cd38";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

// 百度自动推送代码
(function(){
	if (location.href != "http://www.w3cschool.cn/" || location.href != "https://www.w3cschool.cn/") {
	    var bp = document.createElement('script');
	    var curProtocol = window.location.protocol.split(':')[0];
	    if (curProtocol === 'https') {
	        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
	    }
	    else {
	        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	    }
	    var s = document.getElementsByTagName("script")[0];
	    s.parentNode.insertBefore(bp, s);
	}
	commonStudyTime();
})();

/**监听用户离开时间，切换学习时长锁定状态**/
window.onbeforeunload=function(e){

	if(isStudyTimeLock == 1){
		localStorage.setItem("studyTimeLock", 0);
		isStudyTimeLock = 0;
	}
}

/**用户学习时长计算**/
function commonStudyTime(){

	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();

    var studyTimeLock  = localStorage.getItem("studyTimeLock");
    var studyTimeCount = localStorage.getItem("studyTimeCount_"+year+month+day);

    if(!studyTimeLock || studyTimeLock == 0){
        studyTimeCount++;
        isStudyTimeLock = 1;
        localStorage.setItem("studyTimeCount_"+year+month+day, studyTimeCount);
        localStorage.setItem("studyTimeLock", 1);
    }else{
    	if(isStudyTimeLock == 1){
			studyTimeCount++;
	        isStudyTimeLock = 1;
	        localStorage.setItem("studyTimeCount_"+year+month+day, studyTimeCount);
	        localStorage.setItem("studyTimeLock", 1);
    	}
    }

    setTimeout(function(){commonStudyTime()},1000);
}

/**添加到收藏**/
function addFavoriteTool() {
    var url = window.location || '//www.w3cschool.cn';
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
		try{
		window.external.addFavorite(url, title);
		}catch(e){
		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		}
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
  		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}

// 加载Web弹窗广告
function loadvip(){
	$.ajaxdo({
		type : "post",
		url  : "/index/indexPopup",
		dataType : "json", 
		success : function (res) {
			tpl  = '<div class="vip-area"><div class="vip-bg"></div><div class="vip-main"><span class="close-btn"></span><a href="/vip?fcode=popup" target="_blank">'+res.data+'</a></div></div>';
			$("body").append(tpl);
			$(".vip-main .close-btn").on("click",function(){
				$(".vip-area").hide();
			});
		}
	})	
}

// Web右侧悬浮标广告
function rightFloatAdvert(){
	$.ajaxdo({
		type : "post",
		url  : "/index/rightFloatAdvert",
		dataType : "json", 
		success : function (res) {
			if(res.statusCode == 200){
				var rftpl  = res.data+'<div class="close-rfbox"><i class="i-icon i-icon-close i-icon-close-thin"></i></div>';
				$("#rfbanner").html(rftpl);
				$("#rfbanner").show();
			}
			$(".close-rfbox").on("click",function(){
				$('#rfbanner').hide();
				$.ajaxdo({
					type : "post",
					url  : "/index/closeRightFloatAdvert",
					dataType : "json"
				})
			});
		}
	})
}

var logintype = false;
var getncbytar;

var checkHeader = function () {
	// var datatype = $.cookie('the_cookie');	// 应该是没用的

	var html = '';
	var headerType = $(".quick-login").length > 0 ? 1 : 0;
	var webdomain = typeof domain === "undefined" ? "//www.w3cschool.cn" : domain;

	$.ajaxdo({
		type : "POST",
		url  : "/index/checkHeader",
		dataType : "json", 
		data : { headerType: headerType },
		success : function (res) {
			var info = res.data;

			if (typeof info.uid !== "undefined") logintype = true;
			if (typeof apppath !== "undefined") {
				var thisUrl = window.location.href;
				if (isMobile() || thisUrl.indexOf("w3cschool.cn/learn") != -1) {
					//移动端访问
					if(res.statusCode == '200' && typeof info.username != 'undefined'){
						html += '<div class="header-navbar header-navbar-entry">'
								+'<div class="header-btn">'
								+'<a href="https://m.w3cschool.cn/appDownload" class="btn-download">下载APP</a>'
								+'</div>'
								+'<a href="/my" class="header-avator">'
								+'<img src="';
								if(!info.avatar){
									html += '//7n.w3cschool.cn/statics/images/avatar_0.jpg';
								}else{
									html += '//atts.w3cschool.cn/attachments/avatar2/'+info.avatar;
								}
								html += '" alt="'+info.nickname+'" />'
								+'</a>'
								if(info.viptype == 1){
									html += '<a href="'+webdomain+'/vip?fcode=headeruser" class="vip-sicon vip-sicon1"></a>'; 
								}else if(info.viptype == 2){
									html += '<a href="'+webdomain+'/vip?fcode=headeruser" class="vip-sicon vip-sicon2"></a>'; 
								}else{
									html += '<a href="'+webdomain+'/vip?fcode=headeruser" class="vip-sicon vip-sicon0"></a>';
								}
								html +='</div>';
					}else{
					var bindkey = GET['bindkey'];
					var bindkey_param = bindkey ? "&bindkey=" + bindkey : "";
						html += '<div class="header-navbar">'
							+'<div class="header-btn">'
								+'<a href="https://m.w3cschool.cn/appDownload" class="btn-download">下载APP</a>'
								+'<span class="spacing">|</span>'
								+'<a href="/login?refer='+ window.encodeURIComponent(window.location.pathname + window.location.search + bindkey_param) +'" class="btn-login">登录</a>'
							+'</div>'
						+'</div>';
					}
					$('.header-mobile').append(html);
				} else {
					//PC端访问
					var sigBoxTpl;	// 头部右侧用户信息栏：未登录显示 注册|登录
					if (res.statusCode == "200" && typeof info.username !== "undefined") {
						if(info.viptype>0){
							$('.abox-item').hide();
						}

						if(info.viplevel < 1 && info.vipad == 1 ){
							loadvip();
						}

						// 登陆后显示个人信息
						var avatarURL = AVATAR_PREFIX_URL + info.avatar;
						var vipIconSrc = "//7n.w3cschool.cn/statics/images/w3c/vip-sicon" + info.viptype + ".png";
						var vipInfoTitle = info.viptype > 0 ? "VIP会员" : "成为VIP";
						$(".sig-box").length > 0 && $(".sig-box").each(function () {

							var mynotice = '<a class="fl link notice" href="' + webdomain + '/my#inbox" title="我的消息">' +
										'<i class="i-icon i-icon-notice-outline i-icon-notice-o"></i><span class="badge' + (info.num > 0 ? ' danger' : '') + '">' + info.num + '</span>' +
									'</a>' +
									'<span class="fl sep">|</span>';

							if(typeof pageHeader != 'undefined' && pageHeader.hideNotice){
								mynotice = '';
							}

							sigBoxTpl = '' +
								'<div class="clearfix site-userInfo">' +

									mynotice +

									'<div class="fl user">' +
										'<a class="fl link user-avatar" href="' + webdomain + '/my" title="个人中心">' +
											'<img class="img" src="' + avatarURL + '" alt="' + info.nickname + '" width="30" height="30">' +
										'</a>' +
										'<a class="fl link user-vip" href="' + webdomain + '/vip?fcode=headeruser">' +
											'<img src="' + vipIconSrc + '" alt="' + vipInfoTitle + '" width="24" height="24" title="' + vipInfoTitle + '">' +
										'</a>' +
										'<a class="fl link user-drop" href="javascript:;">' +
											'<i class="i-icon i-icon-down i-icon-arrow-down"></i>' +
										'</a>' +
										'<div class="text-center dropdown">' +
											'<div class="dropdown-inner">' +
												'<ul class="dropdown-content">' +
													'<li><a class="link" href="' + webdomain + '/my"><i class="i-icon i-icon-my i-icon-user"></i>个人中心</a></li>' +
													//'<li><a class="link" href="' + webdomain + '/job/mycv"><i class="i-icon i-icon-resume"></i>我的简历</a></li>' +
													'<li><a class="link" href="' + webdomain + '/my#setting"><i class="i-icon i-icon-setting"></i>个人设置</a></li>' +
													'<li><a class="link" href="' + webdomain + '/logout?refer=' + apppath + '"><i class="i-icon i-icon-logout"></i>退出登录</a></li>' +
												'</ul>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</div>';
							$(this).html(sigBoxTpl);
						});
					} else {
						var _widgetCookie = localStorage.getItem('widget_box_cookie');
						var timestamp = Date.parse(new Date());
						
						sigBoxTpl = '<div><a class="link" href="' + webdomain + '/register?refer=' + apppath + '">注册</a><span class="sep">|</span><a class="link" href="' + webdomain + '/login?refer=' + apppath+ '">登录</a></div>';
						$('.sig-box').html(sigBoxTpl);
						
						if((timestamp-_widgetCookie) >= 86400000){
							var dict = $('.widget-body').html();
							if(typeof dict != 'undefined'){
								// var type = $('.widget-body').attr('data-type');

								var widget = '' +
									'<div class="widget-main" style="display: none;">' +
										'<div class="widget-box">' +
											'<div class="slogn">' +
												'<a href="/register">免费注册w3cschool，收藏您感兴趣的教程手册！</a>' +
											'</div>' +
											'<div class="quicklogin quick-box">' +
												'<a href="/register?refer=' + apppath + '" class="reg-btn">注册w3cschool</a>' +
												'<span>或直接</span>' +
												'<a href="/auth" class="qq-btn"><i class="pop-sns icons-qq-widget"></i>QQ登录</a>' +
												'<a href="javascript:;" onclick="wechatqr();" class="weixina"><i class="pop-sns icons-weixin-widget"></i>微信登录</a>' +
												'<a href="/auth?platform=weibo" class="weibo-btn"><i class="pop-sns icons-weibo-widget"></i>微博登录</a>' +
											'</div>' +
											'<div class="sig-group">' + 
												'<a href="/login?refer=' + apppath + '">已有账号，登录</a>' + 
											'</div>' +
										'</div>' +
										'<a class="widget-box-close" href="javascript:;" title="关闭">X</a>' +
									'</div>';
								
								$('.widget-body').html(widget);

								// 首页的商业化底部弹窗：
								// 	widget = '<div class="widget-main widget-main-banner" data-type="index" style="display: none;"><a href="/register?refer='+apppath+'" class="widget-main-img" title="新人专享优惠券"></a><a class="widget-box-close" href="javascript:;" title="关闭">X</a></div>';
							}
						}
					}
				}
			}

			// 会员显示个人信息、非会员显示会员特权
			if(headerType == 1){
				if (!$(".quick-login-not").length) return;
				if (res.statusCode == "200" && typeof info.username != "undefined") {
					if (+info.viptype > 0) {
						html = '';

						html += '<div class="personino-item"><div class="personino-box"><div class="user-box">'
								+'<img src="//atts.w3cschool.cn/attachments/avatar2/'+info.avatar+'" alt="'+info.nickname+'" class="avatar-img" />'
								+'<div class="user-info"><a href="/my" target="_blank" class="nickname">'+info.nickname+'</a>';

						if(info.viptype == 1){
							html += '<a href="/vip?fcode=indexuser" class="vip-sicon vip-sicon1" title="您是VIP用户"></a>';
						}else if(info.viptype == 2){
							html += '<a href="/vip?fcode=indexuser" class="vip-sicon vip-sicon2" title="您是高级VIP用户"></a>';
						}

						html += '<span>学号：'+info.uid+'</span></div></div><div class="user-desc"><span>等级：LV'+info.level+'</span>'
								+'<span>经验值：'+info.exp+'</span></div></div><div class="quicklogin quick-box">'
								+'<a href="/my" class="text-center btn my-btn"><i class="i-icon i-icon-ios-contact"></i>个人中心</a>';
								
						// if(info.viptype == 0){        
						// 	html += '<a href="/vip?fcode=index_user_box" style="background-image: linear-gradient(to right, #e6dab8, #d9bc82);">立即获取VIP</a>';
						// }
						
						html += '</div><div class="record-box"><h3>最近学习：</h3><ul>';
						var projectinfo = info.projectinfo;
						// before：i < projectinfo.length
						for (var i = 0; i < projectinfo.length; i++) {
							html += '<li><a href="/'+projectinfo[i]['ename']+'/" title="'+projectinfo[i]['bookname']+'"><img style="border-radius:50%;border:1px solid #fff;width:32px;height:32px; " src="//atts.w3cschool.cn/attachments/cover/'+projectinfo[i]['cover']+'?imageView2/1/w/32/h/32" /> &nbsp;'+projectinfo[i]['bookname']+'</a></li>';
						}
						html += '</ul></div>';

						// if(info.viptype > 0){ 
							html += '<a href="/vip?fcode=indexquick" target="_blank" class="vipclub-btn" >会员中心 »</a>';
						// }

						html += '</div>';
						$(".quick-login-not").remove();
						$('.quick-login').prepend(html);
					} else {
						var vipBtnTpl = info.viptype > 0 ? "<a href='/vip?fcode=indexquick' class='text-center btn vip-btn' target='_blank'>会员中心</a>" : "<a href='/vip?fcode=index_user_box' class='text-center btn vip-btn' target='_blank'>立即开通VIP</a>";

						var vipTpl = "" +
							"<div class='vip-cell'>" +
								"<h4 class='text-center vip-cell-title'><i class='i-icon i-icon-vip'></i>VIP尊享8大特权</h4>" +
								"<ul class='vip-cell-right'>" +
									"<li class='clearfix'>" +
										"<a href='/vip?fcode=indexquick_minic' class='fl link' target='_blank' title='畅享3000+元会员好课'><i class='priv-icon2 priv-icon2-minic'></i>会员好课</a>" +
										"<a href='/vip?fcode=indexquick_exam' class='fr link' target='_blank' title='500+专享免费题库'><i class='priv-icon2 priv-icon2-exam'></i>专享题库</a>" +
									"</li>" +
									"<li class='clearfix'>" +
										"<a href='/vip?fcode=indexquick_tool' class='fl link' target='_blank' title='20+编程工具免费使用'><i class='priv-icon2 priv-icon2-tool'></i>免费工具</a>" +
										"<a href='/vip?fcode=indexquick_vouth' class='fr link' target='_blank' title='价值100元课程礼券'><i class='priv-icon2 priv-icon2-vouth'></i>代金礼券</a>" +
									"</li>" +
									"<li class='clearfix'>" +
										"<a href='/vip?fcode=indexquick_download' class='fl link' target='_blank' title='本地教程缓存100本'><i class='priv-icon2 priv-icon2-download'></i>教程下载</a>" +
										"<a href='/vip?fcode=indexquick_viptag' class='fr link' target='_blank' title='会员专属身份标识'><i class='priv-icon2 priv-icon2-viptag'></i>会员标识</a>" +
									"</li>" +
									"<li class='clearfix'>" +
										"<a href='/vip?fcode=indexquick_cert' class='fl link' target='_blank' title='微课和实战课程证书'><i class='priv-icon2 priv-icon2-cert'></i>学习证书</a>" +
										"<a href='/vip?fcode=indexquick_integral' class='fr link' target='_blank' title='累计课程积分奖励'><i class='priv-icon2 priv-icon2-integral'></i>积分奖励</a>" +
									"</li>" +
								"</ul>" +
								"<div class='vip-cell-btns'>" +
									vipBtnTpl +
									"<a href='/my' class='text-center btn my-btn'><i class='i-icon i-icon-ios-contact'></i>个人中心</a>" +
								"</div>" +
							"</div>";
						
						$(".quick-login-not").remove();
						$('.quick-login').prepend(vipTpl);
					}
				} else {
					if(info == true){
						isscode = info;
						$(".quick-login-not .login-sns").hide();
						$("#scode-form-item").show();
					}else{
						$("#scode-form-item").hide();
					}
				}
			}

			//有生成apikey,存储在本地
			var storage = window.localStorage;
			if(res.statusCode == 200){
				if(res.data.apikey.length != 0){
					storage.apikey  = res.data.apikey;
					storage.apiauth = res.data.apiauth;
				}
			}else{
				storage.removeItem("apikey");
				storage.removeItem("apiauth");
			}
		}
	});
}

$(function () {
	var $toolBar = $("#toolbar");

	if (!isMobile()) $toolBar.show();

	// 返回顶部
	var $backTop = $toolBar.find(".backtop");
	var backTop_visibilityHeight = $backTop.eq(0).data("visibility");	// 滚动高度达到此值才出现 BackTop
	$(window).scroll(function () {
		if ($(this).scrollTop() > backTop_visibilityHeight) {
			$toolBar.css("bottom", 32);
			$backTop.show();
		} else {
			$toolBar.css("bottom", 100);
			$backTop.hide();
		}
	})
	$backTop.click(function () { $("html").animate({scrollTop : 0}) });

	// 在线笔记
	$toolBar.find(".onlinenote").on('click',function(e){
		if(logintype){
			showNoteDialog();
		}else{
			toastr.warning("请先登录!");
		}
	});

	checkHeader();
	if( $('#rfbanner').length > 0 ){
		rightFloatAdvert();
	}

	// 发布文章
	$(".create-btn").on('click',function(e){
		if(logintype){// 已经登录
			showNavDialog(true);
		}else{
			showNavDialog(false);
			//window.location = '/login';
		}
	});

	getncbytar = function(){
		var tarkename = kn.kename;
		var tarpename = kn.pename;
		var initcontent = '';
		$.ajax({
			url:"/my/note/getncbytar",
			type:"post",
			data:{tarkename:tarkename,tarpename:tarpename},
			dataType:"json",
			success:function(msg){

				if(msg.statusCode < 300){
					var ncinfo = msg.data.nc_info;
					$("#fbw3cDtitle").show();
					$("#w3cDtitle").show();
					$(".ntitle").val(ncinfo.ntitle);
					initcontent = ncinfo.ncontent;
					if(typeof kn != 'undefined' && typeof kn.codenote != 'undefined' && kn.codenote != ''){

						initcontent += '\n```\n'+kn.codenote+'\n```';
						kn.codenote = '';
					}

					mdeditor.setMarkdown(initcontent);
					

				}else{
					if(msg.statusCode != 405){ // 405 表示没有找到笔记不显示	
						toastr.warning(msg.message);
					}else{
					    
					    $("#fbw3cDtitle").show();
						$("#w3cDtitle").show();
					    $(".ntitle").val($(".content-top h1").text());
                        if(mdeditor != null){
                        	if(typeof kn != 'undefined' && typeof kn.codenote != 'undefined' && kn.codenote != ''){
								initcontent = '\n```\n'+kn.codenote+'\n```';
								kn.codenote = '';
							}
                            mdeditor.setMarkdown(initcontent);
                        }
					    
					    
					}
				}
			}
		});

	}

	//显示笔记模态框
	function showNoteDialog(){
		
		if(typeof editormd == 'undefined'){
			var link1=document.createElement("link");  
			link1.type="text/css";
			link1.rel="stylesheet"; 
			link1.href="/plugins/markdown/editormd.css";  
			document.getElementsByTagName('head')[0].appendChild(link1);

			$.getScript('/statics/js/w3cdialog.js',function(){
				loadmdjs();
			});
			
		}else{
			
			if($("#w3cDtitle").is(":hidden")){
				$("#fbw3cDtitle").show();
				$("#w3cDtitle").show();
				getncbytar(); //重新获取笔记
			}else{
				$("#fbw3cDtitle").hide();
		        $("#w3cDtitle").hide();
			}
			
		}
		 
	}

	//显示引导模态框
	function showNavDialog(loginflag){
		
		if($("#dialogProxy").length == 0){
			var link1=document.createElement("link");  
			link1.type="text/css";
			link1.rel="stylesheet"; 
			link1.href="/statics/css/dialog.css";  
			document.getElementsByTagName('head')[0].appendChild(link1);
			link1.onload = function(){
				$.get("/statics/plugins/template/index_dialog.html",function(info){
					$("body").append(info);
					if(typeof AjaxDo == 'undefined'){
						$.getScript('/statics/core/ajaxdo.core.js',function(){
							if(loginflag){
								getDialogScript();
							}else{
								$.getScript('/statics/core/dialog.core.js',function(){
									$("#loadNav").after('<a id="unLoginDialog" style="display: none;"  href="/index/offlineCreateDialog" target="dialog"  rel="quick-add" mask="true" height="430" width="720" class="btn btn-default"><i class="icon-plus"></i> 发布</a>');
									AjaxDo.initUI();
									$("#unLoginDialog").trigger("click");
								});
							}
							
						});
					}else{
						if(loginflag){
							getDialogScript();
						}else{ // 未登录
							$.getScript('/statics/core/dialog.core.js',function(){
								$("#loadNav").after('<a id="unLoginDialog" style="display: none;"  href="/index/offlineCreateDialog" target="dialog"  rel="quick-add" mask="true" height="430" width="720" class="btn btn-default"><i class="icon-plus"></i> 发布</a>');
								AjaxDo.initUI();
								$("#unLoginDialog").trigger("click");
							});
							
						}
					}
					
				});
			};

		}else{ // 不需要加载了
			if(loginflag){
				AjaxDo.initUI();
				loadNav();
			}else{ // 未登录
				if($("#unLoginDialog").length == 0){
					$("#loadNav").after('<a id="unLoginDialog" style="display: none;"  href="/index/offlineCreateDialog" target="dialog"  rel="quick-add" mask="true" height="430" width="720" class="btn btn-default"><i class="icon-plus"></i> 发布</a>');
				}

				AjaxDo.initUI();
				$("#unLoginDialog").trigger("click");
			}			
			//console.log("不需要加载了!!");
		}
	}

	function getDialogScript(){
		$.getScript('/statics/core/dialog.core.js',function(){
			//AjaxDo.initEnv(); 
			AjaxDo.initUI();
			loadNav();
		});
	}

	var mdeditor = null;
	// 加载markdown 编辑器的js
	function loadmdjs(){
		$.getScript("/plugins/markdown/editormd.js",function(msg){
				var prentitle = $("title").text().replace('_w3cschool','');
				$(".ntitle").val(prentitle);
				mdeditor = editormd("editorarea", {
			        mode:"markdown",
			        width   : "100%",
			        height  : 300,
			        syncScrolling : "single",
			        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
			        watch : false,                // 关闭实时预览:true,
			        path    : "/plugins/markdown/lib/",
			        toolbarIcons : function() {
			            return editormd.toolbarModes['mini']; // full, simple, mini
			            
			        },
			        onload : function() {
			        	getncbytar(); // 获取笔记
			        }
		    });
			});
	}

	// 加载引导
	function loadNav(){
		$("#loadNav").trigger("click");
	}

	// 关闭笔记
	$(document).on('click',".closenote",function(){
		$("#fbw3cDtitle").hide();
		$("#w3cDtitle").hide();
	});

	// 保存笔记
	$(document).on('click',".notesubmit",function(){
		var tarkename = kn.kename;
		var tarpename = kn.pename;
		var ktitle = $('.ntitle').val();
		var kcontent = $('.ncontent').val();
		var isOpenNote = $('input[name="isOpenNote"]:checked').val();
		$.ajax({
			url:"/my/note/savenote",
			type:"post",
			data:{
				ntitle:ktitle,
				ncontent:kcontent,
				tarkename:tarkename,
				tarpename:tarpename,
				isOpenNote:isOpenNote,
				cfrom:'frontnote',
				editflag:'mdeditor',
				ktype:'kn'
			},
			dataType:"json",
			success:function(msg){
				if(msg.statusCode < 300){
					if(isOpenNote == 1){
					    toastr.success("保存成功,审核通过后,将公布在该文章底部");
					}else{
						toastr.success("保存成功!");
					}
					
				}else{
					toastr.warning(msg.message);
				}
			}
		});
	});
});

if(typeof jQuery.cookie == 'undefined'){
	$.cookie = jQuery.cookie = function(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};
}

(function() {
	// 判断是否登录
	var ypre_uid = $.cookie('ypre_uid');
	if(ypre_uid != null){
		$.getScript("/statics/js/w3ctj.js", function(){
			logTjData();
		});
	}
})();


var tnid = GET['tnid']; //取得id的值
if(typeof tnid != 'undefined') {
	$.cookie('ypre_tnid',tnid, {'path':'/', 'domain': 'w3cschool.cn'});

}
var tnvip = GET['tnvip']; // 获取vip来源
if(typeof tnvip != 'undefined') {
	$.cookie('ypre_tnvip',tnvip, {'path':'/', 'domain': 'w3cschool.cn'});
}
var channel = GET['channel']; // 获取渠道来源
if(typeof channel != 'undefined') {
	$.cookie('ypre_channel',channel, {'path':'/', 'domain': 'w3cschool.cn'});
}
var fcode = GET['fcode']; // 获取渠道来源
if(typeof fcode != 'undefined') {
	$.cookie('ypre_fcode',fcode, {'path':'/', 'domain': 'w3cschool.cn'});
}
var tn = GET['tn']; // 获取vip来源
if(typeof tn != 'undefined') {
	$.cookie('ypre_tn',tn, {'path':'/', 'domain': 'w3cschool.cn'});
	localStorage.setItem('tn', tn);
}
var recmd = GET['recmd']; // 获取vip来源
if(typeof recmd != 'undefined') {
	$.cookie('ypre_recmd',recmd, {'path':'/', 'domain': 'w3cschool.cn'});
	localStorage.setItem('recmd', recmd);
}



// 防CSRF攻击
(function($){
	$.extend({
		ajaxdo:function(param){
			if(typeof param.type != 'undefined' && param.type.toLowerCase() == 'post'){
				if(typeof param.data == "undefined"){
					param.data = {};
				}
				param.data['_hash'] = $.cookie("ypre_saltkey");
			}else{
				param.url = param.url + (/\?/.test(param.url) ? "&" : "?")+ "_hash=" + $.cookie("ypre_saltkey");
			}
			$.ajax(param);
		}
	});
})(jQuery);

function stopFunc(e){
    e.stopPropagation?e.stopPropagation():e.cancelBubble = true;       
}

function checkUserType(){
	$.ajaxdo({
		type : "POST",
		url  : "/index/checkUserType",
		dataType : "json", 
		data : {},
		success : function(data) {
			var arr = eval(data);

			if(arr.statusCode == '200'){
				var info = arr.data;
				if(data.statusCode == '200' && typeof info.username != 'undefined'){
					$("#register-Box").attr('style','display:black;');
					$(".register-cover").attr('src','/attachments/avatar2/'+info.avatar);
					$(".register-userinfo-title span").html(info.nickname+' (学号：'+info.uid+')');
				}
			}
		}
	});
}
$(window).on("scroll",function(e){
 	var height = $('.item-content').height();
 	var now = $(document).scrollTop();
 	var type = $('.widget-body').attr('data-type');
 	if(type == 'index'){
	 	if(now > height){
			$('.widget-main').slideDown();
 		}
 	}else{
		$('.widget-main').slideDown();
 	}
});
$('.widget-body').on('click','.widget-box-close',function(){
	
	var timestamp = Date.parse(new Date());
	localStorage.setItem('widget_box_cookie',timestamp);

	$('.widget-main').remove();
});


//显示举报模态框
function showDialogBox (obj){

	var tid    = $(obj).attr("data-tid");
	var module = $(obj).attr("data-module");
	$(".feedback-Box").attr("data-tid",tid);
	$(".feedback-Box").attr("data-module",module);
	$("body").attr("style","overflow:hidden;");
	$(".feedback-Box").attr("style","display:block;");

	var checkScript = $("[src$='html2markdown.js']").attr('src');
	if(typeof checkScript == "undefined"){

		var script1=document.createElement("script");  
		script1.type="text/javascript";  
		script1.src="https://7n.w3cschool.cn/plugins/xheditor/xheditor-1.2.2.min.js";  
		document.getElementsByTagName('head')[0].appendChild(script1);  

		var script2=document.createElement("script");  
		script2.type="text/javascript";  
		script2.src="https://7n.w3cschool.cn/plugins/xheditor/xheditor_plugins/marked.min.js";  
		document.getElementsByTagName('head')[0].appendChild(script2);  

		var script3=document.createElement("script");  
		script3.type="text/javascript";  
		script3.src="https://7n.w3cschool.cn/plugins/xheditor/xheditor_plugins/html2markdown.js";  
		document.getElementsByTagName('head')[0].appendChild(script3);  

		var script4=document.createElement("script");  
		script4.type="text/javascript";  
		script4.src="/statics/js/feedbackMarkdown.js";  
		document.getElementsByTagName('head')[0].appendChild(script4); 

	}
}
//关闭意见模态框
function closeDialogBox (obj){

	$(".feedback-text").attr("value","");
	$("body").attr("style","");
	$(".feedback-Box").attr("style","display:none;");
	$(".register-Box").attr("style","display:none;");
	$('.feedback-box input:radio:checked').removeAttr('checked');
	$('.register-box input:radio:checked').removeAttr('checked');
}

function dialogSubmit (obj){

	var ftid = $(".comment_replys_show_box").attr("data-tid");
	var fpid = $(".comment_replys_show_box").attr("data-pid");
	var ftype = $(".comment_replys_show_box").attr("data-type");
	var fusername = $(".comment_replys_show_box").attr("data-username");
	var tid     = $(".feedback-Box").attr("data-tid");
	var module  = $(".feedback-Box").attr("data-module");
 	var url     = window.location.href;
 	var content = $(".feedback-text").val();
 	var contact = $("#reportAddress").val();
 	var type    = $('#feedbackRadio').attr("data-value");
 	var fbtype  = $('#selecttype').val();
	if( content.length == 0 || content == 'codecamp:' || content == '<p>codecamp:</p>'){
		alert("反馈内容不能为空");
		return;
	}

 	$.ajaxdo({
		type:"post",
	    url:"/comment/feedback",
	    async: false,
	    data: {tid:tid,kename:ftid,pename:fpid,module:module,url:url,content:content,type:type,contact:contact,fbtype:fbtype},
	    success:function(data){
	    	var arr = eval("("+data+")");
	    	alert(arr['message']);
    		$(".feedback-text").attr("value","");
    		$("body").attr("style","");
    		$(".feedback-Box").attr("style","display:none;");
    		$('.feedback-box input:radio:checked').removeAttr('checked');
	    }
	});
}

function wechatqr(){
	var qrcode = sessionStorage.getItem('scanpullcode');
	if(qrcode == null){
		qrcode = Math.floor((Math.random()*4294967295)+1);
		sessionStorage.setItem('scanpullcode',qrcode);
	}

	$.ajaxdo({
        url: "/auth?platform=weixin",
        type: "post",
        dataType: 'json',
        data: {"sign":qrcode},
        success: function (data) {
            if(data.statusCode == 200){
				showWXLogin(data.data);
                myQR = setInterval(function(){ scanpullRequest() }, 3000);
            }
        }
    });
}

function showWXLogin (ticket) {
	var loginModalTpl = '' +
		'<div id="wxlogin">' +
			'<div class="modal-mask"></div>' +
			'<div class="modal-wrap">' +
				'<div class="modal">' +
					'<div class="modal-close"><i class="i-icon i-icon-close"></i></div>' +
					'<div class="modal-header">微信登录</div>' +
					'<div class="modal-body">' +
						'<div class="wxlogin-qrcode">' +
							'<div class="qrcode">' +
								'<img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + ticket + '" alt="微信登录二维码" width="100%">' +
							'</div>' +
							'<div class="info">' +
								'<p><i class="icon-weixin"></i>微信扫码</p>' +
								'<p>扫码关注公众号登录注册</p>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="modal-footer">' +
						'<button class="modal-btn modal-btn-primary">取消</button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	
	$("body").append(loginModalTpl);

	// 绑定事件
	$("#wxlogin .modal-close, #wxlogin .modal-btn-primary").on("click", closeWXLogin);
	$("body").css("overflow", "hidden");
}

function closeWXLogin(){
	clearInterval(myQR);
	sessionStorage.removeItem('scanpullcode');
	$("#wxlogin").detach();
	$("body").css("overflow", "auto");
}

function scanpullRequest(){
	var code = sessionStorage.getItem('scanpullcode');
	if(code !== null){
		$.ajaxdo({
	        url: "/auth/scanpull",
	        type: "post",
	        dataType: 'json',
	        data: {sign:code},
	        success: function (data) {
	            if(data.statusCode == 200){
	            	sessionStorage.removeItem('scanpullcode');
	            	if(data.message == "bind"){
	            		window.location.href = "/auth/mplogin?sign="+code;
	            	}else{
						var bindWXTpl = '' +
							'<div class="wxlogin-unbind">' +
								'<form action="/auth/checklogin?sign=' + code + '" method="post">' +
									'<div class="form-item">' +
										'<div class="input-wrapper">' +
											'<input type="text" name="username" placeholder="学号/手机/邮箱" autofocus="autofocus" autocomplete="off" class="input input-width-prefix">' +
											'<span class="input-prefix"><i class="i-icon i-icon-my i-icon-user"></i></span>' +
										'</div>' +
									'</div>' +
									'<div class="form-item">' +
										'<div class="input-wrapper">' +
											'<input type="text" name="password" placeholder="登录密码" autocomplete="off" class="input input-width-prefix">' +
											'<span class="input-prefix"><i class="i-icon i-icon-locked"></i></span>' +
										'</div>' +
									'</div>' +
									'<div class="form-item">' +
										'<button type="submit" class="btn">确认绑定</button>' +
									'</div>' +
								'</form>' +
								'<a class="text-center wxlogin-unbind-regist" href="/auth/quickreg?sign=' + code + '">快捷注册</a>' +
							'</div>';
						
						$("#wxlogin .modal-header").text("绑定已有账号");
						$("#wxlogin .modal-body").html(bindWXTpl);
	            	}
	            }
	        }
	    });
	}
}

$(function(){
	$('.search-set input').attr('value',1);
});
$('.search-sort-item').on('click',function(){
	var view = $(".search-sort-list").attr('view');
	if(view == 'hide'){
		$(".search-sort-list").show();
		$(".search-sort-list").attr('view','show');
	}else{
		$(".search-sort-list").attr('view','hide');
		$(".search-sort-list").hide();
	}
	
});
$('.search-sort-item ul li').on('click',function(){
	var type = $(this).attr('type');
	var text = $(this).html();
	$('.search-sort-item ul li').show();
	$(this).hide();
	$('.search-set input').attr('value',type);
	$('.search-set span').html(text);
});
 function getNotelist(){
	 $.ajax({
		url:"/index/getNotelist",
		type:"post",
		data:{
			pename:book.pename,
			kename:kn.kename,
		},
		dataType:"json",
		success:function(msg){
		 var ob = eval(msg.data.notelist);
		 if(ob.length>0){
		 	  $('#notelist_content').show();
		      $('.notelist-box').show();
		 	  var str='<ul>';
		 	  var kmids='0';
              for(var o in ob){  
                str+='<li class="notelist-item"><div class="notelist-author"><a ><img src="https://7n.w3cschool.cn/attachments/avatar2/avatar_'+ob[o].uid+'.jpg" class="avatar"><span class="name">'+ob[o].creator+'</span></a>';
                str+='<span class="islike"><a class="btn-thumbs-up" href="javascript:;" onclick="islikeNote(this,'+ob[o].kmid+')"><i class="icon-thumbs-up" id="b'+ob[o].kmid+'" ></i> <span id="a'+ob[o].kmid+'">赞</span>(<span id="like'+ob[o].kmid+'">'+ob[o].likecount+'</span>)</a>';
                if(msg.data.power==5){
                	    str+='<span onclick="setop('+ob[o].kmid+')">&nbsp;&nbsp;置顶</span>';
                }
            
      
                str+='</span></div>';
                str+='<div class="notelist-wrap content-intro">'+ob[o].kcontent+'</div>';
                kmids+=','+ob[o].kmid;
              }
              str+='</ul>';  
              $("#notelist_content").html(str);
              getislikeNote(kmids);
              AjaxDo.bindDialog();
		 }else{
		 	 $('.notelist-box').hide();
		 }
	   }
	});
}
//获取点赞情况，
function getislikeNote(kmids){
	 $.ajax({
		url:"/my/note/getlikeNote",
		type:"post",
		data:{
			kmids:kmids
		},
		dataType:"json",
		success:function(msg){
		 var ob = JSON.parse(msg.data);
		 for(var o in ob){
		 	 if($('#like'+o)){
		 	 	$('#like'+o).text(ob[o].length);
		 	 	if(ob[o].islike == 1){
		 	 		$('#a'+o).text('已赞');
		 	 		$('#b'+o).addClass('isdone');
		 	 	}
		 	 }
		 }
	   }
	});
}

 //笔记点赞
function islikeNote(obj,kmid){
	
	 $.ajax({
		url:"/my/note/islikeNote",
		type:"post",
		data:{
			kmid : kmid,
			pename:book.pename,
			kename:kn.kename,                                                       
		},
		dataType:"json",
		success:function(msg){
			if(msg.statusCode == 200){
				$('#a'+kmid).text('已赞');
		 	 	$('#b'+kmid).addClass('isdone');
		 	 	countlike = $('#like'+kmid).text();
		 	 	$('#like'+kmid).text(parseInt(countlike)+1);
				toastr.success(msg.message);
			}else{
				toastr.warning(msg.message);
			}
	   }
	});
}

//头部底部
var simpleLogin = false;

function updateQueryStringParameter(uri, key, value) {
	if(!value) {
		return uri;
	}
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}
function getUrlParam(name) {   
             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
             var r = window.location.search.substr(1).match(reg);  //匹配目标参数   
             if (r != null) return unescape(r[2]); return null; //返回参数值  
        } 
//判断是否移动端   true为移动端
function isMobile() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		return true;
	} else {
		return false;
	}
}
// 头部广告
if( $('#topbanner').length>0 ){
	topAdvert();
}
function topAdvert(){
	var closetopAd = localStorage.getItem("closetopAd");
	if(closetopAd){
		return false;
	}
	$.ajaxdo({
		type : "post",
		url  : "/index/topAdvert",
		dataType : "json", 
		success : function (res) {
			if(res.statusCode == 200){
				$(".close_top_ad").before(res.data);
				// 搞事情的教程页
				if ($('.pro_header').length > 0 && $('#m-splitter').length > 0) {
					$('.pro_header').css('height', '96px');
					$('.pro_header #header_item').css('height', 'auto');
				}

				$("#topbanner").show();
			}
		}
	})
}
$(".close_top_ad").on("click",function(){
	localStorage.setItem("closetopAd", "1");
		$("#topbanner").hide();
		// 搞事情的教程页
		if ($('.pro_header').length > 0 && $('#m-splitter').length > 0) {
			$('.pro_header').removeAttr('style');
			$('.pro_header #header_item').removeAttr('style');
		}

		$.ajaxdo({
			type : "post",
			url  : "/index/closetopAdvert",
			dataType : "json"
		})
});
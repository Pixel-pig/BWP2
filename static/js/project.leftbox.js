(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(e){var a=/\+/g;function d(g){return g}function b(g){return decodeURIComponent(g.replace(a," "))}function f(g){if(g.indexOf('"')===0){g=g.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return c.json?JSON.parse(g):g}catch(h){}}var c=e.cookie=function(p,o,u){if(o!==undefined){u=e.extend({},c.defaults,u);if(typeof u.expires==="number"){var q=u.expires,s=u.expires=new Date();s.setDate(s.getDate()+q)}o=c.json?JSON.stringify(o):String(o);return(document.cookie=[c.raw?p:encodeURIComponent(p),"=",c.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join(""))}var g=c.raw?d:b;var r=document.cookie.split("; ");var v=p?undefined:{};for(var n=0,k=r.length;n<k;n++){var m=r[n].split("=");var h=g(m.shift());var j=g(m.join("="));if(p&&p===h){v=f(j);break}if(!p){v[h]=f(j)}}return v};c.defaults={};e.removeCookie=function(h,g){if(e.cookie(h)!==undefined){e.cookie(h,"",e.extend({},g,{expires:-1}));return true}return false}}));
var workLeftWidth = $.cookie('kn_project_left_width') -20;
var workLeftHeight = $(window).height()-100;

if($.cookie('kn_project_left_ishide') == 1){

    var leftHeight_init = $(window).height()-50; // 减掉头部高度 50个像素
    $('head').append('<style>.m-splitter-left{height:'+(leftHeight_init-15)+'px;}.space-tools-section{width:55px;}.left-container {width:55px;height:'+leftHeight_init+'px;}.left-drager{left:55px;height:'+leftHeight_init+'px;}.main-container{margin-left:55px;}</style>');
}else{

    $('head').append('<style>.left-container {width:'+(workLeftWidth+20)+'px;}.left-drager{left:'+(workLeftWidth+20)+'px;}.main-container{margin-left:'+(workLeftWidth+20)+'px;}#pro-footer{margin-left:'+(workLeftWidth+20)+'px;}.space-tools-section{width:'+(workLeftWidth+20)+'px;}</style>');

}

$(function(){

    
    $(".font-settings .font-opt > .button").on("click",function(e){
        e.preventDefault();
        var fontopt = $(this).attr("font");
        var fontsize = $.cookie("fontsize");
        if(typeof fontsize == 'undefined'){
            fontsize = "font0";
        }
        fontnum = fontsize.replace(/font/,"");
        if(fontopt == "enlarge"){
            if(fontnum < 2){
                fontnum++;
            }
        }else{
            if(fontnum > 0){
                fontnum--;
            }
        }

        $.cookie("fontsize","font"+fontnum);
        $("#pro-mian").removeClass(fontsize).addClass("font"+fontnum);
    });

    //var color = $.cookie("color");
    // if(typeof color != "undefined"){
    //     $("#full-height-container").removeClass("color-theme-white").addClass(color);
    // }

    $(".font-settings .bg-color > .button").on('click',function(e){
        e.preventDefault();
        var color = $(this).attr("color");
        $.cookie("color",color);
        $("#full-height-container").removeClass("color-theme-white color-theme-sepia color-theme-night").addClass(color);
    });
    
    
    
    if($.cookie('kn_project_left_ishide') == 1){
        $(".m-splitter-left").addClass("collapsed");
    }

    function winresize(){
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var workLeftHeight = winHeight-100;
        $(".left-container").css({"height":(workLeftHeight+40)+"px"});
        $(".slimScrollDiv").css({"height":(workLeftHeight+40)+"px"});
        $(".fixed-sidebar").css({"height":(workLeftHeight+40)+"px"});
        var leftWidth = $(".left-container").width();
        var toolWidth = winWidth-leftWidth-34;       
        $("#pro-mian .portlet-title").css({"width":toolWidth+"px"});

        var headerH = document.getElementById('header').offsetHeight;

        // if(!$("#tryframebox").is(":hidden")){
            
        //     $(".tryframebox").css({"width":(winWidth-leftWidth)+"px","height":(winHeight-headerH)+"px", top: headerH + 'px'});
        // }

        if(winWidth >= 1200){

            if($(".navigation-prev").attr("whide") == 1){
                $(".navigation-prev").removeAttr("whide").show();
            }

            if($(".navigation-next").attr("whide") == 1){
                $(".navigation-next").removeAttr("whide").show();
            }

        }

        if($.cookie('kn_project_left_ishide') == 1){
            $('.navigation-prev').css('left',55);
        }

    }

    (function($){

        var $leftContainer=$('.left-container');
        var $fixedSidebar=$('.fixed-sidebar');
        var $mainContainer=$('.main-container');
        var navigationPrev=$('.navigation-prev');
        var profooter=$('#pro-footer');
        var spacetoolssection = $(".space-tools-section");

        var winW = $(window).width();

        var left=270;
        var leftWidth = 270;
        var leftContainerCont = 0;
        var clientWidth = Math.max(document.documentElement.clientWidth, document.body.clientWidth);
        var clientHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
        var isdragging = 0;
        var leftMinWidth = 100;
        var leftMaxWidth = $(window).width()*0.7;
        var leftdrager = (function(){

        var setPosition=function(leftWidth,flag){

            if(flag === true){
                if(leftWidth < 150){
                    dragerClick('hide');
                    return;
                }else{
                    
                    dragerClick('show');
                }
            }

            /*判断最小宽度*/
            if(leftWidth < leftMinWidth){
                leftWidth = leftMinWidth;
                dragerClick('hide');
            }

            /*判断最大宽度*/
            if(leftWidth >= leftMaxWidth){
                leftWidth = leftMinWidth;
                return;
            }

            left=leftWidth;
            $('.left-drager').css('left',left);
            $leftContainer.css('width',left);
            $fixedSidebar.css('width',left);
            //if($.cookie('kn_project_left_ishide') != 1){
                spacetoolssection.css('width',left);
            //}
            $mainContainer.css('marginLeft',left);
            navigationPrev.css('left',left);
            profooter.css('marginLeft',left);
            var toolWidth = $(window).width()-$(".left-container").width()-33;
            $("#pro-mian .portlet-title").css({"width":toolWidth+"px"});
            
            if(left < 270){
                $.cookie('kn_project_left_width',270);
            }else{
                $.cookie('kn_project_left_width',left);
            }
        };

        var dragerClick=function(flag){

            if(flag=='hide'){
                
                $(".left-container").addClass("collapsed");
                $leftContainer.css({'left':0,'width':55});
                $fixedSidebar.css({'left':0,'width':55});
                spacetoolssection.css('width',55);
                navigationPrev.css('left',55);
                $mainContainer.css('marginLeft',55);
                
                profooter.css('marginLeft',55);
                $('.left-dragger-c').addClass("left-dragger-cr").parent().css('left',55).css('cursor','col-resize');
                var toolWidth = $(window).width()-$(".left-container").width()-33;
                $("#pro-mian .portlet-title").css({"width":(toolWidth-1)+"px"});
               
                $.cookie('kn_project_left_ishide',1);
            }else if(flag=='show'){

                if(left < 270){
                    left = 270;
                }

                $(".left-container").removeClass("collapsed");
                $leftContainer.css('display','block').css('width',left+"px");
                $fixedSidebar.css('display','block').css('width',left+"px");

                spacetoolssection.css('width',left+"px");
                $mainContainer.css('marginLeft',left+"px");
                navigationPrev.css('left',270);
                profooter.css('marginLeft',left+"px");
                
                $('.left-dragger-c').removeClass("left-dragger-cr").parent().css('left',left+"px").css('cursor','col-resize');
                var toolWidth = $(window).width()-$(".left-container").width()-33;
                $("#pro-mian .portlet-title").css({"width":toolWidth+"px"});
                $.cookie('kn_project_left_ishide',0);
            }else{
                
                if($(".left-container").hasClass("collapsed")){
                    dragerClick('show');
                }else{
                    dragerClick('hide');
                }
            }
        };
        var dragging=function(){

            $('.left-drager').off('mousedown').on('mousedown',function(e){
                 e.preventDefault(); 
                 var x=e.clientX;
                 isdragging = 0;
                 $(document).mousemove(function(e){
                      e.preventDefault();
                      isdragging = 1;
                      var leftWidth=e.clientX+13;
                      setPosition(leftWidth);
                 });

                 $(document).mouseup(function(e,x) {
                     
                     $(document).off('mouseup').off('mousemove');
                     
                     var leftWidth=e.clientX+13;
                      setPosition(leftWidth,true); // 进入循环判断 是否小于指定宽度
                      if(isdragging !== 1){
                       if($(".left-container").hasClass("collapsed")){
                            dragerClick('show');
                        }else{
                            dragerClick('hide');
                        }
                      }
                
                 });
            });
        };
        
        
        var init=function(){
            var initWidth = $.cookie("kn_project_left_width");
            if(typeof initWidth != "undefined"){
                left = parseInt($.cookie("kn_project_left_width")) === 0 ? 270 : $.cookie("kn_project_left_width");
                if(left == 270){
                    $.cookie('kn_project_left_width',270,{path:'/project/'});
                }
                leftWidth = left;
            }
            
            $('.left-dragger-c').on('click',function(e){
               
                dragerClick();
                return false;
            });

            $('.expand-collapse-trigger').on('click',function(e){
               
                if($(".left-container").hasClass("collapsed")){
                    dragerClick('show');
                }else{
                    dragerClick('hide');
                }
                return false;
            });
			
			//asdf  work_view_ajax，work_view2左侧目录、搜索、书签
			$('.sidebar-nav-search,.sidebar-nav-star,.sidebar-nav-tree').on('click',function(e){
				if($(".left-container").hasClass("collapsed")){
					dragerClick('show');
				}		
			    return false;
			});

            if($.cookie('kn_project_left_ishide') != 1){

                setPosition(left);
                spacetoolssection.css('width',parseInt(left));
            }
            
            dragging();
            $(window).resize(function(){
                winresize();
            });
            
        };

        return {
            init:function(){
                init();
                winresize();
            }
        };

        })();

        leftdrager.init();
    })(jQuery);
});

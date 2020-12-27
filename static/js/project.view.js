function HTMLEnCode(str){  
    var    s    =    "";  
    if    (str.length    ==    0)    return    "";  
    s    =    str.replace(/&/g,    "&gt;");  
    s    =    s.replace(/ </g,        "&lt;");  
    s    =    s.replace(/>/g,        "&gt;");  
    s    =    s.replace(/    /g,        "&nbsp;");  
    s    =    s.replace(/\'/g,      "'");  
    s    =    s.replace(/\"/g,      "&quot;");  
    s    =    s.replace(/\n/g,      " <br>");  
    return    s;  
}

function HTMLDeCode(str){  
    var    s    =    "";  
    if    (str.length    ==    0)    return    "";  
    s    =    str.replace(/&gt;/g,    "&");  
    s    =    s.replace(/&lt;/g,        " <");  
    s    =    s.replace(/&gt;/g,        ">");  
    s    =    s.replace(/&nbsp;/g,        "    ");  
    s    =    s.replace(/'/g,      "\'");  
    s    =    s.replace(/&quot;/g,      "\"");  
    s    =    s.replace(/ <br>/g,      "\n");  
    return    s;  
}

// 新|旧版预览 切换
function newversion(){

  var isNewVersion = $.cookie("newversion");
  if(isNewVersion == 1){
    $.cookie("newversion",0,{path:'/'});
  }else{
    $.cookie("newversion",1,{path:'/'});
  }

  window.location.reload();
  
}

function islike(){
    $.ajaxdo({
        url: "/project/islikeKn",
        type: "post",
        dataType: 'json',
        data: {"pename":book.pename,"kename": kn.kename},
        sync: false,
        success: function (data) {
            if (data.statusCode == 200) {
                $('.avatar-list').find('p').remove();
                $('.avatar-list').append('<a href="/u/' + data.data + '" title="' + data.data + '"><img src="https://7n.w3cschool.cn/attachments/avatar2/avatar_' + data.data + '.jpg" title=""></a>');
                var likecount = $("#likecount").text() * 1 + 1;
                $("#likecount").html(likecount);
                $(".btn-thumbs-up i").attr('class','icon-thumbs-up isdone');
                $("#likestatus").html('已赞');
                toastr.success(data.message,'',{"positionClass": "toast-top-center"});
            } else {
                toastr.warning(data.message,'',{"positionClass": "toast-top-center"});
            }
        }
    });
}

function isstar(){
  //console.log("asda");
  if(kn.uid == '' || kn.uid == '0'){
    toastr.warning("您还未登录,请先登录!",'',{"positionClass": "toast-top-center"});
    return;
  }

  var type = $('#knstar').attr('data-type');

  var fileicon = "";
  if(kn.ktype == 'kn' || kn.ktype == ''){
    fileicon = "ic-folder-open2";
  }else{
    fileicon = "icon-folder-open";
  }

  var item = $("#kncollect").find("li[data-id='"+kn.kename+"']");
  if(item.length > 0){
      item.remove();
  }else{
      $("#kncollect > ul").prepend('<li class="dd-item" data-id="'+kn.kename+'"><a class="collectitem"  >\
         <i class="'+fileicon+'"></i> '+kn.ktitle+'</a><i class="icon-remove remove-collect"></i></li>');
  }

  $.ajaxdo({
        url: "/project/tempStar",
        type: "post",
        dataType: 'json',
        data: {
          kename:kn.kename,
          pename:book.pename,
          ktype:kn.ktype,
        },
        success: function (data) {
          if(data.statusCode == 200){

              if (type == "star") {

                  $('#knstar').html('<i class="icon-bookmark isdone"></i><span> 书签</span>');
                  $('#knstar').attr('data-type','rstar');
                  toastr.success(data.message,'',{"positionClass": "toast-top-center"});
              } else {

                $('#knstar').html('<i class="icon-bookmark-empty"></i><span> 书签</span>');
                $('#knstar').attr('data-type','star');
                  toastr.success(data.message,'',{"positionClass": "toast-top-center"});
              }

              if($("#kncollect").find(".dd-item").length > 0){
                  $("#kncollect").find(".nostar").remove();
              }else{
                  $("#kncollect > ul").prepend('<li class="nostar">还没有书签</li>');
              }
          }else{
            toastr.warning(data.message,'',{"positionClass": "toast-top-center"});
          }
        }
    });
}

var directoryNav = '';
var mscroll = (function(){

    function init(){
        handleScrollers();
    }

    function handleScrollers(){
        $('.mscroller').each(function () {

            var height;
            if ($(this).attr("data-height")) {
                height = $(this).attr("data-height");
            } else {
                height = $(this).css('height');
            }
            
            $(this).slimScroll({
                size: '7px',
                color: ($(this).attr("data-handle-color")  ? $(this).attr("data-handle-color") : '#a1b2bd'),
                railColor: ($(this).attr("data-rail-color")  ? $(this).attr("data-rail-color") : '#333'),
                height: height,
                width: 'inherit',
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                disableFadeOut: true
            });
        });
    }

    return {
        init:function(){
            init();
        }
    };
})();

$(function(){

    mscroll.init(); // 初始化滚动条

    $(".treeth li").on("click",function(){

      $(".treeth li").removeClass("active");
      var target = $(this).addClass("active").attr("target");
      $(".sidebar-tree > div").hide();
      $("."+target).show();

    });
    //sidebar-tree-content

    hljs.initHighlightingOnLoad();//高亮代码

    if(typeof kn.kename != 'undefined' && kn.kename != "" && $("#nestable_handbook  li[data-id='"+kn.kename+"']").length > 0){
        var offsetTop = $("#nestable_handbook  li[data-id='"+kn.kename+"']").offset().top;
        var winH = $(window).height();
        $(".mscroller").slimscroll({scrollTo:(offsetTop-winH/2)+"px"});
    }
    
    // 上一篇 下一篇
    var el = $(".dd-item[data-id="+kn.kename+"]");
    // var prev = el.prev().find('a')[0];
    // var next = el.next().find('a')[0];
    // if(prev == undefined){
    //    prev = el.parents(".dd-list").prev().find('a')[0];
    // }
    // if(next == undefined){
    //    next = el.parents(".dd-item").next().find('a')[0];
    // }

    // if($(prev).length < 1){
    //   $(".previous-link").hide();
    // }else{
    //   $(prev).clone().appendTo(".previous-link");
    //   $(".previous-link").show();

    // }

    // if($(next).length < 1){
    //   $(".next-link").hide();
    // }else{
    //   $(next).clone().appendTo('.next-link');
    //   $(".next-link").show();
    // }


    if($(".view-box").html() == "" && kn.ismenu == 1){
        $(el).clone().appendTo(".view-box");
        $(".view-box").find(".dd-content").removeClass("folder-open").removeClass("folder-close").css({"background-color":"#fff"});
    }


    function fcollect(){
        var obj = $(this);
        if(obj.hasClass("folder-open")){
            obj.removeClass("folder-open");
            obj.addClass("folder-close");
            obj.find(".folder").removeClass("icon-folder-open").addClass("icon-folder-close");
            obj.next().hide();
        }else{
            obj.removeClass("folder-close");
            obj.addClass("folder-open");
            obj.find(".folder").removeClass("icon-folder-close").addClass("icon-folder-open");
            obj.next().show();
        }
    }

    $("body").on('click',".dd-content[class*=folder-]",function(){
        fcollect.call(this);
    });

    // $("#nestable_handbook").on('click',".dd-item[ismenu=1]",function(){
    //     console.log("ddsfs:",this);
    //     fcollect.call($('>.dd-content',this)[0]);
    // });

    $(".add-kn-btn,.projectstar").on('click',function(e){
        e.preventDefault();
        toastr.success("请先登录!");
    });

    // 回车进行搜索
    $("input[name='w']").on("keyup",function(e){
        var keyCode = e.keyCode;
        if(keyCode == 13){
            $(".knsearchbtn").trigger('click');
        }
    });

    // 监听 搜索项目内部按钮
    $(".knsearchbtn").on('click',function(){
        var searchKey = $("#knsearch input[name='w']").val();
        if(searchKey == ''){
            toastr.warning("请填写要搜索的词");
        }
        $.ajaxdo({
            url:"/search?w="+searchKey+"&pename="+book.pename+"&json=yes",
            type:'post',
            data:{},
            dataType:'json',
            success:function(msg){
                var res = msg.map(function(val){ 
                    var reg = eval("("+"/"+searchKey+"/g"+")");
                    var content = val['kcontent'].replace(reg,'<strong class="fcolorred">'+searchKey+'</strong>');
                    return "<li class='searchresli' kename='"+val['kename']+"'><a href='/"+val['pename']+"/"+val['kename']+"obtain.html'>"+val['ktitle']+"</a></li>";
                }).join("");
                if(res == ""){
                    $(".searchres").html("<li class='searchresli'>没有相关搜索</li>");
                }else{
                    $(".searchres").html(res);
                    $(".sidebar-tree-dict").css('display','none');
                }
            }
        });
    });

    $(".kncleanbtn").on('click',function(){
        var searchres = $(".searchres").html();
        if(typeof $(".searchres").html() != 'undefined'){
            $(".searchres").html('');
            $(".sidebar-tree-dict").css('display','block');
            $("input[name='w']").attr('value','');
        }
    });

    //收藏手册
    var Star = function(kename){
        //对象方法
        this.removeStar = function(){
            var mthis = $(this);
            //移除收藏
            $.ajaxdo({
                url:"/my/knowledge/tempStar",
                type:"post",
                dataType:"json",
                data:{
                    kename:kename,
                    pename:book.pename,
                    dotype:'delete',
                },
                success:function() {
                    
                    mthis.parent().remove();
                    if($("#kncollect").find(".dd-item").length == 0){
                        $("#kncollect > ul").prepend('<li class="nostar">还没有收藏</li>');
                    }
                }
            });

        };
    };

    // 移除收藏 监听
    $("#kncollect").delegate(".remove-collect","click",function(e){
        e.stopPropagation();
        var item = $(this).parent();
        var kename = item.attr('data-id');

        //移除收藏
        $.ajaxdo({
            url:"/project/tempStar",
            type:"post",
            dataType:"json",
            data:{
                kename:kename,
                pename:book.pename,
                dotype:'delete',
            },
            success:function(msg) {
                if(msg.statusCode < 300){
                    toastr.success(msg.message);
                    item.remove();
                }else{
                    toastr.warnning(msg.message);
                }

                if($("#kncollect").find(".dd-item").length == 0){
                    $("#kncollect > ul").prepend('<li class="nostar">还没有书签</li>');
                }
            }
        });
    });

    // 字典列表查询，dict
    $(".sidebar-tree-dict").on('click',".folder-close",function(){
        var sidebar = $(this);
        var did = sidebar.parent().attr('data-id');
        if(typeof sidebar.next().attr('class') == 'undefined'){
        $.ajax({
            url:"/dict/getDictList",
            type:"post",
            dataType:"json",
            data: {did:did},
            success:function(data){
                if(data.statusCode == 200){
                    var html = '<ol class="dd-list">';
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        var info = arr[i];
                        html = html + '<li class="dd-item" data-id="'+info.did+'" ><div class="dd-content';
                        if(info.ismenu == 1){
                            html = html + ' folder-close';
                        }
                        html = html + '"';
                        if(info.kename == kn.kename && info.kename != ''){
                            html = html + 'style="background-color: #DDD;"';
                        }
                        html = html + '>';
                        if(info.ismenu != 0){
                            html = html + '<i class="icon-folder-open"></i>';
                        } else {
                            html = html + '<i class="ic-folder-open2"></i>';
                        }
                        html = html + '<a ';
                        if(info.url !=''){

                            html = html + 'href="'+info.url+'" target="_blank"';
                        }else{
                            if(info.kename !=''){
                                html = html + 'href="javascript:;" data-type="dict" data-kename="'+info.kename+'"';
                            }else{
                                html = html + 'href="javascript:;"';
                            }
                        }
                        
                        html = html + 'title="'+info.keyword+'">'+info.keyword+'</a></div></li>';
                    }
                    html = html + '</ol>';
                    sidebar.parent().append(html);
                }       
            }
        });
        }
    });

    //获取dict字典内容  getDictInfo
    $(document).on('click',".sidebar-tree-dict .dd-content a[data-type='dict']",function(){
        var pename = book.pename;
        var kename = $(this).attr('data-kename');
        $.ajax({
            url:"/dict/getDictInfo",
            type:"post",
            dataType:"json",
            data: {pename:pename,kename:kename},
            success:function(data){
                if(data.statusCode == 200){
                    var info = data.data;
                    var html = '<div class="content-bg"><div class="content-top"><h1>'+info.ktitle+'</h1></div>';
                    html = html + '<div class="content-intro view-box">'+info.kcontent+'</div></div>';
                    html = html + '</div>';
                    if(typeof $('.project-body').html() != 'undefined'){
                        $('.project-body').html(html);
                    } else {
                        $('#pcover').html(html);
                    }
                }
            }
        });
    });

    $("li[target='search-box']").on('click',function(){
        var pename = book.pename;
        var dict = $('.sidebar-tree-dict .sidebar-tree-content').html();
        if(typeof dict != 'undefined'){
            return;
        }
        $.ajax({
            url:"/dict/getDictMenuList",
            type:"post",
            dataType:"json",
            data: {pename:pename},
            success:function(data){
                if(data.statusCode == 200){
             
                    var html = '<div class="sidebar-tree-content"><div class="dd" id="nestable_handbook" data-tid="'+kn.kename+'" data-id="handbook"><ol class="dd-list">';
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        var info = arr[i];
                        html = html + '<li class="dd-item" data-id="'+info.did+'" ><div class="dd-content';
                        if(info.ismenu == 1){
                            html = html + ' folder-close';
                        }
                        html = html + '"';
                        if(info.kename == kn.kename && info.kename != ''){
                            html = html + 'style="background-color: #DDD;"';
                        }
                        html = html + '>';
                        if(info.ismenu != 0){
                            html = html + '<i class="icon-folder-open"></i>';
                        } else {
                            html = html + '<i class="ic-folder-open2"></i>';
                        }
                        html = html + '<a ';
                        if(info.url !=''){

                            html = html + 'href="'+info.url+'" target="_blank"';
                        }else{
                            if(info.kename !=''){
                                html = html + 'href="javascript:;" data-type="dict" data-kename="'+info.kename+'"';
                            }else{
                                html = html + 'href="javascript:;"';
                            }
                        }
                        
                        html = html + 'title="'+info.keyword+'">'+info.keyword+'</a></div></li>';
                    }
                    html = html + '</ol></div></div>';
                    $('.sidebar-tree-dict').html(html);
                }
            }
        });
    });

});
   


$("#collection").on("click",function(){
    openCollection();
});

function openCollection(){

    var ctype = $('#collection').attr('data-ctype');

    var ename = '';
    if(ctype == 'kn'){
        ename = kn.kename;
    }else{
        ename = kn.pename;
    }

    $.ajax({
        url:'/collection/getCollectionList',
        type:"post",
        dataType: 'json',
        data:{"ename":ename,"ctype":ctype},
        sync:false,
        success:function(data){
            var htmls = collectionhtml = '';
            var html  =  '<div class="dialog-box" style="display:block;">'
                                +'<div class="dialog-box-content" style="width: 800px;">'
                                    +'<div class="dialog-box-head">'
                                        +'<span class="dialog-box-title">加入到我管理的专题</span>'
                                        +'<span id="closeDialog" class="dialog-box-close">X</span>'
                                    +'</div>'
                                    +'<div class="dialog-box-body">';

            html += '<lable>标题补充：</lable>' 
            + '<input placeholder="可替代当前文章的标题进行显示" name="titletag" class="dialog-text" id="dialog-titletag" type="text"><ul>';
            if(data.statusCode == 200){
                collectionhtml += '<li><b>我创建的专题</b></li>';
                list = data.data;
                var x = 0;
                for (var i = 0; i < list.length; i++) {
                    arr = list[i];
                    if(arr.addtype == 'create'){
                        collectionhtml += '<li data-cid='+arr.id+'>'
                        +'<div class="dialog-body-img"><img src="//atts.w3cschool.cn/attachments/cover/'+arr.cover+'"></div>'
                        +'<div class="dialog-body-title"><a href="/collection/'+arr.ename+'" target="_blank" >'+arr.bookname+'</a></div>';
                        collectionhtml += '<div class="dialog-body-btn-box">';
                        if(arr.islink == 1){
                            collectionhtml += '<button class="search-s" id="updateCollection">更新</button>'
                            +'<button class="search-s" id="deleteCollection">移除</button>';
                        }else{
                            collectionhtml += '<button class="search-s" id="addCollection">收录</button>';
                        }

                        collectionhtml += '</div></li>';
                        x = (x+1)*1;
                    }
                }
                if(x > 0){
                    html += collectionhtml;
                }

                htmls += '<li><b>协同编辑的专题</b></li>';
                var n = 0;
                for (var i = 0; i < list.length; i++) {
                    arr = list[i];
                    if(arr.addtype != 'create'){
                        htmls += '<li data-cid='+arr.id+'>'
                        +'<div class="dialog-body-img"><img src="//atts.w3cschool.cn/attachments/cover/'+arr.cover+'"></div>'
                        +'<div class="dialog-body-title"><a href="/collection/'+arr.ename+'" target="_blank" >'+arr.bookname+'</a></div>';
                        htmls += '<div class="dialog-body-btn-box">';
                        if(arr.islink == 1){
                            htmls += '<button class="search-s" id="updateCollection">更新</button>'
                            +'<button class="search-s" id="deleteCollection">移除</button>';
                        }else{
                            htmls += '<button class="search-s" id="addCollection">收录</button>';
                        }

                        htmls += '</div></li>';
                        n = (n+1)*1;
                    }
                }
                if(n > 0){
                    html += htmls;
                }


                html += '</ul>';
            }else{
                html += '<br/><br/><div>你还没有创建专题，<a href="/my#myProject">去新建一个</a></div>'
            }

            html += '</div>'
                        +'<button class="dialog-body-btn" id="closeDialog">关闭</button>'
                    +'</div>'
                +'</div>';
            $(".dialog-area").append(html);
        }
    });
}


$('.dialog-area').on('click','#closeDialog',function(){
    $('.dialog-area').html('');
});

$('.dialog-area').on('click','#addCollection',function(){

    var title = $('#dialog-titletag').val();
    var cid = $(this).parent().parent().attr('data-cid');
    var btn = $(this).parent('.dialog-body-btn-box');
    var ctype = $('#collection').attr('data-ctype');

    var ename = '';
    if(ctype == 'kn'){
        ename = kn.kename;
    }else{
        ename = kn.pename;
    }

    $.ajax({
        url:'/collection/saveCollectionLinks',
        type:"post",
        dataType: 'json',
        data:{"ename":ename,"title":title,"cid":cid,"ctype":ctype,"type":"add"},
        sync:false,
        success:function(data){
            if(data.statusCode == 200){

                var html = '<button class="search-s" id="updateCollection">更新</button>'
                        +'<button class="search-s" id="deleteCollection">移除</button>';
                btn.html(html);
                toastr.success('收录成功','',{"positionClass": "toast-top-center"});
            }else if(data.statusCode == 300){
                toastr.warning("权限不足",'',{"positionClass": "toast-top-center"});
            }else{
                toastr.warning("收录失败",'',{"positionClass": "toast-top-center"});
            }
        }
    });
});

$('.dialog-area').on('click','#deleteCollection',function(){

    var ctype = $('#collection').attr('data-ctype');

    var ename = '';
    if(ctype == 'kn'){
        ename = kn.kename;
    }else{
        ename = kn.pename;
    }

    var cid = $(this).parent().parent().attr('data-cid');
    var btn = $(this).parent('.dialog-body-btn-box');
    $.ajax({
        url:'/collection/deleteCollectionLinks',
        type:"post",
        dataType: 'json',
        data:{"ename":ename,"cid":cid,"ctype":ctype},
        sync:false,
        success:function(data){
            if(data.statusCode == 200){

                var html = '<button class="search-s" id="addCollection">收录</button>';
                btn.html(html);
                toastr.success('移除收录成功','',{"positionClass": "toast-top-center"});
            }else if(data.statusCode == 300){
                toastr.warning("权限不足",'',{"positionClass": "toast-top-center"});
            }else{
                toastr.warning("移除收录失败",'',{"positionClass": "toast-top-center"});
            }
        }
    });
});

$('.dialog-area').on('click','#updateCollection',function(){

    var ctype = $('#collection').attr('data-ctype');

    var ename = '';
    if(ctype == 'kn'){
        ename = kn.kename;
    }else{
        ename = kn.pename;
    }
    var title = $('#dialog-titletag').val();
    var cid = $(this).parent().parent().attr('data-cid');
    var btn = $(this).parent('.dialog-body-btn-box');
    $.ajax({
        url:'/collection/saveCollectionLinks',
        type:"post",
        dataType: 'json',
        data:{"ename":ename,"title":title,"cid":cid,"ctype":ctype},
        sync:false,
        success:function(data){
            if(data.statusCode == 200){

                toastr.success('更新成功','',{"positionClass": "toast-top-center"});
            }else if(data.statusCode == 300){
                toastr.warning("权限不足",'',{"positionClass": "toast-top-center"});
            }else{
                toastr.warning("更新失败",'',{"positionClass": "toast-top-center"});
            }
        }
    });
});

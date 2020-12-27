var AjaxDo = function() {
    function bindDialog() {
        $(this).unbind("click").click(function(event) {
            event.preventDefault();
            var $this = $(this), predo = $this.attr("predo"), predofn;
            predo && (predofn = eval("(" + predo + ")"),
            predofn.call(this));
            var title = $this.attr("title") || $this.text()
              , rel = $this.attr("rel") || "_blank"
              , data = $this.attr("data") || ""
              , options = {}
              , w = $this.attr("width")
              , h = $this.attr("height");
            w && (options.width = w == "window" ? $(window).width() : w),
            h && (options.height = h == "window" ? $(window).height() : h),
            options.max = eval($this.attr("max") || "false"),
            options.mask = eval($this.attr("mask") || "false"),
            options.maxable = eval($this.attr("maxable") || "true"),
            options.minable = eval($this.attr("minable") || "true"),
            options.fresh = eval($this.attr("fresh") || "true"),
            options.resizable = eval($this.attr("resizable") || "true"),
            options.drawable = eval($this.attr("drawable") || "true"),
            options.close = eval($this.attr("close") || ""),
            options.param = $this.attr("param") || "",
            options.iframe = eval($this.attr("iframe") || "false"),
            options.fullH = eval($this.attr("fullH") || "false"),
            options.closecallback = $this.attr("closecallback") || "false",
            options.enddrag = $this.attr("enddrag") || "false";
            options.stopopen = $this.attr("stopopen");

            if(options.stopopen == 1){
                return;
            }

            var url = unescape($this.attr("href")).replaceTmById($(event.target).parents(".unitBox:first"));
            return AjaxDo.debug(url),
            url.isFinishedTm() ? ("" != data && (url += "?" + data),
            $.pdialog.open(url, rel, title, options),
            !1) : (alertMsg.error($this.attr("warn") || AjaxDo.msg("alertSelectMsg")),
            !1)
        })
    }
    return {
        eventType: {
            pageClear: "pageClear",
            resizeGrid: "resizeGrid"
        },
        statusCode: {
            unlogin: 100,
            ok: 200,
            error: 300,
            timeout: 301,
            warning:302
        },
        ui: {
            sbar: !0
        },
        frag: {},
        _msg: {},
        _set: {
            debug: !1
        },
        ajaxbg: $("#background,#progressBar"),
        initUI: function(_box) {
            var $p = $(_box || document);
            $.fn.hoverClass && $("div.tabsHeader li, div.tabsPageHeader li, div.accordionHeader, div.accordion", $p).hoverClass("hover"),
            $("a[target=navTab]", $p).each(function() {
                $(this).unbind("click").click(function(event) {
                    var $this = $(this), predo = $this.attr("predo"), predofn;
                    predo && (predofn = eval("(" + predo + ")"),
                    predofn.call(this));
                    var title = $this.attr("title") || $this.text()
                      , tabid = $this.attr("rel") || "_blank"
                      , data = $this.attr("data") || ""
                      , fresh = eval($this.attr("fresh") || "true")
                      , close = eval($this.attr("close") || "false")
                      , closebtn = eval($this.attr("close") || "false")
                      , external = eval($this.attr("external") || "false")
                      , header = $this.attr("header") || "show"
                      , footer = $this.attr("footer") || "show"
                      , animate = $this.attr("data-animation") || 0
                      , url = unescape($this.attr("href")).replaceTmById($(event.target).parents(".unitBox:first"));
                    if (AjaxDo.debug(url),
                    !url.isFinishedTm())
                        return alertMsg.error($this.attr("warn") || AjaxDo.msg("alertSelectMsg")),
                        !1;
                    "" != data && (url += "?" + data),
                    navTab.openTab(tabid, url, {
                        title: title,
                        fresh: fresh,
                        external: external,
                        header: header,
                        footer: footer,
                        close: close,
                        closebtn: closebtn,
                        animate: animate
                    }),
                    event.preventDefault()
                })
            }),
            $("a[target=dialog]", $p).each(function() {
                bindDialog.call(this)
            }),
            $("a[action=ajaxPage]", $p).each(function() {
                $(this).unbind("click").click(function(event) {
                    var $this = $(this)
                      , target = $this.attr("target")
                      , $target = $("#" + target)
                      , fresh = eval($this.attr("fresh") || "true")
                      , view = $this.attr("view") || "show"
                      , iframe = eval($this.attr("iframe") || "false");
                    if (target)
                        if (iframe) {
                            var ih = $target.height() || "100px"
                              , externalFrag = '<iframe src="{url}" style="width:100%;height:{height};" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>';
                            $target.html(externalFrag.replaceAll("{url}", $this.attr("href")).replaceAll("{height}", ih + "px"))
                        } else
                            $target.loadUrl($this.attr("href"), {}, function() {
                                $target.find("[layoutH]").layoutH()
                            });
                    "hide" == view && $target.hide(),
                    event.preventDefault()
                })
            }),
            $.fn.datepicker && $("input.date", $p).each(function() {
                var a = $(this)
                  , b = {};
                a.attr("dateFmt") && (b.pattern = a.attr("dateFmt")),
                a.attr("minDate") && (b.minDate = a.attr("minDate")),
                a.attr("maxDate") && (b.maxDate = a.attr("maxDate")),
                a.attr("mmStep") && (b.mmStep = a.attr("mmStep")),
                a.attr("ssStep") && (b.ssStep = a.attr("ssStep")),
                a.datepicker(b)
            }),
            $.fn.ajaxTodo && $("a[action=ajaxTodo]", $p).ajaxTodo(),
            $.fn.ajaxTodo && $("a[action=ajaxData]", $p).ajaxTodo()
        },
        initEnv: function() {
            if ($.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()),
            $.browser.msie && /6.0/.test(navigator.userAgent))
                try {
                    document.execCommand("BackgroundImageCache", !1, !0)
                } catch (a) {}
            $.browser.msie && window.setInterval("CollectGarbage();", 1e4);
            var a = $("#background,#progressBar");
            a.hide(),
            $(document).ajaxStart(function() {
                a.show()
            }).ajaxStop(function() {
                a.hide()
            }),
            void 0 !== $("#navTab").html() && navTab.init(),
            setTimeout(function() {
                AjaxDo.initUI();
                var a = $("div.tabsPageHeader");
                a.find(".tabsLeft").hoverClass("tabsLeftHover"),
                a.find(".tabsRight").hoverClass("tabsRightHover"),
                a.find(".tabsMore").hoverClass("tabsMoreHover")
            }, 10)
        },
        initLayout: function() {
            var a = $(window).width() - (AjaxDo.ui.sbar ? $("#sidebar").width() + 10 : 34) - 5
              , b = $(window).height() - $(".header").height() - 5;
            $(".page-container").height(b),
            $(".sidebar-menu").height(b - 23),
            $(".page-content-body").height(b),
            $("#container").width(a),
            $("#container .tabsPageContent").height(b - 34).find("[layoutH]").layoutH()
        },
        msg: function(a, b) {
            return function(a, b) {
                b = b || [];
                for (var c = a || "", d = 0; d < b.length; d++)
                    c = c.replace(new RegExp("\\{" + d + "\\}","g"), b[d]);
                return c
            }(this._msg[a], b)
        },
        debug: function(a) {
            this._set.debug && ("undefined" != typeof console ? console.log(a) : alert(a))
        },
        alertMsg: function(a, b) {
            b == 302? toastr.warning(a, "", {
                positionClass: "toast-top-center"
            }) : "error" == (b || "error") ? toastr.error(a, "", {
                positionClass: "toast-top-center"
            }) : toastr.success(a, "", {
                positionClass: "toast-top-center"
            })
        },
        reload: function() {
            setTimeout(function() {
                window.location.reload()
            }, 500)
        },
        obj2str: function(a) {
            var b = [];
            if ("string" == typeof a)
                return '"' + a.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + '"';
            if ("object" == typeof a) {
                if (a.sort) {
                    for (var c = 0; c < a.length; c++)
                        b.push(AjaxDo.obj2str(a[c]));
                    b = "[" + b.join() + "]"
                } else {
                    for (var c in a)
                        b.push(c + ":" + AjaxDo.obj2str(a[c]));
                    document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(a.toString) && b.push("toString:" + a.toString.toString()),
                    b = "{" + b.join() + "}"
                }
                return b
            }
            return a.toString()
        },
        jsonEval: function(data) {
            try {
                return "string" == $.type(data) ? eval("(" + data + ")") : data
            } catch (a) {
                return {}
            }
        },
        ajaxTodo: function(url, callback) {
            var $callback = callback || AjaxDo.navTabAjaxDone;
            $.isFunction($callback) || ($callback = eval("(" + callback + ")")),
            url = url + (/\?/.test(url) ? "&" : "?") + "_hash=" + $.cookie("ypre_saltkey"),
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                cache: !1,
                success: $callback,
                error: AjaxDo.ajaxError
            })
        },
        ajaxError: function(a, b, c) {
            var d = "Http status: " + a.status + " " + a.statusText + "\najaxOptions: " + b + "\n";
            toastr ? toastr.error(d) : alert(d)
        },
        ajaxDone: function(a) {
            a.statusCode == AjaxDo.statusCode.error ? a.message && AjaxDo.alertMsg && AjaxDo.alertMsg(a.message) : a.statusCode == AjaxDo.statusCode.timeout ? AjaxDo.alertMsg ? AjaxDo.alertMsg(a.message || AjaxDo.msg("sessionTimout"), {
                okCall: AjaxDo.loadLogin
            }) : AjaxDo.loadLogin() : a.message && AjaxDo.alertMsg && AjaxDo.alertMsg(a.message, "success")
        },
        search: function(a, b) {
            return "dialog" == b ? dialogSearch(a) : AjaxDo.navTabSearch(a),
            !1
        },
        navTabSearch: function(a, b) {
            var c = $(a)
              , d = b || c.attr("rel");
            return navTab.reload(c.attr("action"), {
                data: c.serializeArray(),
                navTabId: d
            }),
            !1
        },
        dialogSearch: function(a) {
            var b = $(a);
            return $.pdialog.reload(b.attr("action"), {
                data: b.serializeArray()
            }),
            !1
        },
        divSearch: function(a, b) {
            var c = $(a);
            if (a[DWZ.pageInfo.pageNum] && (a[DWZ.pageInfo.pageNum].value = 1),
            b) {
                var d = $("#" + b);
                d.ajaxUrl({
                    type: "POST",
                    url: c.attr("action"),
                    data: c.serializeArray(),
                    callback: function() {
                        d.find("[layoutH]").layoutH()
                    }
                })
            }
            return !1
        },
        formCallback: function(a, b, c) {
            var d = $(a)
              , e = $.cookie("ypre_saltkey");
            if (d.append('<input type="hidden" name="_hash" value="' + e + '" />'),
            !d.valid())
                return !1;
            var f = function() {
                $.ajax({
                    type: a.method || "POST",
                    url: d.attr("action"),
                    data: d.serializeArray(),
                    dataType: "json",
                    cache: !1,
                    success: b || AjaxDo.ajaxDone,
                    error: AjaxDo.ajaxError
                })
            };
            return c ? confirm(c) && f() : f(),
            !1
        },
        iframeCallback: function(a, b) {
            var c = $(a)
              , d = $("#callbackframe");
            if (!c.valid())
                return !1;
            0 == d.size() && (d = $("<iframe id='callbackframe' name='callbackframe' src='about:blank' style='display:none'></iframe>").appendTo("body")),
            a.ajax || c.append('<input type="hidden" name="ajax" value="1" />'),
            a.target = "callbackframe",
            AjaxDo._iframeResponse(d[0], b || AjaxDo.ajaxDone)
        },
        _iframeResponse: function(a, b) {
            var c = $(a)
              , d = $(document);
            d.trigger("ajaxStart"),
            c.bind("load", function(e) {
                if (c.unbind("load"),
                d.trigger("ajaxStop"),
                "javascript:'%3Chtml%3E%3C/html%3E';" != a.src && "javascript:'<html></html>';" != a.src) {
                    var f = a.contentDocument || a.document;
                    if (!(f.readyState && "complete" != f.readyState || f.body && "false" == f.body.innerHTML)) {
                        var g;
                        if (f.XMLDocument)
                            g = f.XMLDocument;
                        else if (f.body)
                            try {
                                g = c.contents().find("body").text(),
                                g = jQuery.parseJSON(g)
                            } catch (a) {
                                g = f.body.innerHTML
                            }
                        else
                            g = f;
                        b(g)
                    }
                }
            })
        },
        navTabAjaxDone: function(json) {
            if (AjaxDo.ajaxDone(json),
            json.statusCode == AjaxDo.statusCode.ok) {
                if ("current" == json.dotype.close && setTimeout(function() {
                    navTab.closeCurrentTab(json.navTabId)
                }, 100),
                "" != json.dotype.openUrl && navTab.openTab("nav_newtab", json.dotype.openUrl, {
                    title: "=="
                }),
                "" != json.dotype.reloadId && navTab.reloadFlag(json.dotype.reloadId),
                "currentTab" == json.dotype.reload) {
                    navTab.reloadCurrentTab();
                    var $pagerForm = $("#pagerForm", navTab.getCurrentPanel())
                      , args = $pagerForm.size() > 0 ? $pagerForm.serializeArray() : {};
                    AjaxDo.PageReload({
                        data: args,
                        rel: json.rel
                    })
                } else
                    "" != json.dotype.reload && navTab.reload(json.dotype.reload);
                if ("forwardConfirm" == callback)
                    confirm(json.confirmMsg || AjaxDo.msg("forwardConfirmMsg")) ? navTab.reload(json.forwardUrl) : navTab.closeCurrentTab(json.navTabId);
                else if ("" != json.callback) {
                    var callback = json.callback;
                    $.isFunction(callback) || (callback = eval("(" + json.callback + ")")),
                    "" != json.data ? callback(json.data) : callback()
                }
            }
        },
        dialogAjaxDone: function(json) {
            if (AjaxDo.ajaxDone(json),
            json.statusCode == AjaxDo.statusCode.ok) {
                if ("" != json.dotype.openId && navTab.reload(json.forwardUrl, {
                    navTabId: json.dotype.openId
                }),
                "currentTab" == json.dotype.reload && "false" != json.data.reload) {
                    navTab.reloadCurrentTab();
                    var $pagerForm = $("#pagerForm", navTab.getCurrentPanel())
                      , args = $pagerForm.size() > 0 ? $pagerForm.serializeArray() : {};
                    AjaxDo.PageReload({
                        data: args,
                        rel: json.rel
                    })
                }
                if ("current" == json.dotype.close && $.pdialog.closeCurrent(),
                "" != json.dotype.openUrl && navTab.openTab("dialog_newtab", json.dotype.openUrl, {
                    title: "=="
                }),
                "" != json.callback) {
                    var callback = json.callback;
                    $.isFunction(callback) || (callback = eval("(" + json.callback + ")")),
                    "" != json.data ? callback(json.data) : callback()
                }
            } else if ("" != json.callback) {
                var callback = json.callback;
                $.isFunction(callback) || (callback = eval("(" + json.callback + ")")),
                callback(json)
            }
        },
        PageReload: function(a) {
            var b = $.extend({
                targetType: "navTab",
                rel: "",
                data: {
                    pageNum: "",
                    numPerPage: "",
                    orderField: "",
                    orderDirection: ""
                },
                callback: null
            }, a)
              , c = "dialog" == b.targetType ? $.pdialog.getCurrent() : navTab.getCurrentPanel();
            if (b.rel) {
                var d = c.find("#" + b.rel)
                  , e = _getPagerForm(d, b.data);
                e && d.ajaxUrl({
                    type: "POST",
                    url: $(e).attr("action"),
                    data: $(e).serializeArray(),
                    callback: function() {
                        d.find("[layoutH]").layoutH()
                    }
                })
            } else
                var e
        },
        bindAjaxTodo: function() {
            $.fn.ajaxTodo && $("a[action=ajaxTodo]", document).ajaxTodo();
        },
        bindDialog: function() {
            $("a[target=dialog]").each(function() {
                bindDialog.call(this);
            })
        }
    }
}()
  , navTab = {
    componentBox: null,
    _tabBox: null,
    _prevBut: null,
    _nextBut: null,
    _panelBox: null,
    _moreBut: null,
    _moreBox: null,
    _title: null,
    _currentIndex: 0,
    _isAnimating: !1,
    _animation: 0,
    _op: {
        stNavTab: "#navTab",
        stTabBox: "#navTab-tab",
        stPanelBox: "#navTab-panel",
        stTitle: "#navTab-title",
        mainTabId: "main",
        close$: "a.close",
        prevClass: ".tabsLeft",
        nextClass: ".tabsRight",
        stMore: ".tabsMore",
        stMoreLi: "ul.tabsMoreList"
    },
    init: function(a) {
        $.History && $.History.init("#navTab");
        var b = this;
        $.extend(this._op, a),
        this.componentBox = $(this._op.stNavTab),
        this._title = this.componentBox.find(this._op.stTitle),
        this._tabBox = this.componentBox.find(this._op.stTabBox),
        this._panelBox = this.componentBox.find(this._op.stPanelBox),
        this._prevBut = this.componentBox.find(this._op.prevClass),
        this._nextBut = this.componentBox.find(this._op.nextClass),
        this._moreBut = this.componentBox.find(this._op.stMore),
        this._moreBox = this.componentBox.find(this._op.stMoreLi),
        this._prevBut.click(function(a) {
            b._scrollPrev()
        }),
        this._nextBut.click(function(a) {
            b._scrollNext()
        }),
        this._moreBut.click(function() {
            return b._moreBox.show(),
            !1
        }),
        $(document).click(function() {
            b._moreBox.hide()
        }),
        this._contextmenu(this._tabBox),
        this._contextmenu(this._getTabs()),
        this._init(),
        this._ctrlScrollBut()
    },
    _init: function(a) {
        var b = this;
        this._getTabs().each(function(a) {
            $(this).unbind("click").click(function(c) {
                b._switchTab(a)
            }),
            $(this).find(navTab._op.close$).unbind("click").click(function() {
                b._closeTab(a)
            })
        }),
        this._getMoreLi().each(function(a) {
            $(this).find(">a").unbind("click").click(function(c) {
                b._switchTab(a)
            })
        }),
        this._switchTab(this._currentIndex)
    },
    _contextmenu: function(a) {
        var b = this;
        a.contextMenu("navTabCM", {
            bindings: {
                reload: function(a, c) {
                    b._reload(a, !0)
                },
                closeCurrent: function(a, c) {
                    var d = a.attr("tabid");
                    d ? b.closeTab(d) : b.closeCurrentTab()
                },
                closeOther: function(a, c) {
                    var d = b._indexTabId(a.attr("tabid"));
                    b._closeOtherTab(d > 0 ? d : b._currentIndex)
                },
                closeAll: function(a, c) {
                    b.closeAllTab()
                }
            },
            ctrSub: function(a, c) {
                var d = c.find("[rel='reload']")
                  , e = c.find("[rel='closeCurrent']")
                  , f = c.find("[rel='closeOther']")
                  , g = c.find("[rel='closeAll']")
                  , h = b._getTabs();
                h.size() < 2 && (e.addClass("disabled"),
                f.addClass("disabled"),
                g.addClass("disabled")),
                0 == b._currentIndex || a.attr("tabid") == b._op.mainTabId ? (e.addClass("disabled"),
                d.addClass("disabled")) : 2 == h.size() && f.addClass("disabled")
            }
        })
    },
    _getTabs: function() {
        return this._tabBox.find("> li")
    },
    _getPanels: function() {
        return this._panelBox.find("> div")
    },
    _getMoreLi: function() {
        return this._moreBox.find("> li")
    },
    _getTab: function(a) {
        var b = this._indexTabId(a);
        if (b >= 0)
            return this._getTabs().eq(b)
    },
    getPanel: function(a) {
        var b = this._indexTabId(a);
        if (b >= 0)
            return this._getPanels().eq(b)
    },
    _getTabsW: function(a, b) {
        return this._tabsW(this._getTabs().slice(a, b))
    },
    _tabsW: function(a) {
        var b = 0;
        return a.each(function() {
            b += $(this).outerWidth(!0)
        }),
        b
    },
    _indexTabId: function(a) {
        if (!a)
            return -1;
        var b = -1;
        return this._getTabs().each(function(c) {
            if ($(this).attr("tabid") == a)
                return void (b = c)
        }),
        b
    },
    _getLeft: function() {
        return this._tabBox.position().left
    },
    _getScrollBarW: function() {
        return this.componentBox.width() - 55
    },
    _visibleStart: function() {
        for (var a = this._getLeft(), b = 0, c = this._getTabs(), d = 0; d < c.size(); d++) {
            if (b + a >= 0)
                return d;
            b += c.eq(d).outerWidth(!0)
        }
        return 0
    },
    _visibleEnd: function() {
        for (var a = this._getLeft(), b = 0, c = this._getTabs(), d = 0; d < c.size(); d++)
            if ((b += c.eq(d).outerWidth(!0)) + a > this._getScrollBarW())
                return d;
        return c.size()
    },
    _scrollPrev: function() {
        var a = this._visibleStart();
        a > 0 && this._scrollTab(-this._getTabsW(0, a - 1))
    },
    _scrollNext: function() {
        var a = this._visibleEnd();
        a < this._getTabs().size() && this._scrollTab(-this._getTabsW(0, a + 1) + this._getScrollBarW())
    },
    _scrollTab: function(a, b) {
        var c = this;
        this._tabBox.animate({
            left: a + "px"
        }, 200, function() {
            c._ctrlScrollBut()
        })
    },
    _scrollCurrent: function() {
        var a = this._tabsW(this._getTabs());
        a <= this._getScrollBarW() ? this._scrollTab(0) : this._getLeft() < this._getScrollBarW() - a ? this._scrollTab(this._getScrollBarW() - a) : this._currentIndex < this._visibleStart() ? this._scrollTab(-this._getTabsW(0, this._currentIndex)) : this._currentIndex >= this._visibleEnd() && this._scrollTab(this._getScrollBarW() - this._getTabs().eq(this._currentIndex).outerWidth(!0) - this._getTabsW(0, this._currentIndex))
    },
    _ctrlScrollBut: function() {
        var a = this._tabsW(this._getTabs());
        this._getScrollBarW() > a ? (this._prevBut.hide(),
        this._nextBut.hide(),
        this._tabBox.parent().removeClass("tabsPageHeaderMargin")) : (this._prevBut.show().removeClass("tabsLeftDisabled"),
        this._nextBut.show().removeClass("tabsRightDisabled"),
        this._tabBox.parent().addClass("tabsPageHeaderMargin"),
        this._getLeft() >= 0 ? this._prevBut.addClass("tabsLeftDisabled") : this._getLeft() <= this._getScrollBarW() - a && this._nextBut.addClass("tabsRightDisabled"))
    },
    switchTab: function(a) {
        var b = this._indexTabId(a);
        this._switchTab(b)
    },
    _switchTab: function(a) {
        var b = this._getTabs().removeClass("selected").eq(a).addClass("selected");
        if (this._getPanels().hide().eq(a).show(),
        this._getMoreLi().removeClass("selected").eq(a).addClass("selected"),
        this._animation > 0 && this._currentIndex != a) {
            var c = this._getPanels().eq(this._currentIndex)
              , d = this._getPanels().eq(a);
            this._animate(this._animation, {
                currPage: c,
                nextPage: d
            })
        }
        this._currentIndex = a,
        this._scrollCurrent(),
        this._reload(b)
    },
    _resetPage: function(a, b) {
        a.attr("class", "page unitBox"),
        b.attr("class", "page unitBox"),
        this._isAnimating = !1,
        this._animation = 0
    },
    _animate: function(a, b) {
        var c = $.extend({
            currPage: "",
            nextPage: ""
        }, b)
          , a = parseInt(a)
          , d = c.currPage
          , e = c.nextPage
          , f = ""
          , g = "";
        if (this._isAnimating)
            return !1;
        switch (this._isAnimating = !0,
        a) {
        case 1:
            f = "pt-page-moveToLeft",
            g = "pt-page-moveFromRight";
            break;
        case 2:
            f = "pt-page-moveToRight",
            g = "pt-page-moveFromLeft";
            break;
        case 3:
            f = "pt-page-moveToTop",
            g = "pt-page-moveFromBottom";
            break;
        case 4:
            f = "pt-page-moveToBottom",
            g = "pt-page-moveFromTop";
            break;
        case 5:
            f = "pt-page-fade",
            g = "pt-page-moveFromRight pt-page-ontop";
            break;
        case 6:
            f = "pt-page-fade",
            g = "pt-page-moveFromLeft pt-page-ontop";
            break;
        case 7:
            f = "pt-page-fade",
            g = "pt-page-moveFromBottom pt-page-ontop";
            break;
        case 8:
            f = "pt-page-fade",
            g = "pt-page-moveFromTop pt-page-ontop";
            break;
        case 9:
            f = "pt-page-moveToLeftFade",
            g = "pt-page-moveFromRightFade";
            break;
        case 10:
            f = "pt-page-moveToRightFade",
            g = "pt-page-moveFromLeftFade";
            break;
        case 11:
            f = "pt-page-moveToTopFade",
            g = "pt-page-moveFromBottomFade";
            break;
        case 12:
            f = "pt-page-moveToBottomFade",
            g = "pt-page-moveFromTopFade";
            break;
        case 13:
            f = "pt-page-moveToLeftEasing pt-page-ontop",
            g = "pt-page-moveFromRight";
            break;
        case 14:
            f = "pt-page-moveToRightEasing pt-page-ontop",
            g = "pt-page-moveFromLeft";
            break;
        case 15:
            f = "pt-page-moveToTopEasing pt-page-ontop",
            g = "pt-page-moveFromBottom";
            break;
        case 16:
            f = "pt-page-moveToBottomEasing pt-page-ontop",
            g = "pt-page-moveFromTop"
        }
        var h = "animationend"
          , i = !1
          , j = !1;
        d.addClass(f).on(h, function() {
            d.off(h),
            i = !0,
            j && this._resetPage(d, e)
        }),
        e.addClass(g).on(h, function() {
            e.off(h),
            j = !0,
            i && this._resetPage(d, e)
        })
    },
    _closeTab: function(a, b) {
        if (this._getTabs().eq(a).remove(),
        this._getPanels().eq(a).trigger(AjaxDo.eventType.pageClear).remove(),
        this._getMoreLi().eq(a).remove(),
        this._currentIndex >= a && this._currentIndex--,
        b) {
            var c = this._indexTabId(b);
            c >= 0 && (this._currentIndex = c)
        }
        this._init(),
        this._scrollCurrent(),
        this._reload(this._getTabs().eq(this._currentIndex))
    },
    closeTab: function(a, b) {
        var c = this._indexTabId(a);
        c > 0 && this._closeTab(c, b)
    },
    closeCurrentTab: function(a) {
        this._currentIndex > 0 && this._closeTab(this._currentIndex, a)
    },
    closeAllTab: function() {
        this._getTabs().filter(":gt(0)").remove(),
        this._getPanels().filter(":gt(0)").trigger(AjaxDo.eventType.pageClear).remove(),
        this._getMoreLi().filter(":gt(0)").remove(),
        this._currentIndex = 0,
        this._init(),
        this._scrollCurrent()
    },
    _closeOtherTab: function(a) {
        if ((a = a || this._currentIndex) > 0) {
            var b = ":eq(" + a + ")";
            this._getTabs().not(b).filter(":gt(0)").remove(),
            this._getPanels().not(b).filter(":gt(0)").trigger(AjaxDo.eventType.pageClear).remove(),
            this._getMoreLi().not(b).filter(":gt(0)").remove(),
            this._currentIndex = 1,
            this._init(),
            this._scrollCurrent()
        } else
            this.closeAllTab()
    },
    _loadUrlCallback: function(a) {
        a.find("[layoutH]").layoutH(),
        a.find(":button.closeTab").click(function() {
            navTab.closeCurrentTab()
        })
    },
    _reload: function(a, b) {
        b = b || a.data("reloadFlag");
        var c = a.attr("url");
        if (b && c) {
            a.data("reloadFlag", null);
            var d = this.getPanel(a.attr("tabid"));
            if (a.hasClass("external"))
                navTab.openExternal(c, d);
            else {
                var e = $("#pagerForm", d)
                  , f = e.size() > 0 ? e.serializeArray() : {};
                d.loadUrl(c, f, function() {
                    navTab._loadUrlCallback(d)
                })
            }
        }
    },
    reloadFlag: function(a) {
        var b = this._getTab(a);
        b && (this._indexTabId(a) == this._currentIndex ? this._reload(b, !0) : b.data("reloadFlag", 1))
    },
    reloadCurrentTab: function() {
        var a = this._currentIndex;
        a >= 0 && ($tab = this._getTabs().eq(a),
        this._reload($tab, !0))
    },
    reload: function(a, b) {
        var c = $.extend({
            data: {},
            navTabId: "",
            callback: null
        }, b)
          , d = c.navTabId ? this._getTab(c.navTabId) : this._getTabs().eq(this._currentIndex)
          , e = c.navTabId ? this.getPanel(c.navTabId) : this._getPanels().eq(this._currentIndex);
        if (e && (a || (a = d.attr("url")),
        a))
            if (d.hasClass("external"))
                navTab.openExternal(a, e);
            else {
                if ($.isEmptyObject(c.data)) {
                    var f = $("#pagerForm", e);
                    c.data = f.size() > 0 ? f.serializeArray() : {}
                }
                e.ajaxUrl({
                    type: "POST",
                    url: a,
                    data: c.data,
                    callback: function(a) {
                        navTab._loadUrlCallback(e),
                        $.isFunction(c.callback) && c.callback(a)
                    }
                })
            }
    },
    getCurrentPanel: function() {
        return this._getPanels().eq(this._currentIndex)
    },
    checkTimeout: function() {
        var a = AjaxDo.jsonEval(this.getCurrentPanel().html());
        a && a.statusCode == AjaxDo.statusCode.timeout && this.closeCurrentTab()
    },
    openExternal: function(a, b) {
        var c = navTab.componentBox.height() - 5;
        b.html('<iframe src="{url}" style="width:100%;height:{height};" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>'.replaceAll("{url}", a).replaceAll("{height}", c + "px"))
    },
    openTab: function(a, b, c) {
        var d = $.extend({
            title: "",
            data: {},
            fresh: !0,
            external: !1,
            close: !1,
            closebtn: !1,
            animate: 0,
            header: "show",
            footer: "show"
        }, c)
          , e = this._indexTabId(a);
        if (d.close)
            return void navTab.closeCurrentTab(a);
        if (d.animate > 0 && (this._animation = d.animate),
        e >= 0) {
            var f = this._getTabs().eq(e)
              , g = f.attr("tabid") == this._op.mainTabId ? "> span > span" : "> span";
            f.find(">a").attr("title", d.title).find(g).html(d.title),
            this._title.text(d.title);
            var h = this._getPanels().eq(e);
            (d.fresh || f.attr("url") != b) && (f.attr("url", b),
            d.external ? (f.addClass("external"),
            navTab.openExternal(b, h)) : b.isExternalUrl() ? (f.removeClass("external"),
            h.ajaxJson({
                type: "GET",
                url: b,
                datafor: "pageUI",
                data: d.data,
                callback: function() {
                    void 0 != d.callback && d.callback(),
                    navTab._loadUrlCallback(h)
                }
            })) : (f.removeClass("external"),
            h.ajaxUrl({
                type: "GET",
                url: b,
                data: d.data,
                callback: function() {
                    void 0 != d.callback && d.callback(),
                    navTab._loadUrlCallback(h)
                }
            }))),
            this._currentIndex = e
        } else {
            var i = d.closebtn ? "closebtn" : ""
              , j = '<li tabid="#tabid#"><a href="javascript:" title="#title#" class="#tabid#"><span>#title#</span></a><a href="javascript:;" class="close navTabClose ' + i + '">close</a></li>';
            this._tabBox.append(j.replaceAll("#tabid#", a).replaceAll("#title#", d.title)),
            this._panelBox.append('<div class="page unitBox"></div>'),
            this._moreBox.append('<li><a href="javascript:" title="#title#">#title#</a></li>'.replaceAll("#title#", d.title)),
            this._title.text(d.title);
            var k = this._getTabs()
              , f = k.filter(":last")
              , h = this._getPanels().filter(":last");
            d.external ? (f.addClass("external"),
            navTab.openExternal(b, h)) : b.isExternalUrl() ? (f.removeClass("external"),
            h.ajaxJson({
                type: "GET",
                url: b,
                datafor: "pageUI",
                data: d.data,
                callback: function() {
                    void 0 != d.callback && d.callback(),
                    navTab._loadUrlCallback(h)
                }
            })) : (f.removeClass("external"),
            h.ajaxUrl({
                type: "GET",
                url: b,
                data: d.data,
                callback: function() {
                    void 0 != d.callback && d.callback(),
                    navTab._loadUrlCallback(h)
                }
            })),
            $.History && setTimeout(function() {
                $.History.addHistory(a, function(a) {
                    var b = navTab._indexTabId(a);
                    b >= 0 && navTab._switchTab(b)
                }, a)
            }, 10),
            this._currentIndex = k.size() - 1,
            this._contextmenu(k.filter(":last").hoverClass("hover"))
        }
        this._init(),
        this._scrollCurrent(),
        this._getTabs().eq(this._currentIndex).attr("url", b)
    }
};
!function(a) {
    function b(b, g, h, i) {
        var j = f[b]
          , k = a('<ul id="navTabCM"><li rel="reload">刷新标签页</li><li rel="closeCurrent">关闭标签页</li><li rel="closeOther">关闭其它标签页</li><li rel="closeAll">关闭全部标签页</li></ul>');
        k.find("li").hoverClass(),
        d.html(k),
        a.each(j.bindings, function(b, e) {
            a("[rel='" + b + "']", d).bind("click", function(b) {
                c(),
                e(a(g), a("#" + j.id))
            })
        });
        var l = h.pageX
          , m = h.pageY;
        a(window).width() < l + d.width() && (l -= d.width()),
        a(window).height() < m + d.height() && (m -= d.height()),
        d.css({
            left: l,
            top: m
        }).show(),
        j.shadow && e.css({
            width: d.width(),
            height: d.height(),
            left: l + 3,
            top: m + 3
        }).show(),
        a(document).one("click", c),
        a.isFunction(j.ctrSub) && j.ctrSub(a(g), a("#" + j.id))
    }
    function c() {
        d.hide(),
        e.hide()
    }
    var d, e, f;
    a.fn.extend({
        contextMenu: function(c, g) {
            var h = a.extend({
                shadow: !0,
                bindings: {},
                ctrSub: null
            }, g);
            d || (d = a('<div id="contextmenu"></div>').appendTo("body").hide()),
            e || (e = a('<div id="contextmenuShadow"></div>').appendTo("body").hide()),
            f = f || [],
            f.push({
                id: c,
                shadow: h.shadow,
                bindings: h.bindings || {},
                ctrSub: h.ctrSub
            });
            var i = f.length - 1;
            return a(this).bind("contextmenu", function(a) {
                return b(i, this, a, h),
                !1
            }),
            this
        }
    })
}(jQuery),
function(a) {
    a.extend({
        browser: {},
        History: {
            _hash: new Array,
            _cont: void 0,
            _currentHash: "",
            _callback: void 0,
            init: function(b, c) {
                a.History._cont = b,
                a.History._callback = c;
                var d = location.hash.replace(/\?.*$/, "");
                if (a.History._currentHash = d,
                a.browser.msie) {
                    "" == a.History._currentHash && (a.History._currentHash = "#"),
                    a("body").append('<iframe id="jQuery_history" style="display: none;" src="about:blank"></iframe>');
                    var e = a("#jQuery_history")[0]
                      , f = e.contentDocument || e.contentWindow.document;
                    f.open(),
                    f.close(),
                    f.location.hash = d
                }
                a.isFunction(this._callback) && a.History._callback(d.skipChar("#")),
                setInterval(a.History._historyCheck, 100)
            },
            _historyCheck: function() {
                var b = "";
                (b = a.browser.msie ? a("#jQuery_history")[0].contentWindow.location.hash.skipChar("#").replace(/\?.*$/, "") : location.hash.skipChar("#").replace(/\?.*$/, "")) != a.History._currentHash && (a.History._currentHash = b,
                a.History.loadHistory(b))
            },
            addHistory: function(b, c, d) {
                a.History._currentHash = b;
                var e = [b, c, d];
                if (a.History._hash.push(e),
                a.browser.msie) {
                    var f = a("#jQuery_history")[0]
                      , g = f.contentDocument || f.contentWindow.document;
                    g.open(),
                    g.close(),
                    g.location.hash = b.replace(/\?.*$/, ""),
                    location.hash = b.replace(/\?.*$/, "")
                } else
                    location.hash = b.replace(/\?.*$/, "")
            },
            loadHistory: function(b) {
                a.browser.msie && (location.hash = b);
                for (var c = 0; c < a.History._hash.length; c += 1)
                    if (a.History._hash[c][0] == b)
                        return void a.History._hash[c][1](a.History._hash[c][2])
            }
        },
        ajaxdo: function(b) {
            void 0 !== b.type && "post" == b.type.toLowerCase() ? (void 0 === b.data && (b.data = {}),
            "string" == typeof b.data ? b.data += "&_hash=" + a.cookie("ypre_saltkey") : b.data._hash = a.cookie("ypre_saltkey")) : b.url = b.url + (/\?/.test(b.url) ? "&" : "?") + "_hash=" + a.cookie("ypre_saltkey"),
            a.ajax(b)
        }
    })
}(jQuery),
function(a) {
    a(["jquery"], function(a) {
        return function() {
            function b(a, b, c) {
                return j({
                    type: r.error,
                    iconClass: l().iconClasses.error,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function c(a, b, c) {
                return j({
                    type: r.info,
                    iconClass: l().iconClasses.info,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function d(a) {
                o = a
            }
            function e(a, b, c) {
                return j({
                    type: r.success,
                    iconClass: l().iconClasses.success,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function f(a, b, c) {
                return j({
                    type: r.warning,
                    iconClass: l().iconClasses.warning,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function g(b) {
                var c = l();
                if (n || k(c),
                b && 0 === a(":focus", b).length)
                    return void b[c.hideMethod]({
                        duration: c.hideDuration,
                        easing: c.hideEasing,
                        complete: function() {
                            m(b)
                        }
                    });
                n.children().length && n[c.hideMethod]({
                    duration: c.hideDuration,
                    easing: c.hideEasing,
                    complete: function() {
                        n.remove()
                    }
                })
            }
            function h() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: "<button>&times;</button>",
                    newestOnTop: !0
                }
            }
            function i(a) {
                o && o(a)
            }
            function j(b) {
                function c(b) {
                    if (!a(":focus", j).length || b)
                        return j[f.hideMethod]({
                            duration: f.hideDuration,
                            easing: f.hideEasing,
                            complete: function() {
                                m(j),
                                f.onHidden && f.onHidden(),
                                s.state = "hidden",
                                s.endTime = new Date,
                                i(s)
                            }
                        })
                }
                function d() {
                    (f.timeOut > 0 || f.extendedTimeOut > 0) && (h = setTimeout(c, f.extendedTimeOut))
                }
                function e() {
                    clearTimeout(h),
                    j.stop(!0, !0)[f.showMethod]({
                        duration: f.showDuration,
                        easing: f.showEasing
                    })
                }
                var f = l()
                  , g = b.iconClass || f.iconClass;
                void 0 !== b.optionsOverride && (f = a.extend(f, b.optionsOverride),
                g = b.optionsOverride.iconClass || g),
                q++,
                n = k(f);
                var h = null
                  , j = a("<div/>")
                  , o = a("<div/>")
                  , p = a("<div/>")
                  , r = a(f.closeHtml)
                  , s = {
                    toastId: q,
                    state: "visible",
                    startTime: new Date,
                    options: f,
                    map: b
                };
                return b.iconClass && j.addClass(f.toastClass).addClass(g),
                b.title && (o.append(b.title).addClass(f.titleClass),
                j.append(o)),
                b.message && (p.append(b.message).addClass(f.messageClass),
                j.append(p)),
                f.closeButton && (r.addClass("toast-close-button"),
                j.prepend(r)),
                j.hide(),
                f.newestOnTop ? n.prepend(j) : n.append(j),
                j[f.showMethod]({
                    duration: f.showDuration,
                    easing: f.showEasing,
                    complete: f.onShown
                }),
                f.timeOut > 0 && (h = setTimeout(c, f.timeOut)),
                j.hover(e, d),
                !f.onclick && f.tapToDismiss && j.click(c),
                f.closeButton && r && r.click(function(a) {
                    a.stopPropagation(),
                    c(!0)
                }),
                f.onclick && j.click(function() {
                    f.onclick(),
                    c()
                }),
                i(s),
                f.debug && console && console.log(s),
                j
            }
            function k(b) {
                return b || (b = l()),
                n = a("#" + b.containerId),
                n.length ? n : (n = a("<div/>").attr("id", b.containerId).addClass(b.positionClass),
                n.appendTo(a(b.target)),
                n)
            }
            function l() {
                return a.extend({}, h(), s.options)
            }
            function m(a) {
                n || (n = k()),
                a.is(":visible") || (a.remove(),
                a = null,
                0 === n.children().length && n.remove())
            }
            var n, o, p = "2.0.1", q = 0, r = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            }, s = {
                clear: g,
                error: b,
                getContainer: k,
                info: c,
                options: {},
                subscribe: d,
                success: e,
                version: p,
                warning: f
            };
            return s
        }()
    })
}("function" == typeof define && define.amd ? define : function(a, b) {
    window.toastr = b(window.jQuery)
}
),
function($) {
    $.setRegional = function(a, b) {
        $.regional || ($.regional = {}),
        $.regional[a] = b
    }
    ,
    $.fn.extend({
        ajaxTodo: function() {
            return this.each(function() {
                var $this = $(this);
                $this.unbind("click").click(function(event) {
                    var predo = $this.attr("predo"), predofn;
                    predo && (predofn = eval("(" + predo + ")"),
                    predofn.call($this[0]));
                    var url = unescape($this.attr("href")).replaceTmById($(event.target).parents(".unitBox:first"));
                    if (AjaxDo.debug(url),
                    !url.isFinishedTm())
                        return AjaxDo.alertMsg($this.attr("warn") || AjaxDo.msg("alertSelectMsg")),
                        !1;
                    var title = $this.attr("title");
                    title ? "undefined" != typeof swal ? swal({
                        title: "",
                        text: title,
                        type: "warning",
                        showCancelButton: !0,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    }, function() {
                        AjaxDo.ajaxTodo(url, $this.attr("callback"))
                    }) : confirm(title) && AjaxDo.ajaxTodo(url, $this.attr("callback")) : AjaxDo.ajaxTodo(url, $this.attr("callback")),
                    event.preventDefault()
                })
            })
        },
        ajaxUrl: function(a) {
            var b = $(this)
              , c = a.error || AjaxDo.ajaxError;
            b.trigger(AjaxDo.eventType.pageClear),
            $.ajax({
                type: a.type || "GET",
                url: a.url,
                data: a.data,
                cache: !1,
                success: function(c) {
                    var d = AjaxDo.jsonEval(c);
                    AjaxDo.ajaxbg.hide(),
                    d.statusCode == AjaxDo.statusCode.unlogin ? (d.message && AjaxDo.alertMsg(d.message),
                    AjaxDo.reload()) : d.statusCode == AjaxDo.statusCode.warning?d.message && AjaxDo.alertMsg(d.message,302):d.statusCode == AjaxDo.statusCode.error ? d.message && AjaxDo.alertMsg(d.message) : (b.html(c).initUI(),
                    $.isFunction(a.callback) && a.callback(c)),
                    d.statusCode == AjaxDo.statusCode.timeout && ($.pdialog && $.pdialog.checkTimeout(),
                    navTab && navTab.checkTimeout(),
                    AjaxDo.alertMsg(d.message || AjaxDo.msg("请求超时"), {
                        okCall: function() {
                            alert(AjaxDo.msg("请求超时") || thrownError)
                        }
                    }))
                },
                error: c,
                statusCode: {
                    503: function(a, b, c) {
                        alert(AjaxDo.msg("请求错误") || c)
                    }
                }
            })
        },
        ajaxJson: function(a) {
            var b = $(this)
              , c = a.error || AjaxDo.ajaxError
              , d = a.datafor || "data";
            b.trigger(AjaxDo.eventType.pageClear),
            $.ajax({
                type: "GET",
                async: !1,
                url: a.url,
                data: a.data,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(c) {
                    var c = AjaxDo.jsonEval(c);
                    "pageUI" == d && b.html(c.html).initUI(),
                    $.isFunction(a.callback) && a.callback(c)
                },
                error: c,
                statusCode: {
                    503: function(a, b, c) {
                        alert(AjaxDo.msg("statusCode_503") || c)
                    }
                }
            })
        },
        loadUrl: function(a, b, c) {
            $(this).ajaxUrl({
                url: a,
                data: b,
                callback: c
            })
        },
        initUI: function() {
            return this.each(function() {
                AjaxDo.initUI(this)
            })
        },
        layoutH: function(a) {
            return this.each(function() {
                var b = $(this);
                a || (a = b.parents("div.layoutBox:first"));
                var c = a.height()
                  , d = parseInt(b.attr("layoutH"))
                  , e = c - d > 50 ? c - d : 50;
                b.isTag("table") ? b.removeAttr("layoutH").wrap('<div layoutH="' + d + '" style="overflow:auto;height:' + e + 'px"></div>') : b.height(e).css("overflow", "auto")
            })
        },
        hoverClass: function(a, b) {
            var c = a || "hover";
            return this.each(function() {
                var a, d = $(this);
                d.hover(function() {
                    a && clearTimeout(a),
                    d.addClass(c)
                }, function() {
                    a = setTimeout(function() {
                        d.removeClass(c)
                    }, b || 10)
                })
            })
        },
        focusClass: function(a) {
            var b = a || "textInputFocus";
            return this.each(function() {
                $(this).focus(function() {
                    $(this).addClass(b)
                }).blur(function() {
                    $(this).removeClass(b)
                })
            })
        },
        isTag: function(a) {
            return !!a && $(this)[0].tagName.toLowerCase() == a
        },
        isBind: function(a) {
            var b = $(this).data("events");
            return b && a && b[a]
        },
        log: function(a) {
            return this.each(function() {
                console && console.log("%s: %o", a, this)
            })
        }
    }),
    $.extend(String.prototype, {
        isPositiveInteger: function() {
            return new RegExp(/^[1-9]\d*$/).test(this)
        },
        isInteger: function() {
            return new RegExp(/^\d+$/).test(this)
        },
        isNumber: function(a, b) {
            return new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this)
        },
        // trim: function() {
        //     return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "")
        // },
        startsWith: function(a) {
            return 0 === this.indexOf(a)
        },
        endsWith: function(a) {
            var b = this.length - a.length;
            return b >= 0 && this.lastIndexOf(a) === b
        },
        replaceSuffix: function(a) {
            return this.replace(/\[[0-9]+\]/, "[" + a + "]").replace("#index#", a)
        },
        trans: function() {
            return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
        },
        encodeTXT: function() {
            return this.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll(" ", "&nbsp;")
        },
        replaceAll: function(a, b) {
            return this.replace(new RegExp(a,"gm"), b)
        },
        replaceTm: function(a) {
            return a ? this.replace(RegExp("({[A-Za-z_]+[A-Za-z0-9_]*})", "g"), function(b) {
                return a[b.replace(/[{}]+/g, "")]
            }) : this
        },
        replaceTmById: function(a) {
            var b = a || $(document);
            return this.replace(RegExp("({[A-Za-z_]+[A-Za-z0-9_]*})", "g"), function(a) {
                var c = b.find("#" + a.replace(/[{}]+/g, ""));
                return c.val() ? c.val() : a
            })
        },
        isFinishedTm: function() {
            return !new RegExp("{[A-Za-z_]+[A-Za-z0-9_]*}").test(this)
        },
        skipChar: function(a) {
            return this && 0 !== this.length ? this.charAt(0) === a ? this.substring(1).skipChar(a) : this : ""
        },
        isValidPwd: function() {
            return new RegExp(/^([_]|[a-zA-Z0-9]){6,32}$/).test(this)
        },
        isValidMail: function() {
            return new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim())
        },
        isSpaces: function() {
            for (var a = 0; a < this.length; a += 1) {
                var b = this.charAt(a);
                if (" " != b && "\n" != b && "\t" != b && "\r" != b)
                    return !1
            }
            return !0
        },
        isPhone: function() {
            return new RegExp(/(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/).test(this)
        },
        isUrl: function() {
            return new RegExp(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/).test(this)
        },
        isExternalUrl: function() {
            return this.isUrl() && -1 == this.indexOf("://" + document.domain)
        }
    })
}(jQuery),
function($) {
    $.extend({
        storage: {
            handle: window.localStorage,
            data: window.localStorage,
            _cont: void 0,
            _currentHash: "",
            _callback: void 0,
            init: function(a, b) {
                $.History._cont = a,
                $.History._callback = b;
                var c = location.hash.replace(/\?.*$/, "");
                $.History._currentHash = c
            },
            jsonEval: function(data) {
                try {
                    return "string" == $.type(data) ? eval("(" + data + ")") : data
                } catch (a) {
                    return data
                }
            },
            set: function(a, b) {
                "object" == typeof b && (b = JSON.stringify(b)),
                $.storage.handle.setItem(a, b)
            },
            get: function(a) {
                return $.storage.jsonEval($.storage.handle.getItem(a))
            },
            setItem: function(a, b) {
                $.storage.handle.setItem(a, b)
            },
            getItem: function(a) {
                return $.storage.handle.getItem(a)
            },
            getkey: function(a) {
                return $.storage.handle.key(a)
            },
            remove: function(a) {
                $.storage.handle.removeItem(a)
            },
            clear: function() {
                $.storage.handle.clear()
            }
        },
        session: {
            handle: window.sessionStorage,
            data: window.sessionStorage,
            jsonEval: function(data) {
                try {
                    return "string" == $.type(data) ? eval("(" + data + ")") : data
                } catch (a) {
                    return data
                }
            },
            set: function(a, b) {
                "object" == typeof b && (b = JSON.stringify(b)),
                $.storage.handle.setItem(a, b)
            },
            get: function(a) {
                return $.storage.jsonEval($.storage.handle.getItem(a))
            },
            setItem: function(a, b) {
                $.storage.handle.setItem(a, b)
            },
            getItem: function(a) {
                return $.storage.handle.getItem(a)
            },
            getkey: function(a) {
                return $.storage.handle.key(a)
            },
            remove: function(a) {
                $.storage.handle.removeItem(a)
            },
            clear: function() {
                $.storage.handle.clear()
            }
        }
    })
}(jQuery);

var $doc     = jQuery(document),
    $window  = jQuery(window);

jQuery(document).ready(function() {

    jQuery(document).on("click", ".del-img" , function(event)
    {
        event.preventDefault(event);

        jQuery(this).parent().fadeOut(function()
        {
            jQuery(this).hide();
            jQuery(this).parent().find('input[class="img-path"]').attr('value', '' );
        });
    });

    jQuery('.on-of').checkbox({empty: ''});



    //jQuery(".layouts-inner li").addClass("selectd");
    /*jQuery(document).on("click", ".layouts-inner li" , function(){
        jQuery(this).parent('.layouts-inner').find('li').removeClass('selectd');
        jQuery(this).addClass('selectd');
        jQuery(this).parent('.layouts-inner').find('input').removeAttr('checked');
        jQuery(this).parent('.layouts-inner').find('input').attr('checked','checked');

        return false;
    });*/

/*  */  jQuery(document).on("click", ".layouts-inner li" , function(event){

        event.preventDefault();

        jQuery(this).parent('ul').find('li').removeClass('selectd');
        jQuery(this).addClass('selectd');
        jQuery(this).parent('ul').find('input').removeAttr('checked');
        jQuery(this).find('input').attr('checked','checked');

        return false;
    });



    jQuery(document).on("click", ".layouts-inner li" , function(){
        jQuery(this).parent('.layouts-inner').find('li').removeClass('selectd');
        jQuery(this).addClass('selectd');
    });

    var linkOptions     = jQuery('#item-bd_post_link_text, #item-bd_post_link_url, #link_options'),
        linkTrigger     = jQuery('#post-format-link'),
        quoteOptions    = jQuery('#item-bd_post_quote_author, #quote_options'),
        quoteTrigger    = jQuery('#post-format-quote'),
        group           = jQuery('#post-formats-select input');

    woohoo_hide(null);

    jQuery(document).on('change', '#post-formats-select input', function(event)
    {
        event.preventDefault(event);

        $that = jQuery(this);
        woohoo_hide(null);

        if( $that.val() =="link" )
        {
            linkOptions.stop().fadeIn('fast');
        }
        else if( $that.val() =='quote' )
        {
            quoteOptions.stop().fadeIn('fast');
        }
    });

    if(linkTrigger.is(':checked')) linkOptions.stop().fadeIn('fast');
    if(quoteTrigger.is(':checked')) quoteOptions.stop().fadeIn('fast');

    function woohoo_hide(notThisOne) {
        linkOptions.css('display', 'none');
        quoteOptions.css('display', 'none');
    }
});

function add_cat(input_id, cat) {
    var input_id;
    var cat;
    if (cat != '') {
        var input_val = jQuery('#' + input_id).val();
        if (input_val == '') {
            jQuery('#' + input_id).val(cat);
        } else {
            jQuery('#' + input_id).val(input_val + ',' + cat);
        }
    }
}
function add_tag(input_id, tag) {
    var input_id;
    var tag;
    if (tag != '') {
        var input_val = jQuery('#' + input_id).val();
        if (input_val == '') {
            jQuery('#' + input_id).val(tag);
        } else {
            jQuery('#' + input_id).val(input_val + ',' + tag);
        }
    }
}

// image Uploader Functions
function woohoo_set_uploader(field, styling ) {
    var bd_bg_uploader;
    jQuery(document).on("click", "#upload_"+field+"_button" , function( event ){
        event.preventDefault();
        bd_bg_uploader = wp.media.frames.bd_bg_uploader = wp.media({
            title: 'Choose Image',
            library: {type: 'image'},
            button: {text: 'Select'},
            multiple: false
        });

        bd_bg_uploader.on( 'select', function() {
            var selection = bd_bg_uploader.state().get('selection');
            selection.map( function( attachment ) {
                attachment = attachment.toJSON();

                if( styling )
                    jQuery('#'+field+'-img').val(attachment.url);
                else
                    jQuery('#'+field).val(attachment.url);

                jQuery('#'+field+'-preview').show();
                jQuery('#'+field+'-preview img').attr("src", attachment.url );
            });
        });
        bd_bg_uploader.open();
    });
}

(function($){var i=function(e){if(!e)var e=window.event;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()};$.fn.checkbox=function(f){try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}var g={cls:'jquery-checkbox',empty:'empty.png'};g=$.extend(g,f||{});var h=function(a){var b=a.checked;var c=a.disabled;var d=$(a);if(a.stateInterval)clearInterval(a.stateInterval);a.stateInterval=setInterval(function(){if(a.disabled!=c)d.trigger((c=!!a.disabled)?'disable':'enable');if(a.checked!=b)d.trigger((b=!!a.checked)?'check':'uncheck')},10);return d};return this.each(function(){var a=this;var b=h(a);if(a.wrapper)a.wrapper.remove();a.wrapper=$('<span class="'+g.cls+'"><span class="mark"></span></span>');a.wrapperInner=a.wrapper.children('span:eq(0)');a.wrapper.hover(function(e){a.wrapperInner.addClass(g.cls+'-hover');i(e)},function(e){a.wrapperInner.removeClass(g.cls+'-hover');i(e)});b.css({position:'absolute',zIndex:-1,visibility:'hidden'}).after(a.wrapper);var c=false;if(b.attr('id')){c=$('label[for='+b.attr('id')+']');if(!c.length)c=false}if(!c){c=b.closest?b.closest('label'):b.parents('label:eq(0)');if(!c.length)c=false}if(c){c.hover(function(e){a.wrapper.trigger('mouseover',[e])},function(e){a.wrapper.trigger('mouseout',[e])});c.click(function(e){b.trigger('click',[e]);i(e);return false})}a.wrapper.click(function(e){b.trigger('click',[e]);i(e);return false});b.click(function(e){i(e)});b.bind('disable',function(){a.wrapperInner.addClass(g.cls+'-disabled')}).bind('enable',function(){a.wrapperInner.removeClass(g.cls+'-disabled')});b.bind('check',function(){a.wrapper.addClass(g.cls+'-checked')}).bind('uncheck',function(){a.wrapper.removeClass(g.cls+'-checked')});$('img',a.wrapper).bind('dragstart',function(){return false}).bind('mousedown',function(){return false});if(window.getSelection)a.wrapper.css('MozUserSelect','none');if(a.checked)a.wrapper.addClass(g.cls+'-checked');if(a.disabled)a.wrapperInner.addClass(g.cls+'-disabled')})}})(jQuery);


!function(e,t,r){e.migrateVersion="1.4.1";var n={};function o(r){var o=t.console,a=new Error,i={warning:r,trace:a.stack||a};e.migrateWarnings.push(i),n[r]||(n[r]=!0,o&&o.warn&&!e.migrateMute&&(o.warn("JQMIGRATE: "+r),e.migrateTrace&&o.trace&&o.trace()))}function a(t,r,n,a){if(Object.defineProperty)try{return void Object.defineProperty(t,r,{configurable:!0,enumerable:!0,get:function(){return o(a),n},set:function(e){o(a),n=e}})}catch(e){}e._definePropertyBroken=!0,t[r]=n}e.migrateWarnings=[],t.console&&t.console.log&&t.console.log("JQMIGRATE: Migrate is installed"+(e.migrateMute?"":" with logging active")+", version "+e.migrateVersion),void 0===e.migrateTrace&&(e.migrateTrace=!0),e.migrateReset=function(){n={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&o("jQuery is not compatible with Quirks Mode");var i=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,c=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},u=e.attrHooks.value&&e.attrHooks.value.set||function(){},d=/^(?:input|button)$/i,l=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",i||{},"jQuery.attrFn is deprecated"),e.attr=function(t,r,n,a){var c=r.toLowerCase(),u=t&&t.nodeType;return a&&(s.length<4&&o("jQuery.fn.attr( props, pass ) is deprecated"),t&&!l.test(u)&&(i?r in i:e.isFunction(e.fn[r])))?e(t)[r](n):("type"===r&&void 0!==n&&d.test(t.nodeName)&&t.parentNode&&o("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var n,o=e.prop(t,r);return!0===o||"boolean"!=typeof o&&(n=t.getAttributeNode(r))&&!1!==n.nodeValue?r.toLowerCase():void 0},set:function(t,r,n){var o;return!1===r?e.removeAttr(t,n):((o=e.propFix[n]||n)in t&&(t[o]=!0),t.setAttribute(n,n.toLowerCase())),n}},f.test(c)&&o("jQuery.fn.attr('"+c+"') might use property instead of attribute")),s.call(e,t,r,n))},e.attrHooks.value={get:function(e,t){var r=(e.nodeName||"").toLowerCase();return"button"===r?c.apply(this,arguments):("input"!==r&&"option"!==r&&o("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var r=(e.nodeName||"").toLowerCase();if("button"===r)return u.apply(this,arguments);"input"!==r&&"option"!==r&&o("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t}};var h,v,g,y=e.fn.init,m=e.find,b=e.parseJSON,w=/^\s*</,j=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,x=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,k=/^([^<]*)(<[\w\W]+>)([^>]*)$/;for(g in e.fn.init=function(t,r,n){var a,i;return t&&"string"==typeof t&&!e.isPlainObject(r)&&(a=k.exec(e.trim(t)))&&a[0]&&(w.test(t)||o("$(html) HTML strings must start with '<' character"),a[3]&&o("$(html) HTML text after last tag is ignored"),"#"===a[0].charAt(0)&&(o("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),r&&r.context&&r.context.nodeType&&(r=r.context),e.parseHTML)?y.call(this,e.parseHTML(a[2],r&&r.ownerDocument||r||document,!0),r,n):(i=y.apply(this,arguments),t&&void 0!==t.selector?(i.selector=t.selector,i.context=t.context):(i.selector="string"==typeof t?t:"",t&&(i.context=t.nodeType?t:r||document)),i)},e.fn.init.prototype=e.fn,e.find=function(e){var t=Array.prototype.slice.call(arguments);if("string"==typeof e&&j.test(e))try{document.querySelector(e)}catch(r){e=e.replace(x,function(e,t,r,n){return"["+t+r+'"'+n+'"]'});try{document.querySelector(e),o("Attribute selector with '#' must be quoted: "+t[0]),t[0]=e}catch(e){o("Attribute selector with '#' was not fixed: "+t[0])}}return m.apply(this,t)},m)Object.prototype.hasOwnProperty.call(m,g)&&(e.find[g]=m[g]);e.parseJSON=function(e){return e?b.apply(this,arguments):(o("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(v={},(h=e.uaMatch(navigator.userAgent)).browser&&(v[h.browser]=!0,v.version=h.version),v.chrome?v.webkit=!0:v.webkit&&(v.safari=!0),e.browser=v),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.boxModel=e.support.boxModel="CSS1Compat"===document.compatMode,a(e,"boxModel",e.boxModel,"jQuery.boxModel is deprecated"),a(e.support,"boxModel",e.support.boxModel,"jQuery.support.boxModel is deprecated"),e.sub=function(){function t(e,r){return new t.fn.init(e,r)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(n,o){var a=e.fn.init.call(this,n,o,r);return a instanceof t?a:t(a)},t.fn.init.prototype=t.fn;var r=t(document);return o("jQuery.sub() is deprecated"),t},e.fn.size=function(){return o("jQuery.fn.size() is deprecated; use the .length property"),this.length};var Q=!1;e.swap&&e.each(["height","width","reliableMarginRight"],function(t,r){var n=e.cssHooks[r]&&e.cssHooks[r].get;n&&(e.cssHooks[r].get=function(){var e;return Q=!0,e=n.apply(this,arguments),Q=!1,e})}),e.swap=function(e,t,r,n){var a,i,s={};for(i in Q||o("jQuery.swap() is undocumented and deprecated"),t)s[i]=e.style[i],e.style[i]=t[i];for(i in a=r.apply(e,n||[]),t)e.style[i]=s[i];return a},e.ajaxSetup({converters:{"text json":e.parseJSON}});var M=e.fn.data;e.fn.data=function(t){var r,n,a=this[0];return!a||"events"!==t||1!==arguments.length||(r=e.data(a,t),n=e._data(a,t),void 0!==r&&r!==n||void 0===n)?M.apply(this,arguments):(o("Use of jQuery.fn.data('events') is deprecated"),n)};var C=/\/(java|ecma)script/i;e.clean||(e.clean=function(t,r,n,a){r=(r=!(r=r||document).nodeType&&r[0]||r).ownerDocument||r,o("jQuery.clean() is deprecated");var i,s,c,u,d=[];if(e.merge(d,e.buildFragment(t,r).childNodes),n)for(c=function(e){if(!e.type||C.test(e.type))return a?a.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)},i=0;null!=(s=d[i]);i++)e.nodeName(s,"script")&&c(s)||(n.appendChild(s),void 0!==s.getElementsByTagName&&(u=e.grep(e.merge([],s.getElementsByTagName("script")),c),d.splice.apply(d,[i+1,0].concat(u)),i+=u.length));return d});var S=e.event.add,T=e.event.remove,N=e.event.trigger,H=e.fn.toggle,A=e.fn.live,L=e.fn.die,O=e.fn.load,$="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",E=new RegExp("\\b(?:"+$+")\\b"),F=/(?:^|\s)hover(\.\S+|)\b/,R=function(t){return"string"!=typeof t||e.event.special.hover?t:(F.test(t)&&o("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(F,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,r,n,a){e!==document&&E.test(t)&&o("AJAX events should be attached to document: "+t),S.call(this,e,R(t||""),r,n,a)},e.event.remove=function(e,t,r,n,o){T.call(this,e,R(t)||"",r,n,o)},e.each(["load","unload","error"],function(t,r){e.fn[r]=function(){var e=Array.prototype.slice.call(arguments,0);return"load"===r&&"string"==typeof e[0]?O.apply(this,e):(o("jQuery.fn."+r+"() is deprecated"),e.splice(0,0,r),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this))}}),e.fn.toggle=function(t,r){if(!e.isFunction(t)||!e.isFunction(r))return H.apply(this,arguments);o("jQuery.fn.toggle(handler, handler...) is deprecated");var n=arguments,a=t.guid||e.guid++,i=0,s=function(r){var o=(e._data(this,"lastToggle"+t.guid)||0)%i;return e._data(this,"lastToggle"+t.guid,o+1),r.preventDefault(),n[o].apply(this,arguments)||!1};for(s.guid=a;i<n.length;)n[i++].guid=a;return this.click(s)},e.fn.live=function(t,r,n){return o("jQuery.fn.live() is deprecated"),A?A.apply(this,arguments):(e(this.context).on(t,this.selector,r,n),this)},e.fn.die=function(t,r){return o("jQuery.fn.die() is deprecated"),L?L.apply(this,arguments):(e(this.context).off(t,this.selector||"**",r),this)},e.event.trigger=function(e,t,r,n){return r||E.test(e)||o("Global events are undocumented and deprecated"),N.call(this,e,t,r||document,n)},e.each($.split("|"),function(t,r){e.event.special[r]={setup:function(){var t=this;return t!==document&&(e.event.add(document,r+"."+e.guid,function(){e.event.trigger(r,Array.prototype.slice.call(arguments,1),t,!0)}),e._data(this,r,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,r+"."+e._data(this,r)),!1}}}),e.event.special.ready={setup:function(){this===document&&o("'ready' event is deprecated")}};var J=e.fn.andSelf||e.fn.addBack,B=e.fn.find;if(e.fn.andSelf=function(){return o("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),J.apply(this,arguments)},e.fn.find=function(e){var t=B.apply(this,arguments);return t.context=this.context,t.selector=this.selector?this.selector+" "+e:e,t},e.Callbacks){var D=e.Deferred,_=[["resolve","done",e.Callbacks("once memory"),e.Callbacks("once memory"),"resolved"],["reject","fail",e.Callbacks("once memory"),e.Callbacks("once memory"),"rejected"],["notify","progress",e.Callbacks("memory"),e.Callbacks("memory")]];e.Deferred=function(t){var r=D(),n=r.promise();return r.pipe=n.pipe=function(){var t=arguments;return o("deferred.pipe() is deprecated"),e.Deferred(function(o){e.each(_,function(a,i){var s=e.isFunction(t[a])&&t[a];r[i[1]](function(){var t=s&&s.apply(this,arguments);t&&e.isFunction(t.promise)?t.promise().done(o.resolve).fail(o.reject).progress(o.notify):o[i[0]+"With"](this===n?o.promise():this,s?[t]:arguments)})}),t=null}).promise()},r.isResolved=function(){return o("deferred.isResolved is deprecated"),"resolved"===r.state()},r.isRejected=function(){return o("deferred.isRejected is deprecated"),"rejected"===r.state()},t&&t.call(r,r),r}}}(jQuery,window);
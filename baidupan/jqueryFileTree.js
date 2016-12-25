(function(global){"use strict";var _Base64=global.Base64;var version="2.1.4";var buffer;if(typeof module!=="undefined"&&module.exports){buffer=require("buffer").Buffer}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa?function(b){return global.btoa(b)}:function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?function(u){return new buffer(u).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(u):_encode(u).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var atob=global.atob?function(a){return global.atob(a)}:function(a){return a.replace(/[\s\S]{1,4}/g,cb_decode)};var _decode=buffer?function(a){return new buffer(a,"base64").toString()}:function(a){return btou(atob(a))};var decode=function(a){return _decode(a.replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};var noConflict=function(){var Base64=global.Base64;global.Base64=_Base64;return Base64};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}})(this);
Base64.extendString();

if(access_token){

if(jQuery) (function($){
	$.ttt = function(data){
		if('string' == typeof data){
			data =  JSON.parse(data);
		}
		var d = data.list;
		var size = d.length;
		var res = '<ul class="jqueryFileTree" style="display: none;">';
		function encode(s){
			//console.log(s);
			return s;
			return s.replace(/[^/]+/g,function(e){
				console.log(e,encodeURIComponent(e));
				return encodeURIComponent(e);
			});
		}
		for(var i=0; i<size; i++){
			if(d[i]['isdir']){
				res += '<li class="directory collapsed"><a href="#" rel="'+encode(d[i]['path'])+'/">'+d[i]['path'].replace(/^.+\//,'')+'</a></li>';
			}
		}
		for(var i=0; i<size; i++){
			if(!d[i]['isdir']){
				var ext = d[i]['path'].replace(/^.*\./,'');
				res += '<li class="file ext_'+ext+'"><a href="#" rel="'+encode(d[i]['path'])+'">'+d[i]['path'].replace(/.+\//,'')+'</a></li>';
			}
		}
		res += '</ul>';
		return res;
	}
	$.extend($.fn, {
		fileTree: function(o, h) {
			// Defaults
			if( !o ) var o = {};
			if( o.root == undefined ) o.root = '/apps/bingobox/';
			//if( o.script == undefined ) o.script = 'jqueryFileTree.php';
			if( o.access_token == undefined ) o.access_token = '';
			if( o.folderEvent == undefined ) o.folderEvent = 'click';
			if( o.expandSpeed == undefined ) o.expandSpeed= 500;
			if( o.collapseSpeed == undefined ) o.collapseSpeed= 500;
			if( o.expandEasing == undefined ) o.expandEasing = null;
			if( o.collapseEasing == undefined ) o.collapseEasing = null;
			if( o.multiFolder == undefined ) o.multiFolder = true;
			if( o.loadMessage == undefined ) o.loadMessage = 'Loading...';
			$.BAIDU = 'https://pcs.baidu.com/rest/2.0/pcs/file';
			$.o = o;
			$(this).each( function() {
				//console.log('each');
				function showTree(c, t) {
					//console.log('showTree',c,t);
					$(c).addClass('wait');
					$(".jqueryFileTree.start").remove();
					$.c = c;
					$.t = t;
					console.log(t);
					//console.log($.BAIDU+'?method=list&access_token='+o.access_token+'&path='+t+'&callback=?');
					// $.getJSON($.BAIDU+'?method=list&access_token='+o.access_token+'&path='+t+'&callback=?',function(data){
					// 	console.log('showTreeCallback',data);
					// 	console.log($.ttt(data));
					// 	o = $.o;
					// 	$($.c).find('.start').html('');
					// 	$($.c).removeClass('wait').append($.ttt(data));//修改这里
					// 	if( o.root == $.t ) $($.c).find('UL:hidden').show(); else $($.c).find('UL:hidden').slideDown({ duration: o.expandSpeed, easing: o.expandEasing });
					// 	bindTree($.c);
					// });
					$.ajax({
					  dataType: "jsonp",
					  url: $.BAIDU,
					  data: {
					  	method:'list',
					  	access_token:o.access_token,
					  	path:t+''
					  },
					  success: function(data){
					  	o = $.o;
						$($.c).find('.start').html('');
						$($.c).removeClass('wait').append($.ttt(data));//修改这里
						if( o.root == $.t ) $($.c).find('UL:hidden').show(); else $($.c).find('UL:hidden').slideDown({ duration: o.expandSpeed, easing: o.expandEasing });
						bindTree($.c);
					  }
					});
					
				}
				
				function bindTree(t) {
					$(t).find('LI A').bind(o.folderEvent, function() {
						if( $(this).parent().hasClass('directory') ) {
							if( $(this).parent().hasClass('collapsed') ) {
								// Expand
								if( !o.multiFolder ) {
									$(this).parent().parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
									$(this).parent().parent().find('LI.directory').removeClass('expanded').addClass('collapsed');
								}
								$(this).parent().find('UL').remove(); // cleanup
								showTree( $(this).parent(), $(this).attr('rel').match( /.*\// ) );
								$(this).parent().removeClass('collapsed').addClass('expanded');
							} else {
								// Collapse
								$(this).parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
								$(this).parent().removeClass('expanded').addClass('collapsed');
							}
						} else {
							h($(this).attr('rel'));
						}
						return false;
					});
					// Prevent A from triggering the # on non-click events
					if( o.folderEvent.toLowerCase != 'click' ) $(t).find('LI A').bind('click', function() { return false; });
				}
				
				
				
				// Loading message
				$(this).html('<ul class="jqueryFileTree start"><li class="wait">' + o.loadMessage + '<li></ul>');
				// Get the initial file list
				showTree( $(this), escape(o.root) );
			});
		}
	
	});
	
})(jQuery);


root = '/apps/bingobox/';
$(document).ready(function () {
    $('#fileTreeDemo_3').fileTree({ root: root, access_token: access_token, folderEvent: 'click', expandSpeed: 750, collapseSpeed: 750, expandEasing: 'easeOutBounce', collapseEasing: 'easeOutBounce', loadMessage: 'Un momento...' }, function (file) {
        //alert(file);;
        var ext = file.replace(/^.*\./, '');
        $('#path').text(file.match(/^.+\//)[0].replace(root, '') + '/');
        $('#filename').text(file.replace(/^.+\//, ''));
        $('#size').text('请稍后');
        $('#md5').text('请稍后');
        $.getJSON($.BAIDU + '?callback=?', {
            method: 'meta',
            access_token: access_token,
            path: file
        }, function (json) {
            console.log(json);
            $('#size').text((Math.floor(json.list[0].size / 1024 / 10.24)) / 100 + 'M');
            $('#md5').html(JSON.parse(json.list[0].block_list).join('<br>'));
			
            var downloadURL = 'https://pcs.baidu.com/rest/2.0/pcs/file?method=download&access_token=' + access_token + '&path=' + json.list[0].path;
			if('mp4' === ext || 'avi' === ext){
				$('#open').html('<a href="http://gerui0307.github.io/pan/play.htm?'+downloadURL+'" target="_blank" rel="noreferrer">在线播放</a> ')
			}
			
            //$('#download').html('<a href="http://gerui0307.github.io/pan/url.htm?'+downloadURL.toBase64URI()+'" target="_blank" rel="noreferrer">下载</a>');
            $('#download').html('<a href="' + downloadURL + '" target="_blank" rel="noreferrer">下载</a>');
        });

        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'JPEG':
            case 'JPG':

        }
    });
});

	$(function(){
		$('#header h1').append($('<small style="margin-left: 10px;font-size: 10px;"><a href="./">\
	我也要分享文件</a> / \
	<a href="http://pan.baidu.com/disk/home#path=%252Fapps%252Fbingobox" target="_blank">管理我的文件</a>/历史记录：<select id="hist"><option >我曾经访问过的用户</option></select></small>'))	
	
		for( hist in localStorage){
		var self = localStorage[hist];
		try{
			self = JSON.parse(self);
			$('<option value="'+self.access_token+'">'+self.username+'</option>').appendTo($('#hist'));
		}catch(e){}
		}
		
		
	});
	
	
	
	$.ajax({
	  dataType: "jsonp",
	  url: 'https://openapi.baidu.com/rest/2.0/passport/users/getInfo?access_token='+access_token,
	  success: function(d){
	  	d.access_token = access_token
	  	localStorage[d.userid] = JSON.stringify(d);
	  	$('#header h1').html($('#header h1').html().replace('我的共享文件',d.username+' 的共享文件'));
	  	$('#hist').change(function(){
			
			if($(this).val()){
				location.hash = $(this).val();
				location.reload();
			}
			
		})
	  }
	});
}
else{
	$(function(){
		document.body.innerHTML = '<a href="https://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id=oelZ4ZuZYG4iNpLieaDINl2s&redirect_uri=http%3A%2F%2Fgerui0307.github.io%2Foauth%2Fbingo%2F&scope=netdisk&display=popup&state=token">\
	连接百度</a>（有效期一个月，重新连接会使之前的链接过期）<br /><br />\
	<a href="http://pan.baidu.com/disk/home#path=%252Fapps%252Fbingobox" target="_blank">管理我的文件</a><br>历史记录：<select id="hist"><option >我曾经访问过的用户</option></select>';
	for( hist in localStorage){
		var self = localStorage[hist];
		try{
			self = JSON.parse(self);
			$('<option value="'+self.access_token+'">'+self.username+'</option>').appendTo($('#hist'));
		}catch(e){}
	}
	$('#hist').change(function(){
		
		if($(this).val()){
			location.hash = $(this).val();
			location.reload();
		}
		
	})
	});
	
	
}

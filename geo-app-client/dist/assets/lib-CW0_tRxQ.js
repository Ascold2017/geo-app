import{s as Zi,r as Ki}from"./index-_tGX61Hg.js";var d={},Ee={exports:{}};(function(r,e){(function(i,n){var t="1.0.37",m="",T="?",E="function",N="undefined",Y="object",D="string",G="major",o="model",l="name",a="type",s="vendor",u="version",C="architecture",Z="console",v="mobile",p="tablet",k="smarttv",R="wearable",we="embedded",ve=500,ie="Amazon",K="Apple",Ve="ASUS",Ce="BlackBerry",j="Browser",re="Chrome",qi="Edge",ne="Firefox",te="Google",Ie="Huawei",pe="LG",fe="Microsoft",We="Motorola",ae="Opera",oe="Samsung",_e="Sharp",se="Sony",ge="Xiaomi",he="Zebra",Ue="Facebook",Ne="Chromium OS",Fe="Mac OS",Hi=function(f,h){var w={};for(var y in f)h[y]&&h[y].length%2===0?w[y]=h[y].concat(f[y]):w[y]=f[y];return w},le=function(f){for(var h={},w=0;w<f.length;w++)h[f[w].toUpperCase()]=f[w];return h},Be=function(f,h){return typeof f===D?X(h).indexOf(X(f))!==-1:!1},X=function(f){return f.toLowerCase()},Yi=function(f){return typeof f===D?f.replace(/[^\d\.]/g,m).split(".")[0]:n},ye=function(f,h){if(typeof f===D)return f=f.replace(/^\s\s*/,m),typeof h===N?f:f.substring(0,ve)},J=function(f,h){for(var w=0,y,F,W,g,b,_;w<h.length&&!b;){var Te=h[w],De=h[w+1];for(y=F=0;y<Te.length&&!b&&Te[y];)if(b=Te[y++].exec(f),b)for(W=0;W<De.length;W++)_=b[++F],g=De[W],typeof g===Y&&g.length>0?g.length===2?typeof g[1]==E?this[g[0]]=g[1].call(this,_):this[g[0]]=g[1]:g.length===3?typeof g[1]===E&&!(g[1].exec&&g[1].test)?this[g[0]]=_?g[1].call(this,_,g[2]):n:this[g[0]]=_?_.replace(g[1],g[2]):n:g.length===4&&(this[g[0]]=_?g[3].call(this,_.replace(g[1],g[2])):n):this[g]=_||n;w+=2}},Oe=function(f,h){for(var w in h)if(typeof h[w]===Y&&h[w].length>0){for(var y=0;y<h[w].length;y++)if(Be(h[w][y],f))return w===T?n:w}else if(Be(h[w],f))return w===T?n:w;return f},Gi={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},Le={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},je={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[u,[l,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[u,[l,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[l,u],[/opios[\/ ]+([\w\.]+)/i],[u,[l,ae+" Mini"]],[/\bopr\/([\w\.]+)/i],[u,[l,ae]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[u,[l,"Baidu"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[l,u],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[u,[l,"UC"+j]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[u,[l,"WeChat"]],[/konqueror\/([\w\.]+)/i],[u,[l,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[u,[l,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[u,[l,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[u,[l,"Smart Lenovo "+j]],[/(avast|avg)\/([\w\.]+)/i],[[l,/(.+)/,"$1 Secure "+j],u],[/\bfocus\/([\w\.]+)/i],[u,[l,ne+" Focus"]],[/\bopt\/([\w\.]+)/i],[u,[l,ae+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[u,[l,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[u,[l,"Dolphin"]],[/coast\/([\w\.]+)/i],[u,[l,ae+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[u,[l,"MIUI "+j]],[/fxios\/([-\w\.]+)/i],[u,[l,ne]],[/\bqihu|(qi?ho?o?|360)browser/i],[[l,"360 "+j]],[/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],[[l,/(.+)/,"$1 "+j],u],[/samsungbrowser\/([\w\.]+)/i],[u,[l,oe+" Internet"]],[/(comodo_dragon)\/([\w\.]+)/i],[[l,/_/g," "],u],[/metasr[\/ ]?([\d\.]+)/i],[u,[l,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[l,"Sogou Mobile"],u],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],[l,u],[/(lbbrowser)/i,/\[(linkedin)app\]/i],[l],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[l,Ue],u],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[l,u],[/\bgsa\/([\w\.]+) .*safari\//i],[u,[l,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[u,[l,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[u,[l,re+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[l,re+" WebView"],u],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[u,[l,"Android "+j]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[l,u],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[u,[l,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[u,l],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[l,[u,Oe,Gi]],[/(webkit|khtml)\/([\w\.]+)/i],[l,u],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[l,"Netscape"],u],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[u,[l,ne+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[l,u],[/(cobalt)\/([\w\.]+)/i],[l,[u,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[C,"amd64"]],[/(ia32(?=;))/i],[[C,X]],[/((?:i[346]|x)86)[;\)]/i],[[C,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[C,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[C,"armhf"]],[/windows (ce|mobile); ppc;/i],[[C,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[C,/ower/,m,X]],[/(sun4\w)[;\)]/i],[[C,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[C,X]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[o,[s,oe],[a,p]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[o,[s,oe],[a,v]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[o,[s,K],[a,v]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[o,[s,K],[a,p]],[/(macintosh);/i],[o,[s,K]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[o,[s,_e],[a,v]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[o,[s,Ie],[a,p]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[o,[s,Ie],[a,v]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[o,/_/g," "],[s,ge],[a,v]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[o,/_/g," "],[s,ge],[a,p]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[o,[s,"OPPO"],[a,v]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[o,[s,"Vivo"],[a,v]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[o,[s,"Realme"],[a,v]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[o,[s,We],[a,v]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[o,[s,We],[a,p]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[o,[s,pe],[a,p]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[o,[s,pe],[a,v]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[o,[s,"Lenovo"],[a,p]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[o,/_/g," "],[s,"Nokia"],[a,v]],[/(pixel c)\b/i],[o,[s,te],[a,p]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[o,[s,te],[a,v]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[o,[s,se],[a,v]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[o,"Xperia Tablet"],[s,se],[a,p]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[o,[s,"OnePlus"],[a,v]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[o,[s,ie],[a,p]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[o,/(.+)/g,"Fire Phone $1"],[s,ie],[a,v]],[/(playbook);[-\w\),; ]+(rim)/i],[o,s,[a,p]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[o,[s,Ce],[a,v]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[o,[s,Ve],[a,p]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[o,[s,Ve],[a,v]],[/(nexus 9)/i],[o,[s,"HTC"],[a,p]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[s,[o,/_/g," "],[a,v]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[o,[s,"Acer"],[a,p]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[o,[s,"Meizu"],[a,v]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[o,[s,"Ulefone"],[a,v]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[s,o,[a,v]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[s,o,[a,p]],[/(surface duo)/i],[o,[s,fe],[a,p]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[o,[s,"Fairphone"],[a,v]],[/(u304aa)/i],[o,[s,"AT&T"],[a,v]],[/\bsie-(\w*)/i],[o,[s,"Siemens"],[a,v]],[/\b(rct\w+) b/i],[o,[s,"RCA"],[a,p]],[/\b(venue[\d ]{2,7}) b/i],[o,[s,"Dell"],[a,p]],[/\b(q(?:mv|ta)\w+) b/i],[o,[s,"Verizon"],[a,p]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[o,[s,"Barnes & Noble"],[a,p]],[/\b(tm\d{3}\w+) b/i],[o,[s,"NuVision"],[a,p]],[/\b(k88) b/i],[o,[s,"ZTE"],[a,p]],[/\b(nx\d{3}j) b/i],[o,[s,"ZTE"],[a,v]],[/\b(gen\d{3}) b.+49h/i],[o,[s,"Swiss"],[a,v]],[/\b(zur\d{3}) b/i],[o,[s,"Swiss"],[a,p]],[/\b((zeki)?tb.*\b) b/i],[o,[s,"Zeki"],[a,p]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[s,"Dragon Touch"],o,[a,p]],[/\b(ns-?\w{0,9}) b/i],[o,[s,"Insignia"],[a,p]],[/\b((nxa|next)-?\w{0,9}) b/i],[o,[s,"NextBook"],[a,p]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[s,"Voice"],o,[a,v]],[/\b(lvtel\-)?(v1[12]) b/i],[[s,"LvTel"],o,[a,v]],[/\b(ph-1) /i],[o,[s,"Essential"],[a,v]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[o,[s,"Envizen"],[a,p]],[/\b(trio[-\w\. ]+) b/i],[o,[s,"MachSpeed"],[a,p]],[/\btu_(1491) b/i],[o,[s,"Rotor"],[a,p]],[/(shield[\w ]+) b/i],[o,[s,"Nvidia"],[a,p]],[/(sprint) (\w+)/i],[s,o,[a,v]],[/(kin\.[onetw]{3})/i],[[o,/\./g," "],[s,fe],[a,v]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[o,[s,he],[a,p]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[o,[s,he],[a,v]],[/smart-tv.+(samsung)/i],[s,[a,k]],[/hbbtv.+maple;(\d+)/i],[[o,/^/,"SmartTV"],[s,oe],[a,k]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[s,pe],[a,k]],[/(apple) ?tv/i],[s,[o,K+" TV"],[a,k]],[/crkey/i],[[o,re+"cast"],[s,te],[a,k]],[/droid.+aft(\w+)( bui|\))/i],[o,[s,ie],[a,k]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[o,[s,_e],[a,k]],[/(bravia[\w ]+)( bui|\))/i],[o,[s,se],[a,k]],[/(mitv-\w{5}) bui/i],[o,[s,ge],[a,k]],[/Hbbtv.*(technisat) (.*);/i],[s,o,[a,k]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[s,ye],[o,ye],[a,k]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[a,k]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[s,o,[a,Z]],[/droid.+; (shield) bui/i],[o,[s,"Nvidia"],[a,Z]],[/(playstation [345portablevi]+)/i],[o,[s,se],[a,Z]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[o,[s,fe],[a,Z]],[/((pebble))app/i],[s,o,[a,R]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[o,[s,K],[a,R]],[/droid.+; (glass) \d/i],[o,[s,te],[a,R]],[/droid.+; (wt63?0{2,3})\)/i],[o,[s,he],[a,R]],[/(quest( 2| pro)?)/i],[o,[s,Ue],[a,R]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[s,[a,we]],[/(aeobc)\b/i],[o,[s,ie],[a,we]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[o,[a,v]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[o,[a,p]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[a,p]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[a,v]],[/(android[-\w\. ]{0,9});.+buil/i],[o,[s,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[u,[l,qi+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[u,[l,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[l,u],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[u,l]],os:[[/microsoft (windows) (vista|xp)/i],[l,u],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[l,[u,Oe,Le]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[u,Oe,Le],[l,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[u,/_/g,"."],[l,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[l,Fe],[u,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[u,l],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[l,u],[/\(bb(10);/i],[u,[l,Ce]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[u,[l,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[u,[l,ne+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[u,[l,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[u,[l,"watchOS"]],[/crkey\/([\d\.]+)/i],[u,[l,re+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[l,Ne],u],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[l,u],[/(sunos) ?([\w\.\d]*)/i],[[l,"Solaris"],u],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[l,u]]},I=function(f,h){if(typeof f===Y&&(h=f,f=n),!(this instanceof I))return new I(f,h).getResult();var w=typeof i!==N&&i.navigator?i.navigator:n,y=f||(w&&w.userAgent?w.userAgent:m),F=w&&w.userAgentData?w.userAgentData:n,W=h?Hi(je,h):je,g=w&&w.userAgent==y;return this.getBrowser=function(){var b={};return b[l]=n,b[u]=n,J.call(b,y,W.browser),b[G]=Yi(b[u]),g&&w&&w.brave&&typeof w.brave.isBrave==E&&(b[l]="Brave"),b},this.getCPU=function(){var b={};return b[C]=n,J.call(b,y,W.cpu),b},this.getDevice=function(){var b={};return b[s]=n,b[o]=n,b[a]=n,J.call(b,y,W.device),g&&!b[a]&&F&&F.mobile&&(b[a]=v),g&&b[o]=="Macintosh"&&w&&typeof w.standalone!==N&&w.maxTouchPoints&&w.maxTouchPoints>2&&(b[o]="iPad",b[a]=p),b},this.getEngine=function(){var b={};return b[l]=n,b[u]=n,J.call(b,y,W.engine),b},this.getOS=function(){var b={};return b[l]=n,b[u]=n,J.call(b,y,W.os),g&&!b[l]&&F&&F.platform!="Unknown"&&(b[l]=F.platform.replace(/chrome os/i,Ne).replace(/macos/i,Fe)),b},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return y},this.setUA=function(b){return y=typeof b===D&&b.length>ve?ye(b,ve):b,this},this.setUA(y),this};I.VERSION=t,I.BROWSER=le([l,u,G]),I.CPU=le([C]),I.DEVICE=le([o,s,a,Z,v,k,p,R,we]),I.ENGINE=I.OS=le([l,u]),r.exports&&(e=r.exports=I),e.UAParser=I;var z=typeof i!==N&&(i.jQuery||i.Zepto);if(z&&!z.ua){var ue=new I;z.ua=ue.getResult(),z.ua.get=function(){return ue.getUA()},z.ua.set=function(f){ue.setUA(f);var h=ue.getResult();for(var w in h)z.ua[w]=h[w]}}})(typeof window=="object"?window:Zi)})(Ee,Ee.exports);var Xi=Ee.exports;Object.defineProperty(d,"__esModule",{value:!0});function Ji(r){return r&&typeof r=="object"&&"default"in r?r.default:r}var x=Ki,O=Ji(x),Ye=Xi,B=new Ye,P=B.getBrowser(),Qi=B.getCPU(),M=B.getDevice(),Ae=B.getEngine(),L=B.getOS(),$=B.getUA(),Ge=function(e){return B.setUA(e)},ee=function(e){if(!e){console.error("No userAgent string was provided");return}var i=new Ye(e);return{UA:i,browser:i.getBrowser(),cpu:i.getCPU(),device:i.getDevice(),engine:i.getEngine(),os:i.getOS(),ua:i.getUA(),setUserAgent:function(t){return i.setUA(t)}}},Ze=Object.freeze({ClientUAInstance:B,browser:P,cpu:Qi,device:M,engine:Ae,os:L,ua:$,setUa:Ge,parseUserAgent:ee});function Re(r,e){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})),i.push.apply(i,n)}return i}function $i(r){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?Re(Object(i),!0).forEach(function(n){rr(r,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):Re(Object(i)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(i,n))})}return r}function Q(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Q=function(e){return typeof e}:Q=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(r)}function er(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function ze(r,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function ir(r,e,i){return e&&ze(r.prototype,e),i&&ze(r,i),r}function rr(r,e,i){return e in r?Object.defineProperty(r,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[e]=i,r}function Se(){return Se=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r[n]=i[n])}return r},Se.apply(this,arguments)}function nr(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Pe(r,e)}function xe(r){return xe=Object.setPrototypeOf?Object.getPrototypeOf:function(i){return i.__proto__||Object.getPrototypeOf(i)},xe(r)}function Pe(r,e){return Pe=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n},Pe(r,e)}function tr(r,e){if(r==null)return{};var i={},n=Object.keys(r),t,m;for(m=0;m<n.length;m++)t=n[m],!(e.indexOf(t)>=0)&&(i[t]=r[t]);return i}function V(r,e){if(r==null)return{};var i=tr(r,e),n,t;if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(r);for(t=0;t<m.length;t++)n=m[t],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(r,n)&&(i[n]=r[n])}return i}function de(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ar(r,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return de(r)}function or(r,e){return sr(r)||lr(r,e)||ur(r,e)||dr()}function sr(r){if(Array.isArray(r))return r}function lr(r,e){var i=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(i!=null){var n=[],t=!0,m=!1,T,E;try{for(i=i.call(r);!(t=(T=i.next()).done)&&(n.push(T.value),!(e&&n.length===e));t=!0);}catch(N){m=!0,E=N}finally{try{!t&&i.return!=null&&i.return()}finally{if(m)throw E}}return n}}function ur(r,e){if(r){if(typeof r=="string")return qe(r,e);var i=Object.prototype.toString.call(r).slice(8,-1);if(i==="Object"&&r.constructor&&(i=r.constructor.name),i==="Map"||i==="Set")return Array.from(r);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return qe(r,e)}}function qe(r,e){(e==null||e>r.length)&&(e=r.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=r[i];return n}function dr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var S={Mobile:"mobile",Tablet:"tablet",SmartTv:"smarttv",Console:"console",Wearable:"wearable",Embedded:"embedded",Browser:void 0},A={Chrome:"Chrome",Firefox:"Firefox",Opera:"Opera",Yandex:"Yandex",Safari:"Safari",InternetExplorer:"Internet Explorer",Edge:"Edge",Chromium:"Chromium",Ie:"IE",MobileSafari:"Mobile Safari",EdgeChromium:"Edge Chromium",MIUI:"MIUI Browser",SamsungBrowser:"Samsung Browser"},H={IOS:"iOS",Android:"Android",WindowsPhone:"Windows Phone",Windows:"Windows",MAC_OS:"Mac OS"},cr={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},br=function(e){switch(e){case S.Mobile:return{isMobile:!0};case S.Tablet:return{isTablet:!0};case S.SmartTv:return{isSmartTV:!0};case S.Console:return{isConsole:!0};case S.Wearable:return{isWearable:!0};case S.Browser:return{isBrowser:!0};case S.Embedded:return{isEmbedded:!0};default:return cr}},mr=function(e){return Ge(e)},c=function(e){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none";return e||i},ke=function(){return typeof window<"u"&&(window.navigator||navigator)?window.navigator||navigator:!1},Me=function(e){var i=ke();return i&&i.platform&&(i.platform.indexOf(e)!==-1||i.platform==="MacIntel"&&i.maxTouchPoints>1&&!window.MSStream)},wr=function(e,i,n,t,m){return{isBrowser:e,browserMajorVersion:c(i.major),browserFullVersion:c(i.version),browserName:c(i.name),engineName:c(n.name),engineVersion:c(n.version),osName:c(t.name),osVersion:c(t.version),userAgent:c(m)}},He=function(e,i,n,t){return $i({},e,{vendor:c(i.vendor),model:c(i.model),os:c(n.name),osVersion:c(n.version),ua:c(t)})},vr=function(e,i,n,t){return{isSmartTV:e,engineName:c(i.name),engineVersion:c(i.version),osName:c(n.name),osVersion:c(n.version),userAgent:c(t)}},pr=function(e,i,n,t){return{isConsole:e,engineName:c(i.name),engineVersion:c(i.version),osName:c(n.name),osVersion:c(n.version),userAgent:c(t)}},fr=function(e,i,n,t){return{isWearable:e,engineName:c(i.name),engineVersion:c(i.version),osName:c(n.name),osVersion:c(n.version),userAgent:c(t)}},gr=function(e,i,n,t,m){return{isEmbedded:e,vendor:c(i.vendor),model:c(i.model),engineName:c(n.name),engineVersion:c(n.version),osName:c(t.name),osVersion:c(t.version),userAgent:c(m)}};function hr(r){var e=r?ee(r):Ze,i=e.device,n=e.browser,t=e.engine,m=e.os,T=e.ua,E=br(i.type),N=E.isBrowser,Y=E.isMobile,D=E.isTablet,G=E.isSmartTV,o=E.isConsole,l=E.isWearable,a=E.isEmbedded;if(N)return wr(N,n,t,m,T);if(G)return vr(G,t,m,T);if(o)return pr(o,t,m,T);if(Y||D)return He(E,i,m,T);if(l)return fr(l,t,m,T);if(a)return gr(a,i,t,m,T)}var Ke=function(e){var i=e.type;return i===S.Mobile},Xe=function(e){var i=e.type;return i===S.Tablet},Je=function(e){var i=e.type;return i===S.Mobile||i===S.Tablet},Qe=function(e){var i=e.type;return i===S.SmartTv},ce=function(e){var i=e.type;return i===S.Browser},$e=function(e){var i=e.type;return i===S.Wearable},ei=function(e){var i=e.type;return i===S.Console},ii=function(e){var i=e.type;return i===S.Embedded},ri=function(e){var i=e.vendor;return c(i)},ni=function(e){var i=e.model;return c(i)},ti=function(e){var i=e.type;return c(i,"browser")},ai=function(e){var i=e.name;return i===H.Android},oi=function(e){var i=e.name;return i===H.Windows},si=function(e){var i=e.name;return i===H.MAC_OS},li=function(e){var i=e.name;return i===H.WindowsPhone},ui=function(e){var i=e.name;return i===H.IOS},di=function(e){var i=e.version;return c(i)},ci=function(e){var i=e.name;return c(i)},bi=function(e){var i=e.name;return i===A.Chrome},mi=function(e){var i=e.name;return i===A.Firefox},wi=function(e){var i=e.name;return i===A.Chromium},be=function(e){var i=e.name;return i===A.Edge},vi=function(e){var i=e.name;return i===A.Yandex},pi=function(e){var i=e.name;return i===A.Safari||i===A.MobileSafari},fi=function(e){var i=e.name;return i===A.MobileSafari},gi=function(e){var i=e.name;return i===A.Opera},hi=function(e){var i=e.name;return i===A.InternetExplorer||i===A.Ie},yi=function(e){var i=e.name;return i===A.MIUI},Oi=function(e){var i=e.name;return i===A.SamsungBrowser},Ti=function(e){var i=e.version;return c(i)},Ei=function(e){var i=e.major;return c(i)},Si=function(e){var i=e.name;return c(i)},xi=function(e){var i=e.name;return c(i)},Pi=function(e){var i=e.version;return c(i)},Ai=function(){var e=ke(),i=e&&e.userAgent&&e.userAgent.toLowerCase();return typeof i=="string"?/electron/.test(i):!1},q=function(e){return typeof e=="string"&&e.indexOf("Edg/")!==-1},ki=function(){var e=ke();return e&&(/iPad|iPhone|iPod/.test(e.platform)||e.platform==="MacIntel"&&e.maxTouchPoints>1)&&!window.MSStream},U=function(){return Me("iPad")},Mi=function(){return Me("iPhone")},Vi=function(){return Me("iPod")},Ci=function(e){return c(e)};function Ii(r){var e=r||Ze,i=e.device,n=e.browser,t=e.os,m=e.engine,T=e.ua;return{isSmartTV:Qe(i),isConsole:ei(i),isWearable:$e(i),isEmbedded:ii(i),isMobileSafari:fi(n)||U(),isChromium:wi(n),isMobile:Je(i)||U(),isMobileOnly:Ke(i),isTablet:Xe(i)||U(),isBrowser:ce(i),isDesktop:ce(i),isAndroid:ai(t),isWinPhone:li(t),isIOS:ui(t)||U(),isChrome:bi(n),isFirefox:mi(n),isSafari:pi(n),isOpera:gi(n),isIE:hi(n),osVersion:di(t),osName:ci(t),fullBrowserVersion:Ti(n),browserVersion:Ei(n),browserName:Si(n),mobileVendor:ri(i),mobileModel:ni(i),engineName:xi(m),engineVersion:Pi(m),getUA:Ci(T),isEdge:be(n)||q(T),isYandex:vi(n),deviceType:ti(i),isIOS13:ki(),isIPad13:U(),isIPhone13:Mi(),isIPod13:Vi(),isElectron:Ai(),isEdgeChromium:q(T),isLegacyEdge:be(n)&&!q(T),isWindows:oi(t),isMacOs:si(t),isMIUI:yi(n),isSamsungBrowser:Oi(n)}}var Wi=Qe(M),_i=ei(M),Ui=$e(M),yr=ii(M),Or=fi(P)||U(),Tr=wi(P),me=Je(M)||U(),Ni=Ke(M),Fi=Xe(M)||U(),Bi=ce(M),Er=ce(M),Li=ai(L),ji=li(L),Di=ui(L)||U(),Sr=bi(P),xr=mi(P),Pr=pi(P),Ar=gi(P),Ri=hi(P),kr=di(L),Mr=ci(L),Vr=Ti(P),Cr=Ei(P),Ir=Si(P),Wr=ri(M),_r=ni(M),Ur=xi(Ae),Nr=Pi(Ae),Fr=Ci($),Br=be(P)||q($),Lr=vi(P),jr=ti(M),Dr=ki(),Rr=U(),zr=Mi(),qr=Vi(),Hr=Ai(),Yr=q($),Gr=be(P)&&!q($),Zr=oi(L),Kr=si(L),Xr=yi(P),Jr=Oi(P),Qr=function(e){if(!e||typeof e!="string"){console.error("No valid user agent string was provided");return}var i=ee(e),n=i.device,t=i.browser,m=i.os,T=i.engine,E=i.ua;return Ii({device:n,browser:t,os:m,engine:T,ua:E})},$r=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return Li?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},en=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return Bi?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},rn=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return Ri?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},nn=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return Di?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},tn=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return me?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},an=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return Fi?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},on=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return ji?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},sn=function(e){var i=e.renderWithFragment,n=e.children;e.viewClassName,e.style;var t=V(e,["renderWithFragment","children","viewClassName","style"]);return Ni?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},ln=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return Wi?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},un=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return _i?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},dn=function(e){var i=e.renderWithFragment,n=e.children,t=V(e,["renderWithFragment","children"]);return Ui?i?O.createElement(x.Fragment,null,n):O.createElement("div",t,n):null},cn=function(e){var i=e.renderWithFragment,n=e.children;e.viewClassName,e.style;var t=e.condition,m=V(e,["renderWithFragment","children","viewClassName","style","condition"]);return t?i?O.createElement(x.Fragment,null,n):O.createElement("div",m,n):null};function bn(r){return function(e){nr(i,e);function i(n){var t;return er(this,i),t=ar(this,xe(i).call(this,n)),t.isEventListenerAdded=!1,t.handleOrientationChange=t.handleOrientationChange.bind(de(t)),t.onOrientationChange=t.onOrientationChange.bind(de(t)),t.onPageLoad=t.onPageLoad.bind(de(t)),t.state={isLandscape:!1,isPortrait:!1},t}return ir(i,[{key:"handleOrientationChange",value:function(){this.isEventListenerAdded||(this.isEventListenerAdded=!0);var t=window.innerWidth>window.innerHeight?90:0;this.setState({isPortrait:t===0,isLandscape:t===90})}},{key:"onOrientationChange",value:function(){this.handleOrientationChange()}},{key:"onPageLoad",value:function(){this.handleOrientationChange()}},{key:"componentDidMount",value:function(){(typeof window>"u"?"undefined":Q(window))!==void 0&&me&&(this.isEventListenerAdded?window.removeEventListener("load",this.onPageLoad,!1):(this.handleOrientationChange(),window.addEventListener("load",this.onPageLoad,!1)),window.addEventListener("resize",this.onOrientationChange,!1))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onOrientationChange,!1)}},{key:"render",value:function(){return O.createElement(r,Se({},this.props,{isLandscape:this.state.isLandscape,isPortrait:this.state.isPortrait}))}}]),i}(O.Component)}function mn(){var r=x.useState(function(){var m=window.innerWidth>window.innerHeight?90:0;return{isPortrait:m===0,isLandscape:m===90,orientation:m===0?"portrait":"landscape"}}),e=or(r,2),i=e[0],n=e[1],t=x.useCallback(function(){var m=window.innerWidth>window.innerHeight?90:0,T={isPortrait:m===0,isLandscape:m===90,orientation:m===0?"portrait":"landscape"};i.orientation!==T.orientation&&n(T)},[i.orientation]);return x.useEffect(function(){return(typeof window>"u"?"undefined":Q(window))!==void 0&&me&&(t(),window.addEventListener("load",t,!1),window.addEventListener("resize",t,!1)),function(){window.removeEventListener("resize",t,!1),window.removeEventListener("load",t,!1)}},[t]),i}function zi(r){var e=r||window.navigator.userAgent;return ee(e)}function wn(r){var e=r||window.navigator.userAgent,i=zi(e),n=Ii(i);return[n,i]}d.AndroidView=$r;d.BrowserTypes=A;var pn=d.BrowserView=en;d.ConsoleView=un;d.CustomView=cn;d.IEView=rn;d.IOSView=nn;d.MobileOnlyView=sn;var fn=d.MobileView=tn;d.OsTypes=H;d.SmartTVView=ln;d.TabletView=an;d.WearableView=dn;d.WinPhoneView=on;d.browserName=Ir;d.browserVersion=Cr;d.deviceDetect=hr;d.deviceType=jr;d.engineName=Ur;d.engineVersion=Nr;d.fullBrowserVersion=Vr;d.getSelectorsByUserAgent=Qr;d.getUA=Fr;d.isAndroid=Li;d.isBrowser=Bi;d.isChrome=Sr;d.isChromium=Tr;d.isConsole=_i;d.isDesktop=Er;d.isEdge=Br;d.isEdgeChromium=Yr;d.isElectron=Hr;d.isEmbedded=yr;d.isFirefox=xr;d.isIE=Ri;d.isIOS=Di;d.isIOS13=Dr;d.isIPad13=Rr;d.isIPhone13=zr;d.isIPod13=qr;d.isLegacyEdge=Gr;d.isMIUI=Xr;d.isMacOs=Kr;var gn=d.isMobile=me;d.isMobileOnly=Ni;d.isMobileSafari=Or;d.isOpera=Ar;d.isSafari=Pr;d.isSamsungBrowser=Jr;d.isSmartTV=Wi;d.isTablet=Fi;d.isWearable=Ui;d.isWinPhone=ji;d.isWindows=Zr;d.isYandex=Lr;d.mobileModel=_r;d.mobileVendor=Wr;d.osName=Mr;d.osVersion=kr;d.parseUserAgent=ee;d.setUserAgent=mr;d.useDeviceData=zi;d.useDeviceSelectors=wn;d.useMobileOrientation=mn;d.withOrientationChange=bn;export{pn as B,fn as M,gn as i};

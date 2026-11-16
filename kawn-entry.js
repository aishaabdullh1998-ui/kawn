/* كون: بطاقةُ الدّخول — سؤالانِ إجباريّانِ مرّةً واحدةً لكلِّ جهاز: مَن أنت؟ ومن أيِّ محافظة؟ */
(function(){
if(window.top!==window.self)return;
if(/[?&#]noentry/.test(location.href))return;
var URL='https://script.google.com/macros/s/AKfycbyX2Nu7fZINPi3YrVYYgZy1h7zOOqd8holMfapeB-h9pi2ojtJNi5-Eeyp9LC0RbeHw/exec';
var K='kawn-entry',Q='kawn-entry-q';
var ls;try{ls=window.localStorage;ls.setItem('kawn-t','1');ls.removeItem('kawn-t')}catch(e){return}
function send(d){var q=new URLSearchParams();Object.keys(d).forEach(function(k){q.set(k,d[k])});
 return fetch(URL+'?'+q.toString(),{method:'GET',mode:'no-cors',credentials:'omit',cache:'no-store',keepalive:true})}
try{var pend=ls.getItem(Q);if(pend){send(JSON.parse(pend)).then(function(){ls.removeItem(Q)}).catch(function(){})}}catch(e){}
if(/[?&#]entry-test/.test(location.href)){ls.removeItem(K);document.cookie='kawn_entry=; max-age=0; path=/'}
function ck(){var m=document.cookie.match(/(?:^|; )kawn_entry=([^;]*)/);return m?decodeURIComponent(m[1]):''}
function save(v){try{ls.setItem(K,v)}catch(e){}try{document.cookie='kawn_entry='+encodeURIComponent(v)+'; max-age=315360000; path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'')}catch(e){}}
var have=ls.getItem(K)||ck();if(have){if(!ls.getItem(K))try{ls.setItem(K,have)}catch(e){}
 /* إجاباتُ السّاعاتِ الأولى قبلَ إصلاحِ الجدول: تُعادُ مرّةً واحدةً بصمتٍ دونَ سؤالِ الزّائرِ ثانية */
 try{var o=JSON.parse(have);if(o&&o.t&&o.t<Date.UTC(2026,10,16,5,20)&&!ls.getItem('kawn-entry-rs')){var RL={st:'طالب مدرسة',te:'معلم',pa:'ولي أمر',un:'طالب جامعي',ot:'غير ذلك'};
  send({kind:'دخول',role:RL[o.r]||o.r,gov:o.g,page:(location.pathname.split('/').pop()||'index.html'),v:'10r'}).then(function(){ls.setItem('kawn-entry-rs','1')}).catch(function(){})}}catch(e){}
 return}

var ROLES=[['st','طالبُ مدرسة','🎒'],['te','معلّم','🍎'],['pa','وليُّ أمر','🏠'],['un','طالبٌ جامعيّ','🎓'],['ot','غيرُ ذلك','✨']];
var GOV=['مسقط','ظفار','مسندم','البريمي','الداخلية','شمال الباطنة','جنوب الباطنة','جنوب الشرقية','شمال الشرقية','الظاهرة','الوسطى','خارج عُمان'];
var A={r:'',g:''},step=0;
var css=document.createElement('style');css.textContent=
'#kent{position:fixed;inset:0;z-index:2147483000;background:rgba(30,36,51,.62);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:14px;font-family:"Baloo Bhaijaan 2","Noto Naskh Arabic",Tahoma,sans-serif;direction:rtl;animation:kentIn .35s}'+
'@keyframes kentIn{from{opacity:0}}'+
'#kent .bx{width:100%;max-width:520px;max-height:94vh;overflow:auto;background:#FFF9EE;color:#26324A;border-radius:28px;padding:22px 22px 16px;box-shadow:0 20px 60px rgba(0,0,0,.35);border:3px solid #F2D9A6;text-align:center}'+
'#kent .lg{line-height:0;margin:0 0 8px}#kent .lg svg{display:inline-block}'+
'#kent h2{margin:0 0 4px;font-size:25px;line-height:1.4;color:#1E4FA8}#kent p{margin:0 0 14px;font-size:16px;line-height:1.6;color:#4A5570}'+
'#kent .dots{display:flex;gap:6px;justify-content:center;margin:0 0 12px}#kent .dots i{width:9px;height:9px;border-radius:50%;background:#E8DCC4}#kent .dots i.on{background:#2F6FE0;width:22px;border-radius:6px}'+
'#kent .g{display:grid;grid-template-columns:1fr 1fr;gap:9px}'+
'#kent button{font-family:inherit;cursor:pointer}'+
'#kent .o{display:flex;align-items:center;justify-content:center;gap:8px;border:2.5px solid #EADBC0;background:#fff;border-radius:18px;padding:10px 8px;font-size:17px;font-weight:700;color:#26324A;transition:.15s}'+
'#kent .o:hover{border-color:#9DBBF0}#kent .o.on{border-color:#2F6FE0;background:#EAF1FD;color:#1E4FA8}'+
'#kent .o .e{font-size:22px}#kent .wide{grid-column:1/-1}'+
'#kent .bk{border:0;background:none;color:#7A849C;font-size:16px;font-weight:700;margin-top:10px}'+
'#kent .pv{font-size:13px;color:#8A93A6;margin-top:12px}';
var W=document.createElement('div');W.id='kent';W.setAttribute('role','dialog');W.setAttribute('aria-modal','true');W.setAttribute('aria-label','بطاقة الدخول إلى كون');W.innerHTML='<div class="bx" id="kentB"></div>';
function draw(){var b=document.getElementById('kentB'),d='<div class="dots"><i class="'+(step===0?'on':'')+'"></i><i class="'+(step===1?'on':'')+'"></i></div>';
 if(step===0)b.innerHTML='<div class="lg"><svg viewBox="0 0 120 66" width="104" height="57" aria-hidden="true"><defs><linearGradient id="kesun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4C24D"/><stop offset="1" stop-color="#E98A6A"/></linearGradient><clipPath id="kecl"><rect x="0" y="0" width="120" height="56"/></clipPath></defs><g clip-path="url(#kecl)"><circle cx="60" cy="56" r="32" fill="url(#kesun)" opacity=".3"/><circle cx="60" cy="56" r="21" fill="url(#kesun)"/></g><g stroke="#E98A6A" stroke-width="4" stroke-linecap="round" opacity=".8"><path d="M60 16 v-11 M33 28 l-8 -8 M87 28 l8 -8"/></g><path d="M8 58 Q60 52 112 58" stroke="#8FAF7A" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div><h2>أهلًا بك في «كون»!</h2><p>قبلَ أن تبدأَ رحلتَك، أخبرْنا بلمستين فقط.</p>'+d+'<h2 style="font-size:21px;margin-bottom:10px">مَن أنت؟</h2><div class="g">'+ROLES.map(function(r,i){return '<button class="o'+(A.r===r[0]?' on':'')+(i===ROLES.length-1?' wide':'')+'" data-r="'+r[0]+'"><span class="e">'+r[2]+'</span>'+r[1]+'</button>'}).join('')+'</div><div class="pv">لا نطلبُ اسمَك ولا أيَّ بياناتٍ شخصيّة.</div>';
 else b.innerHTML=d+'<h2 style="margin-bottom:12px">من أيِّ محافظةٍ أنت؟</h2><div class="g">'+GOV.map(function(g){return '<button class="o'+(A.g===g?' on':'')+'" data-g="'+g+'">'+g+'</button>'}).join('')+'</div><button class="bk" data-back="1">رجوع</button>'}
W.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;var d=t.dataset;
 if(d.back){step=0;draw();return}
 if(d.r){A.r=d.r;t.classList.add('on');setTimeout(function(){step=1;draw()},180);return}
 if(d.g){A.g=d.g;t.classList.add('on');
  var role=ROLES.filter(function(r){return r[0]===A.r})[0];
  var data={kind:'دخول',role:role[1].replace(/[ً-ْـ]/g,''),gov:A.g,page:(location.pathname.split('/').pop()||'index.html'),v:'10'};
  save(JSON.stringify({r:A.r,g:A.g,t:Date.now()}));try{ls.setItem(Q,JSON.stringify(data))}catch(_){}
  send(data).then(function(){try{ls.removeItem(Q)}catch(_){}}).catch(function(){});
  setTimeout(function(){W.style.transition='opacity .3s';W.style.opacity='0';setTimeout(function(){W.remove();document.documentElement.style.overflow=''},300)},250);return}});
/* لا يُغلَقُ بالضّغطِ خارجَه ولا بزرِّ الهروب، ولا تتحرّكُ الشّرائحُ خلفَه */
window.addEventListener('keydown',function(e){if(!document.getElementById('kent'))return;if(e.key==='Tab')return;if(W.contains(e.target)&&(e.key==='Enter'||e.key===' '))return;e.preventDefault();e.stopImmediatePropagation()},true);
function open(){if(document.getElementById('kent'))return;if(!css.parentNode)document.head.appendChild(css);document.documentElement.appendChild(W);document.documentElement.style.overflow='hidden';draw();
 var f=W.querySelector('button');if(f)try{f.focus({preventScroll:true})}catch(_){}}
if(document.body)open();else document.addEventListener('DOMContentLoaded',open);
})();

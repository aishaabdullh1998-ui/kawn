/* كون: استطلاعُ الرّأي — يظهرُ مرّةً واحدةً لكلِّ جهاز، بعدَ استخدامِ درسٍ واحد */
(function(){
var URL='https://script.google.com/macros/s/AKfycbyX2Nu7fZINPi3YrVYYgZy1h7zOOqd8holMfapeB-h9pi2ojtJNi5-Eeyp9LC0RbeHw/exec';
var K='kawn-survey',Q='kawn-survey-q';
var ls;try{ls=window.localStorage;ls.setItem('kawn-t','1');ls.removeItem('kawn-t')}catch(e){return}
function send(d){var q=new URLSearchParams(),strip=function(x){return String(x||'').replace(/[\u064B-\u0652\u0640]/g,'')};
 Object.keys(d).forEach(function(k){var v=d[k];q.set(k,strip(Array.isArray(v)?v.join('، '):v))});q.set('v','9');
 return fetch(URL+'?'+q.toString(),{method:'GET',mode:'no-cors',credentials:'omit',cache:'no-store',keepalive:true})}
// إرسالُ رأيٍ تأخّرَ بسببِ انقطاعِ الإنترنت
try{var pend=ls.getItem(Q);if(pend){send(JSON.parse(pend)).then(function(){ls.removeItem(Q)}).catch(function(){})}}catch(e){}
// رابطُ تجربةٍ للمعلّمة: أضيفي ?survey-test إلى العنوان ليظهرَ الاستطلاعُ من جديد
var LIVE=true,TEST=/[?&#]survey-test/.test(location.href);
if(!LIVE&&!TEST&&!ls.getItem('kawn-survey-tester'))return;
function ck(){return /(?:^|; )kawn_survey=done/.test(document.cookie)}
function mark(){try{ls.setItem(K,'done')}catch(e){}try{document.cookie='kawn_survey=done; max-age=315360000; path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'')}catch(e){}}
function isDone(){if(ck()){try{ls.setItem(K,'done')}catch(e){}return true}if(ls.getItem(K)==='done'){mark();return true}return false}
if(TEST){ls.setItem('kawn-survey-tester','1');ls.removeItem(K);document.cookie='kawn_survey=; max-age=0; path=/';ls.setItem('kawn-used','test');try{history.replaceState(null,'',location.pathname)}catch(e){}}
if(isDone())return;
var ref='';try{var r=new window.URL(document.referrer);if(r.host===location.host&&!/(\/|index\.html?)$/.test(r.pathname))ref=r.pathname}catch(e){}
var used=ls.getItem('kawn-used');
// عندَ فتحِ أيِّ درسٍ من الصّفحةِ الرّئيسة نسجّلُ أنّ الزّائرَ استخدمَ «كون»
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';
 if(/\.html?(\?|#|$)/.test(h)&&!/(^|\/)index\.html?/.test(h)){try{ls.setItem('kawn-used',h.split(/[?#]/)[0].split('/').pop())}catch(_){}}},true);

var ROLES=[['st','طالبُ مدرسة','🎒'],['pa','وليُّ أمر','🏠'],['te','معلّم','🍎'],['un','طالبٌ جامعيّ','🎓'],['ot','غيرُ ذلك','✨']];
var USE={st:['في الصّفِّ مع معلّمي','في البيتِ وحدي','في البيتِ مع أهلي'],
 pa:['راجعتُ مع ابني دروسَه','جعلتُه يتعلّمُ وحدَه','تصفّحتُه للاطّلاع'],
 te:['عرضتُه على السّبّورةِ في الحصّة','كلّفتُ الطّلابَ به في البيت','استفدتُ من أفكارِه في تصميمِ دروسي'],
 un:['للتّدريبِ العمليِّ أو التّربيةِ العمليّة','لبحثٍ أو مقرّرٍ دراسيّ','للاطّلاع'],
 ot:['للتّعلّم','لمساعدةِ غيري','للاطّلاع']};
var FUN=['القصّةُ والشّخصيّات','الرّسوم','الأنشطةُ الّتي ألمسُها وأحرّكُها','الأصوات','التّحدّياتُ والمسابقات'];
var A={role:'',use:[],learn:'',ease:'',fun:[],rec:'',wish:''},step=0;

var css=document.createElement('style');css.textContent=
'#ksv{position:fixed;inset:0;z-index:99999;background:rgba(30,36,51,.55);display:flex;align-items:center;justify-content:center;padding:14px;font-family:"Baloo Bhaijaan 2","Noto Naskh Arabic",Tahoma,sans-serif;direction:rtl;animation:ksvIn .35s}'+
'@keyframes ksvIn{from{opacity:0}}'+
'#ksv .bx{width:100%;max-width:560px;max-height:94vh;overflow:auto;background:#FFF9EE;color:#26324A;border-radius:28px;padding:22px 22px 18px;box-shadow:0 20px 60px rgba(0,0,0,.35);border:3px solid #F2D9A6;position:relative}'+
'#ksv h2{margin:0 0 6px;font-size:26px;line-height:1.35;color:#1E4FA8}#ksv p{margin:0 0 12px;font-size:17px;line-height:1.6;color:#4A5570}'+
'#ksv .dots{direction:rtl;display:flex;gap:6px;justify-content:center;margin:0 0 14px}#ksv .dots i{width:9px;height:9px;border-radius:50%;background:#E8DCC4}#ksv .dots i.on{background:#2F6FE0;width:22px;border-radius:6px}'+
'#ksv .op{display:flex;flex-direction:column;gap:9px}#ksv .op.g{display:grid;grid-template-columns:1fr 1fr}'+
'#ksv button{font-family:inherit;cursor:pointer}'+
'#ksv .o{display:flex;align-items:center;gap:10px;text-align:right;border:2.5px solid #EADBC0;background:#fff;border-radius:18px;padding:10px 14px;font-size:18px;font-weight:700;color:#26324A;transition:.15s}'+
'#ksv .o:hover{border-color:#9DBBF0}#ksv .o.on{border-color:#2F6FE0;background:#EAF1FD;color:#1E4FA8}'+
'#ksv .o .e{font-size:24px}#ksv .o .ck{margin-right:auto;width:22px;height:22px;border-radius:7px;border:2.5px solid #C9D3E6;flex:none}#ksv .o.on .ck{background:#2F6FE0;border-color:#2F6FE0;box-shadow:inset 0 0 0 3px #fff}'+
'#ksv .faces{display:flex;gap:8px;justify-content:center}#ksv .faces{align-items:stretch}#ksv .faces .o{flex-direction:column;justify-content:flex-start;align-items:center;flex:1;min-width:0;padding:10px 3px 8px;font-size:14px;gap:4px;text-align:center}#ksv .faces .o .e{font-size:32px;line-height:1;height:36px;display:flex;align-items:center}#ksv .faces .o .l{display:flex;align-items:center;justify-content:center;min-height:2.7em;line-height:1.3;font-size:14px}'+
'#ksv .nx{display:flex;gap:10px;margin-top:14px;align-items:center}'+
'#ksv .go{flex:1;border:0;border-radius:18px;padding:11px;font-size:20px;font-weight:800;color:#fff;background:#2F6FE0;box-shadow:0 4px 0 #1E4FA8}#ksv .go:disabled{opacity:.4;cursor:default}'+
'#ksv .bk{border:0;background:none;color:#7A849C;font-size:17px;font-weight:700}'+
'#ksv textarea{width:100%;box-sizing:border-box;font-family:inherit;font-size:18px;border:2.5px solid #EADBC0;border-radius:16px;padding:10px 12px;min-height:96px;resize:vertical}'+
'#ksv .hint{font-size:14px;color:#7A849C;margin-top:6px}'+
'#ksv .pr{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;font-size:13px;color:#7A849C;margin-top:10px}'+
'#ksv .big{font-size:56px;text-align:center;line-height:1;margin:6px 0}';
document.head.appendChild(css);
var W=document.createElement('div');W.id='ksv';W.setAttribute('role','dialog');W.setAttribute('aria-modal','true');W.innerHTML='<div class="bx" id="ksvB"></div>';

function isSt(){return A.role==='st'}
var STEPS=[
 function(){return '<h2 style="text-align:center">مرحبًا بأصدقاءِ "كون"!</h2><p style="text-align:center">نسعدُ بمشاركتِك في تقييمِ المنصّة، فإجاباتُك تُسهمُ في تطويرِ تجربتِك وتحسينِ المنصّةِ مستقبلًا.</p><div class="nx"><button class="go" data-go="1">ابدأِ الاستبانة</button></div>'},
 function(){return '<h2>مَن أنت؟</h2><div class="op">'+ROLES.map(function(r){return '<button class="o'+(A.role===r[0]?' on':'')+'" data-role="'+r[0]+'"><span class="e">'+r[2]+'</span>'+r[1]+'</button>'}).join('')+'</div>'},
 function(){return '<h2>'+(isSt()?'أين استخدمتَ «كون»؟':'كيف استخدمتَ «كون»؟')+'</h2><p>يمكنُك اختيارُ أكثرَ من إجابة.</p><div class="op">'+USE[A.role].map(function(u){return '<button class="o'+(A.use.indexOf(u)>-1?' on':'')+'" data-use="'+u+'">'+u+'<span class="ck"></span></button>'}).join('')+'</div>'+nav(A.use.length)},
 function(){if(isSt())return '<h2>هل فهمتَ الدّرسَ أكثرَ مع «كون»؟</h2><div class="faces">'+[['2','😕','قليلًا'],['4','🙂','نعم'],['5','🤩','كثيرًا']].map(f).join('')+'</div>';
  return '<h2>هل ساعدَك «كون» على فهمِ الدّرسِ أو تعليمِه؟</h2><div class="faces">'+[['1','😞','لم يساعد'],['2','😐','قليلًا'],['3','🙂','إلى حدٍّ ما'],['4','😊','ساعد'],['5','😍','ساعدَ كثيرًا']].map(f).join('')+'</div>'},
 function(){return '<h2>هل كانَ استخدامُه سهلًا؟</h2><div class="op">'+['سهلٌ جدًّا','سهل','احتجتُ مساعدة','صعب'].map(function(x){return '<button class="o'+(A.ease===x?' on':'')+'" data-ease="'+x+'">'+x+'</button>'}).join('')+'</div>'},
 function(){return '<h2>ما الّذي جعلَ التّعلّمَ ممتعًا؟</h2><p>يمكنُك اختيارُ أكثرَ من إجابة.</p><div class="op">'+FUN.map(function(u){return '<button class="o'+(A.fun.indexOf(u)>-1?' on':'')+'" data-fun="'+u+'">'+u+'<span class="ck"></span></button>'}).join('')+'</div>'+nav(A.fun.length)},
 function(){var o=isSt()?[['نعم','👍'],['ربّما','🤔']]:[['نعم بالتّأكيد','👍'],['ربّما','🤔'],['لا','👎']];
  return '<h2>'+(isSt()?'هل تريدُ درسًا آخرَ من «كون»؟':'هل تنصحُ غيرَك بـ«كون»؟')+'</h2><div class="faces">'+o.map(function(x){return '<button class="o'+(A.rec===x[0]?' on':'')+'" data-rec="'+x[0]+'"><span class="e">'+x[1]+'</span><span class="l">'+x[0]+'</span></button>'}).join('')+'</div>'},
 function(){return '<h2>ما الّذي تتمنّى أن نضيفَه؟</h2><p>اختياريّ: درسٌ لصفٍّ آخر، أو مادّةٌ أخرى، أو فكرةُ نشاط…</p><textarea id="ksvW" maxlength="250" placeholder="اكتبْ هنا… أو اضغطْ «أرسل» مباشرةً">'+esc(A.wish)+'</textarea><div class="nx"><button class="bk" data-back="1">رجوع</button><button class="go" data-send="1">أرسل رأيي</button></div>'},
 function(){return '<h2 style="text-align:center">شكرًا لمشاركتك</h2><p style="text-align:center">وصلَتْ إجابتُك، وستُسهمُ في تطويرِ "كون". نتمنّى لك تعلّمًا ممتعًا.</p><div class="nx"><button class="go" data-close="1">العودة إلى "كون"</button></div>'}
];
function f(x){return '<button class="o'+(A.learn===x[0]?' on':'')+'" data-learn="'+x[0]+'"><span class="e">'+x[1]+'</span><span class="l">'+x[2]+'</span></button>'}
function nav(ok){return '<div class="nx"><button class="bk" data-back="1">رجوع</button><button class="go" data-go="1"'+(ok?'':' disabled')+'>التالي</button></div>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function draw(){var b=document.getElementById('ksvB'),dots='';if(step>0&&step<8){for(var i=1;i<=7;i++)dots+='<i class="'+(i===step?'on':'')+'"></i>'}
 b.innerHTML=(dots?'<div class="dots">'+dots+'</div>':'')+STEPS[step]()+(step>1&&step<7&&!/data-back/.test(STEPS[step]())?'<div class="nx"><button class="bk" data-back="1">رجوع</button></div>':'')}
function next(){step++;draw()}
W.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;var d=t.dataset;
 if(d.go){next();return}if(d.back){step=Math.max(1,step-1);draw();return}
 if(d.role){if(A.role!==d.role){A.use=[];A.learn='';A.rec=''}A.role=d.role;setTimeout(next,180);t.classList.add('on');return}
 if(d.use){var i=A.use.indexOf(d.use);i>-1?A.use.splice(i,1):A.use.push(d.use);draw();return}
 if(d.fun){var j=A.fun.indexOf(d.fun);j>-1?A.fun.splice(j,1):A.fun.push(d.fun);draw();return}
 if(d.learn){A.learn=d.learn;t.classList.add('on');setTimeout(next,180);return}
 if(d.ease){A.ease=d.ease;t.classList.add('on');setTimeout(next,180);return}
 if(d.rec){A.rec=d.rec;t.classList.add('on');setTimeout(next,180);return}
 if(d.send){var w=document.getElementById('ksvW');A.wish=w?w.value.trim():'';
  var role=ROLES.filter(function(r){return r[0]===A.role})[0];
  var data={role:role?role[1]:A.role,use:A.use,learn:A.learn,ease:A.ease,fun:A.fun,rec:A.rec,wish:A.wish,page:(ref||used||'').split('/').pop()};
  mark();ls.setItem(Q,JSON.stringify(data));
  send(data).then(function(){ls.removeItem(Q)}).catch(function(){});
  next();return}
 if(d.close){W.remove();document.documentElement.style.overflow=''}});
W.addEventListener('input',function(e){if(e.target.id==='ksvW')A.wish=e.target.value});
function open(){if(document.getElementById('ksv'))return;document.body.appendChild(W);document.documentElement.style.overflow='hidden';draw()}
var SURVEY_ON=false; /* الاستطلاع مُخفًى مؤقّتًا — اجعليها true لإعادته */
function check(){if(!SURVEY_ON||isDone())return;used=ls.getItem('kawn-used');if(used||ref)setTimeout(open,1200)}
if(document.readyState==='complete')check();else window.addEventListener('load',check);
// العودةُ بزرِّ الرّجوع تُعيدُ الصّفحةَ من الذّاكرة دونَ تحميل، فنفحصُ من جديد
window.addEventListener('pageshow',function(e){if(e.persisted)check()});
})();

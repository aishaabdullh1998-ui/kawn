/* كون: عدّاد الزوّار والرسائل
   ضعي بين علامتي التنصيص رابطَ تطبيق الويب من Google Apps Script
   مثال: const KAWN_API='https://script.google.com/macros/s/XXXX/exec'; */
const KAWN_API='https://script.google.com/macros/s/AKfycbxkf2gcp4b01nxTVqUr7PIzFV2VuSgVWBFRZ3UFUUG-EYARbaTPduzDK4waZHe6k1qbAA/exec';

/* علامةُ استخدامِ درس: يظهرُ استطلاعُ الرّأي في الصّفحةِ الرّئيسةِ بعدَها */
try{if(!/(\/|index\.html?)$/.test(location.pathname))localStorage.setItem('kawn-used',location.pathname.split('/').pop()||'1')}catch(e){}

(function(){
  var ok=/^https:\/\/script\.google\.com\//.test(KAWN_API);
  window.KAWN={ok:ok,api:KAWN_API};
  if(!ok) return;
  try{
    var today=new Date().toLocaleDateString('en-CA');
    if(localStorage.getItem('kawn-v')!==today){
      localStorage.setItem('kawn-v',today);
      fetch(KAWN_API,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},
        body:JSON.stringify({action:'visit',page:document.title})}).catch(function(){});
    }
  }catch(e){}
})();

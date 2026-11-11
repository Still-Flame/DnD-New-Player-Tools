(function(){
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('pointerdown',function(e){
    var el=e.target.closest('.btn,button.chip,.lv,.cta');if(!el||rm)return;
    var r=el.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,s=document.createElement('span');
    s.className='rp';s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
    el.appendChild(s);setTimeout(function(){s.remove()},650);
  });
  var b=document.getElementById('themeBtn');
  function eff(){return document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}
  function label(){if(b)b.textContent=eff()==='dark'?'Light theme':'Dark theme'}
  try{var t=localStorage.getItem('dnd-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
  label();
  if(b)b.addEventListener('click',function(){var n=eff()==='dark'?'light':'dark';document.documentElement.dataset.theme=n;try{localStorage.setItem('dnd-theme',n)}catch(e){}label()});
})();
(function(){
  /* page transition, two phases:
     1) a solid in the clicked item's colour wipes across the old page
     2) on the new page an iris hole opens in that solid, centred where you clicked */
  var rm2=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
    var u=new URL(a.href,location.href);
    if(u.origin!==location.origin||u.pathname===location.pathname||/^#/.test(a.getAttribute('href')))return;
    if(rm2)return;
    e.preventDefault();
    var x=e.clientX,y=e.clientY;
    if(!e.detail||(!x&&!y)){var r=a.getBoundingClientRect();x=r.left+r.width/2;y=r.top+r.height/2}
    var p=document.createElement('i');p.style.cssText='position:absolute;visibility:hidden;color:var(--cc,var(--k,var(--accent-official,var(--c1,#FF5B1F))))';a.appendChild(p);var col=getComputedStyle(p).color;p.remove();
    try{sessionStorage.setItem('iris',Math.round(x)+'|'+Math.round(y)+'|'+col)}catch(err){}
    var o=document.createElement('div');o.className='cover';o.style.background=col;var R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+4,c0='circle(0px at '+x+'px '+y+'px)',c1='circle('+R+'px at '+x+'px '+y+'px)';o.style.clipPath=c0;document.body.appendChild(o);
    var go=function(){location.href=a.href};
    if(o.animate){var an=o.animate([{clipPath:c0},{clipPath:c1}],{duration:200,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'});an.onfinish=go;setTimeout(go,350)}else go();
  });
  addEventListener('pageshow',function(ev){if(ev.persisted)document.querySelectorAll('.cover').forEach(function(n){n.remove()})});
})();
(function(){
  /* warm the next page: prefetch on hover / touch, and the big data files when idle */
  var seen={};
  function pf(url){if(seen[url])return;seen[url]=1;var l=document.createElement('link');l.rel='prefetch';l.href=url;document.head.appendChild(l)}
  function pre(a,page){
    var u;try{u=new URL(a.href,location.href)}catch(e){return}
    if(u.origin!==location.origin||u.pathname===location.pathname)return;
    var dir=u.pathname.replace(/[^\/]*$/,'');
    if(/\/spells\/$/.test(dir)){pf(dir+'spells.js');pf(dir+'terms.js');pf(dir+'kor.js')}
    if(/\/compendium\/$/.test(dir))pf(dir+'data.js');
    if(page)pf(u.href);
  }
  function hot(e){var a=e.target.closest&&e.target.closest('a[href]');if(a)pre(a,true)}
  document.addEventListener('pointerover',hot,{passive:true});
  document.addEventListener('touchstart',hot,{passive:true});
  document.addEventListener('focusin',hot);
  var idle=window.requestIdleCallback||function(f){setTimeout(f,600)};
  addEventListener('load',function(){idle(function(){document.querySelectorAll('a[href]').forEach(function(a){pre(a,false)})})});
})();

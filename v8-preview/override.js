'use strict';
const state={lang:'zh',screen:'cover'};
const phones=[...document.querySelectorAll('.phone')];
const shell=document.querySelector('.device-shell');
const ratio=document.querySelector('#ratio');
const titles={cover:['封面','Cover'],battle:['战斗 HUD','Battle HUD'],upgrade:['升级卡片','Upgrade cards']};
const notes={cover:['V5 菜单作为风格参考；V8 此屏只审核启动封面。','V5 menu is the style reference; V8 reviews the launch cover.'],battle:['初始 5 + 5 空槽，口水普攻不占格；波次沿用 V7，只审核布局。','Start with 5 + 5 empty slots; basic spit stays outside. Layout only.'],upgrade:['对照三种分类样式；实际候选仍按游戏规则生成，治疗不是招式。','Three card styles, not a real roll. Healing is a refill, not a skill.']};
const refs={cover:['assets/v5-ui-cover.jpg','assets/v7-cover.png'],battle:['assets/v5-ui-battle.png','assets/v7-battle.png'],upgrade:['assets/v5-ui-upgrade.png','assets/v7-upgrade.png']};
function scale(){const [w,h]=ratio.value.split('x').map(Number);shell.style.maxWidth=w+'px';shell.style.aspectRatio=w+'/'+h;phones.forEach(p=>{p.style.setProperty('--dw',w+'px');p.style.setProperty('--dh',h+'px');p.style.transform=`scale(${shell.getBoundingClientRect().width/w})`;});}
function refresh(){const i=state.lang==='zh'?0:1;document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';document.querySelectorAll('[data-zh]').forEach(el=>el.textContent=el.dataset[state.lang]);phones.forEach(p=>{p.lang=state.lang;p.classList.toggle('hidden',p.dataset.screen!==state.screen)});document.querySelector('#screen-title').textContent=titles[state.screen][i];document.querySelector('#screen-note').textContent=notes[state.screen][i];document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===state.screen));document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===state.lang));refs[state.screen].forEach((src,n)=>document.querySelector('#ref'+n).src=src);document.querySelectorAll('.card').forEach(c=>c.setAttribute('aria-pressed','false'));scale();}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{state.screen=b.dataset.view;refresh()}));
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;refresh()}));
document.querySelectorAll('.dock').forEach(d=>{for(let i=0;i<10;i++){const s=document.createElement('span');s.className='slot';s.setAttribute('aria-hidden','true');d.append(s)}});
document.querySelectorAll('.paw').forEach(p=>{for(let i=0;i<4;i++)p.append(document.createElement('i'))});
document.querySelectorAll('.card').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.card').forEach(x=>x.setAttribute('aria-pressed',x===c));document.querySelector('.selection-note').textContent=state.lang==='zh'?'已预览选中样式 · 不改变游戏存档':'Selection preview only · no game data changed'}));
document.querySelector('.start-button').addEventListener('click',()=>{state.screen='battle';refresh()});
ratio.addEventListener('change',scale);new ResizeObserver(scale).observe(shell);refresh();

/* ============================================================
 * 小胡考证 · 应用主逻辑
 * 纯前端 Hash 路由 + localStorage 学习数据 + IndexedDB 录音
 * ============================================================ */
(function(){
'use strict';

/* ---------- 工具 ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const esc = s=>String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const atr = s=>esc(s).replace(/"/g,'&quot;');
const shuffle = a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const todayStr = (d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fmtTime = ts=>{const d=new Date(ts);return `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;};
const fmtDur = sec=>`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;

function toast(msg){
  const t=$('#toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1800);
}
function speak(text,lang){
  if(!('speechSynthesis' in window)){toast('当前浏览器不支持语音朗读');return;}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang=lang||(/[\u4e00-\u9fa5]/.test(text)?'zh-CN':'en-US');
  u.rate=u.lang==='en-US'?0.95:1;
  speechSynthesis.speak(u);
}

/* ---------- 本地存储 ---------- */
const store={
  get(k,d){try{const v=JSON.parse(localStorage.getItem('xh_'+k));return v==null?d:v;}catch(e){return d;}},
  set(k,v){localStorage.setItem('xh_'+k,JSON.stringify(v));}
};
const state={
  cfg:Object.assign({examDate:'2026-12-01',nick:'小胡同学'},store.get('cfg',{})),
  done:store.get('done',[]),          // ["ov:ov_city","spot:bund","qa:.."]
  fav:store.get('fav',[]),
  checkin:store.get('checkin',[]),
  wrong:store.get('wrong',[]),
  reports:store.get('reports',[]),
  tasks:store.get('tasks',{}),
  edits:store.get('edits',{}),     // 讲解词自定义文案 {"ov:ov_city":[{v,zh,en}...]}
  lmEdits:store.get('lmEdits',{}), // 速记自定义文案 {"spot:bund":[{name:{zh,en},desc:{zh,en}}...]}
  stats:Object.assign({interp:0},store.get('stats',{})),
  ver:{},          // 文章版本选择（会话内）
  edit:null,       // 当前正在编辑的讲解 ref（如 ov:ov_city）
  lmEdit:null,     // 当前正在编辑的速记（如 spot:bund#2）
  qaTopic:'all',
  ipCfg:{dir:'c2e',cat:'all'},
  ip:null,         // 口译训练会话
  mock:null,       // 模拟考场会话
  ra:null          // 跟读录音
};
const save=(k)=>store.set(k,state[k]);
const isDone=id=>state.done.includes(id);
const isFav=id=>state.fav.includes(id);
function toggleArr(arrKey,id){
  const a=state[arrKey],i=a.indexOf(id);
  if(i>=0)a.splice(i,1);else a.push(id);
  save(arrKey);
}
function checkinToday(){
  const t=todayStr();
  if(!state.checkin.includes(t)){state.checkin.push(t);save('checkin');}
}
function streak(){
  let n=0,d=new Date();
  if(!state.checkin.includes(todayStr(d)))d.setDate(d.getDate()-1);
  while(state.checkin.includes(todayStr(d))){n++;d.setDate(d.getDate()-1);}
  return n;
}

/* ---------- IndexedDB 录像录音 ---------- */
function idb(){
  return new Promise((res,rej)=>{
    const r=indexedDB.open('xh_rec',1);
    r.onupgradeneeded=e=>e.target.result.createObjectStore('recs',{keyPath:'id'});
    r.onsuccess=e=>res(e.target.result);r.onerror=rej;
  });
}
async function recSave(rec){
  const db=await idb();
  return new Promise((res,rej)=>{const tx=db.transaction('recs','readwrite');tx.objectStore('recs').put(rec);tx.oncomplete=res;tx.onerror=rej;});
}
async function recAll(){
  const db=await idb();
  return new Promise((res,rej)=>{const r=db.transaction('recs').objectStore('recs').getAll();r.onsuccess=()=>res((r.result||[]).sort((a,b)=>b.ts-a.ts));r.onerror=rej;});
}
async function recDel(id){
  const db=await idb();
  return new Promise((res,rej)=>{const tx=db.transaction('recs','readwrite');tx.objectStore('recs').delete(id);tx.oncomplete=res;tx.onerror=rej;});
}

/* ---------- 录音机 ---------- */
function makeRecorder(){
  return {
    stream:null,rec:null,chunks:[],live:false,
    async start(video){
      this.cleanup();
      this.stream=await navigator.mediaDevices.getUserMedia(
        video?{video:{facingMode:'user'},audio:true}:{audio:true}
      );
      this.chunks=[];
      this.rec=new MediaRecorder(this.stream);
      this.rec.ondataavailable=e=>{if(e.data.size)this.chunks.push(e.data);};
      this.rec.start(250);
      this.live=true;
      return this.stream;
    },
    stop(){
      return new Promise(res=>{
        if(!this.rec){res(null);return;}
        this.rec.onstop=()=>{
          const type=this.rec.mimeType||(this.stream.getVideoTracks().length?'video/webm':'audio/webm');
          const blob=new Blob(this.chunks,{type});
          this.cleanup();res(blob);
        };
        this.rec.stop();
      });
    },
    cleanup(){if(this.stream){this.stream.getTracks().forEach(t=>t.stop());this.stream=null;}this.live=false;}
  };
}

/* ---------- 路由 ---------- */
const view=$('#view');
function go(h){location.hash=h;}
function currentTab(){
  const h=location.hash||'#/home';
  if(h.startsWith('#/library'))return 'library';
  if(h.startsWith('#/exam')||h.startsWith('#/interp')||h.startsWith('#/mock'))return 'exam';
  if(h.startsWith('#/extend'))return 'extend';
  if(h.startsWith('#/me'))return 'me';
  return 'home';
}
function render(){
  const h=location.hash||'#/home';
  document.body.classList.toggle('immersive',h.startsWith('#/mock/run'));
  $$('.tab').forEach(t=>t.classList.toggle('active',t.getAttribute('data-hash')==='#/'+currentTab()));
  const p=h.replace(/^#/,'').split('?')[0], seg=p.split('/').filter(Boolean);
  const root=seg[0]||'home';
  try{
    switch(root){
      case 'home': rHome();break;
      case 'library': rLibrary(seg.slice(1));break;
      case 'exam': rExam();break;
      case 'interp': rInterp();break;
      case 'mock': rMock(seg.slice(1));break;
      case 'extend': rExtend(seg.slice(1));break;
      case 'me': rMe(seg.slice(1));break;
      default: rHome();
    }
  }catch(err){console.error(err);view.innerHTML=`<div class="empty"><span class="e-ico">⚠️</span>页面出错：${esc(err.message)}</div>`;}
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);

/* ---------- 通用片段 ---------- */
function head(title,back,act){
  return `<div class="page-head">
    <button class="back" data-hash="${atr(back||'#/home')}">‹</button>
    <h1>${esc(title)}</h1>${act||''}
  </div>`;
}
function favBtn(ref){
  return `<button class="fav-btn ${isFav(ref)?'on':''}" data-act="fav" data-ref="${atr(ref)}">${isFav(ref)?'★':'☆'}</button>`;
}
function biBlock(label,bodyHtml,extraHead){
  return `<div class="bi">
    <div class="bi-bar"><span class="bi-label">${esc(label)}</span>${extraHead||'<button class="btn-lang" data-act="entoggle">🌐 EN</button>'}</div>
    <div class="bi-body">${bodyHtml}</div></div>`;
}
function paraHtml(i,p){
  return `<div class="para">
    <span class="pno">${i+1}</span>
    <span class="zh-text">${esc(p.zh)}</span>
    <span class="en-text"><span class="en-flag">ENGLISH</span>${esc(p.en)}</span>
    <button class="speak-btn" data-act="speakpara" data-zh="${atr(p.zh)}" data-en="${atr(p.en)}">🔊</button>
  </div>`;
}
/* ---------- 讲解词自定义编辑 ---------- */
function artByRef(ref){
  if(!ref)return null;
  const [k,id]=ref.split(':');
  if(k==='ov')return XH.overview.find(x=>x.id===id)||null;
  if(k==='spot')return XH.spots.find(x=>x.id===id)||null;
  return null;
}
/* 生效正文：有长度一致的自定义稿则用它，否则用预置原文 */
function effBody(ref){
  const art=artByRef(ref);if(!art)return [];
  const ed=state.edits[ref];
  return (ed&&ed.length===art.body.length)?ed:art.body;
}
function isEdited(ref){const ed=state.edits[ref];const art=artByRef(ref);return !!(art&&ed&&ed.length===art.body.length);}
/* 编辑态操作条 */
function artEditBar(){
  return `<div class="art-edit-actions">
    <button type="button" class="btn btn-sm primary" data-act="arttrall">🤖 重新翻译英文</button>
    <button type="button" class="btn btn-sm" data-act="artsave">💾 保存</button>
    <button type="button" class="btn btn-sm ghost" data-act="artreset">↩️ 恢复原文</button>
    <button type="button" class="btn btn-sm ghost" data-act="artcancel">取消</button>
  </div>`;
}
function artViewBar(ref){
  return `<div class="bi-actions"><button type="button" class="btn-edit" data-act="artedit" data-ref="${atr(ref)}">✏️ 编辑${isEdited(ref)?' · 已改':''}</button><button class="btn-lang" data-act="entoggle">🌐 EN</button></div>`;
}
function paraEditHtml(no,wi,p){
  return `<div class="para-edit" data-wi="${wi}">
    <div class="pe-head"><span class="pno">${no}</span><span class="pe-tag">中文文案（可直接修改）</span>
      <button type="button" class="btn btn-xs ghost" data-act="arttrone">🤖 译本段</button></div>
    <textarea class="pe-ta" data-edit="zh" rows="3">${esc(p.zh)}</textarea>
    <div class="pe-tag en-tag">English（点「译本段」或上方「重新翻译」自动生成，也可手动改）</div>
    <textarea class="pe-ta pe-en" data-edit="en" rows="4">${esc(p.en)}</textarea>
  </div>`;
}
function kwHtml(kws){
  if(!kws||!kws.length)return '';
  return `<div class="kw-title">🔑 关键词卡（点击喇叭听英文）</div><div class="kw-chips">${
    kws.map(k=>`<span class="kw">${esc(k.zh)} <span class="kw-en">${esc(k.en)}</span><span class="kw-say" data-act="speak" data-text="${atr(k.en)}">🔊</span></span>`).join('')
  }</div>`;
}
function learnedBar(ref,label){
  const on=isDone(ref);
  return `<div class="flex mt12">
    <button class="btn ${on?'gray':'block'}" data-act="learned" data-ref="${atr(ref)}">${on?'✓ 已学（点击取消）':'标记为已学'}</button>
  </div>`;
}
function progressOf(list,prefix){
  const n=list.filter(x=>isDone(prefix+':'+x.id)).length;
  return {n,total:list.length,pct:list.length?Math.round(n/list.length*100):0};
}

/* ---------- 首页 ---------- */
function rHome(){
  const cfg=state.cfg;
  const days=(()=>{const d=Math.ceil((new Date(cfg.examDate+'T09:00')-new Date())/864e5);return d;})();
  const td=todayStr();
  const t=state.tasks[td]||{};
  const tasks=[
    {k:'t1',name:'学 1 篇双语讲解',sub:'概况或景区讲解词',to:'#/library'},
    {k:'t2',name:'背 5 张综合问答卡',sub:'问—答—英文要点',to:'#/library/qa'},
    {k:'t3',name:'练 3 题口译',sub:'中译外 / 外译中',to:'#/interp'},
    {k:'t4',name:'完成 1 次模拟',sub:'站立答题 · 全程录像',to:'#/exam'}
  ];
  const learnedN=state.done.length;
  view.innerHTML=`
  <div class="hero">
    <div class="hello">${days>=0?'距离科目五现场考试还有':'考试日期已过，请更新设置'}</div>
    <h2>Hi，${esc(cfg.nick)} 👋</h2>
    <div class="countdown">
      <div class="num">${days>=0?days:'--'}<small>天</small></div>
      <div class="cd-info">
        全国导游资格考试（上海）· 英语类<br>机考 · 站立答题 · 不少于 25 分钟
        <span class="set-date" data-act="setdate">📅 设置考试日期</span>
      </div>
    </div>
  </div>
  <div class="hero-cards">
    <div class="mini-card"><div class="mc-v">${learnedN}</div><div class="mc-k">已学内容</div></div>
    <div class="mini-card"><div class="mc-v">${state.fav.length}</div><div class="mc-k">收藏背诵</div></div>
    <div class="mini-card"><div class="mc-v">${streak()} 天</div><div class="mc-k">连续打卡</div></div>
    <div class="mini-card"><div class="mc-v">${state.reports.length}</div><div class="mc-k">模拟次数</div></div>
  </div>

  <div class="section">
    <div class="section-head"><h3>✅ 今日任务</h3><span class="muted">完成任意任务自动打卡</span></div>
    <div class="card">
      ${tasks.map(x=>`<div class="task-row ${t[x.k]?'done':''}">
        <div class="task-check ${t[x.k]?'on':''}" data-act="task" data-k="${x.k}">${t[x.k]?'✓':''}</div>
        <div class="t-info" data-hash="${x.to}"><div class="t-name">${x.name}</div><div class="t-sub">${x.sub}</div></div>
        <span class="chev" data-hash="${x.to}">›</span>
      </div>`).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-head"><h3>🎯 备考重心（100 分）</h3></div>
    <div class="card" data-hash="#/library" style="cursor:pointer">
      <div class="flex between"><b>讲解类合计 55 分</b><span class="tag tag-gold">最高优先</span></div>
      <div class="card-sub">概况讲解 20 分 · 景点讲解 20 分 · 语言表达 15 分</div>
      <div class="progress-line mt8"><div class="pbar"><i style="width:${progressOf(XH.overview,'ov').pct}%"></i></div><span>概况 ${progressOf(XH.overview,'ov').n}/${progressOf(XH.overview,'ov').total}</span></div>
      <div class="progress-line mt8"><div class="pbar"><i style="width:${progressOf(XH.spots,'spot').pct}%"></i></div><span>景区 ${progressOf(XH.spots,'spot').n}/${progressOf(XH.spots,'spot').total}</span></div>
    </div>
    <div class="entry-grid">
      <div class="entry" data-hash="#/interp"><div class="e-ico">🎧</div><div class="e-name">口译训练</div><div class="e-desc">2题，10分/题 · 双向各 1 题</div></div>
      <div class="entry" data-hash="#/exam"><div class="e-ico">🎬</div><div class="e-name">全真模拟</div><div class="e-desc">抽题 · 录像 · 自评报告</div></div>
    </div>
  </div>

  <div class="section">
    <div class="notice">📘 内容依据《2026年上海导游资格考试（科目五·现场考试）考试大纲》编制，全部讲解预置中英双语，离线可用。</div>
  </div>`;
}

/* ---------- 讲解库 ---------- */
function rLibrary(seg){
  if(!seg.length){
    const po=progressOf(XH.overview,'ov'),ps=progressOf(XH.spots,'spot'),pq=progressOf(XH.qa,'qa');
    view.innerHTML=`${head('讲解库','#/home')}
    <div class="page-body">
      <div class="card clickable" data-hash="#/library/ov">
        <div class="card-row">
          <div style="font-size:28px">📖</div>
          <div class="grow"><div class="card-title">概况讲解库 <span class="score-chip">2题，10分/题</span></div>
          <div class="card-sub">城市概况 + 红色 / 海派 / 江南文化</div>
          <div class="progress-line mt8"><div class="pbar"><i style="width:${po.pct}%"></i></div><span>${po.n}/${po.total}</span></div></div>
          <span class="chev">›</span>
        </div>
      </div>
      <div class="card clickable" data-hash="#/library/spots">
        <div class="card-row">
          <div style="font-size:28px">🗼</div>
          <div class="grow"><div class="card-title">景点讲解库 · 五大景区 <span class="score-chip">2题，10分/题</span></div>
          <div class="card-sub">外滩 · 人民广场 · 陆家嘴 · 豫园 · 玉佛寺</div>
          <div class="progress-line mt8"><div class="pbar"><i style="width:${ps.pct}%"></i></div><span>${ps.n}/${ps.total}</span></div></div>
          <span class="chev">›</span>
        </div>
      </div>
      <div class="card clickable" data-hash="#/library/qa">
        <div class="card-row">
          <div style="font-size:28px">🙋</div>
          <div class="grow"><div class="card-title">综合知识问答库 <span class="score-chip">5分</span></div>
          <div class="card-sub">一江一河 · 南京路 · 徐家汇源等 7 大类</div>
          <div class="progress-line mt8"><div class="pbar"><i style="width:${pq.pct}%"></i></div><span>${pq.n}/${pq.total}</span></div></div>
          <span class="chev">›</span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="notice">💡 每篇讲解均含 <b>3 分钟精简版 / 5 分钟完整版</b> 与「🌐 EN」双语切换；词汇卡和英文段落可点击 🔊 听发音。</div>
    </div>`;
    return;
  }
  if(seg[0]==='ov' && seg[1]) return rOvDetail(seg[1]);
  if(seg[0]==='spot' && seg[1]) return rSpotDetail(seg[1]);
  if(seg[0]==='ov') return rOvList();
  if(seg[0]==='spots') return rSpotList();
  if(seg[0]==='qa') return rQaList();
  view.innerHTML=`${head('讲解库','#/home')}<div class="empty"><span class="e-ico">📭</span>页面不存在<br><button class="btn mt12" data-hash="#/library">返回讲解库</button></div>`;
}

function rOvList(){
  const city=XH.overview.find(o=>o.id==='ov_city');
  const cults=XH.overview.filter(o=>o.cat==='culture');
  const ovCard=o=>{const ref='ov:'+o.id;return `<div class="card clickable" data-hash="#/library/ov/${o.id}">
    <div class="card-row"><div class="grow">
      <div class="card-title">${esc(o.title.zh)} ${favBtn(ref)}</div>
      <div class="card-sub">${esc(o.title.en)}</div>
    </div><span class="chev">›</span></div>
    ${isDone(ref)?'<div class="tag tag-ok mt8">✓ 已学</div>':'<div class="tag mt8">未学习</div>'}
  </div>`;};
  view.innerHTML=`${head('概况讲解库','#/library')}
  <div class="page-body">
    <div class="section-head"><h3>① 上海城市概况（10分）</h3></div>
    ${ovCard(city)}
    <div class="kw-title">城市概况 · 8 个知识条目（点开看双语）</div>
    <div class="profile-grid">
      ${XH.facts.map((f,i)=>`<div class="profile-item" data-act="fact" data-i="${i}" style="cursor:pointer">
        <div class="pi-k">${f.icon} ${esc(f.t.zh)}</div><div class="pi-v">${esc(f.t.en)}</div></div>`).join('')}
    </div>
    <div class="section-head mt16"><h3>② 上海文化旅游概况（10分）</h3></div>
    <div class="muted" style="margin:-4px 0 10px">大纲要求：红色 / 海派 / 江南三篇总体概况，不考单个景点细节。</div>
    ${cults.map(ovCard).join('')}
  </div>`;
}

function rOvDetail(id){
  const o=XH.overview.find(x=>x.id===id);if(!o)throw new Error('内容不存在');
  const ref='ov:'+o.id, ver=state.ver[id]||3, editing=state.edit===ref;
  const body=effBody(ref);
  const rows=body.filter(p=>p.v<=ver).map(p=>({wi:body.indexOf(p),p}));
  const bodyHtml=editing
    ? rows.map((x,i)=>paraEditHtml(i+1,x.wi,x.p)).join('')
    : rows.map((x,i)=>paraHtml(i,x.p)).join('');
  view.innerHTML=`${head(o.title.zh,'#/library/ov',favBtn(ref))}
  <div class="page-body">
    <div class="flex between">
      <div class="seg">
        <button ${editing?'disabled':''} class="${ver===3?'on':''}" data-act="ver" data-id="${esc(id)}" data-v="3">3分钟精简版</button>
        <button ${editing?'disabled':''} class="${ver===5?'on':''}" data-act="ver" data-id="${esc(id)}" data-v="5">5分钟完整版</button>
      </div>
      <button class="btn btn-sm ghost" ${editing?'disabled':''} data-act="readalong" data-title="${atr(o.title.zh)}">🎙️ 跟读练习</button>
    </div>
    <div class="muted mt8">${esc(o.title.en)} · ${ver} 分钟版 · 共 ${rows.length} 段${isEdited(ref)?' · <span style="color:var(--gold)">已自定义</span>':''}</div>
    <div class="mt12">${biBlock(editing?('讲解全文 · 编辑模式（'+ver+'分钟版，共'+rows.length+'段）'):'讲解全文 · 点「🌐 EN」整段切换英文',bodyHtml,editing?artEditBar():artViewBar(ref))}</div>
    ${editing?'':kwHtml(o.keywords)}
    ${learnedBar(ref)}
  </div>`;
}

function rSpotList(){
  view.innerHTML=`${head('五大景区讲解库','#/library')}
  <div class="page-body">
    ${XH.spots.map(s=>{const ref='spot:'+s.id;return `<div class="card clickable" data-hash="#/library/spot/${s.id}">
      <div class="card-row"><div class="grow">
        <div class="card-title">${esc(s.name.zh)} <span class="score-chip">10分</span> ${favBtn(ref)}</div>
        <div class="card-sub">${esc(s.name.en)}</div>
        <div class="card-sub">${esc(s.profile.status.zh)}</div>
      </div><span class="chev">›</span></div>
      ${isDone(ref)?'<div class="tag tag-ok mt8">✓ 已学</div>':'<div class="tag mt8">未学习</div>'}
    </div>`;}).join('')}
  </div>`;
}

function rSpotDetail(id){
  const s=XH.spots.find(x=>x.id===id);if(!s)throw new Error('景区不存在');
  const ref='spot:'+s.id, ver=state.ver[id]||3, editing=state.edit===ref;
  const body=effBody(ref);
  const rows=body.filter(p=>p.v<=ver).map(p=>({wi:body.indexOf(p),p}));
  const bodyHtml=editing
    ? rows.map((x,i)=>paraEditHtml(i+1,x.wi,x.p)).join('')
    : rows.map((x,i)=>paraHtml(i,x.p)).join('');
  view.innerHTML=`${head(s.name.zh,'#/library/spots',favBtn(ref))}
  <div class="page-body">
    <div class="card">
      <div class="card-title">📇 景点档案卡</div>
      <div class="profile-grid mt8">
        <div class="profile-item"><div class="pi-k">中文名</div><div class="pi-v">${esc(s.name.zh)}</div></div>
        <div class="profile-item"><div class="pi-k">English</div><div class="pi-v">${esc(s.name.en)}</div></div>
        <div class="profile-item"><div class="pi-k">地位</div><div class="pi-v">${esc(s.profile.status.zh)}</div></div>
        <div class="profile-item"><div class="pi-k">一句话亮点</div><div class="pi-v">${esc(s.profile.highlight.zh)}</div></div>
      </div>
    </div>

    <div class="flex between mt12">
      <div class="seg">
        <button ${editing?'disabled':''} class="${ver===3?'on':''}" data-act="ver" data-id="${esc(id)}" data-v="3">3分钟精简版</button>
        <button ${editing?'disabled':''} class="${ver===5?'on':''}" data-act="ver" data-id="${esc(id)}" data-v="5">5分钟完整版</button>
      </div>
      <button class="btn btn-sm ghost" ${editing?'disabled':''} data-act="readalong" data-title="${atr(s.name.zh+'讲解')}">🎙️ 跟读</button>
    </div>

    <div class="mt12">${biBlock(editing?('双语讲解全文 · 编辑模式（'+ver+'分钟版，共'+rows.length+'段）'):'双语讲解全文（逐段中英对照）',bodyHtml,editing?artEditBar():artViewBar(ref))}</div>
    ${editing?'':kwHtml(s.keywords)}

    <div class="card mt12">
      <div class="card-title">🏛️ 主要景点逐个速记（${s.landmarks.length} 处）</div>
      <div class="muted" style="margin:6px 0 0;font-size:12px">点每处的「✏️ 编辑」可改写中文，并用 DeepSeek 自动译成英文（需先在「我的→学习设置」填写 API Key）。</div>
      <div class="mt12">${effLandmarks(ref).map((lm,i)=>{
        const editingLm=state.lmEdit===ref+'#'+i;
        if(editingLm)return `<div class="bi"><div class="bi-bar"><span class="bi-label">${esc(lm.name.zh)} · 编辑中</span>${lmEditBar(ref,i)}</div>
          <div class="bi-body">${lmEditHtml(lm)}</div></div>`;
        return `<div class="bi"><div class="bi-bar"><span class="bi-label">${esc(lm.name.zh)}${lmIsEdited(ref,i)?' <span style="color:var(--gold);font-size:11px">已自定义</span>':''}</span>${lmViewBar(ref,i)}</div>
        <div class="bi-body">
          <div class="zh-text"><b>${esc(lm.name.zh)}</b> — ${esc(lm.desc.zh)}</div>
          <div class="en-text"><span class="en-flag">ENGLISH</span><b>${esc(lm.name.en)}</b> — ${esc(lm.desc.en)}</div>
        </div></div>`;}).join('')}
    </div>

    <div class="card">
      <div class="card-title">🧩 讲解结构拆解（中文常显）</div>
      <div class="struct-steps mt8">${s.structure.map(x=>`<div>${x}</div>`).join('')}</div>
    </div>

    <div class="card">
      <div class="card-title">🔤 重点词汇表（点击 🔊 听发音）</div>
      <div class="vocab-list mt8">${s.vocab.map(v=>`
        <div class="vocab-row"><span class="v-zh">${esc(v.zh)}</span><span class="v-en">${esc(v.en)}</span><span class="v-say" data-act="speak" data-text="${atr(v.en)}">🔊</span></div>`).join('')}
      </div>
    </div>
    ${learnedBar(ref)}
  </div>`;
}

function rQaList(){
  const topic=state.qaTopic;
  const list=XH.qa.filter(q=>topic==='all'||q.topic===topic);
  const tname=t=>{const f=XH.qaTopics.find(x=>x.id===t);return f?f.name:'';};
  view.innerHTML=`${head('综合知识问答库','#/library')}
  <div class="page-body">
    <div class="qa-topic">
      ${[{id:'all',name:'全部'}].concat(XH.qaTopics).map(t=>`<div class="chip ${topic===t.id?'on':''}" data-act="qatopic" data-t="${t.id}">${esc(t.name)}</div>`).join('')}
    </div>
    ${list.map(q=>{const ref='qa:'+q.id;return `<div class="bi">
      <div class="bi-bar"><span class="bi-label">${esc(tname(q.topic))} ${favBtn(ref)}</span>
        <button class="btn-lang" data-act="entoggle">🌐 EN</button></div>
      <div class="bi-body">
        <div class="zh-text">
          <div class="qa-q">Q：${esc(q.q)}</div>
          <div class="qa-a">A：${esc(q.a)}</div>
        </div>
        <div class="en-text">
          <span class="en-flag">ENGLISH ANSWER</span>
          <div class="qa-q" style="font-weight:400;font-style:italic">Q：${esc(q.q)}</div>
          <div>${esc(q.en)}</div>
        </div>
        <div class="flex between mt8">
          <button class="btn btn-sm ${isDone(ref)?'gray':'ghost'}" data-act="learned" data-ref="${ref}">${isDone(ref)?'✓ 已掌握':'我掌握了'}</button>
          <button class="speak-btn" style="position:static;width:auto;border:none;background:none;font-size:14px" data-act="speak" data-text="${atr(q.en)}">🔊 听英文</button>
        </div>
      </div></div>`;}).join('')}
  </div>`;
}

/* ---------- 考场首页 ---------- */
function rExam(){
  view.innerHTML=`${head('模拟考场','#/home')}
  <div class="page-body">
    <div class="exam-hero">
      <h3>🎬 全真模拟考场</h3>
      <p>按真实分值结构随机抽题 · 站立答题 · 全程录像录音 · 自动计时 ≥25 分钟，结束后生成六题型自评报告。</p>
      <button class="btn block mt12" data-act="mockstart">立即开始模拟</button>
    </div>
    <div class="card clickable" data-hash="#/interp">
      <div class="card-row"><div style="font-size:26px">🎧</div>
      <div class="grow"><div class="card-title">口译训练 <span class="score-chip">2题，10分/题</span></div>
      <div class="card-sub">中译外 / 外译中（外译中强制先朗读）· 录音作答 · 逐句对照</div></div>
      <span class="chev">›</span></div>
    </div>
    <div class="card clickable" data-hash="#/extend/etiquette">
      <div class="card-row"><div style="font-size:26px">🤵</div>
      <div class="grow"><div class="card-title">礼貌礼仪专项 <span class="score-chip">5分</span></div>
      <div class="card-sub">全程考核：礼貌用语 / 着装 / 举止 / 精神面貌 + 临场缓冲话术</div></div>
      <span class="chev">›</span></div>
    </div>
    <div class="card clickable" data-hash="#/me/reports">
      <div class="card-row"><div style="font-size:26px">📊</div>
      <div class="grow"><div class="card-title">历次模拟报告</div>
      <div class="card-sub">已完成 ${state.reports.length} 次 · 查看得分与薄弱项建议</div></div>
      <span class="chev">›</span></div>
    </div>
    <div class="card">
      <div class="card-title">📋 考场规则速览</div>
      <div class="exam-rule mt8"><span class="er-ico">🖥️</span>机考方式，全程录像，佩戴收声麦克风</div>
      <div class="exam-rule"><span class="er-ico">🧍</span>站立答题，外语类答题时间不少于 25 分钟</div>
      <div class="exam-rule"><span class="er-ico">🎲</span>总分 100 分，题目考试当天由系统随机抽取</div>
    </div>
  </div>`;
}

/* ---------- 口译训练 ---------- */
function rInterp(){
  if(!state.ip){ // 设置页
    const cfg=state.ipCfg;
    view.innerHTML=`${head('口译训练','#/exam')}
    <div class="page-body">
      <div class="card">
        <div class="card-title">选择方向</div>
        <div class="entry-grid mt8">
          <div class="entry" data-act="ipdir" data-d="c2e" style="${cfg.dir==='c2e'?'border-color:var(--primary);background:var(--primary-light)':''}">
            <div class="e-ico">🀄➡️🅰️</div><div class="e-name">中译外</div><div class="e-desc">看中文 · 英文口译</div></div>
          <div class="entry" data-act="ipdir" data-d="e2c" style="${cfg.dir==='e2c'?'border-color:var(--primary);background:var(--primary-light)':''}">
            <div class="e-ico">🅰️➡️🀄</div><div class="e-name">外译中</div><div class="e-desc">先朗读英文 · 再口译</div></div>
        </div>
        ${cfg.dir==='e2c'?'<div class="read-note mt12">⚠️ 考场要求：外译中必须先朗读英文原文，再进行口译。训练将分两步进行。</div>':''}
      </div>
      <div class="card">
        <div class="card-title">选择题库类别</div>
        <div class="qa-topic mt8">
          ${XH.interpCats.map(c=>`<div class="chip ${cfg.cat===c.id?'on':''}" data-act="ipcat" data-c="${c.id}">${esc(c.name)}</div>`).join('')}
        </div>
      </div>
      <button class="btn block big" data-act="ipbegin">开始训练（共 ${interpPool().length} 题）</button>
      <div class="muted mt8 center" style="text-align:center">已累计练习 ${state.stats.interp} 题 · 错题本 ${state.wrong.length} 题</div>
    </div>`;
    return;
  }
  const s=state.ip,it=s.items[s.idx];
  const steps=it.dir==='e2c'?['朗读原文','口译','对照']:['口译','对照'];
  const stepIdx=s.step;
  const isRead=it.dir==='e2c'&&stepIdx===0;
  const isAnswer=stepIdx===(it.dir==='e2c'?1:0);
  const isRef=stepIdx===steps.length-1;
  const srcLang=it.dir==='c2e'?'zh':'en';
  view.innerHTML=`${head('口译训练（'+(s.idx+1)+'/'+s.items.length+'）','#/exam',
    '<button class="head-act" data-act="ipexit">退出</button>')}
  <div class="page-body">
    <div class="step-dot-row">${steps.map((_,i)=>`<div class="step-dot ${i<=stepIdx?'on':''}"></div>`).join('')}</div>
    <div class="card interp-card">
      <div class="interp-dir">${it.dir==='c2e'?'中译外 · CHINESE → ENGLISH':'外译中 · ENGLISH → CHINESE'} · ${catName(it.cat)}</div>
      <div class="interp-src ${srcLang==='en'?'en-style':''}">${esc(it[srcLang])}</div>
      ${srcLang==='en'?`<button class="btn btn-sm ghost" data-act="speak" data-text="${atr(it.en)}">🔊 听原文</button>`:''}

      <div class="mt16">
        <div class="muted">${isRead?'第 1 步：大声朗读英文原文（系统将录音）':isAnswer?(it.dir==='e2c'?'第 2 步：开始中文口译录音':'录制你的英文口译'):'对照参考译文，自评打分'}</div>
        <div class="flex" style="justify-content:center;gap:10px;margin-top:10px">
          ${(!isRef)?`
            <button class="btn ${s.rec&&s.rec.live?'danger':''}" data-act="iprec" style="min-width:130px">
              ${s.rec&&s.rec.live?'<span class="rec-dot live"></span> 停止录音':'🎤 开始录音'}</button>
            ${s.lastUrl?`<audio controls src="${s.lastUrl}" style="height:38px"></audio>`:''}
          `:''}
        </div>
        ${isRef?`
          <div class="interp-ref show ${it.dir==='c2e'?'':'zh-ref'}"><b>参考译文：</b><br>${esc(it.dir==='c2e'?it.en:it.zh)}</div>
          <div class="muted mt12">你的自评：</div>
          <div class="rate-row">
            ${[['good','流畅准确','要点齐全'],['ok','基本完成','略有卡顿'],['bad','需要复习','要点缺失']].map(r=>`
              <button class="rate-btn ${s.rate===r[0]?'on':''}" data-act="iprate" data-r="${r[0]}">${r[1]}<small>${r[2]}</small></button>`).join('')}
          </div>
          <button class="btn ${state.wrong.includes(it.id)?'danger':'ghost'} block mt12" data-act="ipwrong">
            ${state.wrong.includes(it.id)?'✓ 已在错题本（点击移除）':'＋ 加入错题本'}</button>
          <button class="btn block mt8" data-act="ipnext">${s.idx+1>=s.items.length?'完成训练 · 查看结果':'下一题 →'}</button>
        `:`
          <button class="btn ghost block mt12" data-act="ipforward">${isRead?'已朗读完，下一步口译':'跳过录音，查看参考译文'}</button>
        `}
      </div>
    </div>
  </div>`;
}
function catName(c){return (XH.interpCats.find(x=>x.id===c)||{}).name||'';}
function interpPool(){
  const {dir,cat}=state.ipCfg;
  return XH.interpret.filter(x=>x.dir===dir&&(cat==='all'||x.cat===cat));
}

/* ---------- 全真模拟 ---------- */
function rMock(seg){
  if(seg[0]==='run'&&state.mock&&state.mock.stage==='run')return rMockRun();
  if(seg[0]==='rate'&&state.mock&&state.mock.stage==='rate')return rMockRate();
  if(seg[0]==='report')return rMockReport(seg[1]);
  go('#/exam');
}
function buildPaper(){
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const mk=(type,name,score,refId,title,brief)=>({type,name,score,refId,title,brief});
  const qs=[];
  qs.push(mk('ov','概况讲解 · 城市概况',10,'ov_city','上海城市概况讲解','覆盖城市定位、地理、历史、人口区划、市标、旅游资源、城市精神 8 大要点；3 分钟左右'));
  const c=pick(XH.overview.filter(o=>o.cat==='culture'));
  qs.push(mk('ov','概况讲解 · 文化旅游概况',10,c.id,c.title.zh,'宏观叙事即可：红色 / 海派 / 江南文化总体概况，3 分钟左右'));
  shuffle(XH.spots).slice(0,2).forEach(s=>qs.push(mk('spot','景点讲解',10,s.id,s.name.zh+'讲解词','按 开场→主体→亮点故事→收尾 结构讲解，3-5 分钟')));
  const q=pick(XH.qa);qs.push(mk('qa','综合知识问答',5,q.id,q.q,'中文作答后，用英文给出精简版回答'));
  const n=pick(XH.norms);qs.push(mk('norm','导游服务规范',10,n.id,n.title.zh,'说明程序/方法要点，并演示一段英文服务表达'));
  const e=pick(XH.emergencies);qs.push(mk('em','特殊问题处理及应变',5,e.id,e.title.zh,'先说处理步骤，再用英文话术模板回应游客'));
  const ce=pick(XH.interpret.filter(x=>x.dir==='c2e'));qs.push(mk('ip','口译 · 中译外',10,ce.id,ce.zh,'全面、准确、顺畅地英文转述'));
  const ec=pick(XH.interpret.filter(x=>x.dir==='e2c'));qs.push(mk('ip','口译 · 外译中（先朗读后口译）',10,ec.id,ec.en,'先大声朗读英文原文，再进行中文口译'));
  return qs;
}
function rMockRun(){
  const m=state.mock;
  view.innerHTML=`
  <div class="mock-screen">
    <div class="mock-top">
      <div class="mock-timer">${fmtDur(m.sec)}<span class="bench">/ 基准 25:00</span></div>
      <span style="flex:1"></span>
      <span class="flex" style="font-size:12px;gap:6px"><span class="rec-dot ${m.rec&&m.rec.live?'live':''}"></span>${m.rec&&m.rec.live?'录制中':m.media||'录像未启动'}</span>
      <button class="btn btn-sm" style="background:#fff;color:#111827" data-act="mockfinish">结束模拟</button>
    </div>
    <div class="mock-body">
      <div class="cam-wrap">
        <video class="cam-preview" id="camVideo" autoplay muted playsinline style="${m.stream?'':'display:none'}"></video>
        ${!m.stream?'<div class="cam-preview flex" style="color:#64748B;align-items:center;justify-content:center;text-align:center;padding:20px;font-size:13px">摄像头未开启（权限受限不影响计时训练）<br>请想象自己正站立面对考官</div>':''}
        <div class="cam-tip">🧍 竖屏站立 · 佩戴耳机麦克风 · 全程录像</div>
      </div>
      <div class="mt12">${m.qs.map((q,i)=>`
        <div class="mock-q">
          <div class="mq-head"><span class="mq-type">${i+1}. ${esc(q.name)}</span><span class="mq-score">${q.score}分</span></div>
          <div class="mq-title">${esc(q.title)}</div>
          <div class="mq-brief">💡 ${esc(q.brief)}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
  const v=$('#camVideo');
  if(v&&m.stream)v.srcObject=m.stream;
}
function rMockRate(){
  const m=state.mock;
  const rate=[['a','优秀',1],['b','良好',.8],['c','及格',.6],['d','不足',.35]];
  const secs=mockSections(m);
  const total=secs.reduce((s,x)=>s+x.score,0);
  view.innerHTML=`${head('回放自评','#/exam')}
  <div class="page-body">
    <div class="notice">请凭录像回放记忆与考场表现自评。每题按完成度选择等级，语言表达与礼貌礼仪单独评分。</div>
    ${m.qs.map((q,i)=>`
      <div class="card">
        <div class="mq-head"><span class="mq-type">${esc(q.name)}</span><span class="mq-score">${q.score}分</span></div>
        <div class="mq-title" style="font-size:13.5px">${esc(q.title)}</div>
        <div class="rate-row">${rate.map(r=>`
          <button class="rate-btn ${(m.rates[i]||.8)===r[2]?'on':''}" data-act="mrate" data-i="${i}" data-v="${r[2]}">${r[1]}<small>${Math.round(q.score*r[2])}分</small></button>`).join('')}
        </div>
      </div>`).join('')}
    <div class="card">
      <div class="card-title">🗣️ 语言表达能力（15分，含吐词/语调/语法/讲解技巧）</div>
      <div class="rate-row">${rate.map(r=>`
        <button class="rate-btn ${(m.lang??.8)===r[2]?'on':''}" data-act="mlang" data-v="${r[2]}">${r[1]}<small>${Math.round(15*r[2])}分</small></button>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-title">🤵 礼貌礼仪（5分 · 全程考核）</div>
      ${['礼貌用语规范','态度诚恳友善','着装整洁得体','举止大方自然','精神状态饱满'].map((x,i)=>`
        <label class="flex mt8" style="gap:8px;font-size:14px">
          <input type="checkbox" ${(m.eti||[])[i]?'checked':''} data-act="meti" data-i="${i}" style="width:18px;height:18px"> ${x}</label>`).join('')}
    </div>
    <div class="exam-hero" style="text-align:center">
      <div style="font-size:13px;opacity:.85">自评总分（估算）</div>
      <div style="font-size:40px;font-weight:800">${Math.round(total)}<span style="font-size:18px"> /100</span></div>
      <button class="btn block mt8" style="background:#fff;color:#1D4ED8" data-act="msave">生成评估报告</button>
    </div>
  </div>`;
}
function mockSections(m){
  const groups=[
    {name:'概况讲解',max:20,idx:[0,1]},{name:'景点讲解',max:20,idx:[2,3]},
    {name:'综合知识问答',max:5,idx:[4]},{name:'导游服务规范',max:10,idx:[5]},
    {name:'应变能力',max:5,idx:[6]},{name:'口译',max:20,idx:[7,8]},
    {name:'语言表达能力',max:15,lang:true},{name:'礼貌礼仪',max:5,eti:true}
  ];
  return groups.map(g=>{
    let score=0;
    if(g.lang)score=Math.round(15*(m.lang??.8));
    else if(g.eti)score=(m.eti||[]).filter(Boolean).length;
    else score=g.idx.reduce((s,i)=>s+m.qs[i].score*(m.rates[i]??.8),0);
    return {name:g.name,max:g.max,score:Math.round(score)};
  });
}
function rMockReport(idx){
  const r=state.reports[Number(idx)];
  if(!r){view.innerHTML=`${head('模拟报告','#/exam')}<div class="empty"><span class="e-ico">📭</span>暂无报告</div>`;return;}
  const weak=r.secs.filter(x=>x.score/x.max<0.7);
  const advice={
    '概况讲解':'回到讲解库逐段跟读，先背骨架（开场→8要点→收尾），再用 3 分钟版计时复述。',
    '景点讲解':'选择对应景区，结合「讲解结构拆解」练习动线叙事，亮点故事至少准备 2 个。',
    '综合知识问答':'在问答库把该题加入收藏，用“中文要点→英文一句话”方式各复述 3 遍。',
    '导游服务规范':'熟背服务程序八环节，准备一套自己的英文开场白和欢送词。',
    '应变能力':'把高频情景的英文模板背熟，练习“安抚—步骤—协商语气”三步表达。',
    '口译':'每天 3 题中译外 + 3 题外译中，外译中坚持先朗读；错题进入错题本滚动复习。',
    '语言表达能力':'放慢语速、注意语调和重音；用跟读录音回听，纠正吞音与语法错误。',
    '礼貌礼仪':'模拟时着正装站立，以导游身份向“游客”致欢迎词（考场上面向考官进行角色扮演），全程保持微笑与眼神交流。'
  };
  view.innerHTML=`${head('模拟评估报告','#/me/reports')}
  <div class="page-body">
    <div class="card">
      <div class="report-score">
        <div class="big-score">${r.total}<small> /100</small></div>
        <div class="muted">${fmtTime(r.ts)} · 答题时长 ${fmtDur(r.dur)} ${r.recName?'· 录像已保存':''}</div>
      </div>
      ${r.secs.map(x=>`
        <div class="report-sec">
          <span class="rs-name">${esc(x.name)}</span>
          <div class="pbar"><i style="width:${Math.round(x.score/x.max*100)}%"></i></div>
          <span class="rs-v">${x.score}/${x.max}</span>
        </div>`).join('')}
    </div>
    ${weak.length?`<div class="card">
      <div class="card-title">📌 薄弱项提升建议</div>
      ${weak.map(x=>`<div class="exam-rule mt8"><span class="er-ico">🎯</span><div><b>${esc(x.name)}</b>（${x.score}/${x.max}）<br><span class="muted">${esc(advice[x.name]||'加强练习')}</span></div></div>`).join('')}
    </div>`:`<div class="card"><div class="card-title">🎉 表现优秀</div><div class="card-sub">各板块完成度均在 70% 以上，保持状态，继续冲刺！</div></div>`}
    <div class="entry-grid">
      <a class="btn ghost" data-hash="#/me/recs">${r.recName?'查看本次录像':'查看录音'}</a>
      <button class="btn" data-act="mockstart">再模拟一次</button>
    </div>
  </div>`;
}

/* ---------- 拓展 ---------- */
function rExtend(seg){
  if(!seg.length){
    const group=(title,items)=>`<div class="section-head mt16"><h3>${title}</h3></div>${items.map(x=>
      `<div class="card clickable" data-hash="${x.to}"><div class="card-row"><div style="font-size:24px">${x.ico}</div>
      <div class="grow"><div class="card-title" style="font-size:15px">${esc(x.name)}</div><div class="card-sub">${esc(x.desc)}</div></div><span class="chev">›</span></div></div>`).join('')}`;
    view.innerHTML=`${head('拓展','#/home')}
    <div class="page-body">
      ${group('📌 考试内容（15分）',[
        {ico:'📋',name:'导游服务规范',desc:'地陪/全陪/领队程序 · 讲解方法 · 各类团队接待（10分）',to:'#/extend/norm'},
        {ico:'🆘',name:'应变情景题库',desc:'8 大高频突发情景 · 处理步骤 + 英文话术模板（5分）',to:'#/extend/emerg'},
        {ico:'🤵',name:'礼貌礼仪专项',desc:'自评清单 + 临场缓冲英文话术（5分 · 全程考核）',to:'#/extend/etiquette'}
      ])}
      ${group('✨ 加分拓展（超出大纲）',[
        {ico:'⚖️',name:'法规速记',desc:'旅游法 / 导游条例高频考点 + 英文术语',to:'#/extend/laws'},
        {ico:'🌍',name:'跨文化沟通',desc:'禁忌差异 · 委婉表达清单',to:'#/extend/cross'},
        {ico:'💬',name:'英文服务用语',desc:'接机 / 车上 / 用餐 / 道歉 / 缓冲 / 欢送',to:'#/extend/phrases'}
      ])}
      ${group('🏮 上海文化素材库',[
        {ico:'🎷',name:'海派文化专题',desc:'石库门 · 月份牌 · 爵士 · 旗袍 · 本帮菜',to:'#/extend/haipai'},
        {ico:'📅',name:'城市历史年表',desc:'1292 → 进博会，双语时间轴一图背完',to:'#/extend/timeline'},
        {ico:'🎭',name:'国家级非遗档案',desc:'豫园灯会 · 沪剧 · 南翔小笼等',to:'#/extend/heritage'}
      ])}
    </div>`;
    return;
  }
  const k=seg[0];
  if(k==='norm'&&seg[1])return rNormDetail(seg[1]);
  if(k==='emerg'&&seg[1])return rEmerDetail(seg[1]);
  if(k==='norm')return rNormList();
  if(k==='emerg')return rEmerList();
  if(k==='laws')return rLaws();
  if(k==='cross')return rCross();
  if(k==='phrases')return rPhrases();
  if(k==='etiquette')return rEtiquette();
  if(k==='haipai')return rHaipai();
  if(k==='timeline')return rTimeline();
  if(k==='heritage')return rHeritage();
  view.innerHTML=`${head('拓展','#/home')}<div class="empty"><span class="e-ico">📭</span>页面不存在<br><button class="btn mt12" data-hash="#/extend">返回拓展</button></div>`;
}
function rNormList(){
  view.innerHTML=`${head('导游服务规范','#/extend')}<div class="page-body">
    ${XH.normGroups.map(g=>`
      <div class="section-head"><h3>${esc(g.name)}</h3></div>
      ${XH.norms.filter(n=>n.group===g.id).map(n=>`<div class="card clickable" data-hash="#/extend/norm/${n.id}">
        <div class="card-row"><div class="grow"><div class="card-title" style="font-size:14.5px">${esc(n.title.zh)}</div>
        <div class="card-sub">${esc(n.title.en)}</div></div><span class="chev">›</span></div>
      </div>`).join('')}`).join('')}
  </div>`;
}
function rNormDetail(id){
  const n=XH.norms.find(x=>x.id===id);if(!n)throw new Error('内容不存在');
  view.innerHTML=`${head(n.title.zh,'#/extend/norm')}<div class="page-body">
    <div class="card"><div class="card-title">📋 处理 / 服务要点（中文常显）</div>
      <div class="struct-steps mt8">${n.steps.map(s=>`<div>${esc(s)}</div>`).join('')}</div></div>
    ${biBlock('英文应答 / 讲解示范',
      `<div class="zh-text muted">该题需用英文完成服务表达，点击右上角「🌐 EN」查看英文示范话术。</div>
       <div class="en-text"><span class="en-flag">ENGLISH</span>${esc(n.en)}</div>`)}
    <button class="speak-btn btn ghost btn-sm" style="position:static;width:auto;border-radius:999px;padding:8px 16px" data-act="speak" data-text="${atr(n.en)}">🔊 朗读英文示范</button>
  </div>`;
}
function rEmerList(){
  view.innerHTML=`${head('应变情景题库','#/extend')}<div class="page-body">
    ${XH.emergencies.map(e=>`<div class="card clickable" data-hash="#/extend/emerg/${e.id}">
      <div class="card-row"><div class="grow">
        <span class="tag tag-warn">${esc(e.cat)}</span>
        <div class="card-title" style="font-size:14.5px;margin-top:4px">${esc(e.title.zh)}</div>
        <div class="card-sub">${esc(e.title.en)}</div>
      </div><span class="chev">›</span></div>
    </div>`).join('')}
  </div>`;
}
function rEmerDetail(id){
  const e=XH.emergencies.find(x=>x.id===id);if(!e)throw new Error('内容不存在');
  view.innerHTML=`${head(e.title.zh,'#/extend/emerg')}<div class="page-body">
    <div class="card"><div class="card-title">📋 处理步骤（中文）</div>
      <div class="struct-steps mt8">${e.steps.map(s=>`<div>${esc(s)}</div>`).join('')}</div></div>
    ${biBlock('英文应答模板（背熟后换参数即可）',
      `<div class="zh-text muted">处理步骤为中文常显内容；点击右上角「🌐 EN」查看英文应答模板（考试中直接使用）。</div>
       <div class="en-text"><span class="en-flag">ENGLISH TEMPLATE</span>${esc(e.en)}</div>`)}
    <button class="btn ghost btn-sm" data-act="speak" data-text="${atr(e.en)}">🔊 朗读模板</button>
  </div>`;
}
function rLaws(){
  view.innerHTML=`${head('法规速记','#/extend')}<div class="page-body">
    ${XH.laws.map(l=>`<div class="bi">
      <div class="bi-bar"><span class="bi-label">${esc(l.title)}</span><button class="btn-lang" data-act="entoggle">🌐 EN</button></div>
      <div class="bi-body">
        <div class="zh-text">${esc(l.body)}
          <div class="kw mt8"><span class="kw-en" style="color:var(--ink)">${esc(l.term.zh)}</span> → <span class="kw-en">${esc(l.term.en)}</span> <span class="kw-say" data-act="speak" data-text="${atr(l.term.en)}">🔊</span></div>
        </div>
        <div class="en-text"><span class="en-flag">KEY TERM</span><b>${esc(l.term.en)}</b><br><span style="font-style:italic">${esc(l.term.zh)}</span></div>
      </div></div>`).join('')}
  </div>`;
}
function rCross(){
  view.innerHTML=`${head('跨文化沟通','#/extend')}<div class="page-body">
    ${XH.crossculture.map(c=>`<div class="card">
      <div class="card-title" style="font-size:15px">${esc(c.title)}</div>
      <div class="card-sub">💡 ${esc(c.tip)}</div>
      ${c.pairs.map(p=>`<div class="example-block" style="background:#F8FAFC;border-left:4px solid var(--primary);border-radius:0 8px 8px 0;padding:10px 14px;margin-top:10px;font-size:13.5px">
        <div>🀄 ${esc(p.zh)}</div>
        <div style="color:#475569;font-style:italic;margin-top:3px">🅰️ ${esc(p.en)}</div>
      </div>`).join('')}
    </div>`).join('')}
  </div>`;
}
function rPhrases(){
  view.innerHTML=`${head('英文服务用语','#/extend')}<div class="page-body">
    ${XH.phraseGroups.map(g=>`<div class="section-head"><h3>${esc(g.name)}</h3></div>
      <div class="card">${g.items.map(p=>`
        <div class="vocab-row">
          <span class="v-zh" style="width:46%">${esc(p.zh)}</span>
          <span class="v-en">${esc(p.en)}</span>
          <span class="v-say" data-act="speak" data-text="${atr(p.en)}">🔊</span>
        </div>`).join('')}</div>`).join('')}
  </div>`;
}
function rEtiquette(){
  view.innerHTML=`${head('礼貌礼仪专项','#/exam')}<div class="page-body">
    <div class="card"><div class="card-title">✅ 礼仪自评清单（模拟结束后逐项勾选）</div>
      ${['进门先向考官问好，使用 Good morning / afternoon','全程使用礼貌用语 please / thank you / excuse me','着装整洁得体，建议正装或商务休闲','站姿端正，手势自然，眼神看向考官','保持微笑与饱满精神状态，声音洪亮'].map(x=>
        `<label class="flex mt8" style="gap:8px;font-size:14px"><input type="checkbox" style="width:18px;height:18px"> ${esc(x)}</label>`).join('')}
    </div>
    <div class="card"><div class="card-title">🪞 仪态提醒（录像首 30 秒自查）</div>
      <div class="card-sub mt8">站姿：双脚与肩同宽，不左右晃动 · 视线：不要只看地板 · 手势：指引方向用整手掌，忌单指指人。</div></div>
    <div class="card"><div class="card-title">🗣️ 答不上来时的英文缓冲话术</div>
      ${XH.phraseGroups.find(g=>g.id==='pg_buffer').items.map(p=>`
        <div class="example-block" style="background:#F8FAFC;border-left:4px solid var(--primary);border-radius:0 8px 8px 0;padding:10px 14px;margin-top:10px;font-size:13.5px">
          <div style="color:#475569;font-style:italic">🅰️ ${esc(p.en)}</div>
          <div style="color:var(--ink-2);margin-top:3px;font-size:12.5px">🀄 ${esc(p.zh)}</div>
        </div>`).join('')}
    </div>
  </div>`;
}
function rHaipai(){
  view.innerHTML=`${head('海派文化专题','#/extend')}<div class="page-body">
    ${XH.haipai.map(h=>biBlock(h.title.zh,
      `<div class="zh-text"><b>${esc(h.title.zh)}</b><br>${esc(h.body.zh)}</div>
       <div class="en-text"><span class="en-flag">ENGLISH</span><b>${esc(h.title.en)}</b><br>${esc(h.body.en)}</div>`)).join('')}
  </div>`;
}
function rTimeline(){
  view.innerHTML=`${head('城市历史年表','#/extend','<button class="btn-lang" id="tlBtn" data-act="tlall">🌐 EN</button>')}<div class="page-body">
    <div class="timeline">${XH.timeline.map(t=>`
      <div class="tl-item" data-tl>
        <div class="tl-year">${esc(t.year)} · <span class="tl-title">${esc(t.title.zh)}</span></div>
        <div class="tl-body"><span class="zh">${esc(t.body.zh)}</span><span class="en">${esc(t.body.en)}</span></div>
      </div>`).join('')}
    </div>
  </div>`;
}
function rHeritage(){
  view.innerHTML=`${head('国家级非遗档案','#/extend')}<div class="page-body">
    ${XH.heritage.map(h=>biBlock(h.name.zh,
      `<div class="zh-text"><b>${esc(h.name.zh)}</b><br>${esc(h.body.zh)}</div>
       <div class="en-text"><span class="en-flag">ENGLISH</span><b>${esc(h.name.en)}</b><br>${esc(h.body.en)}</div>`)).join('')}
  </div>`;
}

/* ---------- 我的 ---------- */
function rMe(seg){
  if(!seg.length){
    const ov=progressOf(XH.overview,'ov'),sp=progressOf(XH.spots,'spot'),qa=progressOf(XH.qa,'qa');
    view.innerHTML=`
    <div class="me-hero">
      <div class="avatar">🎓</div>
      <div class="uname">${esc(state.cfg.nick)}</div>
      <div class="ustat">上海英文导游证 · 英语类考生 · 已连续打卡 ${streak()} 天</div>
    </div>
    <div class="me-stats">
      <div><div class="ms-v">${state.done.length}</div><div class="ms-k">已学</div></div>
      <div><div class="ms-v">${state.fav.length}</div><div class="ms-k">收藏</div></div>
      <div><div class="ms-v">${state.wrong.length}</div><div class="ms-k">错题</div></div>
      <div><div class="ms-v">${state.stats.interp}</div><div class="ms-k">口译题</div></div>
    </div>
    <div class="section">
      <div class="section-head"><h3>学习进度地图</h3></div>
      <div class="card">
        <div class="report-sec"><span class="rs-name">概况讲解</span><div class="pbar"><i style="width:${ov.pct}%"></i></div><span class="rs-v">${ov.n}/${ov.total}</span></div>
        <div class="report-sec"><span class="rs-name">五大景区</span><div class="pbar"><i style="width:${sp.pct}%"></i></div><span class="rs-v">${sp.n}/${sp.total}</span></div>
        <div class="report-sec"><span class="rs-name">问答卡片</span><div class="pbar"><i style="width:${qa.pct}%"></i></div><span class="rs-v">${qa.n}/${qa.total}</span></div>
      </div>
    </div>
    <div class="me-list">
      <div class="me-item" data-hash="#/me/favs"><span class="mi-ico">⭐</span><span class="mi-name">我的收藏 / 背诵夹</span><span class="chev">›</span></div>
      <div class="me-item" data-hash="#/me/wrong"><span class="mi-ico">📝</span><span class="mi-name">口译错题本</span>${state.wrong.length?`<span class="mi-badge">${state.wrong.length}</span>`:''}<span class="chev">›</span></div>
      <div class="me-item" data-hash="#/me/recs"><span class="mi-ico">🎙️</span><span class="mi-name">录音 / 录像回放</span><span class="chev">›</span></div>
      <div class="me-item" data-hash="#/me/reports"><span class="mi-ico">📊</span><span class="mi-name">模拟评估报告</span><span class="chev">›</span></div>
      <div class="me-item" data-hash="#/me/settings"><span class="mi-ico">⚙️</span><span class="mi-name">学习设置</span><span class="chev">›</span></div>
    </div>`;
    return;
  }
  if(seg[0]==='favs')return rFavs();
  if(seg[0]==='wrong')return rWrong();
  if(seg[0]==='recs')return rRecs();
  if(seg[0]==='reports')return rReports();
  if(seg[0]==='settings')return rSettings();
}
function favTarget(ref){
  const [k,id]=ref.split(':');
  if(k==='ov')return {to:'#/library/ov/'+id,find:XH.overview.find(x=>x.id===id),name:o=>o.title.zh};
  if(k==='spot')return {to:'#/library/spot/'+id,find:XH.spots.find(x=>x.id===id),name:o=>o.name.zh+'景区'};
  if(k==='qa')return {to:'#/library/qa',find:XH.qa.find(x=>x.id===id),name:o=>o.q};
  return null;
}
function rFavs(){
  const items=state.fav.map(favTarget).filter(Boolean);
  view.innerHTML=`${head('我的收藏','#/me')}<div class="page-body">
    ${items.length?items.map(t=>{const o=t.find;return `<div class="card clickable" data-hash="${t.to}">
      <div class="card-row"><div class="grow"><div class="card-title" style="font-size:14px">${esc(t.name(o))}</div></div><span class="chev">›</span></div></div>`;}).join('')
      :'<div class="empty"><span class="e-ico">⭐</span>还没有收藏内容<br>在讲解库点 ☆ 即可加入背诵夹</div>'}
  </div>`;
}
function rWrong(){
  const items=state.wrong.map(id=>XH.interpret.find(x=>x.id===id)).filter(Boolean);
  view.innerHTML=`${head('口译错题本','#/me')}<div class="page-body">
    ${items.length?items.map(q=>`<div class="card">
      <span class="tag ${q.dir==='c2e'?'':'tag-gold'}">${q.dir==='c2e'?'中译外':'外译中'}</span>
      <span class="tag tag-gray">${esc(catName(q.cat))}</span>
      <div class="mt8" style="font-size:14px"><b>原文：</b>${esc(q.dir==='c2e'?q.zh:q.en)}</div>
      <div style="font-size:13px;color:var(--primary-dark);margin-top:4px"><b>参考：</b>${esc(q.dir==='c2e'?q.en:q.zh)}</div>
      <div class="flex mt8" style="gap:8px">
        <button class="btn btn-sm ghost" data-act="speak" data-text="${atr(q.dir==='c2e'?q.en:q.en)}">🔊 听原文</button>
        <button class="btn btn-sm danger" data-act="wrongdel" data-id="${q.id}">移除</button>
      </div>
    </div>`).join('')
    :'<div class="empty"><span class="e-ico">📝</span>错题本是空的<br>口译训练时点「加入错题本」即可收录</div>'}
  </div>`;
}
async function rRecs(){
  view.innerHTML=`${head('录音 / 录像回放','#/me')}<div class="page-body"><div class="empty">加载中…</div></div>`;
  const list=await recAll();
  view.innerHTML=`${head('录音 / 录像回放','#/me')}<div class="page-body">
    ${list.length?`<div class="card">${list.map(r=>`
      <div class="rec-item">
        <div class="ri-ico">${r.kind==='video'?'🎬':'🎙️'}</div>
        <div class="ri-info"><div class="ri-name">${esc(r.name)}</div><div class="ri-time">${fmtTime(r.ts)} · ${fmtDur(r.dur)}</div></div>
        ${r.kind==='video'
          ? `<video controls src="${URL.createObjectURL(r.blob)}" style="width:74px;height:98px;object-fit:cover;border-radius:8px;background:#0F172A"></video>`
          : `<audio controls src="${URL.createObjectURL(r.blob)}"></audio>`}
        <button class="ri-del" data-act="recdel" data-id="${r.id}">🗑️</button>
      </div>`).join('')}</div>`
      :'<div class="empty"><span class="e-ico">🎙️</span>暂无录音录像<br>口译跟读与模拟考场的录制会保存在这里</div>'}
  </div>`;
}
function rReports(){
  view.innerHTML=`${head('模拟评估报告','#/me')}<div class="page-body">
    ${state.reports.length?state.reports.map((r,i)=>`
      <div class="card clickable" data-hash="#/mock/report/${i}">
        <div class="card-row">
          <div class="grow"><div class="card-title">${r.total} 分 ${r.total>=60?'<span class="tag tag-ok">通过线</span>':'<span class="tag tag-danger">需加强</span>'}</div>
          <div class="card-sub">${fmtTime(r.ts)} · 时长 ${fmtDur(r.dur)}</div></div>
          <span class="chev">›</span></div>
        <div class="pbar mt8"><i style="width:${r.total}%"></i></div>
      </div>`).join('')
      :'<div class="empty"><span class="e-ico">📊</span>还没有模拟报告<br>去「考场」完成一次全真模拟吧</div>'}
  </div>`;
}
function rSettings(){
  view.innerHTML=`${head('学习设置','#/me')}<div class="page-body">
    <div class="card">
      <div class="field"><label>昵称</label><input id="setNick" value="${atr(state.cfg.nick)}"></div>
      <div class="field"><label>科目五考试日期（用于首页倒计时）</label><input id="setDate" type="date" value="${atr(state.cfg.examDate)}"></div>
      <button class="btn block" data-act="cfgsave">保存设置</button>
    </div>
    <div class="card">
      <div class="card-title">🤖 AI 翻译设置</div>
      <div class="card-sub">在讲解库点「✏️ 编辑」修改中文文案后，可用 DeepSeek 自动重新生成英文译文。Key 仅保存在本设备浏览器（localStorage），不会写入文件或上传。</div>
      <div class="field mt12"><label>DeepSeek API Key（sk- 开头）</label>
        <input id="setDsKey" type="password" value="${atr(state.cfg.dsKey||'')}" placeholder="sk-..." autocomplete="off">
      </div>
      <button class="btn block" data-act="cfgsave">保存 Key</button>
    </div>
    <div class="card">
      <div class="card-title">数据管理</div>
      <div class="card-sub">所有学习数据与自定义讲解稿仅保存在本设备浏览器中（localStorage / IndexedDB），不上传服务器。</div>
      <button class="btn danger block mt12" data-act="clearall">清空全部学习数据</button>
    </div>
    <div class="card">
      <div class="card-title">关于小胡考证</div>
      <div class="card-sub">上海英文导游证备考应用 V1.0<br>内容依据《2026年上海导游资格考试（科目五·现场考试）考试大纲》编制，双语内容预置、离线可用。</div>
    </div>
  </div>`;
}

/* ---------- DeepSeek 讲解词翻译 ---------- */
const DS_URL='https://api.deepseek.com/chat/completions';
async function dsChatJSON(messages){
  const key=(state.cfg.dsKey||'').trim();
  if(!key){const e=new Error('NO_KEY');e.code='NO_KEY';throw e;}
  let resp;
  try{
    resp=await fetch(DS_URL,{method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body:JSON.stringify({model:'deepseek-chat',messages,temperature:0.5,response_format:{type:'json_object'}})});
  }catch(e){throw new Error('网络请求失败，请检查网络后重试');}
  if(!resp.ok){
    const t=await resp.text().catch(()=> '');
    if(resp.status===401)throw new Error('API Key 无效（401），请到「我的→学习设置」检查');
    throw new Error('翻译服务返回 '+resp.status+(t?('：'+t.slice(0,100)):''));
  }
  const data=await resp.json();
  const content=data&&data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content;
  return JSON.parse(content);
}
/* 把若干段中文导游讲解词译成英文，返回等长英文数组 */
async function translateParas(zhArr){
  const n=zhArr.length;
  const sys={role:'system',content:[
    '你是资深上海英文导游考试培训师，负责把中文导游现场讲解词翻译成英文，供考生背诵。',
    '翻译要求：',
    '1. 导游面向游客的口吻，可用 Ladies and gentlemen / please look at 等现场表达；',
    '2. 全部使用简单、常用的英语词汇和短句，避免生僻词和长难句；',
    '3. 忠实于中文，不增删事实、数字、年代、地名和人名；专有名词用通行译法；',
    '4. 每段独立成段，与输入严格一一对应，不要合并、拆分或编号；',
    '5. 只输出 JSON：{"en":["第1段英文","第2段英文"]}，段数必须与输入一致。'
  ].join('\n')};
  const user={role:'user',content:'共 '+n+' 段，请逐段翻译：\n'+JSON.stringify(zhArr)};
  const j=await dsChatJSON([sys,user]);
  if(!Array.isArray(j.en)||j.en.length!==n)throw new Error('翻译结果格式异常，请重试');
  return j.en.map(x=>String(x).trim());
}
/* 收集编辑区文本并保存到覆盖层 */
function collectArtEdit(ref){
  const body=effBody(ref);
  const next=body.map(p=>({v:p.v,zh:p.zh,en:p.en}));
  $$('#view .para-edit').forEach(box=>{
    const wi=Number(box.getAttribute('data-wi'));
    const zh=$('textarea[data-edit="zh"]',box).value.trim();
    const en=$('textarea[data-edit="en"]',box).value.trim();
    if(!zh)throw new Error('第'+(wi+1)+'段中文不能为空');
    next[wi]={v:next[wi].v,zh,en:en||next[wi].en};
  });
  state.edits[ref]=next;save('edits');
}
async function artTranslateAll(btn){
  const boxes=$$('#view .para-edit');if(!boxes.length)return;
  const old=btn.textContent;btn.disabled=true;btn.textContent='翻译中…';
  try{
    const zhs=boxes.map(b=>$('textarea[data-edit="zh"]',b).value.trim());
    if(zhs.some(z=>!z)){toast('有中文段落为空，请先填写');return;}
    toast('正在调用 DeepSeek 翻译，请稍候…');
    const ens=await translateParas(zhs);
    boxes.forEach((b,i)=>{$('textarea[data-edit="en"]',b).value=ens[i];});
    toast('英文已重新生成，检查后记得点「保存」');
  }catch(e){toast(e.code==='NO_KEY'?'请先在「我的→学习设置」填写 DeepSeek API Key':'翻译失败：'+e.message);}
  finally{btn.disabled=false;btn.textContent=old;}
}
async function artTranslateOne(btn){
  const box=btn.closest('.para-edit');
  const zh=$('textarea[data-edit="zh"]',box).value.trim();
  if(!zh){toast('请先填写本段中文');return;}
  const old=btn.textContent;btn.disabled=true;btn.textContent='翻译中…';
  try{
    const [en]=await translateParas([zh]);
    $('textarea[data-edit="en"]',box).value=en;
  }catch(e){toast(e.code==='NO_KEY'?'请先在「我的→学习设置」填写 DeepSeek API Key':'翻译失败：'+e.message);}
  finally{btn.disabled=false;btn.textContent=old;}
}

/* ---------- 景点速记（landmarks）自定义编辑 ---------- */
/* 生效速记：有长度一致的自定义稿则用它，否则用预置原文 */
function effLandmarks(ref){
  const art=artByRef(ref);if(!art)return [];
  const ed=state.lmEdits[ref];
  return (ed&&ed.length===art.landmarks.length)?ed:art.landmarks;
}
function lmIsEdited(ref,i){
  const art=artByRef(ref),ed=state.lmEdits[ref];
  if(!art||!ed||ed.length!==art.landmarks.length)return false;
  const a=art.landmarks[i],b=ed[i];
  return a.desc.zh!==b.desc.zh||a.desc.en!==b.desc.en;
}
/* 深拷贝当前生效速记数组，供保存/恢复时修改 */
function cloneLmList(ref){
  return effLandmarks(ref).map(x=>({name:{zh:x.name.zh,en:x.name.en},desc:{zh:x.desc.zh,en:x.desc.en}}));
}
/* 若每处都与预置原文一致，则删除覆盖层，避免残留"已改" */
function commitLmList(ref,list){
  const art=artByRef(ref);
  const clean=art.landmarks.every((o,k)=>o.desc.zh===list[k].desc.zh&&o.desc.en===list[k].desc.en);
  if(clean)delete state.lmEdits[ref];else state.lmEdits[ref]=list;
  save('lmEdits');return clean;
}
function lmViewBar(ref,i){
  return `<div class="bi-actions"><button type="button" class="btn-edit" data-act="lmedit" data-ref="${atr(ref)}" data-i="${i}">✏️ 编辑${lmIsEdited(ref,i)?' · 已改':''}</button><button class="btn-lang" data-act="entoggle">🌐 EN</button></div>`;
}
function lmEditBar(ref,i){
  const attrs=`data-ref="${atr(ref)}" data-i="${i}"`;
  return `<div class="art-edit-actions">
    <button type="button" class="btn btn-xs primary" data-act="lmtrone" ${attrs}>🤖 译成英文</button>
    <button type="button" class="btn btn-xs" data-act="lmsave" ${attrs}>💾 保存</button>
    <button type="button" class="btn btn-xs ghost" data-act="lmreset" ${attrs}>↩️ 恢复原文</button>
    <button type="button" class="btn btn-xs ghost" data-act="lmcancel" ${attrs}>取消</button>
  </div>`;
}
function lmEditHtml(lm){
  return `<div class="lm-edit">
    <div class="pe-head"><span class="pe-tag">中文速记（可直接修改）</span></div>
    <textarea class="pe-ta" data-edit="zh" rows="6">${esc(lm.desc.zh)}</textarea>
    <div class="pe-tag en-tag">English（点「译成英文」自动生成，也可手动修改）</div>
    <textarea class="pe-ta pe-en" data-edit="en" rows="8">${esc(lm.desc.en)}</textarea>
  </div>`;
}
async function lmTranslateOne(btn){
  const box=btn.closest('.bi').querySelector('.lm-edit');
  const zh=$('textarea[data-edit="zh"]',box).value.trim();
  if(!zh){toast('请先填写中文速记');return;}
  const old=btn.textContent;btn.disabled=true;btn.textContent='翻译中…';
  try{
    const [en]=await translateParas([zh]);
    $('textarea[data-edit="en"]',box).value=en;
    toast('英文已生成，检查后记得点「保存」');
  }catch(e){toast(e.code==='NO_KEY'?'请先在「我的→学习设置」填写 DeepSeek API Key':'翻译失败：'+e.message);}
  finally{btn.disabled=false;btn.textContent=old;}
}

/* ---------- Modal ---------- */
function openModal(html){
  const layer=$('#modalLayer');
  layer.innerHTML=`<div class="modal-mask" data-act="closemodal"></div><div class="modal">${html}</div>`;
  layer.classList.add('show');
}
function closeModal(){$('#modalLayer').classList.remove('show');$('#modalLayer').innerHTML='';}
function openFact(i){
  const f=XH.facts[i];
  openModal(`<h3>${f.icon} ${esc(f.t.zh)} / ${esc(f.t.en)}</h3>
    ${biBlock('双语内容',`<div class="zh-text">${esc(f.d.zh)}</div><div class="en-text"><span class="en-flag">ENGLISH</span>${esc(f.d.en)}</div>`)}`);
}
function openReadalong(title,enText){
  state.ra={rec:null,url:null};
  openModal(`<h3>🎙️ 跟读练习 · ${esc(title)}</h3>
    <div class="muted">先听示范朗读，再自己录音回放对比。录音将保存到「我的 → 录音回放」。</div>
    <div class="bi en mt12"><div class="bi-body"><span class="en-flag">ENGLISH</span>${esc(enText)}</div></div>
    <div class="flex mt12" style="gap:8px;flex-wrap:wrap">
      <button class="btn ghost btn-sm" data-act="raspeak">🔊 示范朗读</button>
      <button class="btn btn-sm" id="raRecBtn" data-act="rarec">🎤 开始录音</button>
      <button class="btn btn-sm" data-act="rasave" id="raSaveBtn" style="display:none">💾 保存录音</button>
    </div>
    <audio id="raAudio" controls style="width:100%;margin-top:10px;display:none"></audio>`);
  state.ra.text=enText;state.ra.title=title;
}

/* ---------- 动作分发 ---------- */
document.addEventListener('click',async function(ev){
  const btn=ev.target.closest('[data-act]');
  const link=ev.target.closest('[data-hash]');
  // 动作按钮优先：即便位于可点击卡片内部也只执行动作、不跳转
  if(btn){
    if(!await dispatchAct(btn))return;
  }
  if(link){go(link.getAttribute('data-hash'));}
});
async function dispatchAct(btn){
  const act=btn.getAttribute('data-act');
  // 返回 false 时终止后续跳转；返回 true 时继续（如关闭弹窗后需要跳转）
  const follow=btn.getAttribute('data-follow')==='1';
  try{
    switch(act){
      /* 通用 */
      case 'closemodal': closeModal(); if(state.ra&&state.ra.rec)state.ra.rec.cleanup();state.ra=null;break;
      case 'entoggle': {
        const box=btn.closest('.bi');const on=box.classList.toggle('en');
        btn.classList.toggle('on',on);btn.innerHTML=on?'🀄 中文':'🌐 EN';break;
      }
      case 'tlall': {
        const on=$$('[data-tl]').forEach(x=>x.classList.toggle('en'));
        btn.classList.toggle('on');btn.innerHTML=btn.classList.contains('on')?'🀄 中文':'🌐 EN';break;
      }
      case 'speak': speak(btn.getAttribute('data-text'));break;
      case 'speakpara': {
        const box=btn.closest('.bi');speak(btn.getAttribute(box.classList.contains('en')?'data-en':'data-zh'));break;
      }
      case 'fav': toggleArr('fav',btn.getAttribute('data-ref'));toast(isFav(btn.getAttribute('data-ref'))?'已加入收藏':'已取消收藏');render();break;
      case 'learned': toggleArr('done',btn.getAttribute('data-ref'));toast(isDone(btn.getAttribute('data-ref'))?'已标记为已学，继续加油！':'已取消标记');render();break;
      case 'fact': openFact(Number(btn.getAttribute('data-i')));break;
      case 'ver': state.ver[btn.getAttribute('data-id')]=Number(btn.getAttribute('data-v'));render();break;

      /* 讲解词编辑 / AI 重译 */
      case 'artedit': state.edit=btn.getAttribute('data-ref');render();break;
      case 'artcancel': state.edit=null;render();break;
      case 'artsave': {
        const ref=state.edit;
        try{
          collectArtEdit(ref);state.edit=null;render();toast('已保存，讲解与英文译文已更新');
        }catch(e){toast(e.message);}
        break;
      }
      case 'artreset': {
        const ref=state.edit;
        if(confirm('确定恢复为预置原文？当前所有自定义修改（含英文译文）都会删除。')){
          delete state.edits[ref];save('edits');state.edit=null;render();toast('已恢复预置原文');
        }
        break;
      }
      case 'arttrall': await artTranslateAll(btn);break;
      case 'arttrone': await artTranslateOne(btn);break;

      /* 速记编辑 / AI 重译 */
      case 'lmedit': state.lmEdit=btn.getAttribute('data-ref')+'#'+btn.getAttribute('data-i');render();break;
      case 'lmcancel': state.lmEdit=null;render();break;
      case 'lmsave': {
        const ref=btn.getAttribute('data-ref'),i=Number(btn.getAttribute('data-i'));
        const box=btn.closest('.bi').querySelector('.lm-edit');
        const zh=$('textarea[data-edit="zh"]',box).value.trim();
        const en=$('textarea[data-edit="en"]',box).value.trim();
        if(!zh){toast('中文速记不能为空');break;}
        const list=cloneLmList(ref);
        list[i].desc={zh,en:en||list[i].desc.en};
        commitLmList(ref,list);
        state.lmEdit=null;render();toast('已保存，这处速记已更新');
        break;
      }
      case 'lmreset': {
        if(confirm('确定将这处速记恢复为预置原文？你的修改（含英文译文）会被删除。')){
          const ref=btn.getAttribute('data-ref'),i=Number(btn.getAttribute('data-i'));
          const art=artByRef(ref);
          const list=cloneLmList(ref);
          list[i]={name:{zh:art.landmarks[i].name.zh,en:art.landmarks[i].name.en},
                   desc:{zh:art.landmarks[i].desc.zh,en:art.landmarks[i].desc.en}};
          commitLmList(ref,list);
          state.lmEdit=null;render();toast('已恢复预置原文');
        }
        break;
      }
      case 'lmtrone': await lmTranslateOne(btn);break;

      /* 首页任务 / 日期 */
      case 'task': {
        const td=todayStr(),k=btn.getAttribute('data-k');
        const day=state.tasks[td]||{};day[k]=!day[k];state.tasks[td]=day;save('tasks');
        if(day[k]){checkinToday();toast('任务完成，已打卡 🔥');}render();break;
      }
      case 'setdate': openModal(`<h3>📅 设置考试日期</h3>
        <div class="field"><label>科目五现场考试日期</label><input id="modalDate" type="date" value="${atr(state.cfg.examDate)}"></div>
        <button class="btn block" data-act="cfgsave2">保存</button>`);break;

      /* 跟读 */
      case 'readalong': {
        const parts=location.hash.split('/');           // #/library/ov|spot/:id
        const kind=parts[2],id=parts[3];
        const ref=(kind==='ov'?'ov:':'spot:')+id;
        const art=artByRef(ref);
        if(!art)break;
        const v=state.ver[id]||3;
        openReadalong(btn.getAttribute('data-title'),effBody(ref).filter(p=>p.v<=v).map(p=>p.en).join('\n\n'));
        break;
      }
      case 'raspeak': speak(state.ra.text,'en-US');break;
      case 'rarec': await raToggle(btn);break;
      case 'rasave': await raSave();break;

      /* 问答筛选 */
      case 'qatopic': state.qaTopic=btn.getAttribute('data-t');render();break;

      /* 口译 */
      case 'ipdir': state.ipCfg.dir=btn.getAttribute('data-d');render();break;
      case 'ipcat': state.ipCfg.cat=btn.getAttribute('data-c');render();break;
      case 'ipbegin': {
        const pool=interpPool();if(!pool.length){toast('该类别暂无题目');break;}
        state.ip={items:shuffle(pool).slice(0,Math.min(10,pool.length)),idx:0,step:0,rec:null,lastUrl:null,rate:null};
        render();break;
      }
      case 'ipexit': if(state.ip&&state.ip.rec)state.ip.rec.cleanup();state.ip=null;go('#/exam');break;
      case 'iprec': await ipToggleRec(btn);break;
      case 'ipforward': {
        const s=state.ip,it=s.items[s.idx];
        if(s.rec&&s.rec.live){await stopIpClip(false);}
        s.step++;render();break;
      }
      case 'iprate': state.ip.rate=btn.getAttribute('data-r');render();break;
      case 'ipwrong': toggleArr('wrong',state.ip.items[state.ip.idx].id);render();break;
      case 'ipnext': {
        const s=state.ip;
        if(s.rec&&s.rec.live)await stopIpClip(true);
        if(s.rate&&s.rate!=='good'){const id=s.items[s.idx].id;if(!state.wrong.includes(id)){state.wrong.push(id);save('wrong');}}
        state.stats.interp++;save('stats');
        if(s.idx+1>=s.items.length){
          const n=s.items.length;state.ip=null;
          openModal(`<h3>🎉 本组训练完成</h3><p style="color:var(--ink-2)">共练习 ${n} 题，累计 ${state.stats.interp} 题。薄弱题目已收录错题本，记得滚动复习。</p>
            <button class="btn block mt12" data-act="closemodal" data-follow="1" data-hash="#/interp">再来一组</button>`);
          go('#/interp');
        }else{s.idx++;s.step=0;s.rate=null;s.lastUrl=null;render();}
        break;
      }

      /* 模拟考场 */
      case 'mockstart': startMock();break;
      case 'mockfinish': await finishMock();break;
      case 'mrate': {state.mock.rates[Number(btn.getAttribute('data-i'))]=Number(btn.getAttribute('data-v'));render();break;}
      case 'mlang': {state.mock.lang=Number(btn.getAttribute('data-v'));render();break;}
      case 'meti': {
        const i=Number(btn.getAttribute('data-i'));const a=state.mock.eti||[];
        a[i]=btn.checked;state.mock.eti=a;break;
      }
      case 'msave': await saveReport();break;

      /* 拓展：错题移除 / 录音删除 */
      case 'wrongdel': {const id=btn.getAttribute('data-id');state.wrong=state.wrong.filter(x=>x!==id);save('wrong');render();break;}
      case 'recdel': await recDel(btn.getAttribute('data-id'));render();break;

      /* 设置 */
      case 'cfgsave': {
        state.cfg.nick=$('#setNick')?($('#setNick').value.trim()||'小胡同学'):state.cfg.nick;
        if($('#setDate'))state.cfg.examDate=$('#setDate').value||state.cfg.examDate;
        if($('#setDsKey'))state.cfg.dsKey=$('#setDsKey').value.trim();
        save('cfg');toast('设置已保存');render();break;
      }
      case 'cfgsave2': {
        state.cfg.examDate=$('#modalDate').value||state.cfg.examDate;save('cfg');
        closeModal();toast('考试日期已保存');render();break;
      }
      case 'clearall':
        if(confirm('确定清空全部学习数据（进度、收藏、打卡、录音、报告）？此操作不可恢复。')){
          ['done','fav','checkin','wrong','reports','tasks','stats','cfg','edits','lmEdits'].forEach(k=>localStorage.removeItem('xh_'+k));
          const db=await idb();await new Promise(res=>{const tx=db.transaction('recs','readwrite');tx.objectStore('recs').clear();tx.oncomplete=res;});
          closeModal();toast('已清空');location.hash='#/home';location.reload();
        }
        break;
    }
  }catch(err){console.error(err);toast('操作失败：'+err.message);}
  return follow;
}

/* ---------- 口译录音 ---------- */
async function ipToggleRec(btn){
  const s=state.ip;
  if(!s.rec)s.rec=makeRecorder();
  if(s.rec.live){
    const blob=await s.rec.stop();
    if(s.lastUrl)URL.revokeObjectURL(s.lastUrl);
    s.lastUrl=URL.createObjectURL(blob);s.lastBlob=blob;
  }else{
    try{await s.rec.start(false);}catch(e){toast('无法使用麦克风：'+e.message);}
  }
  render();
}
async function stopIpClip(save){
  const s=state.ip;
  const blob=await s.rec.stop();
  if(blob&&save){
    const it=s.items[s.idx];
    await recSave({id:'r_'+Date.now(),ts:Date.now(),kind:'audio',
      name:`口译 · ${it.dir==='c2e'?'中译外':'外译中'} · ${s.idx+1}/${s.items.length}`,
      dur:Math.max(1,Math.round(blob.size/4000)),blob});
  }
}

/* ---------- 跟读录音 ---------- */
async function raToggle(btn){
  const ra=state.ra;
  if(!ra.rec)ra.rec=makeRecorder();
  if(ra.rec.live){
    ra.blob=await ra.rec.stop();ra.url=URL.createObjectURL(ra.blob);
    const au=$('#raAudio');au.src=ra.url;au.style.display='block';
    $('#raSaveBtn').style.display='';
    btn.textContent='🎤 重新录音';
  }else{
    try{await ra.rec.start(false);btn.textContent='■ 停止';}
    catch(e){toast('无法使用麦克风：'+e.message);}
  }
}
async function raSave(){
  const ra=state.ra;
  if(!ra.blob){toast('请先录音');return;}
  await recSave({id:'r_'+Date.now(),ts:Date.now(),kind:'audio',name:'跟读 · '+ra.title,dur:Math.max(1,Math.round(ra.blob.size/4000)),blob:ra.blob});
  toast('录音已保存到「我的 → 录音回放」');
  closeModal();state.ra=null;
}

/* ---------- 模拟流程 ---------- */
let mockTimer=null;
async function startMock(){
  const m={qs:buildPaper(),sec:0,rates:{},lang:.8,eti:[],stage:'run',rec:makeRecorder(),stream:null,media:'录像未启动'};
  state.mock=m;
  try{
    m.stream=await m.rec.start(true);m.media='摄像头+麦克风';
  }catch(e){
    try{m.stream=await m.rec.start(false);m.media='仅麦克风';}
    catch(e2){m.media='计时模式（无权限）';toast('未获得摄像头/麦克风权限，将以计时模式模拟');}
  }
  go('#/mock/run');
  clearInterval(mockTimer);
  mockTimer=setInterval(()=>{m.sec++;const el=$('.mock-timer');if(el)el.innerHTML=fmtDur(m.sec)+'<span class="bench">/ 基准 25:00</span>';},1000);
}
async function finishMock(){
  const m=state.mock;
  if(m.sec<25*60){
    if(!confirm(`当前答题时长 ${fmtDur(m.sec)}，外语类要求不少于 25 分钟。确定提前结束吗？`))return;
  }
  clearInterval(mockTimer);
  let blob=null;
  if(m.rec&&m.rec.live)blob=await m.rec.stop();
  if(blob){
    const id='r_'+Date.now();
    await recSave({id,ts:Date.now(),kind:m.media.indexOf('摄像头')>=0?'video':'audio',name:'全真模拟录像 '+fmtTime(Date.now()),dur:m.sec,blob});
    m.recId=id;
  }
  m.stream=null;m.stage='rate';
  go('#/mock/rate');
}
async function saveReport(){
  const m=state.mock;
  const secs=mockSections(m);
  const total=secs.reduce((s,x)=>s+x.score,0);
  let recName='';
  if(m.recId){const all=await recAll();const r=all.find(x=>x.id===m.recId);if(r)recName=r.name;}
  const report={ts:Date.now(),dur:m.sec,total,secs,recId:m.recId||null,recName};
  state.reports.unshift(report);save('reports');
  checkinToday();
  state.mock=null;
  go('#/mock/report/0');
}

/* ---------- 离开模拟页时停计时（兜底） ----------
   （正常流程由结束按钮处理） */

/* ---------- 启动 ---------- */
if(!location.hash)location.hash='#/home';
render();
})();

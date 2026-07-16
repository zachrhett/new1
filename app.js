const ROUTES={"home":"homescreen.webp","pro":"top-pro.webp","pro-view":"pro-view.webp","tempcomp":"tempcomp.webp","mission":"missionval.webp","scorecard":"storescorecard.webp","composite":"composite-over.webp","operations":"per-qual.webp","sales-financial":"sales-fin.webp","people":"people-leader.webp","storealerts":"storealerts.webp","alerts":"storealerts.webp","maximo":"maximo.webp","production":"production.webp","replenishment":"replen.webp","inventory":"inventory.webp","shrink":"shrink.webp","sales":"sales.webp","sales-snapshot":"sales-snapshot.webp","foodsafety":"foodsafety.webp","safety":"safety.webp","labor":"labor.webp","labor-health":"laborsnap.webp","ordering":"orderman.webp","compliance":"compsnap.webp","associate-home":"assoc-dept-home.webp","temperature-1":"templog1.webp","temperature-2":"templog2.webp","temperature-3":"templog3.webp","experience-1":"temp1.webp","experience-2":"temp2.webp","experience-3":"temp3.webp","experience-4":"temp4.webp","experience-5":"temp5.webp","experience-6":"temp6.webp","grocery-1":"assoc-gro1.webp","grocery-2":"assoc-groc2.webp","produce-1":"assoc-prod1.webp","produce-2":"assoc-prod2.webp","dairy-1":"assoc-dairy1.webp","dairy-2":"assoc-dairy2.webp","frozen-1":"assoc-froz1.webp","frozen-2":"assoc-froz2.webp","meat-1":"assoc-meat1.webp","meat-2":"assoc-meat2.webp","seafood-1":"assoc-sea1.webp","seafood-2":"assoc-sea2.webp","deli-1":"assoc-deli1.webp","deli-2":"assoc-deli2.webp","bakery-1":"assoc-bak1.webp","bakery-2":"assoc-bak2.webp","starbucks-1":"assoc-star1.webp","starbucks-2":"assoc-star2.webp","murrays-1":"assoc-mur1.webp","murrays-2":"assoc-mur2.webp","front-end-1":"assoc-front1.webp","front-end-2":"assoc-front2.webp","ecommerce-1":"assoc-ecom.webp","ecommerce-2":"assoc-ecom2.webp","general-merchandise-1":"assoc-gm1.webp","general-merchandise-2":"assoc-gm2.webp","hbc-1":"assoc-hbc1.webp","hbc-2":"assoc-hbc2.webp","liquor-1":"assoc-liq1.webp","liquor-2":"assoc-liq2.webp","receiving-1":"assoc-rec1.webp","receiving-2":"assoc-rec2.webp","home-department-1":"assoc-home1.webp","home-department-2":"assoc-home2.webp","management-1":"assoc-man1.webp","management-2":"assoc-man2.webp"};
const NEXT={'composite':'operations','operations':'sales-financial','sales-financial':'people','people':'home','storealerts':'home',"grocery-1":"grocery-2","produce-1":"produce-2","dairy-1":"dairy-2","frozen-1":"frozen-2","meat-1":"meat-2","seafood-1":"seafood-2","deli-1":"deli-2","bakery-1":"bakery-2","starbucks-1":"starbucks-2","murrays-1":"murrays-2","front-end-1":"front-end-2","ecommerce-1":"ecommerce-2","general-merchandise-1":"general-merchandise-2","hbc-1":"hbc-2","liquor-1":"liquor-2","receiving-1":"receiving-2","home-department-1":"home-department-2","management-1":"management-2","temperature-1":"temperature-2","temperature-2":"temperature-3","temperature-3":"home","experience-1":"experience-2","experience-2":"experience-3","experience-3":"experience-4","experience-4":"experience-5","experience-5":"experience-6"};
const DEPTS=["grocery","produce","dairy","frozen","meat","seafood","deli","bakery","starbucks","murrays","front-end","ecommerce","general-merchandise","hbc","liquor","receiving","home-department","management"];
const TITLES={home:'Home',pro:'PRO','pro-view':'PRO View',tempcomp:'Temperature Compliance',mission:'Mission Value',scorecard:'Store Scorecard',composite:'Store Composite Overview',operations:'Operations & Quality','sales-financial':'Sales & Financial',people:'People & Leadership',storealerts:'Store Alerts & Risks',alerts:'Alerts',maximo:'Maximo',production:'Production',replenishment:'Replenishment',inventory:'Inventory',shrink:'Shrink',sales:'Sales','sales-snapshot':'Sales Snapshot',foodsafety:'Food Safety',safety:'Safety',labor:'Labor','labor-health':'Labor Health',ordering:'Ordering',compliance:'Compliance','associate-home':'Associate Department Module','temperature-1':'Temperature Compliance 1','temperature-2':'Temperature Compliance 2','temperature-3':'Temperature Compliance 3'};
const app=document.querySelector('#app'),toast=document.querySelector('#toast'),dialog=document.querySelector('#assistant'),chat=document.querySelector('#chat'),input=document.querySelector('#assistant-input');
let current='home';const DEBUG=new URLSearchParams(location.search).has('debug');const NOTE_KEY='friend-enterprise-notes-v1';
function say(t){toast.textContent=t;toast.classList.add('show');clearTimeout(say.timer);say.timer=setTimeout(()=>toast.classList.remove('show'),1900)}
function titleOf(id){return TITLES[id]||id.replace(/-([12])$/,' $1').replaceAll('-',' ').replace(/\b\w/g,c=>c.toUpperCase())}
function go(id,push=true){if(!ROUTES[id]){say('Screen not found: '+id);return}current=id;if(push)history.pushState({id},'', '#'+id);render()}
function back(){if(TEMPERATURE_FLOW.has(current)){go(TEMPERATURE_PREV[current]||'home');return}if(COMPOSITE_FLOW.has(current)){go(COMPOSITE_PREV[current]||'home');return}if(history.length>1)history.back();else go('home')}
function forward(){go(NEXT[current]||'home')}
window.addEventListener('popstate',e=>{current=(e.state&&e.state.id)||location.hash.slice(1)||'home';if(!ROUTES[current])current='home';render()});
function hs(label,x,y,w,h,action){return{label,x,y,w,h,action}}

const ASSOC_ONE=new Set(DEPTS.map(d=>d+'-1'));
const ASSOC_TWO=new Set(DEPTS.map(d=>d+'-2'));
const TEMPERATURE_FLOW=new Set(['temperature-1','temperature-2','temperature-3']);
const TEMPERATURE_PREV={'temperature-1':'home','temperature-2':'temperature-1','temperature-3':'temperature-2'};
const TEMPERATURE_NEXT={'temperature-1':'temperature-2','temperature-2':'temperature-3','temperature-3':'home'};
const EXPERIENCE=new Set(['experience-1','experience-2','experience-3','experience-4','experience-5','experience-6']);
const ROBOT_ONLY_BACK=new Set(['pro','pro-view','tempcomp','mission']);
const COMPOSITE_FLOW=new Set(['composite','operations','sales-financial','people','storealerts']);
const COMPOSITE_PREV={composite:'home',operations:'composite','sales-financial':'operations',people:'sales-financial',storealerts:'composite'};

function bottomHotspots(){return[
 hs('Home',.075,.885,.205,.09,()=>go('home')),
 hs('AI Assistant',.275,.885,.225,.09,openAssistant),
 hs('Voice Search',.49,.885,.22,.09,startVoice),
 hs('Bottom Alerts',.705,.885,.225,.09,()=>go('alerts'))
]}
function standardTopHotspots(){return[
 hs('Back',.055,.095,.13,.065,back),
 hs('Forward',.70,.095,.13,.065,forward),
 hs('Top Alerts',.84,.085,.11,.08,()=>go('alerts'))
]}
function assocHomeTopHotspots(){return[
 hs('Back',.055,.09,.12,.07,back),
 hs('Forward',.755,.09,.11,.07,()=>go('home')),
 hs('Top Alerts',.855,.085,.09,.08,()=>go('alerts'))
]}
function assocOneTopHotspots(){return[
 hs('Back',.205,.06,.095,.07,back),
 hs('Forward',.705,.06,.095,.07,forward),
 hs('Top Alerts',.845,.055,.10,.08,()=>go('alerts'))
]}
function assocTwoTopHotspots(){return[
 hs('Back',.055,.09,.12,.07,back),
 hs('Top Alerts',.84,.085,.11,.08,()=>go('alerts'))
]}
function robotTopHotspots(){return[
 hs('Back',.055,.09,.13,.07,back),
 hs('Top Alerts',.84,.085,.11,.08,()=>go('alerts'))
]}

function temperatureTopHotspots(id){return[
 hs('Back',.065,.095,.105,.07,()=>go(TEMPERATURE_PREV[id]||'home')),
 hs('Forward',.735,.095,.105,.07,()=>go(TEMPERATURE_NEXT[id]||'home')),
 hs('Top Alerts',.845,.09,.095,.08,()=>go('alerts'))
]}
function temperatureBottomHotspots(){return[
 hs('Home',.075,.875,.18,.075,()=>go('home')),
 hs('AI Assistant',.255,.875,.245,.075,openAssistant),
 hs('Voice Search',.50,.875,.205,.075,startVoice),
 hs('Bottom Alerts',.705,.875,.22,.075,()=>go('alerts'))
]}
function compositeTopHotspots(){return[
 hs('Back',.055,.072,.105,.065,back),
 hs('Forward',.735,.072,.095,.065,forward),
 hs('Top Alerts',.835,.065,.095,.075,()=>go('alerts'))
]}
function topHotspotsFor(id){
 if(COMPOSITE_FLOW.has(id))return compositeTopHotspots();
 if(id==='associate-home')return assocHomeTopHotspots();
 if(ASSOC_ONE.has(id))return assocOneTopHotspots();
 if(ASSOC_TWO.has(id))return assocTwoTopHotspots();
 if(ROBOT_ONLY_BACK.has(id))return robotTopHotspots();
 if(TEMPERATURE_FLOW.has(id))return temperatureTopHotspots(id);
 if(EXPERIENCE.has(id))return [hs('Top Alerts',.84,.085,.11,.08,()=>go('alerts'))];
 return standardTopHotspots();
}
function globalHotspots(){return topHotspotsFor(current).concat(TEMPERATURE_FLOW.has(current)?temperatureBottomHotspots():bottomHotspots())}
function homeHotspots(){let a=[];const robotRows=[['pro',.253,.040],['pro-view',.286,.040],['tempcomp',.319,.040],['mission',.352,.042]];robotRows.forEach(([id,y,h])=>a.push(hs(id==='mission'?'Validation / Mission Value':titleOf(id),.34,y,.55,h,()=>go(id))));
[['scorecard',.085,.405],['composite',.355,.405],['maximo',.625,.405],['temperature-1',.085,.528],['sales-snapshot',.355,.528],['labor-health',.625,.528]].forEach(([id,x,y])=>a.push(hs(id==='sales-snapshot'?'Sales vs Plan':titleOf(id),x,y,.27,.12,()=>go(id))));
['production','replenishment','inventory','shrink','sales','foodsafety'].forEach((id,i)=>a.push(hs(titleOf(id),.085+i*.135,.675,.132,.08,()=>go(id))));
[['safety',.08,.75,.15],['labor',.235,.75,.15],['ordering',.39,.75,.15],['associate-home',.54,.75,.205],['compliance',.745,.75,.17]].forEach(([id,x,y,w])=>a.push(hs(titleOf(id),x,y,w,.082,()=>go(id))));
a.push(hs('Associate Experience',.085,.826,.83,.068,()=>go('experience-1')));a.push(...bottomHotspots(),hs('Top Alerts',.685,.118,.095,.060,()=>go('alerts')));return a}
function compositeHotspots(){return[hs('Sales & Financial',.075,.742,.22,.14,()=>go('sales-financial')),hs('Operations & Quality',.285,.742,.225,.14,()=>go('operations')),hs('People & Leadership',.50,.742,.225,.14,()=>go('people')),hs('Alerts & Risks',.715,.742,.215,.14,()=>go('storealerts'))]}
function deptHotspots(){let visible=['grocery','produce','dairy','frozen','meat','seafood','deli','bakery','starbucks','murrays','front-end','ecommerce','general-merchandise','hbc','liquor','receiving','management'];let a=[];let y0=.173,h=.0463;visible.forEach((d,i)=>a.push(hs(titleOf(d),.055,y0+i*h,.89,h*.98,()=>go(d+'-1'))));return a}
function experienceHotspots(){
 const map={
  'temperature-1':hs('Open Daily View',.735,.095,.105,.07,()=>go('temperature-2')),
  'temperature-2':hs('Next Temperature Metric',.735,.095,.105,.07,()=>go('temperature-3')),
  'temperature-3':hs('Return Home',.735,.095,.105,.07,()=>go('home')),
  'experience-1':hs('Start Guided Mission',.085,.495,.83,.065,()=>go('experience-2')),
  'experience-2':hs('Continue',.07,.792,.86,.065,()=>go('experience-3')),
  'experience-3':hs('Continue',.07,.842,.86,.06,()=>go('experience-4')),
  'experience-4':hs('Continue',.095,.558,.81,.064,()=>go('experience-5')),
  'experience-5':hs('Continue',.095,.610,.81,.066,()=>go('experience-6')),
  'experience-6':hs('Complete Mission',.07,.775,.86,.06,()=>go('home'))
 };
 return map[current]?[map[current]]:[];
}
function render(){app.innerHTML='<div class="loading">Loading…</div>';let wrap=document.createElement('div');wrap.className='screen';let img=new Image();img.alt=titleOf(current);img.src='images/'+ROUTES[current];img.onload=()=>{wrap.innerHTML='';wrap.appendChild(img);let layer=document.createElement('div');layer.className='hotspot-layer';let specs=current==='home'?homeHotspots():globalHotspots();if(current==='composite')specs=specs.concat(compositeHotspots());if(current==='associate-home')specs=specs.concat(deptHotspots());if(EXPERIENCE.has(current))specs=specs.concat(experienceHotspots());specs.forEach(s=>{let b=document.createElement('button');b.className='hotspot'+(DEBUG?' debug':'');b.setAttribute('aria-label',s.label);b.title=s.label;b.style.cssText=`left:${s.x*100}%;top:${s.y*100}%;width:${s.w*100}%;height:${s.h*100}%`;if(DEBUG)b.textContent=s.label;b.onclick=e=>{e.preventDefault();s.action()};layer.appendChild(b)});wrap.appendChild(layer);app.replaceChildren(wrap)};img.onerror=()=>{app.textContent='Missing image: '+ROUTES[current]}}
function normalize(t){return t.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim().replace(/^(open|show|go to|take me to|find)\s+/,'')}
const ALIASES={'home':'home','dashboard':'home','pro':'pro','pro view':'pro-view','temperature compliance':'temperature-1','mission value':'mission','validation':'mission','validations':'mission','validation button':'mission','store scorecard':'scorecard','composite':'composite','operations and quality':'operations','operations quality':'operations','sales and financial':'sales-financial','people and leadership':'people','alerts and risks':'storealerts','store alerts':'storealerts','maximo':'maximo','production':'production','replenishment':'replenishment','inventory':'inventory','shrink':'shrink','sales':'sales','food safety':'foodsafety','safety':'safety','labor':'labor','labor health':'labor-health','ordering':'ordering','compliance':'compliance','associate department':'associate-home','associate experience':'experience-1','temperature experience':'experience-1','alerts':'alerts'};DEPTS.forEach(d=>ALIASES[d.replaceAll('-',' ')]=d+'-1');
function match(t){let n=normalize(t);if(ALIASES[n])return ALIASES[n];for(const[k,v]of Object.entries(ALIASES))if(n.includes(k))return v;return null}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function addChat(role,text){const p=document.createElement('p');p.className=role==='user'?'msg-user':'msg-ai';p.innerHTML='<b>'+(role==='user'?'You':'FRIEND')+':</b> '+escapeHtml(text);chat.appendChild(p);chat.scrollTop=chat.scrollHeight}
function getNotes(){try{return JSON.parse(localStorage.getItem(NOTE_KEY)||'[]')}catch{return[]}}
function setNotes(notes){localStorage.setItem(NOTE_KEY,JSON.stringify(notes));renderNotes()}
function saveNote(text){text=text.trim();if(!text)return false;const notes=getNotes();notes.unshift({id:crypto.randomUUID?crypto.randomUUID():Date.now().toString(36),text,screen:current,screenTitle:titleOf(current),created:new Date().toISOString()});setNotes(notes);say('Note saved');return true}
function extractNote(text){const m=text.match(/^(?:take|make|save|add|write|remember)(?:\s+(?:a|this))?\s+note(?:\s+(?:that|to))?\s*[:\-]?\s*(.+)$/i)||text.match(/^note\s*[:\-]?\s*(.+)$/i);return m&&m[1]?m[1].trim():null}
function handleText(t){addChat('user',t);const note=extractNote(t);if(note){saveNote(note);addChat('ai','Saved your note under '+titleOf(current)+'.');return}if(/^(show|open|view|list)\s+(my\s+)?notes?$/i.test(t.trim())){switchTab('notes-panel');renderNotes();addChat('ai','Your saved notes are open.');return}let id=match(t);if(id){addChat('ai','Opening '+titleOf(id)+'.');go(id);setTimeout(()=>dialog.close(),250)}else addChat('ai','I can navigate, take notes, show notes, copy notes, or export notes. Try “Open Production” or “Take a note: call bakery.”')}
function openAssistant(){dialog.showModal();renderNotes();setTimeout(()=>input.focus(),50)}
document.querySelector('#assistant-close').onclick=()=>dialog.close();document.querySelector('#assistant-form').onsubmit=e=>{e.preventDefault();let t=input.value.trim();if(t)handleText(t);input.value=''};document.querySelector('#assistant-mic').onclick=startVoice;
function switchTab(id){document.querySelectorAll('.assistant-panel').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.assistant-tabs .tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===id))}
document.querySelectorAll('.assistant-tabs .tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
document.querySelector('#note-form').onsubmit=e=>{e.preventDefault();const n=document.querySelector('#note-input');if(saveNote(n.value))n.value=''};
function renderNotes(){const notes=getNotes(),list=document.querySelector('#notes-list');document.querySelector('#note-count').textContent=notes.length;if(!notes.length){list.innerHTML='<div class="empty-notes">No notes yet.</div>';return}list.innerHTML='';notes.forEach(n=>{const card=document.createElement('article');card.className='note-card';card.innerHTML='<div class="note-meta">'+escapeHtml(n.screenTitle)+' • '+new Date(n.created).toLocaleString()+'</div><p>'+escapeHtml(n.text)+'</p><button type="button">Delete</button>';card.querySelector('button').onclick=()=>setNotes(getNotes().filter(x=>x.id!==n.id));list.appendChild(card)})}
function notesText(){return getNotes().map(n=>`[${new Date(n.created).toLocaleString()}] ${n.screenTitle}\n${n.text}`).join('\n\n')}
document.querySelector('#copy-notes').onclick=async()=>{const text=notesText();if(!text){say('No notes to copy');return}try{await navigator.clipboard.writeText(text);say('Notes copied')}catch{say('Copy unavailable')}};
document.querySelector('#export-notes').onclick=()=>{const text=notesText();if(!text){say('No notes to export');return}const blob=new Blob([text],{type:'text/plain'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='FRIEND-notes-'+new Date().toISOString().slice(0,10)+'.txt';a.click();URL.revokeObjectURL(a.href)};
document.querySelector('#clear-notes').onclick=()=>{if(confirm('Delete all saved notes?'))setNotes([])};
function startVoice(){let SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){openAssistant();say('Voice recognition is unavailable here. Type your request.');return}let r=new SR();r.lang='en-US';r.interimResults=false;r.onstart=()=>say('Listening…');r.onresult=e=>{let t=e.results[0][0].transcript;say(t);if(dialog.open){input.value=t;handleText(t);input.value=''}else{const note=extractNote(t);if(note){saveNote(note);return}let id=match(t);if(id)go(id);else{openAssistant();handleText(t)}}};r.onerror=e=>say('Microphone: '+e.error);r.start()}
if('serviceWorker'in navigator)navigator.serviceWorker.register('./service-worker.js').catch(()=>{});current=location.hash.slice(1)||'home';if(!ROUTES[current])current='home';history.replaceState({id:current},'', '#'+current);render();renderNotes();

// v7 fullscreen support. Android/desktop browsers can enter Fullscreen API;
// iPhone/iPad use the manifest + Add to Home Screen for true fullscreen.
const fullscreenButton=document.querySelector('#fullscreen-toggle');
const isInstalled=window.matchMedia('(display-mode: standalone)').matches||window.matchMedia('(display-mode: fullscreen)').matches||window.navigator.standalone===true;
const canFullscreen=!!(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen);
if(fullscreenButton&&!isInstalled&&canFullscreen){
  fullscreenButton.hidden=false;
  fullscreenButton.onclick=async()=>{
    try{
      const el=document.documentElement;
      if(document.fullscreenElement||document.webkitFullscreenElement){
        const exit=document.exitFullscreen||document.webkitExitFullscreen;
        if(exit) await exit.call(document);
      }else{
        const enter=el.requestFullscreen||el.webkitRequestFullscreen;
        if(enter) await enter.call(el,{navigationUI:'hide'});
      }
    }catch{say('For full screen, add FRIEND to your Home Screen.');}
  };
  const syncFullscreenButton=()=>{fullscreenButton.textContent=(document.fullscreenElement||document.webkitFullscreenElement)?'⤢':'⛶';fullscreenButton.setAttribute('aria-label',(document.fullscreenElement||document.webkitFullscreenElement)?'Exit full screen':'Enter full screen')};
  document.addEventListener('fullscreenchange',syncFullscreenButton);
  document.addEventListener('webkitfullscreenchange',syncFullscreenButton);
}

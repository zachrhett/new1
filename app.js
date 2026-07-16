const screens = {
  home: { image: 'storescorecard.webp', label: 'Store Scorecard' },
  compliance: { image: 'compsnap.webp', label: 'Compliance Snapshot' },
  inventory: { image: 'inventory.webp', label: 'Inventory' },
  priorities: { image: 'top-pri.webp', label: 'Top Priority Tasks' },
  meat: { image: 'assoc-meat2.webp', label: 'Meat Department' },
  deli: { image: 'assoc-deli2.webp', label: 'Deli Department' },
  seafood: { image: 'assoc-sea2.webp', label: 'Seafood Department' },
  dairy: { image: 'assoc-dairy2.webp', label: 'Dairy Department' },
  liquor: { image: 'assoc-liq1.webp', label: 'Liquor Department' },
  ecommerce: { image: 'assoc-ecom2.webp', label: 'E-Commerce Department' },
  starbucks: { image: 'assoc-star1.webp', label: 'Starbucks Department' },
  receiving: { image: 'assoc-rec2.webp', label: 'Receiving Department' },
  sanitize: { image: 'tempguide4.webp', label: 'Sanitize Probe' },
  temperature: { image: 'tempguide5.webp', label: 'Take Temperature' },
  templog1: { image: 'templog1.webp', label: 'Temperature Log 1' },
  templog2: { image: 'templog2.webp', label: 'Temperature Log 2' },
  templog3: { image: 'templog3.webp', label: 'Temperature Log 3' }
};

const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const assistant = document.querySelector('#assistant');
let current = 'home';
let historyStack = [];

const commonBottom = [
  {x:7,y:89,w:18,h:8,action:'home',label:'Home'},
  {x:25,y:89,w:25,h:8,action:'assistant',label:'F.R.I.E.N.D. AI Assistant'},
  {x:50,y:89,w:25,h:8,action:'microphone',label:'AI Assisted Microphone'},
  {x:75,y:89,w:22,h:8,action:'alerts',label:'Alerts'}
];

const maps = {
  home: [
    {x:7,y:16,w:21,h:12,action:'compliance',label:'Total Store Safety'},
    {x:28,y:16,w:21,h:12,action:'templog1',label:'Food Safety and Temperature Compliance'},
    {x:49,y:16,w:21,h:12,action:'compliance',label:'Compliance'},
    {x:70,y:16,w:22,h:12,action:'priorities',label:'Production'},
    {x:6,y:64,w:48,h:22,action:'inventory',label:'Department Performance'},
    {x:54,y:64,w:39,h:22,action:'priorities',label:'Store Leader Focus'}
  ],
  compliance: [
    {x:5,y:7,w:12,h:8,action:'back',label:'Back'},
    {x:78,y:7,w:10,h:8,action:'home',label:'Next'},
    {x:6,y:29,w:22,h:15,action:'priorities',label:'Total Store Safety'},
    {x:28,y:29,w:22,h:15,action:'templog1',label:'Food Safety'},
    {x:50,y:29,w:22,h:15,action:'compliance',label:'Compliance'},
    {x:72,y:29,w:22,h:15,action:'priorities',label:'Production'}
  ],
  receiving: [
    {x:4,y:8,w:12,h:8,action:'back',label:'Back'},
    {x:42,y:27,w:17,h:14,action:'templog1',label:'Temperature Compliance'},
    {x:40,y:78,w:12,h:8,action:'templog1',label:'Temperature Check'},
    {x:4,y:78,w:12,h:8,action:'priorities',label:'Guided Missions'},
    {x:16,y:78,w:12,h:8,action:'toast:Inbound Log opened',label:'Inbound Log'},
    {x:28,y:78,w:12,h:8,action:'toast:Vendor Performance opened',label:'Vendor Performance'},
    {x:52,y:78,w:12,h:8,action:'toast:Receiving Audit opened',label:'Receiving Audit'},
    {x:64,y:78,w:12,h:8,action:'templog1',label:'Food Safety Walk'},
    {x:76,y:78,w:12,h:8,action:'alerts',label:'Alerts'},
    {x:88,y:78,w:9,h:8,action:'toast:More actions opened',label:'More'}
  ],
  meat: deptMap('meat'), deli: deptMap('deli'), seafood: deptMap('seafood'), dairy: deptMap('dairy'), ecommerce: deptMap('ecommerce'),
  inventory: [
    {x:5,y:7,w:10,h:8,action:'back',label:'Back'},
    {x:75,y:7,w:10,h:8,action:'home',label:'Next'},
    {x:6,y:77,w:88,h:10,action:'priorities',label:'Inventory Priority Missions'}
  ],
  priorities: [{x:4,y:8,w:12,h:8,action:'back',label:'Back'}],
  liquor: [{x:5,y:7,w:10,h:8,action:'back',label:'Back'},{x:75,y:7,w:10,h:8,action:'starbucks',label:'Next'}],
  starbucks: [{x:5,y:7,w:10,h:8,action:'liquor',label:'Previous'},{x:75,y:7,w:10,h:8,action:'home',label:'Next'}],
  sanitize: [
    {x:10,y:55,w:80,h:9,action:'temperature',label:'Continue'},
    {x:85,y:80,w:10,h:7,action:'toast:Probe connected',label:'Connection'}
  ],
  temperature: [
    {x:10,y:62,w:80,h:9,action:'templog1',label:'Continue to temperature logs'},
    {x:85,y:80,w:10,h:7,action:'toast:Probe connected',label:'Connection'}
  ],
  templog1: logMap('templog2','back'),
  templog2: logMap('templog3','templog1'),
  templog3: logMap('home','templog2')
};

function deptMap(name){
  return [
    {x:4,y:8,w:12,h:8,action:'back',label:'Back'},
    {x:50,y:16,w:45,h:11,action:'sanitize',label:'Priority Mission'},
    {x:39,y:78,w:12,h:8,action:'sanitize',label:'Temperature Audit'},
    {x:4,y:78,w:12,h:8,action:'priorities',label:'Guided Missions'},
    {x:16,y:78,w:12,h:8,action:'inventory',label:'Replenishment'},
    {x:28,y:78,w:12,h:8,action:'inventory',label:'Out of Stocks'},
    {x:51,y:78,w:12,h:8,action:'toast:Counts opened',label:'Counts'},
    {x:63,y:78,w:12,h:8,action:'templog1',label:'Food Safety'},
    {x:75,y:78,w:12,h:8,action:'alerts',label:'Alerts'},
    {x:87,y:78,w:10,h:8,action:'toast:More actions opened',label:'More'}
  ];
}

function logMap(next, previous){
  return [
    {x:4,y:7,w:11,h:8,action:previous,label:'Previous log'},
    {x:74,y:7,w:11,h:8,action:next,label:'Next log'},
    {x:16,y:20,w:20,h:8,action:'toast:Division selector opened',label:'Division'},
    {x:37,y:20,w:20,h:8,action:'toast:District selector opened',label:'District'},
    {x:63,y:20,w:27,h:8,action:'toast:Store selector opened',label:'Store'},
    {x:16,y:28,w:20,h:8,action:'toast:Metric selector opened',label:'Metric'},
    {x:37,y:28,w:20,h:8,action:'toast:Year selector opened',label:'Year'},
    {x:63,y:28,w:27,h:8,action:'toast:Quarter selector opened',label:'Quarter'},
    {x:16,y:36,w:20,h:8,action:'toast:Period selector opened',label:'Period'},
    {x:37,y:36,w:20,h:8,action:'toast:Week selector opened',label:'Week'}
  ];
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>toast.classList.remove('show'),1800);
}

function navigate(id, push=true){
  if(!screens[id]) return showToast('This module is ready for integration.');
  if(push && current !== id) historyStack.push(current);
  current = id;
  render();
}

function goBack(){
  navigate(historyStack.pop() || 'home', false);
}

function render(){
  const screen = screens[current];
  app.innerHTML = `<section class="screen" aria-label="${screen.label}"><img src="images/${screen.image}" alt="${screen.label}"><div class="hotspot-layer"></div></section>`;
  const layer = app.querySelector('.hotspot-layer');
  const items = [...(maps[current] || []), ...commonBottom];
  items.forEach(item => {
    const b = document.createElement('button');
    b.type='button'; b.className='hotspot'; b.setAttribute('aria-label',item.label || 'Open');
    Object.assign(b.style,{left:item.x+'%',top:item.y+'%',width:item.w+'%',height:item.h+'%'});
    b.addEventListener('click',()=>runAction(item.action));
    layer.appendChild(b);
  });
}

function runAction(action){
  if(action === 'back') return goBack();
  if(action === 'assistant') return openAssistant();
  if(action === 'microphone') return startVoice();
  if(action === 'alerts') return showToast('2 alerts: Maximo priority and temperature follow-up.');
  if(action?.startsWith('toast:')) return showToast(action.slice(6));
  navigate(action);
}

function openAssistant(){ if(!assistant.open) assistant.showModal(); }
document.querySelector('#assistant-close')?.addEventListener('click',()=>assistant.close());
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.tab,.assistant-panel').forEach(el=>el.classList.remove('active'));
  tab.classList.add('active'); document.querySelector('#'+tab.dataset.tab)?.classList.add('active');
}));

document.querySelector('#assistant-form')?.addEventListener('submit',e=>{
  e.preventDefault(); const input=document.querySelector('#assistant-input'); const text=input.value.trim(); if(!text) return;
  addChat(text,'user'); input.value='';
  const normalized=text.toLowerCase();
  const match=Object.entries(screens).find(([id,s])=>normalized.includes(id) || normalized.includes(s.label.toLowerCase().split(' ')[0]));
  if(normalized.startsWith('take a note')){ saveNote(text.replace(/^take a note\s*/i,'')); addChat('I saved that note.','ai'); }
  else if(match){ navigate(match[0]); assistant.close(); }
  else addChat('I can open store scorecard, compliance, inventory, priorities, department dashboards, temperature workflow, or temperature logs.','ai');
});
function addChat(text,who){ const p=document.createElement('p'); p.className=who==='user'?'msg-user':'msg-ai'; p.textContent=text; document.querySelector('#chat').appendChild(p); }

function startVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR) return showToast('Voice recognition is not supported in this browser.');
  const r=new SR(); r.lang='en-US'; r.interimResults=false;
  r.onresult=e=>{ const text=e.results[0][0].transcript; document.querySelector('#assistant-input').value=text; openAssistant(); };
  r.onerror=()=>showToast('Microphone could not start.'); r.start(); showToast('Listening…');
}
document.querySelector('#assistant-mic')?.addEventListener('click',startVoice);

const notesKey='friend-notes-v10';
function getNotes(){ try{return JSON.parse(localStorage.getItem(notesKey)||'[]')}catch{return []} }
function saveNote(text){ if(!text?.trim()) return; const notes=getNotes(); notes.unshift({id:Date.now(),screen:current,text:text.trim(),date:new Date().toLocaleString()}); localStorage.setItem(notesKey,JSON.stringify(notes)); renderNotes(); }
function renderNotes(){ const notes=getNotes(), list=document.querySelector('#notes-list'); document.querySelector('#note-count').textContent=notes.length; list.innerHTML=notes.length?'':'<p class="empty-notes">No saved notes.</p>'; notes.forEach(n=>{const d=document.createElement('div');d.className='note-card';d.innerHTML=`<div class="note-meta">${n.screen} • ${n.date}</div><p></p><button type="button">Delete</button>`;d.querySelector('p').textContent=n.text;d.querySelector('button').onclick=()=>{localStorage.setItem(notesKey,JSON.stringify(getNotes().filter(x=>x.id!==n.id)));renderNotes()};list.appendChild(d)}); }
document.querySelector('#note-form')?.addEventListener('submit',e=>{e.preventDefault();const i=document.querySelector('#note-input');saveNote(i.value);i.value='';});
document.querySelector('#copy-notes')?.addEventListener('click',async()=>{await navigator.clipboard.writeText(getNotes().map(n=>`${n.date} [${n.screen}] ${n.text}`).join('\n'));showToast('Notes copied.');});
document.querySelector('#export-notes')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify(getNotes(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='friend-notes.json';a.click();URL.revokeObjectURL(a.href)});
document.querySelector('#clear-notes')?.addEventListener('click',()=>{if(confirm('Clear all notes?')){localStorage.removeItem(notesKey);renderNotes()}});

window.addEventListener('popstate',()=>{ const route=location.hash.slice(1); if(screens[route]){current=route;render();} });
renderNotes(); render();

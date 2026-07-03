// Live "career uptime" readout, counting from the Dedalus start date.
const start = new Date("2023-01-01T00:00:00Z");
const readout = document.getElementById('uptime-readout');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pad(n){ return String(n).padStart(2,'0'); }

function updateUptime(){
  const now = new Date();
  let diff = Math.floor((now - start)/1000);
  const days = Math.floor(diff / 86400);
  diff -= days*86400;
  const hours = Math.floor(diff/3600);
  diff -= hours*3600;
  const mins = Math.floor(diff/60);
  const secs = diff - mins*60;
  readout.textContent = `${days}d ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
}
updateUptime();
if(!reduceMotion){ setInterval(updateUptime, 1000); }

// Pipeline stage cycling
const stages = document.querySelectorAll('.stage');
const fill = document.getElementById('pipeline-fill');
let idx = 0;

function setActive(i){
  stages.forEach(s => s.classList.remove('active'));
  for(let k=0;k<=i;k++){ stages[k].classList.add('active'); }
  const pct = (i/(stages.length-1))*100;
  fill.style.width = pct + '%';
}

if(reduceMotion){
  setActive(stages.length-1);
} else {
  setActive(0);
  setInterval(()=>{
    idx = (idx+1) % stages.length;
    if(idx === 0){
      fill.style.width='0%';
      stages.forEach(s=>s.classList.remove('active'));
      setTimeout(()=>setActive(0),50);
    } else {
      setActive(idx);
    }
  }, 1100);
}

// Copy email
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('copied-toast');
copyBtn.addEventListener('click', async () => {
  try{
    await navigator.clipboard.writeText('suryatej93987@gmail.com');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 2200);
  }catch(e){
    window.location.href = 'mailto:suryatej93987@gmail.com';
  }
});

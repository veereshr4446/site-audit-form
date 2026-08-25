// ⚠️ REQUIRED: paste your deployed Google Apps Script Web App URL here.
// See SETUP_INSTRUCTIONS.md for how to get this.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQWyB7iz9myv-RFhM1ASKeDyXO4KEOb4Rp_AsyAvccyxK_hSQRWHB-DyjPmlWQujrM/exec";

// Column order this form sends — must match the header row in your Google Sheet.
const FULL_HEADERS = [
  "Site Code","SIte Code","City","Region","Location","Audit/ Re-Audit","Team",
  "SPOC Name","SPOC Contact","Planned Date","Execution Date","Audit Engineers",
  "Audit Work Status","Checklist Status","Ondrive Status","Report Engineer",
  "Report work Start Date","Report work End Date","Report Work Status",
  "Report Reviewed Remarks","Geo Location","Address","CLM","Ph.no"
];

const form = document.getElementById('auditForm');
const requiredFields = [
  ['siteCode','Site Code'], ['city','City'], ['region','Region'], ['location','Location'],
  ['auditType','Audit Type'], ['team','Team'], ['plannedDate','Planned Date'],
  ['executionDate','Execution Date'], ['auditEngineers','Audit Engineers'],
  ['auditWorkStatus','Audit Work Status'], ['ondriveStatus','Ondrive Status'],
  ['geoLocation','Geo Location'], ['address','Address']
];

function updateProgress(){
  const bars = document.querySelectorAll('#progress .bar i');
  const cards = document.querySelectorAll('#auditForm .card');
  cards.forEach((card, idx) => {
    if(idx >= bars.length) return;
    const fields = card.querySelectorAll('[data-required="true"]');
    if(fields.length === 0){ bars[idx].style.width = '0%'; return; }
    let filled = 0;
    fields.forEach(f => {
      const el = f.querySelector('input,select,textarea');
      if(el && el.value.trim() !== '') filled++;
    });
    bars[idx].style.width = Math.round((filled/fields.length)*100) + '%';
  });
}
form.addEventListener('input', updateProgress);
form.addEventListener('change', updateProgress);

function formatTeam(raw){
  return raw.split(',').map(s => s.trim()).filter(Boolean).join(' & ');
}

function validate(){
  let ok = true;
  requiredFields.forEach(([id]) => {
    const el = document.getElementById(id);
    const fieldDiv = el.closest('.field');
    if(el.value.trim() === ''){
      fieldDiv.classList.add('invalid');
      ok = false;
    } else {
      fieldDiv.classList.remove('invalid');
    }
  });
  return ok;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!validate()){
    document.querySelector('.field.invalid').scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }
  const statusMsg = document.getElementById('statusMsg');
  const submitBtn = form.querySelector('button.submit');

  if(SCRIPT_URL.indexOf('PASTE_YOUR') === 0){
    statusMsg.textContent = 'Form is not connected to a sheet yet — see SETUP_INSTRUCTIONS.md.';
    return;
  }

  const row = {
    "Site Code": document.getElementById('siteCode').value.trim(),
    "SIte Code": document.getElementById('siteCode2').value.trim(),
    "City": document.getElementById('city').value.trim(),
    "Region": document.getElementById('region').value,
    "Location": document.getElementById('location').value.trim(),
    "Audit/ Re-Audit": document.getElementById('auditType').value,
    "Team": formatTeam(document.getElementById('team').value),
    "SPOC Name": document.getElementById('spocName').value.trim(),
    "SPOC Contact": (function(){
      const num = document.getElementById('spocContact').value.trim();
      if(!num) return "";
      return document.getElementById('spocCode').value + " " + num;
    })(),
    "Planned Date": document.getElementById('plannedDate').value,
    "Execution Date": document.getElementById('executionDate').value,
    "Audit Engineers": document.getElementById('auditEngineers').value.trim(),
    "Audit Work Status": document.getElementById('auditWorkStatus').value,
    "Checklist Status": document.getElementById('checklistStatus').value,
    "Ondrive Status": document.getElementById('ondriveStatus').value,
    "Report Engineer": "",
    "Report work Start Date": "",
    "Report work End Date": "",
    "Report Work Status": "",
    "Report Reviewed Remarks": "",
    "Geo Location": document.getElementById('geoLocation').value.trim(),
    "Address": document.getElementById('address').value.trim(),
    "CLM": "",
    "Ph.no": ""
  };

  statusMsg.textContent = 'Saving...';
  submitBtn.disabled = true;

  try{
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      // text/plain avoids a CORS preflight request against Apps Script
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(row)
    });
    const result = await res.json();
    if(!result || result.result !== 'success') throw new Error((result && result.error) || 'Unknown error');

    document.getElementById('savedCode').textContent = 'Site: ' + row['Site Code'] + (result.srNo ? ('  ·  Entry #' + result.srNo) : '');
    document.getElementById('stampOverlay').classList.add('show');
    statusMsg.textContent = '';
  }catch(err){
    console.error(err);
    statusMsg.textContent = 'Something went wrong saving this entry. Please check your connection and try again.';
  }finally{
    submitBtn.disabled = false;
  }
});

document.getElementById('closeStamp').addEventListener('click', () => {
  document.getElementById('stampOverlay').classList.remove('show');
  form.reset();
  document.querySelectorAll('.field.invalid').forEach(f => f.classList.remove('invalid'));
  updateProgress();
  window.scrollTo({top:0, behavior:'smooth'});
});

updateProgress();

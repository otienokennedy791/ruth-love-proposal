// Put your public backend URL here after deployment.
// Example: const API_URL = "https://your-app.example.com";
const API_URL = "";

const canvas=document.getElementById("matrix"),ctx=canvas.getContext("2d");
let size=14, drops=[];
const chars="LOVE RUTH 01 10 ♥";
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;drops=Array(Math.floor(innerWidth/size)).fill(1)}
function matrix(){ctx.fillStyle="rgba(0,0,0,.08)";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#ff1493";ctx.font=size+"px monospace";drops.forEach((y,i)=>{ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*size,y*size);if(y*size>canvas.height&&Math.random()>.975)drops[i]=0;drops[i]++})}
resize();addEventListener("resize",resize);setInterval(matrix,50);

async function sendResponse(answer){
  const box=document.getElementById("result");
  document.querySelectorAll(".response button").forEach(b=>b.disabled=true);
  box.textContent=answer==="YES"?"❤️ Your YES has been recorded. 💍":"🥺 Your response has been recorded. ❤️";
  if(!API_URL){console.log("API_URL is empty; response is only local.");return}
  try{
    const r=await fetch(API_URL+"/api/response",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer,page:location.href,submitted_at:new Date().toISOString()})});
    if(!r.ok)throw Error();
    box.textContent=answer==="YES"?"❤️ Your YES was sent successfully. 💍":"🥺 Your response was sent successfully. ❤️";
  }catch(e){box.textContent="The response could not be sent. Please try again.";document.querySelectorAll(".response button").forEach(b=>b.disabled=false)}
}
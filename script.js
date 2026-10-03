const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav-links");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu?.setAttribute("aria-expanded","false")}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target);}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const cinematicSections=document.querySelectorAll("main > section");
cinematicSections.forEach(section=>section.classList.add("cinematic-section"));
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("is-visible")}),{threshold:.16,rootMargin:"-8% 0px -8% 0px"});
cinematicSections.forEach(section=>sectionObserver.observe(section));

document.getElementById("year").textContent=new Date().getFullYear();

const form=document.getElementById("budgetForm");
const formStatus=document.getElementById("formStatus");
const selectedEventInput=document.getElementById("selectedEvent");
const eventBuilder=document.getElementById("eventBuilder");
const builderCategories=document.getElementById("builderCategories");
const builderSubtypesWrap=document.getElementById("builderSubtypesWrap");
const builderSubtypes=document.getElementById("builderSubtypes");
const builderCatalogWrap=document.getElementById("builderCatalogWrap");
const builderTabs=document.getElementById("builderTabs");
const builderProducts=document.getElementById("builderProducts");
const builderStep=document.getElementById("builderStep");
const builderCount=document.getElementById("builderCount");
const builderSummary=document.getElementById("builderSummary");
const builderSummaryText=document.getElementById("builderSummaryText");
const builderSummaryCount=document.getElementById("builderSummaryCount");
const eventItemsInput=document.createElement("input");
eventItemsInput.type="hidden";eventItemsInput.name="eventItems";form?.appendChild(eventItemsInput);

const eventCatalog={
 social:{label:"Eventos sociais",subtypes:{
  "Festa infantil — Picnic":{defaults:["Toalhas de picnic","Bolo","Mesa de apoio"]},
  "Festa infantil — Salão / aniversário":{defaults:["Bolo principal","Mesa do bolo","Mesa de doces"]},
  "Batizado":{defaults:["Mesa de doces","Bolo","Arranjos florais"]},
  "Crisma":{defaults:["Mesa de doces","Bolo","Arranjos"]},
  "XV anos":{defaults:["Mesa do bolo","Bolo principal","DJ / música"]},
  "Casamento":{defaults:["Mesa do bolo","Bolo","Flores / decoração","Cerimonial"]},
  "Bar Mitzvah":{defaults:["Mesa do bolo","Decoração temática","DJ / música"]}
 }},
 corporate:{label:"Eventos corporativos",subtypes:{
  "Feira":{defaults:["Estande / estrutura","Identidade visual","Iluminação"]},
  "Exposição":{defaults:["Montagem expositiva","Iluminação","Comunicação visual"]},
  "Simpósio":{defaults:["Palco","Som","Projeção / LED","Coffee break"]},
  "Workshop":{defaults:["Sala / estrutura","Coffee break","Projetor / tela"]},
  "Aula":{defaults:["Sala / estrutura","Projetor / tela","Som"]},
  "Reunião":{defaults:["Sala de reunião","Água","Café"]},
  "Treinamento":{defaults:["Sala / estrutura","Projetor / tela","Coffee break"]},
  "Demais eventos corporativos":{defaults:[]}
 }}
};

const catalogTabs={
 "Decoração":["Conceito visual","Painel / backdrop","Balões","Flores / arranjos","Mesa do bolo","Mesa de doces","Iluminação decorativa","Pista de dança","Identidade visual","Sinalização","Mobiliário / lounge"],
 "Alimentação & bebidas":["Coffee break","Coquetel","Salgados","Mini lanches","Jantar","Mesa de frutas","Água","Sucos","Refrigerantes","Café","Bar / drinks"],
 "Bolo & doces":["Bolo principal","Brigadeiros","Beijinhos","Docinhos finos","Docinhos personalizados","Cupcakes","Cookies","Bem-casados","Suportes para doces","Topo de bolo"],
 "Estrutura & tecnologia":["Mesas","Cadeiras","Tendas / cobertura","Palco","Som","Microfones","Iluminação","Projetor / tela","Painel LED","TV / monitor","Internet","Gerador","Transmissão"],
 "Descartáveis & apoio":["Copos","Pratos","Talheres","Louças","Guardanapos","Canudos","Embalagens","Lembrancinhas","Crachás","Blocos","Canetas","Kits"],
 "Entretenimento & produção":["DJ","Banda","Recreação","Brinquedos","Personagem","Atração especial","Fotografia","Filmagem","Cabine de fotos","Recepção","Cerimonial","Coordenação","Segurança","Equipe de produção"]
};

const subtypeExtras={
 "Festa infantil — Picnic":["Almofadas e pufes","Mesas baixas","Oficina infantil","Pintura facial"],
 "Festa infantil — Salão / aniversário":["Tema completo","Personagem","Recreação","Brinquedos"],
 "Batizado":["Velas / elementos simbólicos","Fotografia","Filmagem"],
 "Crisma":["Elementos simbólicos","Fotografia","Filmagem"],
 "XV anos":["Coreografia","Atração especial","Pista de dança"],
 "Casamento":["Cerimonial","Assessoria de fornecedores","Banda","DJ","Espumante"],
 "Bar Mitzvah":["Conceito temático","Atração especial","Cabine de fotos"],
 "Feira":["Estande / estrutura","Promotores","Brindes","Ativação de marca"],
 "Exposição":["Vitrines","Montagem expositiva","Equipe de montagem"],
 "Simpósio":["Púlpito","Gravação","Transmissão","Credenciamento"],
 "Workshop":["Apostilas","Certificados","Credenciamento"],
 "Aula":["Apostilas","Certificados","Gravação"],
 "Reunião":["Videoconferência","Materiais impressos"],
 "Treinamento":["Apostilas","Certificados","Kits"],
 "Demais eventos corporativos":["Palco","Painel LED","Ativação de marca","Recepção"]
};

let builderCategory="",builderSubtype="",builderTab="",selectedCatalogItems=new Set();
const getTabs=function(){
 const base=Object.keys(catalogTabs);
 const corporate=builderCategory==="corporate";
 if(corporate) return ["Decoração","Alimentação & bebidas","Bolo & doces","Estrutura & tecnologia","Descartáveis & apoio","Entretenimento & produção"];
 return base;
};
const getItems=function(tab){
 const items=(catalogTabs[tab]||[]).slice();
 const extras=subtypeExtras[builderSubtype]||[];
 extras.forEach(function(item){if(!items.includes(item))items.push(item);});
 return items;
};
const updateSummary=function(){
 const items=Array.from(selectedCatalogItems);
 builderCount.textContent=items.length+" "+(items.length===1?"item":"itens")+" selecionados";
 builderSummaryCount.textContent=items.length+" itens";
 builderSummaryText.textContent=(builderCategory==="social"?"Social":"Corporativo")+" · "+builderSubtype;
 eventItemsInput.value=items.join(" | ");
};
const renderProducts=function(){
 const items=getItems(builderTab);
 builderProducts.innerHTML=items.map(function(item){
  const checked=selectedCatalogItems.has(item);
  return "<label class=\"builder-product"+(checked?" is-default":"")+"\"><input type=\"checkbox\" value=\""+item.replace(/"/g,"&quot;")+"\" "+(checked?"checked":"")+" /><span class=\"builder-product-check\">"+(checked?"✓":"")+"</span><span><strong>"+item+"</strong><small>"+(checked?"Sugestão inicial — você pode retirar":"Adicionar ao briefing")+"</small></span></label>";
 }).join("");
 builderProducts.querySelectorAll("input").forEach(function(input){input.addEventListener("change",function(){
  if(input.checked)selectedCatalogItems.add(input.value);else selectedCatalogItems.delete(input.value);
  input.closest(".builder-product")?.classList.toggle("is-default",input.checked);
  const check=input.parentElement.querySelector(".builder-product-check");if(check)check.textContent=input.checked?"✓":"";
  updateSummary();
 });});
};
const renderTabs=function(){
 builderTabs.innerHTML=getTabs().map(function(tab,i){return "<button type=\"button\" class=\"builder-tab"+(i===0?" is-active":"")+"\" data-tab=\""+tab+"\">"+tab+"</button>";}).join("");
 builderTab=getTabs()[0];
 builderTabs.querySelectorAll(".builder-tab").forEach(function(tab){tab.addEventListener("click",function(){builderTab=tab.dataset.tab;builderTabs.querySelectorAll(".builder-tab").forEach(function(t){t.classList.remove("is-active")});tab.classList.add("is-active");renderProducts();});});
};
const openBuilder=function(){
 const type=eventCatalog[builderCategory].subtypes[builderSubtype];
 selectedCatalogItems=new Set(type.defaults||[]);
 selectedCatalogItems.forEach(function(item){if(!getTabs().some(function(tab){return getItems(tab).includes(item)}))selectedCatalogItems.delete(item);});
 renderTabs();renderProducts();builderCatalogWrap.hidden=false;builderSummary.hidden=false;builderStep.textContent="03 / 03";selectedEventInput.value=builderSubtype;updateSummary();
};
builderCategories?.querySelectorAll(".builder-category").forEach(function(button){button.addEventListener("click",function(){
 builderCategory=button.dataset.category;builderSubtype="";selectedCatalogItems=new Set();
 builderCategories.querySelectorAll(".builder-category").forEach(function(b){b.classList.remove("is-selected")});button.classList.add("is-selected");
 builderSubtypes.innerHTML=Object.keys(eventCatalog[builderCategory].subtypes).map(function(name){return "<button type=\"button\" class=\"builder-subtype\" data-subtype=\""+name+"\">"+name+"</button>";}).join("");
 builderSubtypesWrap.hidden=false;builderCatalogWrap.hidden=true;builderSummary.hidden=true;builderStep.textContent="02 / 03";
 builderSubtypes.querySelectorAll(".builder-subtype").forEach(function(sub){sub.addEventListener("click",function(){builderSubtype=sub.dataset.subtype;builderSubtypes.querySelectorAll(".builder-subtype").forEach(function(s){s.classList.remove("is-selected")});sub.classList.add("is-selected");openBuilder();});});
});});

const phoneInput=form?.querySelector('input[name="phone"]');
phoneInput?.addEventListener("input",e=>{
  let v=e.target.value.replace(/\D/g,"").slice(0,11);
  if(v.length>10)e.target.value=v.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3");
  else if(v.length>6)e.target.value=v.replace(/(\d{2})(\d{4,5})(\d{0,4})/,"($1) $2-$3");
  else if(v.length>2)e.target.value=v.replace(/(\d{2})(\d{0,5})/,"($1) $2");
  else e.target.value=v;
});
form?.addEventListener("submit",e=>{
  e.preventDefault();
  if(!form.reportValidity()) return;
  if(form.querySelector('[name="website"]')?.value) return;
  if(!selectedEventInput?.value){ if(formStatus){formStatus.textContent="Escolha a categoria e o tipo de evento antes de enviar o briefing.";formStatus.classList.add("success");} eventBuilder?.scrollIntoView({behavior:"smooth",block:"center"}); return; }
  const d=new FormData(form);
  const text=`Olá, Principado Produções! 👋

Meu nome é ${d.get("name")}.
Empresa: ${d.get("company")||"Não informada"}\nWhatsApp: ${d.get("phone")}\nConvidados: ${d.get("guests")||"A definir"}

Tipo de evento: ${d.get("event")}
Data prevista: ${d.get("date")||"A definir"}
Cidade/local: ${d.get("location")||"A definir"}
Faixa de investimento: ${d.get("budget")||"A conversar"}

Sobre o evento:
${d.get("message")||"Gostaria de conversar sobre o projeto."}

Quero saber como a Principado pode produzir essa experiência.`;
  window.open(`https://wa.me/5521975542783?text=${encodeURIComponent(text)}`,"_blank","noopener");
  if(formStatus){
    formStatus.textContent="Briefing preparado. O WhatsApp foi aberto para você concluir o envio.";
    formStatus.classList.add("success");
  }
  form.reset();
});
document.addEventListener("mousemove",e=>{
  const glow=document.querySelector(".cursor-glow");
  if(window.innerWidth>900){glow.style.opacity=".025";glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}
});

const header=document.querySelector(".header");
const darkAreaSelector=".hero, .services, .no-portfolio, .footer";
const updateHeaderContrast=()=>{
  if(!header)return;
  const x=Math.min(18,window.innerWidth-1),y=Math.min(104,window.innerHeight-1);
  const target=document.elementFromPoint(x,y)?.closest(darkAreaSelector);
  header.classList.toggle("on-dark",!!target);
};
updateHeaderContrast();
window.addEventListener("scroll",updateHeaderContrast,{passive:true});
window.addEventListener("resize",updateHeaderContrast);

const prefersReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const progress=document.createElement("div");
progress.className="scroll-progress";
progress.innerHTML="<span></span>";
document.body.prepend(progress);
const progressBar=progress.querySelector("span");
let lastScrollY=window.scrollY,ticking=false;
const updateScrollUI=()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=max>0?window.scrollY/max:0;
  progressBar.style.transform=`scaleX(${ratio})`;
  if(header){
    header.classList.toggle("is-scrolled",window.scrollY>55);
    if(!prefersReducedMotion){
      const delta=window.scrollY-lastScrollY;
      if(window.scrollY>120&&delta>7)header.classList.add("is-hidden");
      if(delta<-7)header.classList.remove("is-hidden");
      if(window.scrollY<=55)header.classList.remove("is-hidden");
    }
  }
  lastScrollY=window.scrollY;ticking=false;
};
window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(updateScrollUI);ticking=true}},{passive:true});
updateScrollUI();

const vignette=document.createElement("div");vignette.className="page-vignette";document.body.appendChild(vignette);

if(!prefersReducedMotion){
  document.querySelectorAll(".button,.nav-button").forEach(el=>{
    el.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const r=el.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))*.12,dy=(e.clientY-(r.top+r.height/2))*.12;el.style.transform=`translate3d(${dx}px,${dy}px,0)`});
    el.addEventListener("pointerleave",()=>{el.style.transform=""});
  });
}

const heroCard=document.querySelector(".hero-card");
if(heroCard&&!prefersReducedMotion&&window.matchMedia("(pointer:fine)").matches){
  heroCard.addEventListener("pointermove",e=>{
    const r=heroCard.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    heroCard.style.transform=`perspective(1100px) rotateX(${-y*5}deg) rotateY(${x*7}deg) translateZ(0)`;
    heroCard.querySelectorAll(".orbit").forEach((o,index)=>o.style.transform=`translate3d(${x*(index+1)*8}px,${y*(index+1)*8}px,0)`);
  });
  heroCard.addEventListener("pointerleave",()=>{heroCard.style.transform="";heroCard.querySelectorAll(".orbit").forEach(o=>o.style.transform="")});
}

document.querySelectorAll(".event-grid,.services-list,.process-grid,.experience-points").forEach(group=>[...group.children].forEach((child,index)=>child.style.setProperty("--reveal-delay",`${Math.min(index*.07,.28)}s`)));

const navAnchors=[...document.querySelectorAll('.nav-links a[href^="#"]')].filter(a=>a.getAttribute("href")!=="#orcamento");
const navSections=navAnchors.map(a=>({a,section:document.querySelector(a.getAttribute("href"))})).filter(x=>x.section);
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navAnchors.forEach(a=>a.classList.remove("active"));navSections.find(x=>x.section===entry.target)?.a.classList.add("active")}}),{threshold:.15,rootMargin:"-35% 0px -55% 0px"});
navSections.forEach(x=>navObserver.observe(x.section));

if(!prefersReducedMotion&&window.matchMedia("(pointer:fine)").matches){
  const glow=document.querySelector(".cursor-glow");let gx=0,gy=0,tx=0,ty=0;
  window.addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY},{passive:true});
  const animateGlow=()=>{gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;if(glow){glow.style.left=gx+"px";glow.style.top=gy+"px";glow.style.opacity=".035"}requestAnimationFrame(animateGlow)};animateGlow();
}

const hero=document.querySelector(".hero");
if(hero&&!prefersReducedMotion)window.addEventListener("scroll",()=>{const y=Math.min(window.scrollY,hero.offsetHeight);hero.style.setProperty("--hero-shift",`${y*.08}px`)},{passive:true});

const experienceBox=document.querySelector(".experience-box");
if(experienceBox&&!prefersReducedMotion&&window.matchMedia("(pointer:fine)").matches){
  experienceBox.addEventListener("pointermove",e=>{const r=experienceBox.getBoundingClientRect(),x=((e.clientX-r.left)/r.width)*100,y=((e.clientY-r.top)/r.height)*100;experienceBox.style.background=`radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,.065), transparent 32%), #050505`});
  experienceBox.addEventListener("pointerleave",()=>{experienceBox.style.background="#050505"});
}

const processTimeline=document.querySelector("[data-process]"),processSteps=[...(processTimeline?.querySelectorAll("[data-process-step]")||[])];
if(processTimeline&&processSteps.length){
  const processObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){processSteps.forEach(step=>step.classList.remove("is-active"));entry.target.classList.add("is-active");processTimeline.classList.add("is-progress")}}),{threshold:.55,rootMargin:"-8% 0px -35% 0px"});
  processSteps.forEach(step=>processObserver.observe(step));
}

document.querySelectorAll('a[href^="https://wa.me/"], a[href*="instagram.com/"], .direct-contact a').forEach(link=>{
  link.addEventListener("click",()=>{ if(window.va) window.va("contact_click",{url:link.href}); });
});

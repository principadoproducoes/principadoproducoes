const catalog={
social:{
 "Festa infantil — Picnic":{desc:"Ao ar livre, leve e divertido.",defaults:["Toalhas de picnic","Bolo principal","Mesas"],extras:["Almofadas e pufes","Mesas baixas","Oficina infantil","Pintura facial"]},
 "Festa infantil — Salão / aniversário":{desc:"Uma festa completa com tema e diversão.",defaults:["Bolo principal","Mesa do bolo","Mesa de doces"],extras:["Tema completo","Personagem","Recreação","Brinquedos"]},
 "Batizado":{desc:"Celebração delicada e acolhedora.",defaults:["Mesa de doces","Bolo principal","Flores / arranjos"],extras:["Velas / elementos simbólicos","Fotografia","Filmagem"]},
 "Crisma":{desc:"Um momento especial com produção cuidadosa.",defaults:["Mesa de doces","Bolo principal","Flores / arranjos"],extras:["Elementos simbólicos","Fotografia","Filmagem"]},
 "XV anos":{desc:"Uma experiência marcante para uma noite única.",defaults:["Mesa do bolo","Bolo principal","DJ"],extras:["Coreografia","Atração especial","Pista de dança"]},
 "Casamento":{desc:"Do conceito ao último detalhe do grande dia.",defaults:["Mesa do bolo","Bolo principal","Flores / arranjos","Cerimonial"],extras:["Assessoria de fornecedores","Banda","DJ","Espumante"]},
 "Bar Mitzvah":{desc:"Celebração com conceito e personalidade.",defaults:["Mesa do bolo","Conceito temático","DJ"],extras:["Atração especial","Cabine de fotos"]}
},
corporate:{
 "Feira":{desc:"Presença de marca com estrutura e impacto.",defaults:["Estande / estrutura","Identidade visual","Iluminação decorativa"],extras:["Promotores","Brindes","Ativação de marca"]},
 "Exposição":{desc:"Montagem para apresentar ideias e conteúdos.",defaults:["Montagem expositiva","Iluminação decorativa","Identidade visual"],extras:["Vitrines","Equipe de montagem"]},
 "Simpósio":{desc:"Conteúdo, tecnologia e experiência para o público.",defaults:["Palco","Som","Projetor / tela","Coffee break"],extras:["Púlpito","Gravação","Transmissão","Credenciamento"]},
 "Workshop":{desc:"Uma estrutura pronta para troca e aprendizado.",defaults:["Mesas","Coffee break","Projetor / tela"],extras:["Apostilas","Certificados","Credenciamento"]},
 "Aula":{desc:"Ambiente organizado para ensinar e conectar.",defaults:["Mesas","Projetor / tela","Som"],extras:["Apostilas","Certificados","Gravação"]},
 "Reunião":{desc:"Um encontro objetivo, confortável e funcional.",defaults:["Mesas","Água","Café"],extras:["Videoconferência","Materiais impressos"]},
 "Treinamento":{desc:"Estrutura para conteúdo, prática e desenvolvimento.",defaults:["Mesas","Projetor / tela","Coffee break"],extras:["Apostilas","Certificados","Kits"]},
 "Demais eventos corporativos":{desc:"Um formato sob medida para sua necessidade.",defaults:[],extras:["Palco","Painel LED","Ativação de marca","Recepção"]}
}};
const tabs={
 "Decoração":["Conceito visual","Painel / backdrop","Balões","Flores / arranjos","Mesa do bolo","Mesa de doces","Iluminação decorativa","Pista de dança","Identidade visual","Sinalização","Mobiliário / lounge","Toalhas de picnic","Mesas baixas","Tema completo","Conceito temático"],
 "Alimentação & bebidas":["Coffee break","Coquetel","Salgados","Mini lanches","Jantar","Mesa de frutas","Água","Sucos","Refrigerantes","Café","Bar / drinks","Espumante"],
 "Bolo & doces":["Bolo principal","Brigadeiros","Beijinhos","Docinhos finos","Docinhos personalizados","Cupcakes","Cookies","Bem-casados","Suportes para doces","Topo de bolo"],
 "Estrutura & tecnologia":["Mesas","Cadeiras","Tendas / cobertura","Palco","Som","Microfones","Iluminação","Projetor / tela","Painel LED","TV / monitor","Internet","Gerador","Transmissão","Estande / estrutura","Montagem expositiva"],
 "Descartáveis & apoio":["Copos","Pratos","Talheres","Louças","Guardanapos","Canudos","Embalagens","Lembrancinhas","Crachás","Blocos","Canetas","Kits","Identidade visual"],
 "Entretenimento & produção":["DJ","Banda","Recreação","Brinquedos","Personagem","Atração especial","Fotografia","Filmagem","Cabine de fotos","Recepção","Cerimonial","Coordenação","Segurança","Equipe de produção","Promotores","Brindes","Ativação de marca","Púlpito","Gravação","Credenciamento","Apostilas","Certificados","Videoconferência","Materiais impressos","Assessoria de fornecedores"]};
const iconMap={"Bolo principal":"●","Mesa do bolo":"▱","Mesa de doces":"◇","Flores / arranjos":"✿","DJ":"♫","Coffee break":"☕","Palco":"▰","Som":"◉","Projetor / tela":"▣","Identidade visual":"◒","Estande / estrutura":"▥","Montagem expositiva":"▤","Fotografia":"◉","Filmagem":"▶","Cerimonial":"✦","Recreação":"★","Brinquedos":"◆","Bar / drinks":"◌"};
let category="",eventType="",activeTab=Object.keys(tabs)[0],selected=new Set();
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const step=(n)=>{[1,2,3].forEach(i=>$("#step"+i).classList.toggle("is-visible",i===n));$$(".progress-item").forEach(x=>x.classList.toggle("is-active",Number(x.dataset.progress)<=n))};
function renderSubtypes(){const wrap=$("#subtypes");wrap.innerHTML=Object.entries(catalog[category]).map(([name,data])=>`<button class="subtype-card" data-type="${name}"><strong>${name}</strong><small>${data.desc}</small><b>→</b></button>`).join("");$$(".subtype-card").forEach(b=>b.onclick=()=>chooseType(b.dataset.type))}
function chooseType(type){eventType=type;selected=new Set(catalog[category][type].defaults);activeTab=Object.keys(tabs).find(t=>tabs[t].some(i=>selected.has(i)))||Object.keys(tabs)[0];$("#eventName").textContent=type;$("#eventCategory").textContent=category==="social"?"Eventos sociais":"Eventos corporativos";renderTabs();renderProducts();updateBriefing();step(3)}
function renderTabs(){$("#tabs").innerHTML=Object.keys(tabs).map(t=>`<button class="catalog-tab ${t===activeTab?"is-active":""}" data-tab="${t}">${t}</button>`).join("");$$(".catalog-tab").forEach(b=>b.onclick=()=>{activeTab=b.dataset.tab;renderTabs();renderProducts()})}
function itemsForActive(){const extras=catalog[category][eventType]?.extras||[];const all=[...tabs[activeTab]];if(activeTab==="Entretenimento & produção")return [...new Set(all.concat(extras))];if(activeTab==="Decoração")return [...new Set(all.concat(extras.filter(x=>/tema|conceito|mesas|toalhas/i.test(x))))];return all}
function renderProducts(){const items=itemsForActive();$("#products").innerHTML=items.map(item=>`<button class="product-card ${selected.has(item)?"is-selected":""}" data-item="${item}"><span class="product-icon">${iconMap[item]||"+"}</span><span><strong>${item}</strong>${(catalog[category][eventType]?.defaults||[]).includes(item)?'<small class="recommended">Recomendado para este formato</small>':''}</span><i class="product-check">${selected.has(item)?"✓":""}</i></button>`).join("");$$(".product-card").forEach(b=>b.onclick=()=>{const item=b.dataset.item;if(selected.has(item))selected.delete(item);else selected.add(item);renderProducts();updateBriefing()})}
function updateBriefing(){const list=$("#selectedList");$("#count").textContent=selected.size+" "+(selected.size===1?"item":"itens");if(!selected.size){list.innerHTML="<p>Suas escolhas aparecerão aqui.</p>";$("#sendBriefing").disabled=true;return}list.innerHTML=[...selected].map(i=>`<div class="selected-item"><span>${i}</span><b>✓</b></div>`).join("");$("#sendBriefing").disabled=!eventType}
$$(".choice-card").forEach(b=>b.onclick=()=>{category=b.dataset.category;renderSubtypes();step(2)});
$("#backToCategory").onclick=()=>step(1);
$("#backToSubtype").onclick=()=>step(2);
$("#sendBriefing").onclick=()=>{const text=`Olá, Principado Produções! 👋\n\nQuero montar um evento com vocês.\n\nCategoria: ${category==="social"?"Eventos sociais":"Eventos corporativos"}\nTipo de evento: ${eventType}\n\nItens e serviços desejados:\n• ${[...selected].join("\n• ")}\n\nGostaria de receber uma orientação para transformar esse briefing em uma proposta.\n\nEnviado pelo Event Builder da Principado Produções.`;window.open("https://wa.me/5521975542783?text="+encodeURIComponent(text),"_blank","noopener");$("#toast").textContent="Briefing preparado. O WhatsApp foi aberto.";$("#toast").classList.add("is-visible");setTimeout(()=>$("#toast").classList.remove("is-visible"),3500)};

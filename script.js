const CATS=[
{name:"Academic & Stationery",ico:"📚",tag:"Books, tools & supplies",subs:["Books & Notes","Calculators","Drafting Tools","Stationery Kits","Study Lamps"]},
{name:"Electronics & Gadgets",ico:"🔌",tag:"Laptops, audio & power",subs:["Laptops","Tablets","Headphones","Speakers","Power Banks","Chargers & Adapters"]},
{name:"Hostel & Household Essentials",ico:"🛏️",tag:"Room & kitchen basics",subs:["Bedding","Kitchen Appliances","Fans & Heaters","Cleaning","Storage"]},
{name:"Clothing & Accessories",ico:"👕",tag:"Formal, ethnic & winter",subs:["Formal Wear","Ethnic Wear","Winter Wear","Lab Wear","Watches & Accessories"]},
{name:"Sports & Fitness Equipment",ico:"🏏",tag:"Play, train & stay fit",subs:["Cricket","Badminton","Football","Gym","Yoga"]},
{name:"Project & Laboratory Equipment",ico:"🔬",tag:"Kits, meters & tools",subs:["Electronics Kits","Measuring Tools","Microscopes","Drawing Boards","Soldering & Tools"]},
{name:"Travel & Outdoor Essentials",ico:"🧳",tag:"Bags, boots & camping",subs:["Bags","Trolleys","Boots","Tents","Sleeping Gear"]},
{name:"Entertainment & Gaming",ico:"🎮",tag:"Games, music & fun",subs:["Consoles","Controllers","Board Games","Musical Instruments"]}
];
// [name, category index, sub-category, price per day, emoji, description]
const raw=[
["Engineering Textbook Set",0,"Books & Notes",40,"📘","Core semester textbooks you only need for a few weeks."],
["Scientific Calculator",0,"Calculators",20,"🧮","Handy for exams, labs and numerical assignments."],
["Mini Drafter & Drafting Kit",0,"Drafting Tools",30,"📐","Engineering graphics essentials in one kit."],
["Geometry & Stationery Kit",0,"Stationery Kits",15,"✏️","Compass, scales, markers and basics for project work."],
["Study Table Lamp",0,"Study Lamps",25,"💡","Bright, eye-friendly light for late-night study."],
["Laptop for Coding & Assignments",1,"Laptops",350,"💻","A dependable laptop for coding and everyday academic tasks."],
["Tablet for Notes & Reading",1,"Tablets",300,"📱","Portable tablet for digital notes and learning."],
["Wireless Headphones",1,"Headphones",120,"🎧","Comfortable audio for study sessions and multimedia work."],
["Portable Bluetooth Speaker",1,"Speakers",180,"🔊","Portable sound for small group activities and events."],
["Power Bank 20000mAh",1,"Power Banks",40,"🔋","Keeps your phone alive on long college days and trips."],
["USB-C Hub & Adapter",1,"Chargers & Adapters",60,"🔌","Connectivity add-on for laptops and project setups."],
["Mattress & Bedding Set",2,"Bedding",80,"🛏️","Temporary bedding for guests or a short hostel stay."],
["Induction Cooktop",2,"Kitchen Appliances",70,"🍳","Simple cooking for hostel rooms."],
["Electric Kettle",2,"Kitchen Appliances",30,"☕","Quick tea, coffee and instant meals."],
["Table Fan",2,"Fans & Heaters",50,"🌀","Beat the summer heat in your room."],
["Room Heater",2,"Fans & Heaters",90,"🔥","Stay warm through winter nights."],
["Bucket & Cleaning Kit",2,"Cleaning",20,"🧹","Mop, bucket and cleaning basics."],
["Foldable Storage Rack",2,"Storage",35,"🗄️","Extra shelf space for a small room."],
["Formal Blazer",3,"Formal Wear",150,"🧥","For interviews, presentations and farewell events."],
["Kurta / Sherwani Set",3,"Ethnic Wear",200,"👘","Festive and cultural-event outfits without buying."],
["Winter Jacket",3,"Winter Wear",120,"🧣","Warm jacket for trips and cold spells."],
["Lab Coat",3,"Lab Wear",25,"🥼","Clean lab coat for practical sessions."],
["Wrist Watch",3,"Watches & Accessories",60,"⌚","Smart-looking accessory for special occasions."],
["Cricket Bat & Kit",4,"Cricket",100,"🏏","Bat, pads and gloves for inter-hostel matches."],
["Badminton Racket Set",4,"Badminton",50,"🏸","Two rackets and shuttlecocks."],
["Football",4,"Football",30,"⚽","Match-quality football for a weekend game."],
["Dumbbell Set",4,"Gym",60,"🏋️","Adjustable dumbbells for room workouts."],
["Yoga Mat",4,"Yoga",15,"🧘","Non-slip mat for yoga and stretching."],
["Arduino Starter Kit",5,"Electronics Kits",90,"🤖","Board, sensors and wires for mini-projects."],
["Digital Multimeter",5,"Measuring Tools",35,"📟","Measure voltage, current and resistance."],
["Compound Microscope",5,"Microscopes",150,"🔬","For biology practicals and project observations."],
["Drawing Board",5,"Drawing Boards",40,"📋","A-size drawing board with T-square."],
["Soldering Iron Kit",5,"Soldering & Tools",45,"🔧","Soldering iron, stand and solder wire."],
["Travel Backpack",6,"Bags",70,"🎒","Spacious backpack for trips and treks."],
["Cabin Trolley Bag",6,"Trolleys",150,"🧳","Sturdy trolley for going home or short tours."],
["Trekking Boots",6,"Boots",110,"🥾","Grippy boots for hill treks and hikes."],
["2-Person Tent",6,"Tents",250,"⛺","Easy-pitch tent for camping trips."],
["Sleeping Bag",6,"Sleeping Gear",90,"🛌","Warm sleeping bag for outdoor nights."],
["Gaming Console",7,"Consoles",400,"🎮","Console for weekend gaming with friends."],
["Wireless Controller",7,"Controllers",60,"🕹️","Extra controller for multiplayer fun."],
["Board Game Pack",7,"Board Games",40,"🎲","Fun group games for hostel evenings."],
["Acoustic Guitar",7,"Musical Instruments",120,"🎸","Try or perform without buying a guitar."]
];
const items=raw.map((r,i)=>({id:i+1,name:r[0],category:CATS[r[1]].name,sub:r[2],price:r[3],emoji:r[4],desc:r[5],rating:(4.5+((i*7)%5)/10).toFixed(1)}));
let selected=null;
let favorites=JSON.parse(localStorage.getItem("cr_favorites")||"[]");
const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function buildCategories(){
 $("categoryGrid").innerHTML=CATS.map((c,i)=>`<div class="category" id="cat${i}" onclick="openCategory(${i})"><div class="ico">${c.ico}</div><h3>${esc(c.name)}</h3><p>${esc(c.tag)}</p></div>`).join("");
 $("categoryFilter").innerHTML='<option value="All">All categories</option>'+CATS.map(c=>`<option value="${esc(c.name)}">${esc(c.name)}</option>`).join("");
}
function openCategory(i){
 const c=CATS[i],panel=$("subPanel");
 document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));$("cat"+i).classList.add("active");
 {
  panel.innerHTML=`<div class="sub-head"><h3>${c.ico} ${esc(c.name)}</h3><button class="sub-close" onclick="closeSubPanel()" aria-label="Close">×</button></div><p class="sub-note">Pick a type to see what's available:</p><div class="chips"><button class="chip chip-all" onclick="pickSub(${i},'')">View all</button>${c.subs.map((s,j)=>`<button class="chip" onclick="pickSub(${i},${j})">${esc(s)}</button>`).join("")}</div>`;
 }
 panel.classList.add("show");panel.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function closeSubPanel(){$("subPanel").classList.remove("show");document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));}
function pickSub(i,j){
 const c=CATS[i];$("categoryFilter").value=c.name;fillSubSelect();
 $("subFilter").value=(j===""?"All":c.subs[j]);
 $("search").value="";renderProducts();$("catalog").scrollIntoView({behavior:"smooth"});
}
function fillSubSelect(){
 const c=CATS.find(x=>x.name===$("categoryFilter").value),sel=$("subFilter");
 sel.innerHTML='<option value="All">All types</option>'+(c?c.subs.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join(""):"");
 sel.disabled=!c;
}
function onCategoryChange(){fillSubSelect();renderProducts();}
function renderProducts(){
 const q=$("search").value.toLowerCase(),cat=$("categoryFilter").value,sub=$("subFilter").value,price=$("priceFilter").value,sort=$("sort").value;
 let list=items.filter(x=>(x.name+" "+x.category+" "+x.sub+" "+x.desc).toLowerCase().includes(q)&&(cat==="All"||x.category===cat)&&(sub==="All"||x.sub===sub)&&(price==="all"||(price==="under200"&&x.price<200)||(price==="200to500"&&x.price>=200&&x.price<=500)||(price==="above500"&&x.price>500)));
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);
 const root=$("products");
 if(!list.length){root.innerHTML='<div class="empty">No equipment matches your search. Try changing the filters.</div>';return;}
 root.innerHTML=list.map(x=>`<article class="product"><div class="product-img"><span class="emoji" aria-hidden="true">${x.emoji}</span><span class="pill">${esc(x.sub)}</span><button class="heart ${favorites.includes(x.id)?"active":""}" onclick="toggleFavorite(${x.id})" aria-label="Add to wishlist">${favorites.includes(x.id)?"♥":"♡"}</button></div><div class="product-body"><span class="product-type">${esc(x.category)}</span><h3>${esc(x.name)}</h3><p class="product-desc">${esc(x.desc)}</p><div class="rating">★ ${x.rating} <span style="color:#9aa2b1">· Demo rating</span></div><div class="product-bottom"><div class="price">₹${x.price}<small> / day</small></div><button class="rent" onclick="book(${x.id})">Rent now →</button></div></div></article>`).join("");
}
function resetFilters(){$("search").value="";$("categoryFilter").value="All";fillSubSelect();$("priceFilter").value="all";$("sort").value="featured";renderProducts();}
buildCategories();fillSubSelect();
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("cr_favorites",JSON.stringify(favorites));renderProducts();toast(favorites.includes(id)?"Added to wishlist":"Removed from wishlist");}
function showModal(id){document.getElementById(id==="login"?"loginModal":id==="register"?"registerModal":id).classList.add("show");}
function hideModal(id){document.getElementById(id).classList.remove("show");}
function switchModal(a,b){hideModal(a);showModal(b.replace("Modal",""));}
function book(id){selected=items.find(x=>x.id===id);document.getElementById("selectedName").textContent=selected.name+" · ₹"+selected.price+" per day";document.getElementById("startDate").value="";document.getElementById("endDate").value="";document.getElementById("totalPrice").textContent="Estimated total: ₹0";const today=new Date().toISOString().slice(0,10);document.getElementById("startDate").min=today;document.getElementById("endDate").min=today;showModal("bookingModal");}
function calculateTotal(){if(!selected)return;let s=document.getElementById("startDate").value,e=document.getElementById("endDate").value;if(!s||!e)return;let days=Math.round((new Date(e)-new Date(s))/86400000)+1;if(days<1){document.getElementById("totalPrice").textContent="Please choose a valid return date.";return;}document.getElementById("totalPrice").textContent=`Estimated total: ₹${days*selected.price} · ${days} day(s)`;}
function submitBooking(){let name=document.getElementById("studentName").value.trim(),email=document.getElementById("studentEmail").value.trim(),s=document.getElementById("startDate").value,e=document.getElementById("endDate").value;if(!name||!email||!s||!e){toast("Please complete all booking fields.");return;}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast("Enter a valid email address.");return;}let days=Math.round((new Date(e)-new Date(s))/86400000)+1;if(days<1){toast("Return date must be on or after start date.");return;}const booking={id:Date.now(),name,email,equipment:selected.name,start:s,end:e,days,total:days*selected.price,status:"Awaiting payment choice"};localStorage.setItem("cr_pending_booking",JSON.stringify(booking));window.location.href="payment.html";}
function register(){let name=document.getElementById("regName").value.trim(),email=document.getElementById("regEmail").value.trim().toLowerCase(),pass=document.getElementById("regPassword").value;if(!name||!email||!pass){toast("Please fill all fields.");return;}if(pass.length<6){toast("Password must contain at least 6 characters.");return;}let users=JSON.parse(localStorage.getItem("cr_users")||"[]");if(users.some(u=>u.email===email)){toast("Email is already registered.");return;}users.push({name,email,pass});localStorage.setItem("cr_users",JSON.stringify(users));hideModal("registerModal");toast("Demo account created. You can log in now.");}
function login(){let email=document.getElementById("loginEmail").value.trim().toLowerCase(),pass=document.getElementById("loginPassword").value,users=JSON.parse(localStorage.getItem("cr_users")||"[]"),u=users.find(x=>x.email===email&&x.pass===pass);if(!u){toast("Incorrect email or password.");return;}localStorage.setItem("cr_current",JSON.stringify({name:u.name,email:u.email}));hideModal("loginModal");toast("Welcome, "+u.name+"!");}
function toggleFaq(btn){let item=btn.parentElement;item.classList.toggle("open");btn.querySelector("span").textContent=item.classList.contains("open")?"−":"＋";}
function subscribe(e){e.preventDefault();let email=document.getElementById("newsEmail").value;toast("Thanks! Demo subscription received for "+email);e.target.reset();}
function toast(msg){let el=document.getElementById("toast");el.textContent=msg;el.style.display="block";clearTimeout(window.toastTimeout);window.toastTimeout=setTimeout(()=>el.style.display="none",3200);}
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show");}));
document.querySelectorAll(".navlinks a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navlinks").classList.remove("open")));
renderProducts();

// Booking form accepts any normal email (Gmail, Outlook, college, etc.)
(function(){
 const inp=document.getElementById("studentEmail");
 if(inp){
  inp.placeholder="yourname@gmail.com";
  const label=inp.parentElement.querySelector("label");
  if(label)label.textContent="Email";
 }
})();

// ---- Payment (demo only: nothing is charged, card details are never stored) ----
function payMethod(){return document.querySelector('input[name="payMethod"]:checked').value;}
function changePay(){const m=payMethod();$("payUpi").style.display=m==="upi"?"block":"none";$("payCard").style.display=m==="card"?"block":"none";$("payCash").style.display=m==="cash"?"block":"none";}
function resetPayment(){document.querySelector('input[name="payMethod"][value="upi"]').checked=true;["upiId","cardNumber","cardExpiry","cardCvv"].forEach(id=>$(id).value="");changePay();}
function formatCard(el){el.value=el.value.replace(/\D/g,"").slice(0,19).replace(/(.{4})/g,"$1 ").trim();}
function formatExpiry(el){let v=el.value.replace(/\D/g,"").slice(0,4);if(v.length>2)v=v.slice(0,2)+"/"+v.slice(2);el.value=v;}
function validatePayment(){
 const m=payMethod();
 if(m==="cash")return{label:"Pay at pickup",status:"Due at pickup"};
 if(m==="upi"){
  if(!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test($("upiId").value.trim())){toast("Enter a valid UPI ID, like name@bank.");return null;}
  return{label:"UPI",status:"Paid (demo)"};
 }
 const num=$("cardNumber").value.replace(/\s/g,""),exp=$("cardExpiry").value,cvv=$("cardCvv").value;
 if(!/^\d{13,19}$/.test(num)){toast("Enter a valid card number.");return null;}
 const m2=exp.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
 if(!m2){toast("Enter expiry as MM/YY.");return null;}
 const now=new Date();if(2000+ +m2[2]<now.getFullYear()||(2000+ +m2[2]===now.getFullYear()&&+m2[1]<now.getMonth()+1)){toast("This card has expired.");return null;}
 if(!/^\d{3,4}$/.test(cvv)){toast("Enter a valid CVV.");return null;}
 return{label:"Card ending "+num.slice(-4),status:"Paid (demo)"};
}

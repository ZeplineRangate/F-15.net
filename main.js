/* NAVIGATION TOGGLE */

const toggle=document.getElementById("menu-toggle")
const nav=document.getElementById("navLinks")

if(toggle){
toggle.addEventListener("click",()=>{
nav.classList.toggle("open")
})
}

/* BACK TO TOP */

const topBtn=document.getElementById("topBtn")

window.addEventListener("scroll",()=>{
if(window.scrollY>300){
topBtn.style.display="block"
}else{
topBtn.style.display="none"
}
})

if(topBtn){
topBtn.addEventListener("click",()=>{
window.scrollTo({top:0,behavior:"smooth"})
})
}

/* DATA */

const aircraft=[
{name:"F-15A",year:1974,role:"Air Superiority"},
{name:"F-15C",year:1979,role:"Air Superiority"},
{name:"F-15E",year:1989,role:"Strike"},
{name:"F-15EX",year:2021,role:"Multirole"},
{name:"F-15J",year:1981,role:"Interceptor"},
{name:"F-15K",year:2005,role:"Strike"}
]

const container=document.getElementById("aircraftContainer")

function renderAircraft(list){

if(!container) return

container.innerHTML=""

list.forEach(a=>{

const card=document.createElement("div")

card.innerHTML=`
<h3>${a.name}</h3>
<p>Year: ${a.year}</p>
<p>Role: ${a.role}</p>
`

container.appendChild(card)

})

}

renderAircraft(aircraft)

/* SEARCH FILTER */

const searchInput=document.getElementById("searchInput")

if(searchInput){

searchInput.addEventListener("input",()=>{

const filtered=aircraft.filter(a=>
a.name.toLowerCase().includes(searchInput.value.toLowerCase())
)

renderAircraft(filtered)

})

}

/* ACCORDION */

document.querySelectorAll(".accordion-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const content=btn.nextElementSibling

document.querySelectorAll(".accordion-content").forEach(c=>{
if(c!==content) c.style.display="none"
})

content.style.display=
content.style.display==="block" ? "none":"block"

})

})

/* FORM VALIDATION */

const form=document.getElementById("loginForm")

if(form){

form.addEventListener("submit",(e)=>{

let valid=true

const username=document.getElementById("username")
const email=document.getElementById("email")
const message=document.getElementById("message")

const userError=document.getElementById("userError")
const emailError=document.getElementById("emailError")
const msgError=document.getElementById("msgError")

userError.textContent=""
emailError.textContent=""
msgError.textContent=""

if(username.value===""){
userError.textContent="Username required"
valid=false
}

if(!email.value.includes("@")){
emailError.textContent="Valid email required"
valid=false
}

if(message.value.length<10){
msgError.textContent="Message must be 10 characters"
valid=false
}

if(!valid){
e.preventDefault()
}else{
document.getElementById("successMessage").textContent=
"Thanks! We'll get back to you soon."
e.preventDefault()
}

})

}

/* FETCH API */

async function getQuote(){

try{

const res=await fetch("https://api.quotable.io/random")
const data=await res.json()

const quote=document.getElementById("quote")

if(quote){
quote.textContent=`"${data.content}" — ${data.author}`
}

}catch{

const quote=document.getElementById("quote")

if(quote){
quote.textContent="Failed to load quote."
}

}

}

getQuote()

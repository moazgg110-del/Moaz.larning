const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const STORAGE_KEY = "eduworld_demo_v1";

const defaultLessons = [
 {id:1,subject:"science",type:"lesson",title:"مدخل إلى العلوم",desc:"تعرف على طريقة التفكير العلمي والملاحظة والاستنتاج.",video:""},
 {id:2,subject:"science",type:"experiment",title:"محاكاة التجربة العلمية",desc:"شاهد نتائج البحث عن تجارب ومحاكاة علمية تعليمية مناسبة للدرس.",video:"https://www.youtube.com/results?search_query=محاكاة+تجارب+علوم+الصف+الثالث+الإعدادي"},
 {id:3,subject:"science",type:"summary",title:"ملخص ومراجعة العلوم",desc:"مساحة لمراجعة أهم المصطلحات والأفكار قبل الاختبار.",video:""},
 {id:4,subject:"studies",type:"lesson",title:"مدخل إلى الدراسات الاجتماعية",desc:"تعرف على الجغرافيا والتاريخ ومصادر دراسة كل منهما.",video:""},
 {id:5,subject:"studies",type:"experiment",title:"استكشاف الخرائط تفاعليًا",desc:"شاهد شرحًا مرئيًا للخرائط ومهارات قراءة الرموز والاتجاهات.",video:"https://www.youtube.com/results?search_query=شرح+مهارات+الخريطة+الصف+الثالث+الإعدادي"},
 {id:6,subject:"studies",type:"summary",title:"ملخص ومراجعة الدراسات",desc:"ملخص قابل للتوسعة وفق ترتيب كتاب الوزارة.",video:""}
];

// أسئلة تدريبية تمهيدية وليست بديلًا عن أسئلة الكتاب الرسمي. يمكن للمدير إضافة أسئلة المنهج.
const questions = [
 {s:"science",q:"ما الأداة التي تُستخدم عادةً لقياس درجة الحرارة؟",a:["الترمومتر","الميزان","المسطرة","الساعة"],c:0,e:"الترمومتر هو أداة قياس درجة الحرارة."},
 {s:"science",q:"أي مما يلي يُعد مصدرًا طبيعيًا للضوء؟",a:["القمر","الشمس","المرآة","الورق"],c:1,e:"الشمس مصدر طبيعي للضوء، أما المرآة فتعكسه."},
 {s:"science",q:"ما الحالة التي يكون فيها للمادة حجم وشكل ثابتان؟",a:["الغازية","السائلة","الصلبة","البلازما"],c:2,e:"المادة الصلبة لها شكل وحجم ثابتان غالبًا."},
 {s:"science",q:"أي الأجهزة التالية يُستخدم لمشاهدة الأجسام الدقيقة؟",a:["التلسكوب","الميكروسكوب","البارومتر","البوصلة"],c:1,e:"الميكروسكوب يكبر الأجسام الدقيقة."},
 {s:"science",q:"ما الوحدة الأساسية لقياس شدة التيار الكهربائي؟",a:["الفولت","الأوم","الأمبير","الوات"],c:2,e:"الأمبير هو وحدة قياس شدة التيار الكهربائي."},
 {s:"science",q:"أي مما يلي مثال على تغير كيميائي؟",a:["انصهار الثلج","تقطيع الورق","صدأ الحديد","تبخر الماء"],c:2,e:"صدأ الحديد ينتج عنه مادة جديدة."},
 {s:"science",q:"ما الغاز الذي تحتاجه معظم الكائنات الحية في عملية التنفس؟",a:["الأكسجين","النيتروجين","الهيليوم","الهيدروجين"],c:0,e:"تستخدم معظم الكائنات الحية الأكسجين في التنفس الهوائي."},
 {s:"science",q:"أي جزء من النبات يمتص الماء والأملاح غالبًا؟",a:["الزهرة","الجذر","الثمرة","الورقة"],c:1,e:"الجذر يمتص الماء والأملاح من التربة."},
 {s:"science",q:"ماذا يحدث للظل عندما يقترب الجسم من مصدر الضوء؟",a:["قد يكبر","يختفي دائمًا","يتحول إلى ضوء","لا يتغير مطلقًا"],c:0,e:"يتغير حجم الظل بحسب المسافات بين مصدر الضوء والجسم والسطح."},
 {s:"science",q:"أي مما يلي يُعد موصلًا جيدًا للكهرباء؟",a:["الخشب الجاف","البلاستيك","النحاس","الزجاج"],c:2,e:"النحاس من الفلزات الجيدة التوصيل للكهرباء."},
 {s:"science",q:"ما وظيفة القلب الأساسية؟",a:["هضم الطعام","ضخ الدم","تنقية الهواء","تكوين العظام"],c:1,e:"يضخ القلب الدم إلى أجزاء الجسم."},
 {s:"science",q:"أي نوع من الطاقة يرتبط بحركة الجسم؟",a:["طاقة حركية","طاقة كيميائية فقط","طاقة نووية فقط","طاقة وضع فقط"],c:0,e:"الطاقة الحركية هي الطاقة التي يمتلكها الجسم بسبب حركته."},
 {s:"science",q:"أي مما يلي يحافظ على التنوع الحيوي؟",a:["تدمير المواطن الطبيعية","الصيد الجائر","حماية المواطن الطبيعية","التلوث"],c:2,e:"حماية المواطن الطبيعية تساعد على بقاء الأنواع."},
 {s:"science",q:"ما الجهاز المستخدم لقياس الضغط الجوي؟",a:["البارومتر","الترمومتر","الأميتر","الفولتميتر"],c:0,e:"البارومتر يقيس الضغط الجوي."},
 {s:"science",q:"أي مما يلي خليط متجانس؟",a:["الرمل والماء","الزيت والماء","محلول الملح","برادة الحديد والكبريت"],c:2,e:"يبدو محلول الملح متجانسًا عند توزيع الملح في الماء."},
 {s:"studies",q:"ما العلم الذي يهتم بدراسة سطح الأرض والظواهر الطبيعية والبشرية؟",a:["التاريخ","الجغرافيا","الكيمياء","الأدب"],c:1,e:"الجغرافيا تدرس سطح الأرض والظواهر الطبيعية والبشرية."},
 {s:"studies",q:"ما الأداة التي تساعد على تحديد الاتجاهات؟",a:["البوصلة","الترمومتر","المجهر","الميزان"],c:0,e:"تساعد البوصلة على تحديد الاتجاهات."},
 {s:"studies",q:"ما المقصود بالمقياس على الخريطة؟",a:["عنوان الخريطة","العلاقة بين المسافة على الخريطة والحقيقة","ألوان الخريطة","اتجاه الشمال"],c:1,e:"مقياس الرسم يوضح العلاقة بين المسافات على الخريطة وما يقابلها على الطبيعة."},
 {s:"studies",q:"أي مصدر يُعد من المصادر التاريخية المكتوبة؟",a:["النقوش والوثائق","الأغاني الحديثة فقط","الطقس","التضاريس"],c:0,e:"الوثائق والنقوش من المصادر التي يستعين بها المؤرخ."},
 {s:"studies",q:"ما الاتجاه المقابل للشرق؟",a:["الشمال","الجنوب","الغرب","الشمال الشرقي"],c:2,e:"الغرب هو الاتجاه المقابل للشرق."},
 {s:"studies",q:"ما فائدة مفتاح الخريطة؟",a:["تحديد عمر الخريطة","تفسير الرموز والألوان","قياس الحرارة","معرفة عدد السكان بدقة دائمًا"],c:1,e:"يوضح مفتاح الخريطة معنى الرموز والألوان المستخدمة."},
 {s:"studies",q:"أي من الآتي يُعد مظهرًا من مظاهر السطح؟",a:["الجبال","العملة","اللغة","الصناعة"],c:0,e:"الجبال من مظاهر السطح الطبيعية."},
 {s:"studies",q:"ما الترتيب الزمني للأحداث التاريخية؟",a:["من الأحدث للأقدم دائمًا","وفق تسلسل وقوعها","حسب الأهمية فقط","بلا ترتيب"],c:1,e:"يساعد التسلسل الزمني على فهم تطور الأحداث."},
 {s:"studies",q:"ما المقصود بالكثافة السكانية؟",a:["عدد السكان بالنسبة للمساحة","عدد المدن فقط","مساحة الدولة","عدد الأنهار"],c:0,e:"الكثافة السكانية هي عدد السكان بالنسبة لوحدة المساحة."},
 {s:"studies",q:"أي من الآتي يُعد موردًا طبيعيًا؟",a:["الماء","السيارة","الهاتف","الآلة الحاسبة"],c:0,e:"الماء من الموارد الطبيعية المهمة."},
 {s:"studies",q:"لماذا نستخدم خطوط الطول ودوائر العرض؟",a:["لتحديد المواقع","لقياس الوزن","لتحديد نوع الصخور فقط","لحساب أعمار الأشخاص"],c:0,e:"تساعد شبكة الإحداثيات في تحديد المواقع على سطح الأرض."},
 {s:"studies",q:"ما المقصود بالهجرة؟",a:["انتقال السكان من مكان إلى آخر","زيادة الأمطار","تغير الفصول","تكوين الجبال"],c:0,e:"الهجرة هي انتقال الأفراد من مكان إلى آخر للإقامة المؤقتة أو الدائمة."},
 {s:"studies",q:"أي مما يلي يُعد نشاطًا اقتصاديًا؟",a:["الزراعة","دوران الأرض","كسوف الشمس","تكوّن الصخور"],c:0,e:"الزراعة نشاط اقتصادي يعتمد على استغلال الأرض."},
 {s:"studies",q:"ما أهمية دراسة التاريخ؟",a:["فهم الماضي والاستفادة منه","التنبؤ بكل الأحداث بدقة","إلغاء الحاضر","تغيير الحقائق"],c:0,e:"تساعد دراسة التاريخ على فهم الماضي واستخلاص الدروس."}
];

let state = loadState();
let activeSubject = "all", activeFilter = "all", quizRun = null, quizIndex = 0, quizScore = 0, answered = false;

function loadState(){
 try{return {...{name:"طالب جديد",points:0,completed:[],tests:0,lessons:defaultLessons},...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")};}
 catch{return {name:"طالب جديد",points:0,completed:[],tests:0,lessons:defaultLessons};}
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));renderStats();}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300);}
function subjectName(s){return s==="science"?"العلوم":"الدراسات الاجتماعية";}
function typeName(t){return t==="experiment"?"تجربة / محاكاة":t==="summary"?"ملخص":"درس";}
function renderStats(){
 $("#userNameTop").textContent=state.name||"طالب جديد";
 $("#completedCount").textContent=state.completed.length;
 $("#pointsCount").textContent=state.points;
 $("#testsCount").textContent=state.tests;
 $("#scienceLessonsCount").textContent=state.lessons.filter(x=>x.subject==="science").length;
 $("#studiesLessonsCount").textContent=state.lessons.filter(x=>x.subject==="studies").length;
 $("#scienceQuestionsCount").textContent=questions.filter(x=>x.s==="science").length;
 $("#studiesQuestionsCount").textContent=questions.filter(x=>x.s==="studies").length;
 $("#questionBankCount").textContent=questions.length;
 const rank=state.points>=100?"1":state.points>=50?"2":"—";$("#rankCount").textContent=rank;
}
function renderLessons(){
 const list=state.lessons.filter(x=>(activeSubject==="all"||x.subject===activeSubject)&&(activeFilter==="all"||x.type===activeFilter));
 $("#learningTitle").textContent=activeSubject==="all"?"الدروس والتجارب":`ركن ${subjectName(activeSubject)}`;
 $("#lessonGrid").innerHTML=list.map(x=>`<article class="lesson-card"><div class="lesson-top"><span class="lesson-icon">${x.type==="experiment"?"🧪":x.type==="summary"?"📝":x.subject==="science"?"🔬":"🗺️"}</span><span class="tag ${x.subject==="science"?"tag-green":"tag-blue"}">${subjectName(x.subject)}</span></div><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.desc||"محتوى تعليمي")}</p><div class="lesson-actions"><button class="small-btn filled" data-complete="${x.id}">✓ تمّت المذاكرة</button>${x.video?`<a class="small-btn" href="${safeURL(x.video)}" target="_blank" rel="noopener">▶ شاهد الفيديو</a>`:""}</div></article>`).join("")||'<p class="muted">لا يوجد محتوى في هذا القسم حتى الآن.</p>';
 $$("[data-complete]").forEach(b=>b.addEventListener("click",()=>{const id=Number(b.dataset.complete);if(!state.completed.includes(id)){state.completed.push(id);state.points+=5;save();toast("أحسنت! حصلت على 5 نقاط ⭐");b.textContent="✓ مكتمل";}else toast("هذا المحتوى مكتمل بالفعل");}));
}
function renderLeaderboard(){
 const rows=[{name:"سارة أحمد",points:180},{name:"عمر خالد",points:150},{name:"مريم محمد",points:125},{name:state.name||"أنت",points:state.points,you:true}].sort((a,b)=>b.points-a.points);
 $("#leaderboardList").innerHTML=rows.map((r,i)=>`<div class="leader-row ${r.you?"you":""}"><span class="medal">${["🥇","🥈","🥉","🏅"][i]||"⭐"}</span><span>${escapeHTML(r.name)}</span><strong>${r.points} نقطة</strong></div>`).join("");
}
function renderVideos(){
 const vids=[
  ["تجارب العلوم للمرحلة الإعدادية","science experiments middle school Arabic"],
  ["محاكاة الضوء والانعكاس","light reflection experiment simulation Arabic"],
  ["محاكاة الكهرباء والدوائر","electric circuits simulation Arabic"]
 ];
 $("#videoGrid").innerHTML=vids.map(v=>`<article class="video-card"><span class="play-icon">▶</span><div><b>${v[0]}</b><small>يفتح نتائج فيديوهات تعليمية</small><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(v[1])}" target="_blank" rel="noopener">افتح الفيديوهات ←</a></div></article>`).join("");
}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function safeURL(url){try{const u=new URL(url,location.href);return ["http:","https:"].includes(u.protocol)?u.href:"#";}catch{return "#";}}
function startQuiz(){
 quizRun=[...questions].sort(()=>Math.random()-.5).slice(0,15);quizIndex=0;quizScore=0;answered=false;
 $("#quizBox").classList.remove("hidden");showQuestion();
 $("#quizBox").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function showQuestion(){
 const box=$("#quizBox");
 if(quizIndex>=quizRun.length){
  const earned=quizScore*3;state.points+=earned;state.tests++;save();renderLeaderboard();
  box.innerHTML=`<h3>انتهى الاختبار! 🎉</h3><p>نتيجتك: <b>${quizScore} من ${quizRun.length}</b></p><p class="muted">حصلت على ${earned} نقطة إضافية.</p><button class="primary-btn full" id="againBtn">اختبار جديد</button>`;
  $("#againBtn").onclick=startQuiz;return;
 }
 const q=quizRun[quizIndex];answered=false;
 box.innerHTML=`<div class="lesson-top"><span class="tag tag-blue">${subjectName(q.s)}</span><small class="muted">السؤال ${quizIndex+1} من ${quizRun.length}</small></div><h3>${q.q}</h3><div>${q.a.map((a,i)=>`<button class="answer-option" data-answer="${i}">${["أ","ب","ج","د"][i]}) ${a}</button>`).join("")}</div><div id="feedback"></div><button class="primary-btn full hidden" id="nextQ">السؤال التالي</button>`;
 $$("[data-answer]",box).forEach(btn=>btn.onclick=()=>chooseAnswer(Number(btn.dataset.answer)));
}
function chooseAnswer(index){
 if(answered)return;answered=true;const q=quizRun[quizIndex];const correct=index===q.c;if(correct)quizScore++;
 $$("[data-answer]").forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct");else if(i===index)b.classList.add("wrong");});
 $("#feedback").innerHTML=`<div class="feedback" style="background:${correct?"#e9f8f0":"#fff0ed"}">${correct?"إجابة صحيحة! أحسنت 🌟":"ليست الإجابة الصحيحة."} ${q.e}</div>`;
 $("#nextQ").classList.remove("hidden");$("#nextQ").onclick=()=>{quizIndex++;showQuestion();};
}
$("#lessonForm").addEventListener("submit",e=>{
 e.preventDefault();
 const item={id:Date.now(),title:$("#newTitle").value.trim(),subject:$("#newSubject").value,type:$("#newType").value,desc:$("#newDescription").value.trim(),video:$("#newVideo").value.trim()};
 if(item.video&&!safeURL(item.video).startsWith("http")){toast("رابط الفيديو غير صالح");return;}
 state.lessons.unshift(item);save();renderLessons();e.target.reset();toast("تمت إضافة المحتوى على هذا الجهاز");
});
$("#startQuizBtn").onclick=startQuiz;
$("#backSubjects").onclick=()=>{activeSubject="all";renderLessons();};
$$("[data-subject]").forEach(b=>b.onclick=()=>{activeSubject=b.dataset.subject;activeFilter="all";$$(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter==="all"));renderLessons();$("#learningArea").scrollIntoView({behavior:"smooth"});});
$$(".filter").forEach(b=>b.onclick=()=>{activeFilter=b.dataset.filter;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));renderLessons();});
$$("[data-scroll]").forEach(b=>b.onclick=()=>$("#"+b.dataset.scroll).scrollIntoView({behavior:"smooth"}));
$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("eduworld_dark",document.body.classList.contains("dark")?"1":"0");};
$("#profileBtn").onclick=()=>{const name=prompt("اكتب اسمك الذي سيظهر في المنصة:",state.name);if(name&&name.trim()){state.name=name.trim().slice(0,30);save();renderLeaderboard();toast("تم تحديث الاسم");}};
if(localStorage.getItem("eduworld_dark")==="1")document.body.classList.add("dark");
renderStats();renderLessons();renderLeaderboard();renderVideos();

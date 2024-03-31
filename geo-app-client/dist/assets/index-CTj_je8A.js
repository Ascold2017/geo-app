import{j as e,f as C,e as N}from"./index-_tGX61Hg.js";import{T as d,b,u as v}from"./taskCard-DkDUiVM1.js";import{f as w}from"./date-BbYShKwW.js";import{A as R}from"./AppSpin-C7d-5P7N.js";const y=({checked:t,label:s,onChecked:l,...a})=>e.jsx("div",{className:`form-control ${a.className||""}`,...a,children:e.jsxs("label",{className:"label cursor-pointer",children:[e.jsx("span",{className:"label-text mr-2",children:s}),e.jsx("input",{type:"checkbox",checked:t,onChange:n=>l(n.target.checked),className:"checkbox"})]})}),S=({items:t,renderItem:s,...l})=>e.jsx("div",{className:`flex flex-col space-y-4 ${l.className||""}`,...l,children:t.map((a,n)=>e.jsx("div",{className:"app-card mb-3",children:s(a)},n))}),x=({value:t,onChanged:s,items:l,buttons:a,className:n})=>e.jsx("div",{className:`flex items-center ${n||""}`,children:l.map(o=>e.jsxs("label",{className:"flex items-center mr-3",children:[e.jsx("input",{className:`${a?"btn":"radio"} mr-3`,type:"radio",value:o.value,checked:t===o.value,"aria-label":o.label,onChange:()=>s(o.value)}),!a&&o.label]},o.value))}),m=C(t=>({isShowCompleted:!1,tasksType:d.WORD,setTasksType:s=>t({tasksType:s}),setIsShowCompleted:s=>t({isShowCompleted:s})})),P=t=>{const{isShowCompleted:s,tasksType:l}=m();return t.filter(a=>{const n=s?a.isCompleted:!a.isCompleted,o=a.type===l;return n&&o})};function D(){const{tasksType:t,setTasksType:s,isShowCompleted:l,setIsShowCompleted:a}=m();return e.jsxs(e.Fragment,{children:[e.jsx(x,{className:"mb-3",buttons:!0,items:[{label:"Буквы",value:d.LETTER},{label:"Слова",value:d.WORD},{label:"Упражнения",value:d.SENTENCE}],value:t,onChanged:s}),e.jsx(x,{value:l,onChanged:a,items:[{label:"Вы изучаете",value:!1},{label:"Изученные",value:!0}]})]})}const E=async(t,s)=>(await N({url:`/learn/complete-task/${t}`,method:"POST",data:{value:s}})).data,I=()=>{async function t(s,l){await E(s,l)}return{checkCompletedTask:t}};function i({title:t,hideTitle:s,hideRepeatTime:l,data:a,range:n,onRefresh:o}){const{checkCompletedTask:j}=I(),p=r=>r*60*60*1e3,f=(r,c)=>u=>{const g=r!==null?+new Date(u.nextRepeat)>+new Date+p(r):!0,k=c!==null?+new Date(u.nextRepeat)<+new Date+p(c):!0;return g&&k},T=(r,c)=>{j(r,c),o()},h=a.filter(f(n[0],n[1]));return h.length?e.jsxs(e.Fragment,{children:[!s&&e.jsx("h4",{className:"app-title-2 text-center py-3",children:t}),e.jsx(S,{className:"mb-3",items:h,renderItem:r=>e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"mr-auto",children:[r.ka," [",r.transcription,"]"]}),e.jsxs("div",{children:["Повторов: ",r.repeated]}),!r.isCompleted&&!l&&e.jsxs("div",{className:"ml-3",children:["Ближайший: ",w(r.nextRepeat)]}),e.jsx(y,{className:"ml-3",label:"Я знаю это",checked:r.isCompleted,onChecked:c=>T(r.id,c)})]})})]}):null}function L(){const{progressTasks:t,getProgress:s}=b(),{loading:l}=v(s),a=P(t),{isShowCompleted:n}=m();return e.jsxs("section",{className:"max-w-3xl mx-auto",children:[e.jsx("div",{className:"flex flex-col items-center mb-3",children:e.jsx(D,{})}),e.jsx(R,{spinning:l}),!a.length&&e.jsx("h4",{className:"app-title-2 text-center",children:"У вас нет пока упражнений/слов"}),e.jsx(i,{title:"Пора повторить",hideRepeatTime:!0,hideTitle:n,range:[null,0],data:a,onRefresh:s}),e.jsx(i,{title:"В течении получаса",hideTitle:n,range:[0,.5],data:a,onRefresh:s}),e.jsx(i,{title:"В течении дня",hideTitle:n,range:[.5,12],data:a,onRefresh:s}),e.jsx(i,{title:"Завтра",hideTitle:n,range:[12,24],data:a,onRefresh:s}),e.jsx(i,{title:"Не скоро",hideTitle:n,range:[24,null],data:a,onRefresh:s})]})}function O(){return e.jsx(L,{})}export{O as default};

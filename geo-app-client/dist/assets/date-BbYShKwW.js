const e=(o,s)=>{const t=new Date(o);return`${(s?["Воскресень","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"])[t.getDay()]}, ${t.getHours()}:${t.getMinutes()}`};export{e as f};

import{u as r}from"./index-1O09-V8y.js";import{f as c,e as n}from"./index-_tGX61Hg.js";const l=c(o=>({isAuth:!1,checkAuth:async()=>{const t=r.getState().getCurrentUser,e=await t();return o({isAuth:e}),e},signIn:async(t,e)=>{const a=r.getState().setUser,s=(await n.post("/auth/sign-in",{login:t,password:e})).data;o({isAuth:!0}),a(s),localStorage.setItem("token",s.token)},signUp:async(t,e)=>{const a=r.getState().setUser,s=(await n.post("/auth/sign-up",{login:t,password:e})).data;o({isAuth:!0}),a(s),localStorage.setItem("token",s.token)},logout:()=>{const t=r.getState().resetUser;localStorage.removeItem("token"),o({isAuth:!1}),t()}}));export{l as u};

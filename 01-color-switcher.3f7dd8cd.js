const t=t=>document.querySelector(t),o=document.body;let a=!1,n=null;function e(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}function d(o){clearInterval(n),a=!1,t("button[data-stop]").disabled=!a,t("button[data-start]").disabled=a}d(),t("button[data-start]").addEventListener("click",(function(d){a=!0,t("button[data-start]").disabled=a,t("button[data-stop]").disabled=!a,n=setInterval((()=>{o.style.backgroundColor=e(),console.log(o.style.backgroundColor=e())}),1e3)})),t("button[data-stop]").addEventListener("click",d);
//# sourceMappingURL=01-color-switcher.3f7dd8cd.js.map
(this["webpackJsonptt-scores"]=this["webpackJsonptt-scores"]||[]).push([[0],{21:function(e,t,a){e.exports={addGame:"AddGame_addGame__SXKXH",label:"AddGame_label__1WXOB",submit:"AddGame_submit__2cHjd",button:"AddGame_button__Sk9u9",demoWrapper:"AddGame_demoWrapper__1d-nE"}},53:function(e,t,a){e.exports=a(67)},58:function(e,t,a){},63:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),o=a.n(l),c=(a(58),a(47)),i=a(28),m=a(36),s=a.n(m);a(59);s.a.initializeApp({apiKey:"AIzaSyCzZBaZdVwZ9dj_wqJ2cum1LfXVh0ucEFk",authDomain:"tt-scores-1595920568034.firebaseapp.com",databaseURL:"https://tt-scores-1595920568034.firebaseio.com",projectId:"tt-scores-1595920568034",storageBucket:"tt-scores-1595920568034.appspot.com",messagingSenderId:"429581450020",appId:"1:429581450020:web:b9b8fe7c58c9bcc8ff91b1"});var u=s.a,d=(a(63),a(92)),p=a(103),E=a(101),f=a(102),b=a(21),v=a.n(b),h=["Cheezy","Consti","Marcel","Moritz","Simon"];function g(){var e=n.useState(""),t=Object(i.a)(e,2),a=t[0],r=t[1],l=n.useState(""),o=Object(i.a)(l,2),c=o[0],m=o[1],s=Object(d.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120,maxWidth:200,backgroundColor:"white",borderRadius:4},selectEmpty:{marginTop:e.spacing(2)}}}))();return n.createElement("div",{className:v.a.demoWrapper},n.createElement("div",{className:v.a.addGame},n.createElement("h2",{className:v.a.label},"Winner"),n.createElement("div",null),n.createElement("h2",{className:v.a.label},"Looser"),n.createElement(p.a,{variant:"outlined",className:s.formControl},n.createElement(E.a,{native:!0,value:a,onChange:function(e){return r(e.target.value)}},n.createElement("option",{value:""},"Select player"),h.filter((function(e){return!c||e!==c})).map((function(e,t){return n.createElement("option",{key:t,value:e},e)})))),n.createElement("h2",null,"VS"),n.createElement(p.a,{variant:"outlined",className:s.formControl},n.createElement(E.a,{native:!0,value:c,onChange:function(e){return m(e.target.value)}},n.createElement("option",{value:""},"Select player"),h.filter((function(e){return!a||e!==a})).map((function(e,t){return n.createElement("option",{key:t,value:e},e)})))),n.createElement("div",{className:v.a.submit},n.createElement(f.a,{className:v.a.button,color:"primary",variant:"contained",onClick:function(){var e={winner:a,looser:c,date:Date.now()};u.firestore().collection("games").add(e),r(""),m("")},disabled:!(a&&c)},"Save Game"))))}var w=a(96),S=a(97),_=a(98),k=a(99),y=a(100),j=Object(d.a)({table:{maxWidth:600,margin:"auto"}});function W(e){var t=e.games,a=j(),r=t.sort((function(e,t){return t.date-e.date}));return n.createElement(n.Fragment,null,n.createElement("h3",null,"latest games"),n.createElement(w.a,{className:a.table,size:"small","aria-label":"simple table"},n.createElement(S.a,null,n.createElement(_.a,null,n.createElement(k.a,null,n.createElement("b",null,"Date")),n.createElement(k.a,null,n.createElement("b",null,"Winner")),n.createElement(k.a,null,n.createElement("b",null,"Looser")))),n.createElement(y.a,null,r.map((function(e){return n.createElement(_.a,{key:e.date},n.createElement(k.a,{component:"th",scope:"row"},new Date(e.date).toLocaleString()),n.createElement(k.a,null,e.winner),n.createElement(k.a,null,e.looser))})))))}var C=function(){var e=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){u.firestore().collection("games").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(c.a)({},e.data())}));r(t)}))}),[]),a}();return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"TT-Scores"),r.a.createElement(g,null),r.a.createElement(W,{games:e}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[53,1,2]]]);
//# sourceMappingURL=main.c4e4ebc2.chunk.js.map
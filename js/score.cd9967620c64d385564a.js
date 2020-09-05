!function(e){var t={};function n(r){if(t[r])return t[r].exports;var E=t[r]={i:r,l:!1,exports:{}};return e[r].call(E.exports,E,E.exports,n),E.l=!0,E.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var E in e)n.d(r,E,function(t){return e[t]}.bind(null,E));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}({0:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"l",(function(){return E})),n.d(t,"p",(function(){return o})),n.d(t,"f",(function(){return _})),n.d(t,"e",(function(){return S})),n.d(t,"i",(function(){return A})),n.d(t,"j",(function(){return I})),n.d(t,"g",(function(){return R})),n.d(t,"h",(function(){return a})),n.d(t,"o",(function(){return D})),n.d(t,"s",(function(){return s})),n.d(t,"q",(function(){return d})),n.d(t,"c",(function(){return N})),n.d(t,"n",(function(){return f})),n.d(t,"d",(function(){return L})),n.d(t,"k",(function(){return l})),n.d(t,"a",(function(){return H})),n.d(t,"r",(function(){return U})),n.d(t,"m",(function(){return M}));const r=window.location.href.includes("dev")?"http://dev.com:9000":"https://marcinxkaminski.github.io/stay-alive-3d",E="stayaliveuseridkey",o={SCORE:"/score",GAME:"/game",AUTH:"/auth"},_="game-container",u=6865856,O=16316656,c=5845806,T=16775930,i=3407667,S={RESIZE:"resize",KEY_DOWN:"keydown"},A={ARROW_UP:"ArrowUp",ARROW_LEFT:"ArrowLeft",ARROW_DOWN:"ArrowDown",ARROW_RIGHT:"ArrowRight"},I={LEFT:-1,RIGHT:1,CENTER:0},R={X:0,Y:-1.1,Z:0,HEIGHT:1,WIDTH:100,DEPTH:150,WIDTH_SEGMENTS:50,HEIGHT_SEGMENTS:1,DEPTH_SEGMENTS:50,FLAT_SHADING:!0,CAST_SHADOW:!1,RECEIVE_SHADOW:!0,DISTORTION_VALUE:.14,COLOR:10092441,TEXTURE_PATH:"../assets/ground/texture.png"},a={X:0,Y:-.5,Z:3.4,SCALE:.08,CAST_SHADOW:!0,RECEIVE_SHADOW:!0,ROTATION_Y:180*Math.PI/180,MODEL_PATH:"../assets/hero/hero.gltf"},D={RADIUS:.37,COLOR:15790320,CAST_SHADOW:!0,FLAT_SHADING:!0,WIDTH_SEGMENTS:10,HEIGHT_SEGMENTS:10,RECEIVE_SHADOW:!0,DISTORTION_VALUE:.03},s={WOOD_HEIGHT:1,TREE_RADIUS:.25,WOOD_RADIUS:.05,CAST_SHADOW:!0,FLAT_SHADING:!0,RECEIVE_SHADOW:!0,DISTORTION_VALUE:.05,TREE_WIDTH_SEGMENTS:8,treeColor:i,woodColor:c,TREE_HEIGHT_SEGMENTS:8},d={FOG_NEAR:7,FOG_FAR:14,FOG_COLOR:O,BACKGROUND:u},N={X:0,Y:0,Z:5,FAR:15,NEAR:1,FIELD_OF_VIEW:50},f={SHADOW_MAP_ENABLED:!0},L={JUMP:!1,GO_DOWN:!1,COULD_JUMP:!0,LANE:I.CENTER},l={SUN_X:50,SUN_Y:50,SUN_Z:20,SHADOW_NEAR:1,SHADOW_FAR:20,SHADOW_RADIUS:5,CAST_SHADOW:!0,SUN_INTENSITY:.6,SCENE_INTENSITY:.4,SHADOW_RESOLUTION:1024,SKY_COLOR:T,GROUND_COLOR:T,SUN_LIGHT_COLOR:T},H={GRAVITY:.008,RUN_SPEED:.08,END_JUMP_THRESHOLD:.1,HERO_SHIFT_SPEED:.035,ADD_GROUND_THRESHOLD:50,NO_GRAVITY_MULTIPLIER:1,COLLISION_TIMEOUT_MS:350,DEAD_ANIMATION_TIMEOUT:150,HERO_CHANGE_LANE_SPEED:.1,RUN_SPEED_INCREMENT:1e-5,JUMP_GRAVITY_MULTIPLIER:.2,OBSTACLES_UPDATE_INTERVAL:1,GO_DOWN_GRAVITY_MULTIPLIER:2},U={LIFES:3,VALUE:6,DECREASE_VALUE:-1,INCREASE_VALUE:.01,LIFES_DECREASE_VALUE:1,VALUE_DOM_ELEMENT_ID:"current-score-value",LIFES_DOM_ELEMENT_ID:"current-score-lifes",GAME_OVER_DOM_ELEMENT_ID:"game-over-message"},M={COUNT:50,ROW_DISTANCE:3,OBSTACLE_Y:-.75,START_Z_POSITION:-20,MIN_INVISIBLE_ROWS:8,CHANGE_ROW_PROBABILITY:.2,ADD_OBSTACLE_PROBABILITY:.4}},1:function(e,t,n){"use strict";n.d(t,"a",(function(){return E}));var r=n(0);const E=async e=>{window.location.replace(`${r.b}${e}`)}},13:function(e,t,n){"use strict";n.r(t);var r=n(0),E=n(2),o=n(1);(async()=>{const e=localStorage.getItem("stayaliveuseridkey");let t,n;try{const{lastScore:r,maxScore:o}=await Object(E.a)(e);t=r,n=o}catch(e){console.error(e)}document.getElementById("score-value").innerHTML=t||0,document.getElementById("highest-score-value").innerHTML=n||0})(),document.getElementById("play-button").addEventListener("click",()=>{Object(o.a)(r.p.GAME)})},2:function(e,t,n){"use strict";n.d(t,"b",(function(){return E})),n.d(t,"a",(function(){return o}));const r=async(e,t="GET",n)=>(await fetch("https://marcinxkaminski-leaderboard.herokuapp.com"+e,{method:t,body:JSON.stringify(n),headers:{"Content-Type":"application/json"}})).json(),E=(e,t)=>r("/users","PUT",{id:e,score:t}),o=e=>r("/users/"+e)}});
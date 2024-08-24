(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function r(e){const t=new Date(e.dateBuy);return`${(new Date(e.dateSell).getTime()-t.getTime())/1e3/60/60/24}`}function x(e){const t=new Date(e),n=t.getDate().toString().padStart(2,"0"),s=(t.getMonth()+1).toString().padStart(2,"0"),o=t.getFullYear();return`${n}.${s}.${o}`}function B(e){return new Date(e).toLocaleString("ru-RU",{month:"long"})}function p(e){const t=r(e);return Math.ceil(t/182)}function N(e){const t=r(e);return Math.ceil(t/182)*e.sumBonds}function L(e){return(e.brokerTax/100*e.price).toFixed(2)}function i(e){const t=Number(L(e))+Number(e.price)+Number(e.nkd);return Number(t.toFixed(2))}function S(e){const t=i(e)*e.sumBonds;return Number(t.toFixed(2))}function T(e){return p(e)*e.couponPrice}function O(e){const t=N(e)*e.couponPrice;return Number(t.toFixed(2))}function C(e){const t=e.couponPrice*e.numberOfCoupons/e.bondParValue*100;return Number(t.toFixed(2))}function F(e){const t=e.couponPrice*e.numberOfCoupons/i(e)*100;return Number(t.toFixed(2))}function h(e){if(r(e)/365<1){const t=(Number(e.bondParValue)-i(e)+Number(e.couponPrice)*p(e))/i(e)*100;return console.log("Посчитало по первой формуле"),Number(t.toFixed(2))}else{const t=(Number(e.bondParValue)-i(e)+Number(e.couponPrice)*p(e))/i(e)*365/Number(r(e))*100;return console.log("Посчитало по второй формуле"),Number(t.toFixed(2))}}function E(e){if(r(e)/365<1){const t=Number(e.bondParValue)-i(e)+e.couponPrice*p(e);return Number(t.toFixed(2))}else{const t=(Number(e.bondParValue)-i(e))/(r(e)/365)+e.couponPrice*e.numberOfCoupons;return Number(t.toFixed(2))}}function P(e,t){const n=JSON.parse(localStorage.getItem("listBonds"));let s=0;if(!n||n.length==0)return t.textContent=Number(s.toFixed(2)),localStorage.setItem("income",JSON.stringify(s)),s;s=n.reduce((a,u)=>(a+=h(u),Number(a.toFixed(2))),e)/n.length,localStorage.setItem("income",JSON.stringify(s)),t.textContent=s}const M=document.getElementById("addBond"),b=document.getElementById("popup"),$=document.getElementById("overlay"),d=document.getElementById("openList"),c=document.getElementById("bondsList"),A=document.getElementById("addBondBtn"),f=document.getElementById("expensesTotal"),m=document.getElementById("averageIncome");let l=[],v=0,_=0;M.addEventListener("click",J);document.body.addEventListener("click",H);d.addEventListener("click",V);A.addEventListener("click",w);c.addEventListener("click",U);function D(){const e=JSON.parse(localStorage.getItem("listBonds"));if(!e||e.length==0)f.textContent=v,m.textContent=_;else{const t=JSON.parse(localStorage.getItem("expenses")).toFixed(2),n=JSON.parse(localStorage.getItem("income")).toFixed(2);m.textContent=n,f.textContent=t}y(e),g(e)}D();function I(){const e=JSON.parse(localStorage.getItem("listBonds"));if(!e)return;let t=e.reduce((n,s)=>(n+=S(s),Number(n.toFixed(2))),v);localStorage.setItem("expenses",t),f.textContent=t}function g(e){Array.isArray(e)&&e.length>0?l=e:c.innerHTML="<p class='text-list'>Список пуст...</p>"}function J(){b.classList.remove("hidden"),b.classList.add("popup"),$.classList.remove("hidden")}function H(e){const t=e.target.id;(t==="closePopup"||t==="cancelPopupBtn"||t==="overlay")&&(b.classList.add("hidden"),b.classList.remove("popup"),$.classList.add("hidden"))}function V(e){const t=e.target.id;t==="openList"&&(c.style.maxHeight="100%",d.innerText="Свернуть список",d.id="closeList"),t==="closeList"&&(c.style.maxHeight="500px",d.innerText="Развернуть список",d.id="openList")}function w(){const e=k();l=Y(e),R(l),y(l),g(l),P(_,m),I(),j()}function k(){const e=document.querySelectorAll(".item-form__input"),t=Array.from(e).reduce((n,s)=>(n[s.name]=s.value.trim(),n),{});return e.forEach(n=>K(n)),t}function Y(e){return e.id=l.length,l.push(e),l}function y(e){c.innerHTML="",e&&e.forEach(t=>{let n=q(t);c.innerHTML+=n})}function q(e){return`
	<li  class="list-bonds__item item-bond">
								<div class="item-bond__base-data base-data-bond">
									<h3 class="base-data-bond__title">
										Название облигации : <span>${e.name}</span>
									</h3>
									<div  class='base-data-bond__delete'>
									<button id='${e.id}'  class='base-data-bond__btn-delete'>

									</button>
									</div>
									<ul class="base-data-bond__list">
										<li class="base-data-bond__item">
											<p>Кол-во бумаг :</p>
											<b><span>${e.sumBonds?e.sumBonds:1}</span> шт</b>
										</li>
										<li class="base-data-bond__item">
											<p>Дата покупки :</p>
											<b><span>${x(e.dateBuy)}</span></b>
										</li>
										<li class="base-data-bond__item">
											<p>Дата погашения :</p>
											<b><span>${x(e.dateSell)}</span></b>
										</li>
										<li class="base-data-bond__item">
											<p>До погашения :</p>
											<b> <span>${r(e)}</span> день</b>
										</li>
										<li class="base-data-bond__item">
											<p>Дата купонов :</p>
											<b>
											<span>${B(e.dateCoupon1)}</span>
											/ 
											<span>${B(e.dateCoupon2)}</span>
											</b>
										</li>
										<li class="base-data-bond__item">
											<p>Купонов в год с 1 облигации :</p>
											<b><span>${e.numberOfCoupons}</span></b>
										</li>
										<li class="base-data-bond__item">
											<p>Купонов за весь срок с 1 облигации :</p>
											<b><span>${p(e)}</span></b>
										</li>
										<li class="base-data-bond__item">
											<p>Купонов за весь срок со всех олигаций :</p>
											<b><span>${N(e)}</span></b>
										</li>
									</ul>
								</div>
								<div class="item-bond__expenses expenses-bond">
									<h3 class="expenses-bond__title">Расходы на покупку :</h3>
									<ul class="expenses-bond__list">
										<li class="expenses-bond__item">
											<p>Цена покупки :</p>
											<b> <span>${e.price}</span> р.</b>
										</li>
										<li class="expenses-bond__item">
										<p>НКД</p>
										<b> <span>${e.nkd}</span> р.</b>
										</li>
										<li class="expenses-bond__item">
										<p>Комиссия брокера :</p>
										<b> <span>${L(e)}р.</b>
										</li>
										<li class="expenses-bond__item">
											<p>Сумма покупки :</p>
											<b> <span>${i(e)} р.</b>
										</li>
										<li class="expenses-bond__item">
											<p>Сумма покупки всех бумаг :</p>
											<b> <span>${S(e)} р.</b>
										</li>
										
									</ul>
								</div>
								<div class="item-bond__income income-bond">
									<h3 class="income-bond__title">Доходность облигации :</h3>
									<ul class="income-bond__list">
									<li class="income-bond__item">
											<p>Купон :</p>
											<b><span>(${e.couponPrice})</span> р.</b>
										</li>
										<li class="income-bond__item">
											<p>Купоная годовая :</p>
											<b><span>${C(e)}</span> %</b>
										</li>
										<li class="income-bond__item">
											<p>Купоная текущая :</p>
											<b>${F(e)} %</b>
										</li>
										<li class="income-bond__item">
											<p>За весь срок, руб :</p>
											<b> <span>${T(e)}</span> р.</b>
										</li>
										<li class="income-bond__item">
											<p>За весь срок со всех бумаг, руб :</p>
											<b> <span>${O(e)} р.</b>
										</li>
										<li class="income-bond__item">
											<p>Номинал :</p>
											<b> <span>${e.bondParValue}</span> р.</b>
										</li>
										<li class="income-bond__item">
											<p>Доходность годовая к погашению:</p>
											<span>
												<b><span>${h(e)}</span> % </b>
												/
												<b><span>${E(e)}</span> p. </b>
											</span>
										</li>
									</ul>
								</div>
							</li>
	`}function R(e){localStorage.setItem("listBonds",JSON.stringify(e))}function K(e){e.value=""}function U(e){let t=e.target.id;t&&(l=JSON.parse(localStorage.getItem("listBonds")),l.forEach((n,s)=>{n.id==t&&(l.splice(s,1),z())}),localStorage.setItem("listBonds",JSON.stringify(l)),I(),P(_,m),y(l),g(l))}function j(){alert("Облигация добавлена в список")}function z(){alert("Облигация удалена из списка")}

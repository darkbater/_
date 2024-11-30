"use strict";
let _ = (function(){
			let __ = function(c){
				// alert(typer)
				if(!gtype(c,'array')){
				// if(typeof c !== "array"){
					this.collection = [];
					for(var k in c) if(c.hasOwnProperty(k)) this.collection.push(c[k]);
					} else this.collection = c;
				/*Количество элементов в коллекции*/				
				this.count	= function(){return this.collection.length;};				
				/*Количество элементов в коллекции*/
				this.sel	= function(sel){
								if(sel === true) this.each(function(_el){
									console.log(_el);
									_el.attr('unselectable', 'false');
									// _el.cls('-unselectable');
									_el.css({
										'user-select':'all',
										'-webkit-user-select':'all',
										'-moz-user-select':'all',
										'-ms-user-select':'all',
										});
									return this;
									});
								if(sel === false) this.each(function(_el){
									// console.log(_el);
									_el.attr('unselectable', 'true');
									// _el.cls('+unselectable');
									_el.css({
										'user-select':'none',
										'-webkit-user-select':'none',
										'-moz-user-select':'none',
										'-ms-user-select':'none',
										});
									return this;
									});
								return this.node().attr('?unselectable');

								};
				this.push	= function(el){this.collection.push(el); return this;};
				this.pop		= function(el){return this.collection.pop(el);};
				this.tag		= function(){return this.collection[0].nodeName;};
				this.focus	= function(){if(this.item() && this.item().focus) {this.item().focus();return this;} return false;};
				this.id		= function(id){if(id) {this.for(function(el){el.id = id;}); return this;} return this.item().id();};
				this.val		= function(value){
									if(value) {
										this.for(function(el){
											var inside = "innerHTML";
											switch (el.nodeName.toLowerCase()){
											case 'input':
											case 'option':
											case 'textarea':
												inside = "value";
												break;
											case 'img':
												inside = 'src';
												break;
												}
											el[inside] = value;
											});
										return this;
										} else {
											var el = this.item(),
												inside = "innerHTML";
											switch (el.nodeName.toLowerCase()){
											case 'input':
											case 'option':
											case 'textarea':
												inside = "value";
												break;
											case 'img':
												inside = "src";
												break;
												}
											return el[inside];
										}
									};
				/*Получение и установка html-содержимого*/
				this.html	= function(text){
										// alert(text);
									if(gtype(text, 'string')) {
										this.collection[0].innerHTML = text;
										return this;
									 } else return this.collection[0].innerHTML;
									};
				/*Получение и установка id*/
				this.id	= function(id){
									if(gtype(id, 'string')){
										this.collection[0].id = id;
										return this;
										} else return this.collection[0].id;
									
									};
				/*Перебор элементов коллекции*/
				this.for		= function(f){
									for(var n in this.collection)
										if(	this.collection.hasOwnProperty(n) &&
											f.call(this, this.collection[n]));// === false) break;
									return this;
									};
				/*Перебор элементов с оснащением*/
				this.each	= function(f){
									for(var n in this.collection)
										if(	this.collection.hasOwnProperty(n) &&
											f.call(this, collection([this.collection[n]])) === false) break;
									return this;
									};
				/*Поиск элемента в коллекции*/
				this.find	= function(f){
									for(var n in this.collection)
										if(this.collection.hasOwnProperty(n) &&
											f.call(this, this.collection[n]) === true)
												return collection([this.collection[n]]);
									return false;
									};
				/*Отбор элементов из коллекции*/
				this.filter	= function(f){
									var collect = [];
									for(var n in this.collection)
										if(	this.collection.hasOwnProperty(n) &&
											f.call(this, this.collection[n]) === true)
												collect.push(this.collection[n]);
									if(collect.length === 0) return false;
									return collection(collect);
									};
				/*Создание дочернего элемента*/
				this.create		= function(tag, options){
									var newelems = [];
									this.each(function(_el){
										var newel = document.createElement(tag);
										_el.item().appendChild(newel);
										newelems.push(newel);
										});
									if(options);
									return collection(newelems);
									};
				/*Получение оснащённого элемента коллекции*/
				this.node		= function(item){
									if(!gtype(item, 'number')) item = 0;
									if(!this.collection[item]) return false;
									console.log(item);
									return collection([this.collection[item]]);
									};
				/*Получение элемента коллекции*/
				this.item		= function(item){
									if(!gtype(item, 'number')) item = 0;
									if(!this.collection[item]) return false;
									return this.collection[item];
									};
				/*Помещение элементов коллекции в конец потомков указанного элемента*/
				this.to			= function(target){
									// alert(target);
									// alert(gtype(target));
									var tgt = _(target).item();

									this.for(function(el){tgt.appendChild(el);});
									return this;
									};
				/*Помещение элементов коллекции в начало потомков указанного элемента*/
				this.top		= function(target){
									var first;
									if((first = _(target).children(0))){
										_(target).item().insertBefore(this.item(), first.item());
										} else this.to(target);
									};
				/*Помещение элементов коллекции после указанным элементом*/
				this.before	= function(target){
									var tgt;
									if((tgt = _(target).item())){
										this.for(function(el){
											tgt.parentElement.insertBefore(el, tgt);
											});
										}
									return this;
									};
				/*Помещение элементов коллекции перед указанным элементом*/
				this.after		= function(target){
									var tgt;
									if((tgt = _(target).item())){
										if(tgt.nextElementSibling)
											this.for(function(el){
												tgt.parentElement.insertBefore(el, tgt.nextElementSibling);
												});
										 else //this.to(tgt.parentElement);
											this.for(function(el){
												tgt.parentElement.appendChild(el);
												});
										 return this;
										}
									return false;
									};
				/*Поиск элементов среди дочерних элементов элементов коллекции*/
				this.sr		= function(selector){
									if(!gtype(selector, 'selector')) return false;
									var found = [];
									this.for(function(el){
										var fnds = el.querySelectorAll(selector);
										for(var n in fnds)
											if(fnds.hasOwnProperty(n) &&
												found.indexOf(fnds[n]) === -1)
													found.push(fnds[n]);												
										});
									return collection(found);
									};
				/*Удаление элементов*/
				this.remove	= function(){
									for (var i = this.collection.length-1; i >= 0; i--) {
											this.collection[i].parentNode.removeChild(this.collection[i]);
											this.collection.splice(i,1);
											}
									return this;
									};
				/*Поиск по родительским элементам, начиная с указанного*/
				this.up			= function(point){
									var res;
									if(!point) return collection([this.collection[0].parentNode]);
									if(gtype(point, 'selector'))
										if(! (res = this.collection[0].parentNode.closest(point))) return false;
											else return collection([res]);
									if(gtype(point, 'number')){
										res = this.collection[0];
										while(point-- > 0) {
											if(!res.parentNode) return false;
											res = res.parentNode;
											}
										return collection([res]);
										}
									return false;
									};
				/*Управление классами элементов коллекции*/
				this.cls		= function(cls){
									// if(!cls) {console.log(this.item().classList);}
									var clist=cls.substr(1).split(' ');
									this.for(function(el){
										for(var c in clist) 
											switch (cls[0]) {
												case '+': el.classList.add(clist[c]); break;
												case '-': el.classList.remove(clist[c]); break;
												case '*': el.classList.toggle(clist[c]); break;
												case '?':
													if(this.item().classList.contains(clist)) return true;
													return false;
												default:
													return false;
												}
										});
									return this;
									};

				this.attr	= function(attr, val){
									if(!val){
										if(attr[0] === '+'){
											this.for(function(el){el.setAttribute(attr.substr(1), true);});
											return;
											}
										if(attr[0] === '-'){
											this.for(function(el){el.removeAttribute(attr.substr(1));});
											return;
											}
										if(attr[0] === '?'){
											return this.collection[0].hasAttribute(attr.substr(1));
											}
										if(this.collection[0].hasAttribute(attr)){
											return this.collection[0].getAttribute(attr);
											} else return false;
										} else {
											this.for(function(el){el.setAttribute(attr,val);});
										}
									};
				/*Установка и чтение стилей css*/
				this.css		= function(css){
									if(typeof css === 'string') return this.item().style[css];
									this.for(function(el){
										for(var key in css) el.style[key] = css[key];
										});
									return this;
									};
				/*Возвращает первый элемент из дочерних*/
				this.first	= function(){
									return collection([this.collection[0].firstElementChild]);
									};
				/*Возвращает последний элемент из дочерних*/
				this.last	= function(){
									return collection([this.collection[0].lastElementChild]);
									};
				/*Возвращает следующий элемент*/
				this.next	= function(){
									if(!this.collection[0].nextElementSibling) return false;
									return collection([this.collection[0].nextElementSibling]);
									};
				/*Возвращает предыдущий элемент*/
				this.prev	= function(){
									if(!this.collection[0].previousElementSibling) return false;
									return collection([this.collection[0].previousElementSibling]);
									};
				/*Возвращает родительский элемент*/
				this.parent	= function(){
									if(!this.collection[0].parentElement) return false;
									return collection([this.collection[0].parentElement]);
									};
				/*Возвращает дочерние элементы, или один из них*/
				this.children	= function(n){
									if(typeof n === 'number'){
										if(this.collection[0].children[n])
											return collection([this.collection[0].children[n]]);
										else return false;
										}
									if(this.collection[0].children.length === 0) return false;
									return collection(this.collection[0].children);
									};
				/*Установка обработчика событий*/
				this.event	= function(event, callback){
									var targets = [];
									this.for(function(el){
										targets.push(el);
										addEvent(el, event, callback);
										});
									return (function(targets, event, callback){
												return new function(){
														this.stop = function(el){
															if(!el)	for(var k in targets) delEvent(targets[k], event, callback);
																else {delEvent(el, event, callback);
																	targets.splice(targets.indexOf(el),1);
																	}
															};
														};
												})(targets, event, callback);
									};
				};
				/*Добавление обработчика события*/
				function addEvent(el,ev,f){
					if (el.addEventListener) el.addEventListener(ev, f, false);
					else if (el.attachEvent) el.attachEvent('on'+ev, f);	
					}
				/*Снятие обработчика события*/
				function delEvent(el,ev,f){
					if (el.removeEventListener) el.removeEventListener(ev, f, false);
					else if (el.detachEvent) el.detachEvent('on'+ev, f);
					}
				/*Обмен данными*/
				 function ex(url, data, f){
					function packURI(obj, subs){
							var resp = "";
							for(var key in obj){
								if(typeof obj[key] == 'object'){
									if(subs == null) resp = resp + packURI(obj[key], key);
									else resp = resp + packURI(obj[key], subs+"["+key+"]");
								 } else {
									if(subs == null) resp = resp+"&"+key+"="+encodeURIComponent(obj[key]);
										else resp = resp+"&"+subs+'['+key+"]="+encodeURIComponent(obj[key]);
								};	
							}
						return resp;
						}
					function connect() {
										if (typeof XMLHttpRequest === 'undefined') {
										XMLHttpRequest = function() {
											try { return new ActiveXObject("Msxml2.XMLHTTP.6.0");} catch(e) {}
											try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");} catch(e) {}
											try { return new ActiveXObject("Msxml2.XMLHTTP");} catch(e) {}
											try { return new ActiveXObject("Microsoft.XMLHTTP");} catch(e) {}
											};
										}	
										return new XMLHttpRequest();
									}
					var res;
					if(res = connect()){
					res.open("POST", url, true);
					res.onreadystatechange = function(){  
						if (res.readyState === 4) { 
						if(res.status === 200) { 
								try {
									var answer = eval('('+res.responseText+')');
								} catch(e) {
									console.log('ex no eval?', res.responseText);
									}
								f(answer); 
								} else {
									console.log(data);
									alert('no interface "'+url+'"?');
									}
								} 
							};
					res.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
					res.send(packURI(data));
					} else alert('ex: ?');
				}
			/*Получение уточнённого типа переменной*/
			function gtype(o, cmp){
				function rt(t, cmp){
					if(typeof cmp != 'string') return t;
					if(t === cmp) return true;
					return false;
					}
				var t=Object.prototype.toString.call(o).slice(8,-1).toLowerCase();
				if(t.substr(0, 4) === 'html') return rt('html', cmp);
				if(t === 'number') return rt('number', cmp);
				if(t === 'object'){
					if(o instanceof __) return rt('_', cmp);
						else return rt('object', cmp);
					}
				if(t === 'string'){
					if(cmp === 'string') return rt('string', cmp);
					if(o.match(/^\*\w+$/iu)) return rt('constructor', cmp);
					if( o !=='' && 
							( o === '*'
							|| o[0] === '.'
							|| o[0] === '#'
							|| "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl document dt em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".indexOf(o.match(/^\w*/i)) > -1
							)
						) return rt('selector', cmp);
					};
				return rt(t, cmp);
				}
			/*Выбор из потомков по селектору*/
			function squery(sel, el = document){
				if(sel === 'document') return [document];
				var c = el.querySelectorAll(sel);
				var res = [];
				for(var k in c){
					if(c.hasOwnProperty(k))
						res.push(c[k]);
					}
				return res;
				}
			/*Создание оснащённой коллекции элементов*/
			function collection(c){
				return (function(c){
							var f = new __(c);
							return f;
							})(c);
				}
			/*Головная функция фреймворка*/
			return function(o,n,f){
				/*
				Переключатель режима работы
					селектор
					элемент
					конструктор
					+ функция
						+ ready
						+ timeout
						+ interval
				/**/
				/*Определение режима выполнения*/
				// alert(gtype(o));
				// alert(gtype(document));
				// asd();
				switch(gtype(o)){
					case '_':
						return o;
						break;
					case 'mouseevent':
						return (function(event){ /*Периодическое*/
										return new function(){
											this.stop = function(){
												// clearInterval(h)
												if (event.stopPropagation)
													event.stopPropagation();
													   else event.cancelBubble = true;
						
					        					if (event.preventDefault)
														event.preventDefault();
													   else event.returnValue= false;

												return false;
												};
											}
										})(o);
						// return o;
						break;
					case 'function': /*Если основной параметр - функция*/
						if(gtype(n) === 'undefined' /*Выполнение по окончании загрузки документа*/
							|| n === 0) return document.addEventListener('DOMContentLoaded',o);
						if(gtype(n) === 'number'){ /*Выполнение по истечении времени*/
							if(n > 0) return (function(h){ /*Однократное*/
										return new function(){
											this.stop = function(){clearTimeout(h);};
											};
										})(setTimeout(o, n))
								else return (function(h){ /*Периодическое*/
										return new function(){
											this.stop = function(){clearInterval(h)};
											}
										})(setInterval(o,n*-1));
							};
						break;
					case 'constructor': /*Если первый параметр - конструктор*/
						var el=document.createElement(o.substr(1));
						return collection([el]);
						break;
					case 'string': /*Если первый параметр - строка*/
						if(gtype(n, 'object')){ /*А второй - объект*/
							return (function(url,callback){
								ex(url,n,callback);
								})(o,f);
							}
						break;
					case 'selector': /*Если основной параметр - селектор*/
						var clist = squery(o);
						// console.log(clist);
						// if(o === 'body') alert('body');
						return collection(clist);
						break;
					case 'html': /*Если основной параметр - элемент html*/
						var _h = collection([o]);
						_h.cookie = function($var, $val){
							if($val){
								var d=new Date();
								d.setDate(d.getDate() + 365);
								document.cookie = $var+"="+encodeURIComponent($val)+';expires='+d.toUTCString();
								return true;
								} else {
									if($var[0] === '-'){
										var d=new Date();
										d.setDate(d.getDate() -1);
										document.cookie = $var.substr(1)+"=; expires="+d.toUTCString();
										return true;
										}
  									var matches = document.cookie.match(new RegExp(
    										"(?:^|; )" + $var.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  											));
  									return matches ? decodeURIComponent(matches[1]) : undefined;
								}
							};
						return _h;
						break;
					case 'object': /**/
						break;
					default:
						return false;
					}
				return this;
				}
			})();



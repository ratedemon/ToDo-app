const wrapper = document.querySelector('.wrapper');
const addItem = document.querySelector('.footer__form');
const items = JSON.parse(localStorage.getItem('items')) || [], tasks = [];
displaying(items,wrapper);
var	newTask = wrapper.querySelectorAll('.item__new-task');
var removeItemBtn = wrapper.querySelectorAll('.header__icon_delete');
const nameTitle = document.querySelector('.title-task');

addItem.addEventListener('submit', addNewItems);
// nameTitle.addEventListener('submit', getTitle);
// nameTitle.addEventListener('reset', getTitle);

/*Добавление блоков заданий*/
function addItems(e){
	// console.log(e);
	e.preventDefault();
	const text = "God love you, bitch";
	const item = {
		title: text,
		arrayItems: []
	};
	items.push(item);
	displaying(items, wrapper);
	localStorage.setItem('items', JSON.stringify(items));
}

function addNewItems(e){
	e.preventDefault();
	if(nameTitle.classList.contains('active')){
		nameTitle.classList.remove('active');
		document.body.style.overflow = "";
	} else{
		nameTitle.classList.add('active');
		document.body.style.overflow = "hidden";
	}
	nameTitle.addEventListener('submit', getTitle);
	nameTitle.addEventListener('reset', getTitle);
	// var text = "";
	// nameTitle.onsubmit = function(e){
	// e.preventDefault();
	// const form = this.querySelector('.add__text');
	// text = form.value;
	// console.log(text);
	// if(text==""){
	// 	return;
	// }
	// this.reset();
	// console.dir(this);

	// const item = {
	// 	title: text,
	// 	arrayItems: []
	// };
	// items.push(item);
	// const wrap = wrapper.lastElementChild || wrapper;
	// if(wrap==wrapper.lastElementChild){
	// 	const li = displayingNew(item, wrapper.lastElementChild.dataset.index);
	// 	wrapper.lastElementChild.insertAdjacentHTML(`afterEnd`, li);
	// }
	// else{
	// 	displaying(items, wrapper);
	// }
	// localStorage.setItem('items', JSON.stringify(items));
	// /*Переопределение динамических переменных*/
	// newTask = wrapper.querySelectorAll('.item__new-task');
	// newTask.forEach(el => el.addEventListener('submit', addTasks));
	// removeItemBtn = wrapper.querySelectorAll('.header__icon_delete');
	// removeItemBtn.forEach(btn => btn.addEventListener('click', removeItem));
	// console.dir(form);
	// }
	// console.log(text);

	// nameTitle.onreset = function(e){
	// 	e.preventDefault();
	// 	nameTitle.classList.remove('active');
	// 	document.body.style.overflow = "";
	// 	return;
	// }

	// console.log(text);
	// if(text==""){
	// 	return;
	// }
	
	// const item = {
	// 	title: text,
	// 	arrayItems: []
	// };
	// items.push(item);
	// const wrap = wrapper.lastElementChild || wrapper;
	// // console.log(wrap);
	// if(wrap==wrapper.lastElementChild){
	// 	const li = displayingNew(item, wrapper.lastElementChild.dataset.index);
	// 	wrapper.lastElementChild.insertAdjacentHTML(`afterEnd`, li);
	// }
	// else{
	// 	displaying(items, wrapper);
	// }
	// localStorage.setItem('items', JSON.stringify(items));
	// /*Переопределение динамических переменных*/
	// newTask = wrapper.querySelectorAll('.item__new-task');
	// newTask.forEach(el => el.addEventListener('submit', addTasks));
	// removeItemBtn = wrapper.querySelectorAll('.header__icon_delete');
	// removeItemBtn.forEach(btn => btn.addEventListener('click', removeItem));
}

function getTitle(e){
	e.preventDefault();
	if(e.type == 'reset'){
		e.preventDefault();
		nameTitle.classList.remove('active');
		document.body.style.overflow = "";
		return;
	}
	const form = this.querySelector('.add__text');
	const text = form.value;
	console.log(text);
	if(text==""){
		return;
	}
	
	console.dir(this);

	const item = {
		title: text,
		arrayItems: []
	};
	items.push(item);
	const wrap = wrapper.lastElementChild || wrapper;
	// console.log(wrap);
	if(wrap==wrapper.lastElementChild){
		const li = displayingNew(item, wrapper.lastElementChild.dataset.index);
		wrapper.lastElementChild.insertAdjacentHTML(`afterEnd`, li);
	}
	else{
		displaying(items, wrapper);
	}
	localStorage.setItem('items', JSON.stringify(items));
	/*Переопределение динамических переменных*/
	newTask = wrapper.querySelectorAll('.item__new-task');
	newTask.forEach(el => el.addEventListener('submit', addTasks));
	removeItemBtn = wrapper.querySelectorAll('.header__icon_delete');
	removeItemBtn.forEach(btn => btn.addEventListener('click', removeItem));
	// form.innerHTML = "";
	// console.dir(form);
	// this.reset();
	form.value = "";
	this.reset();
	// return false;
}

function removeItem(e){
	const el = this.parentElement.parentElement;
	const parent = el.parentElement;
	const child = el.dataset.index;
	// console.log()
	// console.dir(parent.children, child);
	parent.removeChild(parent.children[child]);
	items.splice(child, 1);
	localStorage.setItem('items', JSON.stringify(items));
	console.log(items);
}

/*Выводим добавленные блоки*/
function displaying(arr, list){
	list.innerHTML = arr.map((item,i)=>{
		return `
			<li class="wrapper__item" data-index="${i}">
			<div class="item__header">
				<i class="fa fa-calendar icon calendar" aria-hidden="true"></i>
				<input type="text" value="${item.title}" placeholder="Title" class="item__header_input" disabled>
				<button class="header__icon"><i class="fa fa-pencil icon" aria-hidden="true"></i></button>
				<button class="header__icon header__icon_delete"><i class="fa fa-trash-o icon" aria-hidden="true"></i></button>
			</div>
			<form class="item__new-task">
				<i class="fa fa-plus icon" aria-hidden="true"></i>
				<input type="text" class="new-task__text" placeholder="Start typing here to create a new task...">
				<button type="submit" class="new-task__btn">Add task</button>
			</form>
			<ul class="item__list">
				
			</ul>
		</li>
		`;
	}).join('');
}

function displayingNew(arr, list){
	list = parseInt(list) + 1;
	return `
		<li class="wrapper__item" data-index="${list}">
			<div class="item__header">
				<i class="fa fa-calendar icon calendar" aria-hidden="true"></i>
				<input type="text" value="${arr.title}" placeholder="Title" class="item__header_input" disabled>
				<button class="header__icon"><i class="fa fa-pencil icon" aria-hidden="true"></i></button>
				<button class="header__icon header__icon_delete"><i class="fa fa-trash-o icon" aria-hidden="true"></i></button>
			</div>
			<form class="item__new-task">
				<i class="fa fa-plus icon" aria-hidden="true"></i>
				<input type="text" class="new-task__text" placeholder="Start typing here to create a new task...">
				<button type="submit" class="new-task__btn">Add task</button>
			</form>
			<ul class="item__list">
				
			</ul>
		</li>
	`;
}

/*Добавляем задания в каждый блок*/
function addTasks(event){
	event.preventDefault();
	const text = (this.querySelector('.new-task__text')).value;
	if(text==""){
		return;
	}
	const tsk = {
		text: text,
		done: false
	};
	tasks.push(tsk);
	// showTasks(tasks,listInside);
	items[this.parentElement.dataset.index].arrayItems.push(tsk);
	// tasks.splice(0,1);
	if(tasks.length>1){
		tasks.splice(0,1);
	}
	const lastEl = this.nextElementSibling.lastElementChild || this.nextElementSibling;
	if(lastEl == this.nextElementSibling.lastElementChild){
		const add = showNewTasks(tsk, lastEl.dataset.index);
		lastEl.insertAdjacentHTML(`afterEnd`, add);
	}else{
		showTasks(tasks,lastEl);
	}
	console.log(lastEl);
	
	// console.dir(this.nextElementSibling.lastElementChild);

	// showTasks(tasks,this.nextElementSibling);
	localStorage.setItem('items', JSON.stringify(items));
	

	this.reset();
	return false;
}

/*Показываем задания в каждом блоке*/
function showTasks(arr, list){
	list.innerHTML = arr.map((item,i)=>{
		return `
		<li class="list__point" data-index="${i}">
			<input type="checkbox" id="point${i}" data-index="${i}" class="point__checkbox" ${item.done ? "checked" : ""}>
			<label for="point${i}" class="point__label"><textarea class="point__label_input" rows="1" disabled>${item.text}</textarea></label>
			<div class="point__action">
				<button class="action__btn"><i class="fa fa-arrows" aria-hidden="true"></i></button>
				<button class="action__btn rewrite"><i class="fa fa-pencil" aria-hidden="true"></i></button>
				<button class="action__btn delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			</div>
		</li>
		`;
	}).join('');
}

function showNewTasks(arr, num){
	// console.log(typeof num);
	num = parseInt(num) + 1;
	return `
		<li class="list__point" data-index="${num}">
			<input type="checkbox" id="point${num}" data-index="${num}" class="point__checkbox" ${arr.done ? "checked" : ""}>
			<label for="point${num}" class="point__label"><textarea class="point__label_input" rows="1" disabled>${arr.text}</textarea></label>
			<div class="point__action">
				<button class="action__btn"><i class="fa fa-arrows" aria-hidden="true"></i></button>
				<button class="action__btn rewrite"><i class="fa fa-pencil" aria-hidden="true"></i></button>
				<button class="action__btn delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			</div>
		</li>
		`;
}

/*${item.arrayItems.done ? "checked" : ""}*/




const	wrapItem = wrapper.querySelectorAll('.wrapper__item');
const	listInside = wrapper.querySelector('.item__list');
items.forEach((el,i) => showTasks(el.arrayItems, wrapItem[i].querySelector('.item__list')));

newTask.forEach(el => el.addEventListener('submit', addTasks));
removeItemBtn.forEach(btn => btn.addEventListener('click', removeItem));
const wrapper = document.querySelector('.wrapper');
const addItem = document.querySelector('.footer__form');
const items = JSON.parse(localStorage.getItem('items')) || [], tasks = [];
displaying(items,wrapper);
var	newTask = wrapper.querySelectorAll('.item__new-task');
var removeItemBtn = wrapper.querySelectorAll('.header__icon_delete');
const nameTitle = document.querySelector('.title-task');

addItem.addEventListener('submit', addNewItems);

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
}

/*Даем имя блокам*/
function getTitle(e){
	e.preventDefault();
	if(e.type == 'reset'){
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
	newVars();
	form.value = "";
	this.reset();
}
/*Переопределение динамических переменных*/
function newVars(){
	updateVars(newTask,'.item__new-task','submit',addTasks);
	updateVars(removeItemBtn,'.header__icon_delete','click',removeItem);
	updateVars(checkboxes,'[type=checkbox]','click',checking);
	updateVars(deleteTaskBtn, '.delete', 'click', removeTasks);
	updateVars(rewriteTitle, '.header__icon_rewrite', 'click', getUpdateTitle);
	updateVars(rewriteTaskBtn, '.rewrite', 'click', rewriteTasks);
}

function updateVars(variable, clas, event, func){
	variable = wrapper.querySelectorAll(clas);
	variable.forEach(btn => btn.addEventListener(event, func));
}

function getUpdateTitle(e){
	// console.log(this.parentElement.parentElement);
	const curr = this.parentElement.querySelector('.item__header_input');
	const form = document.querySelector('.title-task');
	nameTitle.classList.add('active');
	document.body.style.overflow = "hidden";
	const input = form.querySelector('.add__text');
	input.value = curr.value;
	// console.log(items[this.parentElement.parentElement.dataset.index].title)
	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		items[this.parentElement.parentElement.dataset.index].title = input.value;
		localStorage.setItem('items', JSON.stringify(items));
		nameTitle.classList.remove('active');
		document.body.style.overflow = "";
		curr.value = input.value;
	});
	form.addEventListener('reset', updatingTitleFalse);
}

function updatingTitleFalse(e){
	e.preventDefault();
	nameTitle.classList.remove('active');
	document.body.style.overflow = "";
	return;
}

/*Удаление блоков*/
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
				<button class="header__icon header__icon_rewrite"><i class="fa fa-pencil icon" aria-hidden="true"></i></button>
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

/*Вывод одиночных блоков*/
function displayingNew(arr, list){
	list = parseInt(list) + 1;
	return `
		<li class="wrapper__item" data-index="${list}">
			<div class="item__header">
				<i class="fa fa-calendar icon calendar" aria-hidden="true"></i>
				<input type="text" value="${arr.title}" placeholder="Title" class="item__header_input" disabled>
				<button class="header__icon header__icon_rewrite"><i class="fa fa-pencil icon" aria-hidden="true"></i></button>
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
	localStorage.setItem('items', JSON.stringify(items));
	newVars(); 
	this.reset();
	return false;
}

/*Показываем задания в каждом блоке*/
function showTasks(arr, list){
	list.innerHTML = arr.map((item,i)=>{
		return `
		<li class="list__point" data-index="${i}">
			<input type="checkbox" id="point${i}" data-index="${i}" class="point__checkbox" ${item.done ? "checked" : ""}>
			<label for="point${i}" class="point__label">
				<form action="#" class="label__form">
				<textarea class="point__label_input" rows="1" disabled>${item.text}</textarea>
				</form>
			</label>
			<div class="point__action">
				<button class="action__btn drap"><i class="fa fa-arrows" aria-hidden="true"></i></button>
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
			<label for="point${num}" class="point__label">
			<form action="#" class="label__form">
			<textarea class="point__label_input" rows="1" disabled>${arr.text}</textarea>
			</form></label>
			<div class="point__action">
				<button class="action__btn drap"><i class="fa fa-arrows" aria-hidden="true"></i></button>
				<button class="action__btn rewrite"><i class="fa fa-pencil" aria-hidden="true"></i></button>
				<button class="action__btn delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			</div>
		</li>
		`;
}

/*${item.arrayItems.done ? "checked" : ""}*/
function checking(e){
	// console.dir(this.parentElement);
	const task = this.parentElement;
	const item = task.parentElement.parentElement;
	items[item.dataset.index].arrayItems[task.dataset.index].done=!items[item.dataset.index].arrayItems[task.dataset.index].done;
	localStorage.setItem('items', JSON.stringify(items));
	// console.log(item,task);
}

function removeTasks(e){
	const el = this.parentElement.parentElement;
	const child = el;
	const parent = el.parentElement.parentElement
	parent.lastElementChild.removeChild(parent.lastElementChild.children[child.dataset.index]);
	console.dir(parent.lastElementChild, child.parentElement);
	items[parent.dataset.index].arrayItems.splice(child.dataset.index,1);
	localStorage.setItem('items', JSON.stringify(items));
}
function rewriteTasks(e){
	// console.log(this.parentElement.parentElement);
	const el = this.parentElement.parentElement;
	const parent = el.parentElement.parentElement;
	console.log(parent, el, this);
	const child = el.querySelector('.label__form');
	console.log(child.lastElementChild);
	child.lastElementChild.removeAttribute('disabled');
	child.lastElementChild.focus();

	child.addEventListener('keydown', (e)=>{
		// console.log(e.keyCode, e.which);
		if(e.keyCode !== 13 || e.which !== 13){
			return;
		}
		child.lastElementChild.setAttribute('disabled', "");
		items[parent.dataset.index].arrayItems[el.dataset.index].text = child.lastElementChild.value;
		localStorage.setItem('items', JSON.stringify(items));
	})
	// console.log(items[parent.dataset.index].arrayItems[el.dataset.index].text);
}


const	wrapItem = wrapper.querySelectorAll('.wrapper__item');
const	listInside = wrapper.querySelector('.item__list');
items.forEach((el,i) => showTasks(el.arrayItems, wrapItem[i].querySelector('.item__list')));

newTask.forEach(el => el.addEventListener('submit', addTasks));
removeItemBtn.forEach(btn => btn.addEventListener('click', removeItem));

var checkboxes = wrapper.querySelectorAll('[type=checkbox]');
checkboxes.forEach(check => check.addEventListener('click', checking));

var rewriteTitle = wrapper.querySelectorAll('.header__icon_rewrite');
rewriteTitle.forEach(rw => rw.addEventListener('click', getUpdateTitle));

var deleteTaskBtn = wrapper.querySelectorAll('.delete');
deleteTaskBtn.forEach(del => del.addEventListener('click', removeTasks));

var rewriteTaskBtn = wrapper.querySelectorAll('.rewrite');
rewriteTaskBtn.forEach(rw => rw.addEventListener('click', rewriteTasks));
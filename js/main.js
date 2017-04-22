const wrapper = document.querySelector('.wrapper');
const listInside = wrapper.querySelector('.item__list');
const newTask = wrapper.querySelector('.item__new-task');
const footerForm = document.querySelector('.footer__form')
const items = JSON.parse(localStorage.getItem('items')) || [];
const mainItems = [];

const obj = {
	title : 'lorem lorem lorem',
	item : []
};


function addItems(e){
	e.preventDefault();
	const text = (this.querySelector('.new-task__text')).value;
	const item = {
		text: text,
		done: false
	}
	// console.log(item);
	items.push(item);
	populations(items, listInside);
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();
}

function populations(arr, list){
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

function addTaskBlock(e){
	e.preventDefault();
	const obj = {
		title : 'lorem lorem lorem',
		item : []
	};	
}

function populObj(arr, list){
	list.innerHTML = arr.map((item,i)=>{
		return `
			<li class="wrapper__item" data-index="${i}">
			<div class="item__header">
				<i class="fa fa-calendar icon calendar" aria-hidden="true"></i>
				<input type="text" value="${item.title}" placeholder="Title" class="item__header_input" disabled>
				<button class="header__icon"><i class="fa fa-pencil icon" aria-hidden="true"></i></button>
				<button class="header__icon"><i class="fa fa-trash-o icon" aria-hidden="true"></i></button>
			</div>
			<form action="#" class="item__new-task">
				<i class="fa fa-plus icon" aria-hidden="true"></i>
				<input type="text" class="new-task__text" placeholder="Start typing here to create a new task...">
				<button type="submit" class="new-task__btn">Add task</button>
			</form>
			<ul class="item__list">
				${populations(item.item, listInside)}
			</ul>
		</li>
		`;
	}).join('');
}

function toggleDone(e){
	console.log(e.target.dataset.index);
	const el = e.target.dataset.index;
	items[el].done=!items[el].done;
	localStorage.setItem('items', JSON.stringify(items));
	populations(items, listInside);
}

function deleteTitle(e){
	const childEl = e.target.parentElement.parentElement.parentElement;
	const parentEl = childEl.parentElement;
	parentEl.removeChild(childEl);
	items.splice(childEl.dataset.index,1);
	localStorage.setItem('items', JSON.stringify(items));
}

function rewriteTitle(e){
	e.preventDefault();
	// const text = (this.querySelector('.new-task__text')).value;
	// console.log(e.target.parentElement.parentElement.parentElement);
	// rewrited = true;
	const main = e.target.parentElement.parentElement.parentElement;
	const text = main.querySelector('.point__label_input');
	if(e.target.classList.contains('fa-pencil')){
		e.target.classList.remove('fa-pencil');
		e.target.classList.add('fa-check');
	}
	text.hasAttribute('disabled') ? text.removeAttribute('disabled') : text.setAttribute("disabled");
	text.style.resize = "vertical";
	var str = "";
	text.addEventListener('keyup', displayMatches);
	// var q = rewriting(text.value)
	// console.log(q);
	const item = {
		text: str,
		done: false
	}
	console.log(str);
	items.splice(main.dataset.index, 1, item);
	localStorage.setItem('items', JSON.stringify(items));
	// populations(items, listInside);
	// text.removeAttribute('disabled');
	// const item = {
	// 	text: text.value,
	// 	done: false
	// };
	// items.splice(main.dataset.index, 1, item);
	// localStorage.setItem('items', JSON.stringify(items));
	// console.log(arr, text.value);
	// console.log(str);
	// function rewriting(item){
	// 	// console.log(this.value);
	// 	// str = this.value;
	// 	return this.value;
	// }
	function displayMatches(){
		// const matchArr = rewriting(this.value);
		str = this.value;
		console.log(this.value);
	}
}


populations(items, listInside);
const deleteBtn = listInside.querySelectorAll('.delete');
deleteBtn.forEach(item => item.addEventListener('click', deleteTitle));

// const rewriteBtn = listInside.querySelectorAll('.rewrite');
// rewriteBtn.forEach(btn => btn.addEventListener('click', rewriteTitle))

newTask.addEventListener('submit', addItems);
const checkboxes = listInside.querySelectorAll('[type=checkbox]');
checkboxes.forEach(ch => ch.addEventListener('click', toggleDone));

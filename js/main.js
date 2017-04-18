const wrapper = document.querySelector('.wrapper');
const listInside = wrapper.querySelector('.item__list');
const newTask = wrapper.querySelector('.item__new-task');
const items = JSON.parse(localStorage.getItem('items')) || [];

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
			<label for="point${i}" class="point__label">${item.text}</label>
			<div class="point__action">
				<button class="action__btn"><i class="fa fa-arrows" aria-hidden="true"></i></button>
				<button class="action__btn rewrite"><i class="fa fa-pencil" aria-hidden="true"></i></button>
				<button class="action__btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			</div>
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

function rewriteTitle(e){
	console.dir(e.target.parentElement);
}

populations(items, listInside);
const rewriteBtn = listInside.querySelectorAll('.rewrite');
rewriteBtn.forEach(item => item.addEventListener('click', rewriteTitle));

newTask.addEventListener('submit', addItems);
const checkboxes = listInside.querySelectorAll('[type=checkbox]');
checkboxes.forEach(ch => ch.addEventListener('click', toggleDone));

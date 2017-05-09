"use strict";

export class OnDisplayItems{
  constructor(arr,list){
    // let arrMain = arr;
    // let listMain = list;
		this.arr=arr;
		this.list = list
    this.html = this.showing();
  }
  showing(){
    this.list.innerHTML = this.arr.map((item,i)=>{
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
				<input type="text" class="new-task__text" placeholder="Start typing here to create a new task..." tabindex="${i+1}">
				<button type="submit" class="new-task__btn">Add task</button>
			</form>
			<ul class="item__list">
				
			</ul>
		</li>
		`;
    }).join('');
  }
}

export class OnDisplayTasks{
	constructor(arr, list){
		this.arr = arr;
		this.list = list;
		this.html = this.showing();
	}
	showing(){
		this.list.innerHTML = this.arr.map((item,i)=>{
			return `<li class="list__point" data-index="${i}">
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
		</li>`;
		}).join('');
	}
}
"use strict";

// export class AddItems{
// 	constructor (text, arr){
// 		let txt = text;
// 		this.item = {title: txt, arrayItems: []};
// 		// this.arrItems = arr;
// 		this.arr = arr;
// 		this.arr.push(this.item);
// 	}
	
// }

export class Items{
	constructor(txt){
			this.elem = txt;
			// this.arr = arr;
			this.item = {title: "", arrayItems: []};
		// }	
	}
	getTitle(ev){
		ev.preventDefault();
		const input = this.elem.querySelector('.add__text');
		const text = input.value;
		this.item.title = text;
		input.value = "";
		this.closeWindow();
		return this.item;
	}
	closeWindow(){
		this.elem.reset();
		this.elem.classList.remove('active');
	}
}

// export class GetItemsTitle{
// 	constructor(element,arr){
// 		// this.event = e;
// 		this.elem = element;
// 		this.txt;
// 		this.arr = arr;
// 		// console.log(this.elem);
// 		// this.title=title;
// 		// console.log(this.ev);
// 	}
// 	getTitle(ev){
// 		ev.preventDefault();
// 		const input = this.elem.querySelector('.add__text');
// 		const text = input.value;
// 		this.txt = text;
// 		// console.log(text);
// 		input.value = "";
// 		this.closeWindow();
// 		return text;
// 	}
// 	closeWindow(){
// 		this.elem.reset;
// 		this.elem.classList.remove('active');
// 	}
// 	removeItem(){
// 		// this.elem.dataset.index
// 		this.arr.splice(this.elem.dataset.index,1);
// 		this.elem.classList.add('none');

// 		return this.arr;
// 		// localStorage.setItem('items', JSON.stringify(this.arr));
// 	}
// }

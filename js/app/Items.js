"use strict";

export class AddItems{
	constructor (text, arr){
		let txt = text;
		this.item = {title: txt, arrayItems: []};
		// this.arrItems = arr;
		this.arr = arr;
		this.arr.push(this.item);
	}
	
}

export class GetItemsTitle{
	constructor(element){
		// this.event = e;
		this.elem = element;
		this.txt;
		// console.log(this.elem);
		// this.title=title;
		// console.log(this.ev);
	}
	getTitle(ev){
		ev.preventDefault();
		const input = this.elem.querySelector('.add__text');
		const text = input.value;
		this.txt = text;
		// console.log(text);
		input.value = "";
		this.closeWindow();
		return text;
	}
	closeWindow(){
		
		this.elem.reset;
		this.elem.classList.remove('active');
	}
}
"use strict";

export class AddTasks{
  constructor(text, arr){
    let txt = text;
    this.task = {
      text: txt,
      done: false 
    }
    this.arr = arr;
    this.arr.push(this.task);
  }
}
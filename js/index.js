"use strict";

import {AddItems, GetItemsTitle} from "./app/Items";
import {OnDisplayItems, OnDisplayTasks} from "./app/displaying";
import {AddTasks} from "./app/Tasks"

let items = JSON.parse(localStorage.getItem('items')) || [];
const wrapper = document.querySelector('.wrapper');
const footerForm = document.querySelector('.footer__form');
const nameTitle = document.querySelector('.title-task');
new OnDisplayItems(items, wrapper);
let taskList = wrapper.querySelectorAll('.item__list');
items.forEach((item,i)=>{
  new OnDisplayTasks(item.arrayItems, taskList[i]);
});
let newTask = wrapper.querySelectorAll('.item__new-task');
// console.log(wrapper, pdf, items); 
// new OnDisplayTasks(items[0].array,pdf[0]);
// new OnDisplayTasks(items[1].array,pdf[1]);
// let wrapItem = wrapper.children;
footerForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  // nameTitle.classList.add('active');
  const qwer = new GetItemsTitle(nameTitle);
  qwer.elem.classList.add('active');
  qwer.elem.addEventListener('submit', (e)=>{
    let nameTask = qwer.getTitle(e);
    // console.log(nameTask);
    if(nameTask.replace(/\s/g, "").length<1){
      return;
    }
    new AddItems(nameTask, items);
    console.log(items.length);
    new OnDisplayItems(items, wrapper);
    localStorage.setItem('items', JSON.stringify(items));
    // console.log(items);
    taskList = wrapper.querySelectorAll('.item__list');
    items.forEach((item,i)=>{
      new OnDisplayTasks(item.arrayItems, taskList[i]);
    });
    newTask = wrapper.querySelectorAll('.item__new-task');
    newTask.forEach(el=>el.addEventListener('submit',showTasks));
  });
  qwer.elem.addEventListener("reset", (e)=>{
    qwer.closeWindow();
  });
  // console.log(items, qwer);
});


// let newTask = wrapper.querySelectorAll('.item__new-task');
newTask.forEach(el=>el.addEventListener('submit',showTasks));

function showTasks(e){
  e.preventDefault();
  console.log(items, e);
  const parent = e.target.parentNode.dataset.index;
  const input = e.target.querySelector('.new-task__text');
  new AddTasks(input.value, items[parent].arrayItems);
  console.log(items);
  new OnDisplayTasks(items[parent].arrayItems, taskList[parent]);
  localStorage.setItem('items', JSON.stringify(items));
  input.value = "";
}


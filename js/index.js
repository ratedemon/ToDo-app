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

footerForm.addEventListener('submit',(e)=>{
  e.preventDefault();
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
    updating();
  });
  qwer.elem.addEventListener("reset", (e)=>{
    qwer.closeWindow();
  });
});

function updating(){
  taskList = wrapper.querySelectorAll('.item__list');
    items.forEach((item,i)=>{
      new OnDisplayTasks(item.arrayItems, taskList[i]);
    });
    newTask = wrapper.querySelectorAll('.item__new-task');
    newTask.forEach(el=>el.addEventListener('submit',showTasks));
    btnRemove = wrapper.querySelectorAll('.header__icon_delete');
    btnRemove.forEach(btn => btn.addEventListener('click',(e)=>{
      // const parent = e.target.parentNode.parentNode.parentNode;
      // items.splice(parent.dataset.index,1);
      // // wrapper.removeChild(parent);
      // parent.classList.add('none');
      // localStorage.setItem('items', JSON.stringify(items));
      removing(e);
    }));
  localStorage.setItem('items', JSON.stringify(items));
}

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

let btnRemove = wrapper.querySelectorAll('.header__icon_delete');
btnRemove.forEach(btn => btn.addEventListener('click',(e)=>{
  removing(e);
  updating();
}));

function removing(e){
  console.log(items);
  const parent = e.target.parentNode.parentNode.parentNode;
  const it = new GetItemsTitle(parent, items);
  items = it.removeItem();
  localStorage.setItem('items', JSON.stringify(items));
  console.log(items);
  // updating();
}

let btnRewrite = wrapper.querySelectorAll('.header__icon_rewrite');
btnRewrite.forEach(b=>b.addEventListener('click',(e)=>{

}));
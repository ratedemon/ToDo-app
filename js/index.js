"use strict";

import {Items} from "./app/Items";
import {OnDisplayItems, OnDisplayTasks} from "./app/displaying";
import {Tasks} from "./app/Tasks"

const doc = document;

let items = JSON.parse(localStorage.getItem('items')) || [];
const wrapper = doc.querySelector('.wrapper');
const footerForm = doc.querySelector('.footer__form');
const nameTitle = doc.querySelector('.title-task');
new OnDisplayItems(items, wrapper);
let taskList = wrapper.querySelectorAll('.item__list');
items.forEach((item,i)=>{
  new OnDisplayTasks(item.arrayItems, taskList[i]);
});
let newTask = wrapper.querySelectorAll('.item__new-task');

doc.addEventListener('change', update, false);

function update(e){
  // console.log("Change");
  // items.forEach((item,i)=>{
  //   new OnDisplayTasks(item.arrayItems, taskList[i]);
  // });
  // newTask = wrapper.querySelectorAll('.item__new-task');
  // newTask.forEach(el=>el.addEventListener('submit',showTasks));
  // console.log("Change", this);
  console.dir(e,this);
}
//Добавление новых заданий
footerForm.addEventListener('submit', AddItem, false);
console.log(newTask);
function AddItem(e){
  e.preventDefault();
  const newTitle = new Items(nameTitle, items);
  newTitle.elem.classList.add('active');
  newTitle.elem.addEventListener('submit', (e)=>{
    let nameItem = newTitle.getTitle(e);
    if(nameItem.title.replace(/\s/g, "").length<1 || !nameItem.hasOwnProperty('title')){
      return;
    }
    const per = Object.assign({}, nameItem);
    // console.log(per,nameItem);
    items.push(per);
    localStorage.setItem('items', JSON.stringify(items));
    new OnDisplayItems(items, wrapper);
  }, false);
  newTitle.elem.addEventListener('reset',(e)=>{
    newTitle.closeWindow();
  });
}

/*function updating(){
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
}*/

newTask.forEach(el=>el.addEventListener('submit',showTasks));

function showTasks(e){
  e.preventDefault();
  // console.log(items, e);
  const parent = e.target.parentNode.dataset.index;
  const input = e.target.querySelector('.new-task__text');
  new Tasks(input.value, items[parent].arrayItems);
  console.log(items);
  new OnDisplayTasks(items[parent].arrayItems, taskList[parent]);
  localStorage.setItem('items', JSON.stringify(items));
  input.value = "";
}

let btnRemove = wrapper.querySelectorAll('.header__icon_delete');
btnRemove.forEach(btn => btn.addEventListener('click',(e)=>{
  removing(e);
  // updating();
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
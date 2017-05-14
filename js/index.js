"use strict";

import {Items} from "./app/Items";
import {OnDisplayItems, OnDisplayTasks} from "./app/displaying";
import {Tasks} from "./app/Tasks"

const doc = document;

let items = JSON.parse(localStorage.getItem('items')) || [];
let wrapper = doc.querySelector('.wrapper');
const footerForm = doc.querySelector('.footer__form');
const nameTitle = doc.querySelector('.title-task');
let screen = new OnDisplayItems(items, wrapper);
screen.showing();
let taskList = wrapper.querySelectorAll('.item__list');
items.forEach((item,i)=>{
  let screenBig = new OnDisplayTasks(item.arrayItems, taskList[i]);
  screenBig.showing();
});
let newTask = wrapper.querySelectorAll('.item__new-task');

// console.dir(wrapper);
let wrapItems = wrapper.children;
//Update DOM
let observer = new MutationObserver((e)=>{
    e.forEach(function(mutation) {
        if(mutation.type === "childList"){
          update();
        }
    });   
})
let config = { attributes: true, childList: true, characterData: true }
observer.observe(wrapper, config);


function update(e){
  wrapper = doc.querySelector('.wrapper');
  taskList = wrapper.querySelectorAll('.item__list');
  // items.forEach((item,i)=>{
  //   let so =  new OnDisplayTasks(item.arrayItems, taskList[i]);
  //   so.showing();
  // });
  newTask = wrapper.querySelectorAll('.item__new-task');
  newTask.forEach(el=>el.addEventListener('submit',showTasks));
  wrapItems = wrapper.children;
  console.log("Change");
}
//Добавление новых заданий
footerForm.addEventListener('submit', AddItem, false);
function AddItem(e){
  e.preventDefault();
  const newTitle = new Items(nameTitle);
  newTitle.elem.classList.add('active');
  newTitle.elem.addEventListener('submit', (e)=>{
    let nameItem = newTitle.getTitle(e);
    if(nameItem.title.replace(/\s/g, "").length<1 || !nameItem.hasOwnProperty('title')){
      return;
    }
    const per = Object.assign({}, nameItem);
    items.push(per);
    localStorage.setItem('items', JSON.stringify(items));
    let out = new OnDisplayItems(items, wrapper);
    // console.log(out);
    out.showing();
  }, false);
  newTitle.elem.addEventListener('reset',(e)=>{
    newTitle.closeWindow();
  });
}

newTask.forEach(el=>el.addEventListener('submit',showTasks));
function showTasks(e){
  e.preventDefault();
  // console.log(items, e);
  const parent = e.target.parentNode.dataset.index;
  const input = e.target.querySelector('.new-task__text');
  const comein = new Tasks(input.value);
  // console.log(comein.task);
  const pre = Object.assign({}, comein.task);
  console.log(pre);
  items[parent].arrayItems.push(pre);
  console.log(items);
  // const out = new OnDisplayTasks(items[parent].arrayItems, taskList[parent]);
  // out.showing();
  // localStorage.setItem('items', JSON.stringify(items));
  input.value = "";
}

/*let btnRemove = wrapper.querySelectorAll('.header__icon_delete');
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
}));*/
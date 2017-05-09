"use strict";

// import { AddItems } from './app/addItems';
import {AddItems} from "./app/addItems";

const items = [];
let q = new AddItems("test");
let w = new AddItems("qwest");
items.push(q);
items.push(w);
console.log(items[1].item);
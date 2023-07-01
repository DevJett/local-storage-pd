'use strict';

let stub = require('./stub');
let parse = require('./parse');
let tracking = require('./tracking');
let ls = stub;
let isEnabled = false;

try{
  localStorage.setItem('t.e.s.t', 'test');
  localStorage.removeItem('t.e.s.t');
  if('localStorage' in global && global.localStorage){
    ls =  global.localStorage ;
    isEnabled = true;
  }
}catch (e){
  console.log(`Access denied! Failed to read the 'localStorage' property from 'Window': Access is denied for this document`)
}


function accessor (key, value) {
  if (arguments.length === 1) {
    return get(key);
  }
  return set(key, value);
}


function get (key) {
  const raw = ls.getItem(key);
  return parse(raw);
}

function set (key, value) {
    ls.setItem(key, JSON.stringify(value));
}

function remove (key) {
  return ls.removeItem(key);
}

function clear () {
  return ls.clear();
}

function backend (store) {
  store && (ls = store);
  return ls;
}

accessor.enabled = isEnabled;
accessor.set = set;
accessor.get = get;
accessor.remove = remove;
accessor.clear = clear;
accessor.backend = backend;
accessor.on = tracking.on;
accessor.off = tracking.off;

module.exports = accessor;

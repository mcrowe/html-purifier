"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toString(name, attr, isClosing = false) {
    let str = '';
    if (isClosing) {
        str += '</';
    }
    else {
        str += '<';
    }
    str += name;
    for (let key in attr) {
        str += ` ${key}="${attr[key]}"`;
    }
    str += '>';
    return str;
}
exports.toString = toString;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const selector_1 = require("./selector");
ava_1.default('make', t => {
    t.deepEqual(selector_1.make('span'), {
        tag: 'span'
    });
    t.deepEqual(selector_1.make('#span'), {
        id: 'span'
    });
    t.deepEqual(selector_1.make('span#one.blue'), {
        tag: 'span',
        id: 'one',
        class: 'blue'
    });
});
ava_1.default('isMatch', t => {
    t.is(selector_1.isMatch(selector_1.make('.blue'), 'div', { class: 'blue' }), true);
    t.is(selector_1.isMatch(selector_1.make('span#one'), 'div', { id: 'one' }), false);
    t.is(selector_1.isMatch(selector_1.make('#one.green'), 'div', { id: 'one', class: 'green' }), true);
});

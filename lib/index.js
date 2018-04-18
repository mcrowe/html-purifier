"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const htmlparser = require("htmlparser2");
const Selector = require("./selector");
const Tag = require("./tag");
const PARSER_OPTIONS = {
    decodeEntities: true
};
function purify(html, selectorStrings) {
    const selectors = selectorStrings.map(Selector.make);
    const nonIdSelectors = selectors.filter(s => !s.id);
    let level = 0;
    let body = '';
    let isSkipped = false;
    const parser = new htmlparser.Parser({
        onopentag(name, attr) {
            if (name === 'style') {
                isSkipped = true;
                return;
            }
            if (level > 0) {
                level += 1;
                body += Tag.toString(name, attr);
                return;
            }
            const selectorsToCheck = !attr.id ? nonIdSelectors : selectors;
            for (let i = 0; i < selectorsToCheck.length; i++) {
                if (!Selector.isMatch(selectorsToCheck[i], name, attr))
                    continue;
                level = 1;
                body += Tag.toString(name, attr);
            }
        },
        ontext(text) {
            if (!isSkipped && level > 0) {
                body += text;
            }
        },
        onclosetag(name) {
            if (isSkipped && name === 'style') {
                isSkipped = false;
                return;
            }
            if (level > 0) {
                body += Tag.toString(name, {}, true);
                level -= 1;
            }
        }
    }, PARSER_OPTIONS);
    parser.write(html);
    parser.end();
    return body;
}
exports.purify = purify;

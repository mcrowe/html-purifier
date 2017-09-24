"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const fs = require("fs");
const index_1 = require("./index");
ava_1.default('purify', t => {
    const html = '<body><div></div><div id="rank">def<span>abc</span>123<script>def</script></div><div><section>toy<img class="my-image" src="hello" /> 123 </section></div></body>';
    const result = index_1.purify(html, [
        '#rank',
        '.my-image'
    ]);
    t.is(result, '<div id="rank">def<span>abc</span>123</div><img class="my-image" src="hello"></img>');
});
ava_1.default('purify with complex selectors', t => {
    const html = `<div id="one" class="green">A</div><div id="one" class="blue"></div><span id="two" class="red"></span>`;
    const result = index_1.purify(html, [
        'div#one.green',
        'span.red'
    ]);
    t.is(result, '<div id="one" class="green">A</div><span id="two" class="red"></span>');
});
ava_1.default('purify performance', t => {
    const html = fs.readFileSync(__dirname + '/../fixtures/big.html', { encoding: 'utf8' });
    const selectors = [
        '#SalesRank',
        '#prodDetails',
        '#actualPriceValue',
        '#priceblock_ourprice',
        '#priceblock_saleprice',
        '#priceBlock',
        '#buyNewSection',
        '#priceblock_dealprice',
        '#prerderDelaySection',
        '#mocaSubtotal',
        '#tmmSwatches',
        '#mediaTab_content_landing',
        '#unqualifiedBuyBox',
        '#averageCustomerReviews',
        '.reviewCountTextLinkedHistogram',
        '#merchant-info',
        '#availability_feature_div',
        '#mocaBBSoldByAndShipsFrom',
        '#olp_feature_div',
        '#moreBuyingChoices_feature_div',
        '#usedbuyBox',
        'a.a-link-normal.contributorNameID',
        '.author',
        '#twister',
        '#gd-customizations-link',
        '#acrCustomerWriteReviewLink',
        '#acrCustomerReviewText',
        '#reviewLink',
        '.a-color-price',
        'ul.zg_hrsr',
        '.prodDetSectionEntry',
        '#regularprice_savings',
        '#regularprice_savings_value',
        '#askATFLink'
    ];
    const t0 = Date.now();
    for (let i = 0; i < 10; i++) {
        index_1.purify(html, selectors);
    }
    const dt = Date.now() - t0;
    t.is(dt < 400, true, `Expected to purify in less than 400ms, but took ${dt}ms.`);
});

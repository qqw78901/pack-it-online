let fs = require('fs'),
    rfsConfig = { flag: 'r', encoding: 'utf8' };

function MyPlugin(a) { this.opts = {}, this.opts.open = !!a.open, this.opts.head = a.head || [], this.opts.body = a.body || []; }MyPlugin.prototype.apply = function (a) { const b = this; a.plugin('compilation', (c) => { c.plugin('html-webpack-plugin-alter-asset-tags', (d, e) => { b.opts.open && (b.opts.head.forEach((f) => { d.head.push(b.readFile(f)); }), b.opts.body.forEach((f) => { d.body.push(b.readFile(f)); })), e(null, d); }); }); }, MyPlugin.prototype.readFile = function (a) { const b = fs.readFileSync(a, rfsConfig); return b ? this.renderTag(b) : void console.log('no such file'); }, MyPlugin.prototype.renderTag = function (a) {
    return {
        tagName: 'script', closeTag: !0, attributes: { type: 'text/javascript' }, innerHTML: a
    };
}, module.exports = MyPlugin;

/**
 * jQuery 2.1.3's parseHTML (without scripts options).
 * Unlike jQuery, this returns a DocumentFragment, which is more convenient to insert into DOM.
 * MIT license.
 *
 * If you only support Edge 13+ then try this:
    function parseHTML(html, context) {
        var t = (context || document).createElement('template');
            t.innerHTML = html;
        return t.content.cloneNode(true);
    }
 */
window.parseHTML = (function() {
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        // We have to close these tags to support XHTML (#13200)
        wrapMap = {
            // Support: IE9
            option: [1, "<select multiple='multiple'>", "</select>"],

            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

            _default: [0, "", ""]
        };

    /**
     * @param {String} elem A string containing html
     * @param {Document} context
     */
    return function parseHTML(elem, context) {
        context = context || document;

        var tmp, tag, wrap, j,
            fragment = context.createDocumentFragment();

        if (!rhtml.test(elem)) {
            fragment.appendChild(context.createTextNode(elem));

            // Convert html into DOM nodes
        } else {
            tmp = fragment.appendChild(context.createElement("div"));

            // Deserialize a standard representation
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

            // Descend through wrappers to the right content
            j = wrap[0];
            while (j--) {
                tmp = tmp.lastChild;
            }

            // Remove wrappers and append created nodes to fragment
            fragment.removeChild(fragment.firstChild);
            while (tmp.firstChild) {
                fragment.appendChild(tmp.firstChild);
            }
        }

        return fragment;
    };
}());

window.Li = {
    /**
     * Same as Array.slice except that it can work on array-like data types (i.e arguments, element.childNodes, NodeList...)
     * @param {Array-like} array Array like values.
     * @method slice
     * @example var elements = Li.slice(document.body.childNodes, 3); //get first 3 nodes.
     */
    slice: function (array, from, end) {
        var len = array.length;
        from = from || 0;
        end = end || len;
        return Array.prototype.slice.call(array, from, end);
    },

    /**
     * Given a DOM node, this method finds the next tag/node that would appear in the dom.
     * WARNING: Do not remove or add nodes while traversing, because it could cause the traversal logic to go crazy.
     * @param node Could be a any node (element node or text node)
     * @param ancestor Node An ancestorial element that can be used to limit the search.
     * The search algorithm, while traversing the ancestorial heirarcy, will not go past/above this element.
     * @param {function} callback A callback called on each element traversed.
     *
     * callback gets following parameters:
     * node: Current node being traversed.
     * isOpenTag: boolean. On true, node would be the next open tag/node that one would find when going
     * linearly downwards through the DOM. Filtering with isOpenTag=true, one would get exactly what native TreeWalker does.
     * Similarly isOpenTag=false when a close tag is encountered when traversing the DOM. AFAIK TreeWalker doesn't give this info.
     *
     * callback can return one of the following values (with their meanings):
     * 'halt': Stops immediately and returns null.
     * 'return': Halts and returns node.
     * 'continue': Skips further traversal of current node (i.e won't traverse it's child nodes).
     * 'break': Skips all sibling elements of current node and goes to it's parent node.
     *
     * relation: The relation compared to the previously traversed node.
     * @param {Object} [scope] Value of 'this' keyword within callback
     * @method traverse
     */
    traverse: function (node, ancestor, callback, scope) {
        //if node = ancestor, we still can traverse it's child nodes
        if (!node) {
            return null;
        }
        var isOpenTag = true, ret = null;
        do {
            if (ret === 'halt') {
                return null;
            }
            if (isOpenTag && node.firstChild && !ret) {
                node = node.firstChild;
                //isOpenTag = true;
                ret = callback.call(scope, node, true, 'firstChild');
            } else {
                if (isOpenTag) { // close open tag first
                    callback.call(scope, node, false, 'current');
                }
                if (node.nextSibling && node !== ancestor && ret !== 'break') {
                    node = node.nextSibling;
                    isOpenTag = true;
                    ret = callback.call(scope, node, true, 'nextSibling');
                } else if (node.parentNode && node !== ancestor) {
                    //Traverse up the dom till you find an element with nextSibling
                    node = node.parentNode;
                    isOpenTag = false;
                    ret = callback.call(scope, node, false, 'parentNode');
                } else {
                    node = null;
                }
            }
        } while (node && ret !== 'return');
        return node || null;
    }
};

/**
 * Convert DocumentFragment to HTML.
 * Use second parameter to beautify HTML.
 */
window.beautifyHTML = (function () {
    function unwrap(str) {
        var o = {};
        str.split(',').forEach(function (val) {
            o[val] = true;
        });
        return o;
    }

    //HTML 4 and 5 void tags
    var voidTags = unwrap('area,base,basefont,br,col,command,embed,frame,hr,img,input,keygen,link,meta,param,source,track,wbr');

    function areAllChildNodesTextNodes(el) {
        var len = el.childNodes.length;
        for (var i = 0; i < len; i += 1) {
            var node = el.childNodes[i];
            if (node.nodeType !== 3) {
                return false;
            }
        }
        return true;
    }

    return function (origHtml) {
        var df;
        if (typeof origHtml === 'string') {
            df = window.parseHTML(origHtml); //DocumentFragment
        } else if (origHtml.nodeType === 11) { //DocumentFragment
            df = origHtml;
        } else {
            throw new Error("Unsupported type for argument 'origHtml'.");
        }

        var html = '',
            level = 0;
        Li.traverse(df, df, function (node, isOpenTag) {
            if (node.nodeType === 1) {
                var tag = node.nodeName.toLowerCase();
                if (isOpenTag) {
                    html += '\n' + (new Array(level * 4 + 1)).join(' ');
                    level += 1;
                    html += '<' + tag;
                    Li.slice(node.attributes).forEach(function (attr) {
                        html += ' ' + attr.name + '="' + attr.value.replace(/"/g, '&quot;') + '"';
                    });
                    html += (voidTags[tag] ? '/>' : '>');
                } else {
                    level -= 1;
                    if (!voidTags[tag]) {
                        if (!areAllChildNodesTextNodes(node)) {
                            html += '\n' + (new Array(level * 4 + 1)).join(' ');
                        }
                        html += '</' + tag + '>';
                    }
                }
            }
            if (isOpenTag && node.nodeType === 3) {
                var text = node.nodeValue || '';
                text = text.trim();
                //escape <,> and &. Except text node inside script or style tag.
                if (!(/^(?:script|style)$/i).test(node.parentNode.nodeName)) {
                    text = text.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
                }
                html += text;
            }
            if (isOpenTag && node.nodeType === 8) {
                html += '\n' + (new Array(level * 4 + 1)).join(' ');
                html += '<!-- ' + node.data.trim() + ' -->';
            }
        }, this);
        return html;
    };
}());

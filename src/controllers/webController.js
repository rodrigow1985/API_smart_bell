'use strict'

const fs = require("fs");
const path = require('path');

// Ruta al archivo HTML
const filePathBase = path.normalize(__dirname + '/..');
// Returns: '/foo/bar/baz/asdf' 
const filePath = path.join(filePathBase, 'data', 'indexMin.html');

var WebController = () => { }

WebController.getHtml = async () => {
    try {
        //console.log(filePath);
        const contenido = await fs.promises.readFile(filePath, 'utf8');
        const json = {
            html: contenido
        };
        return json;
    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports = WebController
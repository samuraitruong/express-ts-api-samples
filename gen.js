const showdown = require('showdown'),
    converter = new showdown.Converter(),
    fs = require("fs");

const text = fs.readFileSync("./readme.md", "utf8");

const html = converter.makeHtml(text);
if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public")
}
console.log("generate ./public/index.html")
fs.writeFileSync("./public/index.html", html);
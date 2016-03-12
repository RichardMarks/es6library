var myLibrary = window.myLibrary || {};

window.console.log(myLibrary.VERSION);

var rect = new myLibrary.Rectangle(0, 0, 10, 10);

window.console.log(rect.toString());

rect.inflate(100);

window.console.log(rect.toXML());

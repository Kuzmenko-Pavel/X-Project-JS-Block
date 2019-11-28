var div = document.createElement('div');
var loop = setInterval(function () {
    console.log(div);
    console.clear();
});
Object.defineProperty(div, "id", {get: function () {
    clearInterval(loop);
alert("Dev Tools detected!");
}});
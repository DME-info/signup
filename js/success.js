$(function () {
    let time = 5;
    setInterval(function () {
        $("span").html(--time);
        if (time === 0) {
            location.href = "index.html";
        }
    }, 1000);
})
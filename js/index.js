$(function () {
    let namePattern = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
    let classPattern = /^[\u4e00-\u9fa5]+[0-9]+$/;
    let idPattern = /^2[0-9]{9}$/;
    let phonePattern = /^(?:(?:13[0-9])|(?:14[5|7])|(?:15(?:[0-3]|[5-9]))|(?:18[0,5-9]))\d{8}$/
    let emailPattern = /^[A-Za-z0-9_\-]+@(?:[A-Za-z0-9_\-]+\.)+[A-Za-z]{2,4}$/;
    let WeChatPattern = /^[A-Za-z0-9_\-]+$/;

    let Patterns = [namePattern, classPattern, idPattern, phonePattern, emailPattern, WeChatPattern];
    let Promotes = ["Your name...", "Your class...", "Your student id...", "Your phone number...", "Your email...", "Your wechat..."];
    let Names = ["姓名", "班级", "学号", "手机号", "邮箱", "微信号"];

    // 提交检查
    $("#form").submit(function () {
        // input输入检查
        $("input").not("#submit").each(function (index) {
            let $this = $(this);
            if ($this.val().trim() === "" || $this.val().trim() === Promotes[index]) {
                alert("请输入您的" + Names[index]);
                return false;
            } else if (!Patterns[index].test($this.val().trim())) {
                alert("您输入的" + Names[index] + "格式不正确，请重新输入");
                return false;
            }
        });
        // 检查第一志愿
        if ($("#first").val().trim() === "0") {
            alert("请选择您的第一志愿");
            return false;
        }
    });

    // 输入时检查以及显示提示文字
    $("input").not("#submit").each(function (index) {
        if ($(this).val().trim() !== Promotes[index]) {
            $(this).removeClass("promote");
        }
        $(this).focus(function () {
            let $this = $(this);
            if ($this.val().trim() === Promotes[index]) {
                $this.val("");
                $this.removeClass("promote");
            }
        });
        $(this).blur(function () {
            let $this = $(this);
            if ($this.val().trim() === "") {
                $this.val(Promotes[index]);
                $this.addClass("promote");
            }
        });
        $(this).keyup(function () {
            let $this = $(this);
            let $next = $(this).next();
            if ($this.val().trim() === "" || $this.val().trim() === Promotes[index]) {
                $next.removeClass("right");
                $next.removeClass("wrong");
                $next.addClass("required");
            } else if (Patterns[index].test($this.val().trim())) {
                $next.removeClass("required");
                $next.removeClass("wrong");
                $next.addClass("right");
            } else {
                $next.removeClass("required");
                $next.removeClass("right");
                $next.addClass("wrong");
            }
        }).keyup();
    });

    // 第一个下拉列表
    $("#first").change(function () {
        let $this = $(this);
        let $next = $(this).next();
        if ($this.val() !== "0") {
            $next.removeClass("required");
            $next.removeClass("wrong");
            $next.addClass("right");
        } else {
            $next.removeClass("right");
            $next.removeClass("wrong");
            $next.addClass("required");
        }
    }).change();
    $("#second,#third").change(function () {
        let $this = $(this);
        let $next = $(this).next();
        if ($this.val() !== "0") {
            $next.removeClass("optional");
            $next.removeClass("wrong");
            $next.addClass("right");
        } else {
            $next.removeClass("right");
            $next.removeClass("wrong");
            $next.addClass("optional");
        }
    }).change();
})
$(function () {
    let namePattern = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
    let classPattern = /^[\u4e00-\u9fa5]+[0-9]+$/;
    let idPattern = /^2[0-9]{9}$/;
    let phonePattern = /^(?:(?:13[0-9])|(?:14[5|7])|(?:15(?:[0-3]|[5-9]))|(?:18[0,5-9]))\d{8}$/
    let emailPattern = /^[A-Za-z0-9_\-]+@(?:[A-Za-z0-9_\-]+\.)+[A-Za-z]{2,4}$/;
    let weChatPattern = /^[A-Za-z0-9_\-]+$/;

    // 提交检查
    $("#form").submit(function () {
        // 班级正则
        if (!classPattern.test($("#class").val().trim())) {
            alert("您输入的班级格式不正确，请重新输入");
            return false;
        }
        // 学号正则
        if (!idPattern.test($("#id").val().trim())) {
            alert("您输入的学号格式不正确，请重新输入");
            return false;
        }
        if (!phonePattern.test($("#phone").val().trim())) {
            alert("您输入的手机号码格式不正确，请重新输入");
            return false;
        }
        // Email正则
        if (!emailPattern.test($("#email").val().trim())) {
            alert("您输入的邮箱格式不正确，请重新输入");
            return false;
        }
        // 微信号正则
        if (!weChatPattern.test($("#WeChat").val().trim())) {
            alert("您输入的微信号格式不正确，请重新输入");
            return false;
        }
        // 检查第一志愿
        if ($("#first").val() === "0") {
            alert("请选择您的第一志愿");
            return false;
        }
    });

    // 输入时检查以及显示提示文字
    let Patterns = [namePattern, classPattern, idPattern, phonePattern, emailPattern, weChatPattern];
    let Promotes = ["Your name...", "Your class...", "Your student id...", "Your phone number...", "Your email...", "Your wechat..."];

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
        });
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
    });
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
    })
})
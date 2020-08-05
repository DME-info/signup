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
        let stop = false;
        $("input").not("#submit").each(function (index) {
            let $this = $(this);
            if ($this.val().trim() === "" || $this.val().trim() === Promotes[index]) {
                alert("请输入您的" + Names[index]);
                stop = true;
                return false;
            } else if (!Patterns[index].test($this.val().trim())) {
                alert("您输入的" + Names[index] + "格式不正确，请重新输入");
                stop = true;
                return false;
            }
        });
        if (stop) {
            return false;
        }
        // 检查第一志愿
        if ($("#first-department").val().trim() === "") {
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
    $("#first-department").change(function () {
        let $this = $(this);
        let $next = $(this).next();
        if ($this.val() !== "") {
            $next.removeClass("required");
            $next.removeClass("wrong");
            $next.addClass("right");
        } else {
            $next.removeClass("right");
            $next.removeClass("wrong");
            $next.addClass("required");
        }
    }).change();

    $("#second-department,#third-department").change(function () {
        let $this = $(this);
        let $next = $(this).next();
        if ($this.val() !== "") {
            $next.removeClass("optional");
            $next.removeClass("wrong");
            $next.addClass("right");
        } else {
            $next.removeClass("right");
            $next.removeClass("wrong");
            $next.addClass("optional");
        }
    });

    // 防止bug
    document.getElementById("aside").onselectstart = function () {
        return false;
    };

    // 下拉列表选项变化
    // 0
    let $option0 = "<option value=''>请选择你想加入的部门</option>";
    // TMS
    let $option1 = "<option value='TMS'>TMS</option>";
    // 团委
    let $option2 = "<option value='办公室'>办公室</option>" +
        "<option value='组织组'>组织组</option>" +
        "<option value='实践组'>实践组</option>" +
        "<option value='志愿组'>志愿组</option>" +
        "<option value='宣传组'>宣传组</option>";
    // 学生会
    let $option3 = "<option value='内联权益部'>内联权益部</option>" +
        "<option value='外联部'>外联权益部</option>" +
        "<option value='学习发展部'>学习发展部</option>" +
        "<option value='文艺部'>文艺部</option>" +
        "<option value='文化策划部'>文化策划部</option>" +
        "<option value='体育部'>体育部</option>";
    // 科协
    let $option4 = "<option value='学习部'>学习部</option>" +
        "<option value='项目部'>项目部</option>" +
        "<option value='赛事部'>赛事部</option>" +
        "<option value='俱乐部'>俱乐部</option>";

    $(".left-select").change(function () {
        let $this = $(this);
        let $next = $(this).next();
        $next.empty();
        $next.append($option0);
        switch ($this.val()) {
            case "":
                break;
            case "TMS":
                $next.append($option1);
                break;
            case "团委":
                $next.append($option2);
                break;
            case "学生会":
                $next.append($option3);
                break;
            case "科协":
                $next.append($option4);
                break;
            default:
                break;
        }
        $next.change();
    }).change();
})
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $class = test_input($_POST["class"]);
    $id = test_input($_POST["id"]);
    $phone = test_input($_POST["phone"]);
    $email = test_input($_POST["email"]);
    $WeChat = test_input($_POST["WeChat"]);
    $first = test_input($_POST['first']);
    $second = test_input($_POST['second']);
    $third = test_input($_POST['third']);
    $time = date('Y-m-d h:i:s', $_SERVER['REQUEST_TIME']);
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// set time zone
date_default_timezone_set('PRC');

header("content-type:text/html;charset=utf-8");
session_start();
//接收表单传递的用户名和密码

/*In fact, here can just write
    if(checkDepa($first, $second, $third)){}
    //I have make it sure that they must not be empty!
 */
if (!(empty($name)) && !(empty($class)) && !(empty($id)) && !(empty($phone)) && !(empty($email)) && !(empty($WeChat)) && checkDepa($first, $second, $third)) {

    //通过php连接到mysql数据库
    $dbhost = 'localhost';  // mysql服务器主机地址
    $dbuser = 'root';            // mysql用户名
    $dbpass = '********';          // mysql用户名密码
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
    if (!$conn) {
        die('Could not connect: ' . mysqli_error());
    }
    # echo '数据库连接成功！';

    mysqli_select_db($conn, "mysql") or die("Unable to select database!");
    #  echo "我们会尽快处理您的请求并将反馈结果发送至您的邮箱，请耐心等待，谢谢！";

    mysqli_query($conn, "set names utf8");

    $sql = "INSERT INTO signup " .
        "(name,class,id,phone,email,WeChat,first,second,third,time) " .
        "VALUES " .
        "('$name','$class','$id','$phone','$email','$WeChat','$first','$second','$third','$time')";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die("data insert error");
    }

    # echo "提交成功\n";
    mysqli_close($conn);

    echo "<script>\r\n";
    echo "alert(\"提交成功\");\r\n";
    echo "location.href='" . $_SERVER["HTTP_REFERER"] . "'";
    echo "</script>";
} else {
    # echo "提交失败";
    echo "<script>\r\n";
    echo "alert(\"请选择你想加入的部门！\");\r\n";
    echo "history.back()";
    echo "</script>";
}

function checkDepa($first, $second, $third)
{
    if ($first == "0" && $second == "0" && $third == "0") {
        return 0;
    }
    return 1;
}

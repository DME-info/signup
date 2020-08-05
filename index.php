<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $class = test_input($_POST["class"]);
    $id = test_input($_POST["id"]);
    $phone = test_input($_POST["phone"]);
    $email = test_input($_POST["email"]);
    $WeChat = test_input($_POST["WeChat"]);
    $firstOrganization = test_input($_POST["first-organization"]);
    $firstDepartment = test_input($_POST['first-department']);
    $secondOrganization = test_input($_POST['second-organization']);
    $secondDepartment = test_input($_POST['second-department']);
    $thirdOrganization = test_input($_POST['third-organization']);
    $thirdDepartment = test_input($_POST['third-department']);
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
if (!(empty($name)) && !(empty($class)) && !(empty($id)) && !(empty($phone)) && !(empty($email)) && !(empty($WeChat)) && checkDepa($firstDepartment, $secondDepartment, $thirdDepartment)) {

    //通过php连接到mysql数据库
    $dbhost = 'localhost';  // mysql服务器主机地址
    $dbuser = 'liuyihao';            // mysql用户名
    $dbpass = 'lyh26239231';          // mysql用户名密码
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
    if (!$conn) {
        die('Could not connect: ' . mysqli_error());
    }
    # echo '数据库连接成功！';

    mysqli_select_db($conn, "mechinfo") or die("Unable to select database!");
    #  echo "我们会尽快处理您的请求并将反馈结果发送至您的邮箱，请耐心等待，谢谢！";

    mysqli_query($conn, "set names utf8");

    $sql = "INSERT INTO `signup`" .
        "(name,class,id,phone,email,WeChat,firstOrganization,firstDepartment,secondOrganization,secondDepartment,thirdOrganization,thirdDepartment,time) " .
        "VALUES " .
        "('$name','$class','$id','$phone','$email','$WeChat','$firstOrganization','$firstDepartment','$secondOrganization','$secondDepartment','$thirdOrganization','$thirdDepartment','$time')";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        // die("data insert error");
        // die($sql);
        die("<script>" .
            "alert('提交失败，数据库发生未知错误。\\n如果可能，请联系科协学习部相关负责人！');" .
            "</script>");
    }

    # echo "提交成功\n";
    mysqli_close($conn);
    echo "<p>" . "成功" . $name . "," . $class . "," . $id . "," . $phone . "," . $email . "," . $WeChat . "," . $first . "," . $second . "," . $third . "</p>";
    echo "<script>\r\n";
    # echo "alert(\"提交成功\");\r\n";
    # echo "location.href='" . $_SERVER["HTTP_REFERER"] . "';";
    echo "location.href='success.html';";
    echo "</script>";

} else {
    # echo "提交失败"
    # echo "<p>" . "失败" . $name . "," . $class . "," . $id . "," . $phone . "," . $email . "," . $WeChat . "," . $first . "," . $second . "," . $third . "</p>";
    echo "<script>\r\n";
    echo "alert(\"提交失败，表单发生未知错误，如果可能，请联系科协学习部相关负责人\");\r\n";
    echo "history.back()";
    echo "</script>";
}

function checkDepa($first, $second, $third)
{
    if ($first == "" && $second == "" && $third == "") {
        return 0;
    }
    return 1;
}

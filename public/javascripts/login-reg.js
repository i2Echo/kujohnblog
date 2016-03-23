$('#login-btn').on('click', function(){
  layer.open({
    type: 1,
    title: ['Login','font-weight: 700;font-size:20px;'],
    shadeClose: true, //点击遮罩关闭
    content: $('#login')
  });
});
$('#reg-btn').on('click', function(){
  layer.open({
    type: 1,
    title: ['Sign up','font-weight: 700;font-size:20px;'],
    shadeClose: true, //点击遮罩关闭
    content: $('#reg')
  });
});

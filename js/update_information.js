
var types = -1;
var author;
var tags;
var title;
var isPush;

var content;
var summary;

$(function () {
    if(!localStorage.getItem('verification')){
        alert("登录缓存已失效，即将转入登录界面！");
        window.location.href = 'login.html';
    }
});
function routing() {
    window.location.href = 'index.html';
}
function menuBtn(which) {
    typevalue = which.getAttribute('id');
    let typeValue = document.getElementById(typevalue).innerText;
    document.getElementById("dropdownMenu").innerText = typeValue;
};

function getCurrentData() {
    for( let i = 0; i < 5; i++) {
        if (document.getElementById("dropdownMenu").innerText === document.getElementById(i + '').innerText)
            types = i;
    }
    let radio = document.getElementsByName("radio-value");
    for(let i = 0; i < radio.length; i++){
        if(radio[i].checked === true)
            isPush = radio[i].value;
    }
    author = document.getElementById("author-name").value;
    tags = document.getElementById("label").value;
    title = document.getElementById("essay-title").value;
    // image = image;
    // carousel = carousel;
    content = UE.getEditor('editor').getContent();//带有格式的纯文本
    summary = UE.getEditor('editor').getPlainTxt().substring(0,20);
}
function send() {
    getCurrentData();
    if (types === -1)
        alert("请先选择资讯类型！");
    else if (author === '') {
        alert("请填写作者名称！");
    }
    else if (tags === '') {
        alert("请填写标签名称！");
    }
    else if (title === '') {
        alert("请填写标题栏！");
    }
    else if (content === '') {
        alert("请填写文章内容！");
    }
    else
    {
        let tips = confirm("确定是否上传该条资讯？");
        if(tips === true)
            $.ajax({
                type: 'POST',
                url: baseURL + updateNews,
                headers: {
                    'Authorization': localStorage.getItem('verification')
                },
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    'type': types,
                    'author': author,
                    'tags': tags,
                    'title': title,
                    'isPush': isPush,
                    'image': image,
                    'carousel': carousel,
                    'content': content,
                    'summary': summary
                }),
                success: function(res) {
                    if(res.status === 0) {
                        alert("上传成功！");
                        window.location.href = 'index.html';
                    }
                    if(res.status === 1) {
                        alert("上传资讯失败！请仔细查看原因，若原因不明可联系有关工作人员！")
                    }
                }
            });
        else return false;
    }

}


//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor');

function isFocus(e){
    alert(UE.getEditor('editor').isFocus());
    UE.dom.domUtils.preventDefault(e)
}
function setblur(e){
    UE.getEditor('editor').blur();
    UE.dom.domUtils.preventDefault(e)
}
function insertHtml() {
    var value = prompt('插入html代码', '');
    UE.getEditor('editor').execCommand('insertHtml', value)
}
function createEditor() {
    enableBtn();
    UE.getEditor('editor');
}
function getAllHtml() {
    alert(UE.getEditor('editor').getAllHtml())
}
function getContent() {
    var arr = [];
    arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getContent());
    alert(arr.join("\n"));
    console.log(arr);
}
function getPlainTxt() {
    var arr = [];
    arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getPlainTxt());
    alert(arr.join('\n'))
}
function setContent(isAppendTo) {
    var arr = [];
    arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
    UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
    alert(arr.join("\n"));
}
function setDisabled() {
    UE.getEditor('editor').setDisabled('fullscreen');
    disableBtn("enable");
}

function setEnabled() {
    UE.getEditor('editor').setEnabled();
    enableBtn();
}

function getText() {
    //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    var txt = UE.getEditor('editor').selection.getText();
    alert(txt)
}

function getContentTxt() {
    var arr = [];
    arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
    arr.push("编辑器的纯文本内容为：");
    arr.push(UE.getEditor('editor').getContentTxt());
    alert(arr.join("\n"));
    console.log(arr);
}
function hasContent() {
    var arr = [];
    arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
    arr.push("判断结果为：");
    arr.push(UE.getEditor('editor').hasContents());
    alert(arr.join("\n"));
}
function setFocus() {
    UE.getEditor('editor').focus();
}
function deleteEditor() {
    disableBtn();
    UE.getEditor('editor').destroy();
}
function disableBtn(str) {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        if (btn.id == str) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        } else {
            btn.setAttribute("disabled", "true");
        }
    }
}
function enableBtn() {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
    }
}

function getLocalData () {
    alert(UE.getEditor('editor').execCommand( "getlocaldata" ));
}

function clearLocalData () {
    UE.getEditor('editor').execCommand( "clearlocaldata" );
    alert("已清空草稿箱")
}
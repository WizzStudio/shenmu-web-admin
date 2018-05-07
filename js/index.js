const header = `
    <div class= "header">
        <div class="left-top">神木app管理后台</div>
        <div class="right-top">
            <button id="btn1" class="btn btn-primary">上传新资讯</button>
            <button id="btn2" class="btn btn-primary">App资讯列表</button>
        </div>
    </div>
`;
const footer = `
    <div class="footer">
        <span>版权所有 神木市政府 &copy 2018</span>
    </div>
`;
$(function(){
    $("header").html(header);
    $("footer").html(footer);
});
function menuBtn(which) {

}
const header = `
    <div class= "header">
        <div class="left-top">神木app管理后台</div>
        <div class="right-top">
            <button id="btn1" class="btn btn-primary" style="font-size: 28px">上传新资讯</button>
            <button id="btn2" class="btn btn-primary" style="font-size: 28px">App资讯列表</button>
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


$(function(){
    function initToolbarBootstrapBindings() {
        var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                'Times New Roman', 'Verdana'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
        $.each(fonts, function (idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
        });
        $('a[title]').tooltip({container:'body'});
        $('.dropdown-menu input').click(function() {return false;})
            .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
            .keydown('esc', function () {this.value='';$(this).change();});
        $('[data-role=magic-overlay]').each(function () {
            var overlay = $(this), target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
        });
        if ("onwebkitspeechchange"  in document.createElement("input")) {
            var editorOffset = $('#editor').offset();
            $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
        } else {
            $('#voiceBtn').hide();
        }
    };
    function showErrorAlert (reason, detail) {
        var msg='';
        if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
        else {
            console.log("error uploading file", reason, detail);
        }
        $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
    };
    initToolbarBootstrapBindings();
    $('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
    window.prettyPrint && prettyPrint();
});
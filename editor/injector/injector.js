/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.addEventListener("DOMContentLoaded", injectEditButton);

function injectEditButton()
{
    var button = document.createElement("A");
    var text = document.createTextNode("EDIT");
    button.appendChild(text);

    document.body.appendChild(button);
    button.href = "javascript:openEditorWindow()";
    button.style.position = "absolute";
    button.style.top = "10px";
    button.style.right = "20px";
    button.style.color = "#DDD";
    button.style.zIndex = "1000";

}
function openEditorWindow()
{
    {
        openEditInExternalWindow();
    }
}

function openEditInExternalWindow()
{
    var _window;
    var url = "../editor/index.html";

    if (window.threejsEditorWindow && !window.threejsEditorWindow.closed)
    {
        sendModelToEditor();
    } else
    {
        _window = window.open(url, "_blank", " width=1024, height=768");
        window.threejsEditorWindow = _window;
        _window.addEventListener("load", function () {

            //console.log(jsonStr);
            injectEditorCode(_window);
            sendModelToEditor();
        });
    }

}
function sendModelToEditor() {
    var this_scene = scene;
    var jsonObj = this_scene.toJSON();
    setTimeout(function () {
        var event = createCustomEvent(window.threejsEditorWindow.document, 'loadModelJson', jsonObj);
        window.threejsEditorWindow.dispatchEvent(event);
    }, 1000);
}
function createCustomEvent(documentInstance, name, data) {
    var event;
    var isIE = (navigator.userAgent.indexOf("MSIE") !== -1);
    if (isIE)
    {
        event = new CustomEvent(name, {detail: data});
        console.log("build custom event through CustomEvent");
    } else
    {
        event = documentInstance.createEvent('CustomEvent');
        event.initCustomEvent(name, true, true, data);
        console.log("build custom event through createEvent(IE methode)");
    }
    return event;
}

function injectEditorCode(_window)
{
    var _script = _window.document.createElement('SCRIPT');
    _script.src = "./injector/codeInEditor.js";
    _window.document.body.appendChild(_script);
}
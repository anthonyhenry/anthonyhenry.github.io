
function debugLog(msg)
{
    const DEBUG_DIV = document.createElement("div");
    DEBUG_DIV.innerText = msg;
    document.querySelector("#test").appendChild(DEBUG_DIV);
}
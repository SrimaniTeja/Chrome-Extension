if (typeof browser === "undefined") {
    var browser = chrome;
}
function reddenPage(url) {
}
var a=2
let dictionary = new Object();
chrome.webRequest.onBeforeRequest.addListener(tab => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.tabId },
            function: reddenPage,
            args: [tab.url],
        },
        () => { 
            console.log(tab.url,tab.tabId);
            if(safe(tab.url)){
                
            }else{
                console.log('exitttttttttttttt',tab.tabId,safe(tab.url))
                // const executing = chrome.tabs.executeScript(tab.id, {
                //     code: "window.stop();",
                //     allFrames: true,
                //     runAt: "document_start"
                // });
                chrome.scripting.executeScript({
                    target: {tabId: tab.tabId}
                },
                ()=>{
                    chrome.tabs.remove(tab.tabId)
                });
            }
         });
    },  {
        urls: ['<all_urls>']
});  

function safe(url){

    if(url.localeCompare("https://www.youtube.com/")==0){
        console.log('match',url)
        return false
    }
    return true
}

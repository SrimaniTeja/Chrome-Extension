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
            if(tab.tabId in dictionary){
                dictionary[tab.tabId]+=tab.url
            }
            else{
                dictionary[tab.tabId]=0;
            }
            console.log(dictionary)
         });
    },  {
        urls: ['<all_urls>']
});  

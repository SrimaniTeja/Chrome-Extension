var a=2
let dictionary = [];
let len=0;
let skipthisshit=false;
chrome.webRequest.onBeforeRequest.addListener(tab => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.tabId },
            args: [tab.url],
        },
        () => {
            skipthisshit=false
            for(let cit=0;cit<len;cit++){
                if(tab.tabId==dictionary[cit]){
                    skipthisshit=true
                    break;
                }
            }
            if(skipthisshit==false)
            {
                console.log(tab.url,tab.tabId,dictionary);
                len=dictionary.push(tab.tabId)
                if(safe(tab.url)){
                    
                }else{
                    console.log('exitttttttttttttt',tab.tabId)
                    chrome.scripting.executeScript({
                        target: {tabId: tab.tabId}
                    },
                    ()=>{
                        chrome.tabs.remove(tab.tabId)
                        console.log(dictionary.pop())
                    });
                }
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
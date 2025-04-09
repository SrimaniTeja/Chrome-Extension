var a=2
let dictionary = [];
let len=0;
let skipthisshit=false;
let sendid=''
let mime='',filename='',b64data='';
let allurls=[]


chrome.downloads.onChanged.addListener((delta) => {
  if (delta.state && delta.state.current === "complete") {
      chrome.downloads.search({ id: delta.id }, (results) => {
          if (results.length > 0) {
              const downloadedFile = results[0];
              const filePath = "file://" + downloadedFile.filename; // Get full file path

              fetch(filePath)
                  .then(response => response.blob()) // Convert to Blob
                  .then(blob => {
                      const file = new File([blob], downloadedFile.filename.split('/').pop(), {
                          type: blob.type,
                          lastModified: Date.now()
                      });

                      console.log("File Object:", file);
                      
                      const form = new FormData();

                      form.append('file', file);

                      const options = {
                        method: 'POST',
                        headers: {
                          accept: 'application/json',
                          'x-apikey': '38f63e942fdc9f5027407d6b08351e43ac7e11e27f432c1fb76b08ca4977b205'
                        }
                      };
                      options.body = form;

                      fetch('https://www.virustotal.com/api/v3/files', options)
                      .then(res => res.json())
                      .then(json =>{ 
                        sendid=json.data.id
                        console.log(sendid)
                        const url1 = 'https://www.virustotal.com/api/v3/analyses/'+sendid;
                        const options1 = {
                          method: 'GET',
                          headers: {
                            accept: 'application/json',
                            'x-apikey': '38f63e942fdc9f5027407d6b08351e43ac7e11e27f432c1fb76b08ca4977b205'
                          }
                        };
                        
                        fetch(url1, options1)
                          .then(res => res.json())
                          .then(json => {
                            // console.log(json)
                            console.log(json.data.attributes.stats)  
                          })
                          .catch(err => console.error(err));
                      })
                      .then(res => console.log(res))
                      .catch(err => console.error(err));
                  
                  })
                  .catch(error => console.error("Error loading file:", error));
          }
      });
  }
});



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
  
  allurls.push(url)

  if(url.localeCompare("https://www.youtube.com/")==0 || url.localeCompare("https://www.virustotal.com/api/v3/urls")==0){
    console.log('match',url)
    return false
  }
  truesafe(url)
    return true
}

function truesafe(sendurl){

const encodedParams = new URLSearchParams();
encodedParams.set('url', sendurl);

const url = 'https://www.virustotal.com/api/v3/urls';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'x-apikey': '38f63e942fdc9f5027407d6b08351e43ac7e11e27f432c1fb76b08ca4977b205',
    'content-type': 'application/x-www-form-urlencoded'
  },
  body: encodedParams
};

fetch(url, options)
  .then(res => res.json())
  .then(json =>{ 
    sendid=json.data.id
    console.log(sendid)
    const url1 = 'https://www.virustotal.com/api/v3/analyses/'+sendid;
    const options1 = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-apikey': '38f63e942fdc9f5027407d6b08351e43ac7e11e27f432c1fb76b08ca4977b205'
      }
    };
    
    fetch(url1, options1)
      .then(res => res.json())
      .then(json => console.log(json.data.attributes.stats))
      .catch(err => console.error(err));
  })
  .catch(err => console.log(err));
}



function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// Function to update data in chrome.storage.local
function updateStoredData() {
  let timestamp = new Date().toLocaleTimeString(); // Example dynamic data
  chrome.storage.local.set({ message: allurls }, () => {
      console.log("Data updated:", timestamp);
  });
}

// Update data whenever the popup is opened
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateData") {
      updateStoredData();
      sendResponse({ status: "Data updated!" });
  }
});

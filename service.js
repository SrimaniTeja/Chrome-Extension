var a=2;
let dictionary = [];
let len=0;
let skipthisshit=false;
let sendid='';
let mime='',filename='',b64data='';
let allurls=[]
let safetydata=[]
let blockedurls=[]
let whitelist=[]
let blacklist=[]

chrome.storage.local.set({ data: safetydata }, () => {
  console.log("data:",safetydata);
});
chrome.storage.local.set({ blocked: blockedurls}, () => {
  console.log("blocked",blockedurls);
});


//get white-listing and black-listing data
chrome.storage.sync.get("black-listing", (data) => {
  console.log("Retrieved data:", data.userPreference);
});

chrome.storage.sync.get("white-listing", (data) => {
  console.log("Retrieved data:", data.userPreference);
});


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

                      
                      const form = new FormData();

                      form.append('file', file);

                      const options = {
                        method: 'POST',
                        headers: {
                          accept: 'application/json',
                          'x-apikey': 'c678e0e55ed236fd5c4ce6751bdd25c05ec946daa71e04b9faa25aa969ca290c'
                        }
                      };
                      options.body = form;

                      fetch('https://www.virustotal.com/api/v3/files', options)
                      .then(res => res.json())
                      .then(json =>{ 
                        sendid=json.data.id
                        const url1 = 'https://www.virustotal.com/api/v3/analyses/'+sendid;
                        const options1 = {
                          method: 'GET',
                          headers: {
                            accept: 'application/json',
                            'x-apikey': 'c678e0e55ed236fd5c4ce6751bdd25c05ec946daa71e04b9faa25aa969ca290c'
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
                      setTimeout(() => {
                        chrome.tabs.remove(tab.tabId)
                        console.log(dictionary.pop())
                      }, 1000);
                    
                    });
                }
            }
         });
    },  {
        urls: ['<all_urls>']
});  


function safe(url){
  
  console.log(url,blacklist)
  if(blacklist.includes(url)){
    console.log(url,blacklist)
    return false
  }
  console.log(whitelist)
  if (url.startsWith("chrome-extension:")||url.startsWith("https://www.virustotal.com/api/v3/urls") ||whitelist.includes(url)){
    console.log("white",whitelist)
    return true;
  }
  truesafe(url)
  return true
}

function truesafe(sendurl){

  allurls.push(sendurl)

  const encodedParams = new URLSearchParams();
  encodedParams.set('url', sendurl);

  const url = 'https://www.virustotal.com/api/v3/urls';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'x-apikey': 'c678e0e55ed236fd5c4ce6751bdd25c05ec946daa71e04b9faa25aa969ca290c',
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
          'x-apikey': 'c678e0e55ed236fd5c4ce6751bdd25c05ec946daa71e04b9faa25aa969ca290c'
        }
      };
      
      fetch(url1, options1)
        .then(res => res.json())
        .then(json => {
          console.log(json.data.attributes.stats)
          safetydata.push(json.data.attributes.stats.malicious)
          safetydata.push(json.data.attributes.stats.suspicious)
          if(json.data.attributes.stats.malicious>0 || json.data.attributes.stats.suspicious>0){
            chrome.action.openPopup();
            blockedurls.push(sendurl)
            chrome.storage.local.set({ blocked: blockedurls}, () => {
              console.log("blocked",blockedurls);
            });
            
          }
          chrome.storage.local.set({ data: safetydata }, () => {
            console.log("data:",safetydata);
          });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.log(err));
}




// chrome.storage.sync.remove("userPreference", () => {
//   console.log("Data removed from sync storage!");
// });



// Function to update data in chrome.storage.local
function updateStoredData() {
  chrome.storage.local.set({ message: allurls }, () => {
  });
}

// Update data whenever the popup is opened
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateData") {
      updateStoredData();
      sendResponse({ status: "Data updated!" });
  }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "whitelist") {
      let updatedValue = message.newValue;
      whitelist.push(updatedValue)
    }
    else if(message.action === "blacklist") {
      let updatedValue = message.newValue;
      blacklist.push(updatedValue)
    }
    
    console.log("whitelist",whitelist,"blacklist",blacklist)
});

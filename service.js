var a=2
let dictionary = [];
let len=0;
let skipthisshit=false;
let sendid=''

let files=new Array(200)

function downloadSequentially(callback) {
  let index = 0;
  chrome.downloads.onChanged.addListener(f=>{
    console.log(f.filename.current,f);
    if(f.state.current=="complete"){
      console.log("download complete")
    }
  });
  // chrome.downloads.downloaditem
    chrome.downloads.onCreated.addListener(function(downloadItem) {
      console.log("New download:", downloadItem);
  });
  
  chrome.downloads.onChanged.addListener(function(delta) {
    if (delta.state && delta.state.current === "complete") {
        console.log("Download complete!", delta);
    }
  });
  

}
chrome.downloads.onCreated.addListener((downloadItem) => {
  console.log("Download started:", downloadItem.url);

  fetch(downloadItem.url)
      .then(response => response.blob())
      .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
              const base64Data = reader.result.split(',')[1]; // Extract Base64
              console.log("Base64 Data:", base64Data);
              // You can store or send this data as needed
          };
      })
      .catch(error => console.error("Error fetching file:", error));
});

downloadSequentially(() => console.log('done'))


// chrome.webRequest.onBeforeRequest.addListener(tab => {
//     chrome.scripting.executeScript(
//         {
//             target: { tabId: tab.tabId },
//             args: [tab.url],
//         },
//         () => {
//             skipthisshit=false
//             for(let cit=0;cit<len;cit++){
//                 if(tab.tabId==dictionary[cit]){
//                     skipthisshit=true
//                     break;
//                 }
//             }
//             if(skipthisshit==false)
//             {
//                 console.log(tab.url,tab.tabId,dictionary);
//                 len=dictionary.push(tab.tabId)
//                 if(safe(tab.url)){
                    
//                 }else{
//                     console.log('exitttttttttttttt',tab.tabId)
//                     chrome.scripting.executeScript({
//                         target: {tabId: tab.tabId}
//                     },
//                     ()=>{
//                         chrome.tabs.remove(tab.tabId)
//                         console.log(dictionary.pop())
//                     });
//                 }
//             }
//          });
//     },  {
//         urls: ['<all_urls>']
// });  

// function safe(url){

//     if(url.localeCompare("https://www.youtube.com/")==0){
//         console.log('match',url)
//         return false
//     }
//     return true
// }

// function truesafe(sendurl){

// const encodedParams = new URLSearchParams();
// encodedParams.set('url', sendurl);

// const url = 'https://www.virustotal.com/api/v3/urls';
// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json',
//     'x-apikey': '38f63e942fdc9f5027407d6b08351e43ac7e11e27f432c1fb76b08ca4977b205',
//     'content-type': 'application/x-www-form-urlencoded'
//   },
//   body: encodedParams
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json =>{ 
//     sendid=json.data.id
//     console.log(sendid)
//     const url1 = 'https://www.virustotal.com/api/v3/analyses/'+sendid;
//     const options1 = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         'x-apikey': '38f63e942fdc9f5027407d6b08351e43ac7e11e27f432c1fb76b08ca4977b205'
//       }
//     };
    
//     fetch(url1, options1)
//       .then(res => res.json())
//       .then(json => console.log(json))
//       .catch(err => console.error(err));
//   })
//   .catch(err => console.log(err));
// }

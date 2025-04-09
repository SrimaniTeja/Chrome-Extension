//extension ribbon
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tablinks");
    const tabContents = document.querySelectorAll(".tabcontent");
  
    function openTab(event) {
      tabContents.forEach(content => {
        content.style.display = "none";
      });
  
      tabs.forEach(tab => {
        tab.classList.remove("active");
      });
  
      const tabName = event.target.getAttribute("data-tab");
      document.getElementById(tabName).style.display = "block";
  
      event.target.classList.add("active");
    }
  
    tabs.forEach(tab => {
      tab.addEventListener("click", openTab);
    });
  
    tabs[0].click();
});
  

document.addEventListener("DOMContentLoaded", () => {
const tabs = document.querySelectorAll(".tablinks");
const tabContents = document.querySelectorAll(".tabcontent2");

function openTab(event) {
    tabContents.forEach(content => {
    content.style.display = "none";
    });

    tabs.forEach(tab => {
    tab.classList.remove("active");
    });

    const tabName = event.target.getAttribute("data-tab");
    document.getElementById(tabName).style.display = "block";

    event.target.classList.add("active");
}

tabs.forEach(tab => {
    tab.addEventListener("click", openTab);
});

// Open the first tab by default
tabs[0].click();
});


document.addEventListener("DOMContentLoaded", () => {
// Request `service.js` to update data
chrome.runtime.sendMessage({ action: "updateData" }, (response) => {
    console.log(response.status); // Debugging

    // After updating, fetch and display the latest data
    chrome.storage.local.get(["message"], (result) => {
        console.log("Retrieved Data:", result); // Debugging
        

        for (let i = 0; i < result.message.length; i++) {
            
            let p = document.getElementById("url-history");
            let textNode = document.createTextNode(result.message[i]);
            let br = document.createElement("br");

            p.appendChild(textNode);
            p.appendChild(br);
        }

    });
    chrome.storage.local.get(["data"], (result) => {
        console.log("Retrieved Data:", result); // Debugging
        for (let i = 0; i < result.data.length; i+=2) {
            
            let p = document.getElementById("url-data1");
            let textNode = document.createTextNode(result.data[i]);
            let br = document.createElement("br");

            p.appendChild(textNode);
            p.appendChild(br);
            
            let p2 = document.getElementById("url-data2");
            let textNode2 = document.createTextNode(result.data[i+1]);
            let br2 = document.createElement("br");

            p2.appendChild(textNode2);
            p2.appendChild(br2);
        }
    });
});
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Wlist").addEventListener("click", function () {
        let inputElement = document.getElementById("whitelist");
        let url = inputElement.value.trim();

        if (url === "") {
            alert("Please enter a URL!");
            return;
        }
        
        chrome.runtime.sendMessage({ action: "whitelist", newValue: url });
    });
    document.getElementById("Blist").addEventListener("click", function () {
        let inputElement = document.getElementById("blacklist");
        let url = inputElement.value.trim();

        if (url === "") {
            alert("Please enter a URL!");
            return;
        }
        
        chrome.runtime.sendMessage({ action: "blacklist", newValue: url });
    });
});

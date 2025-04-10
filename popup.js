let mode=document.getElementById('mode').defaultChecked;



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

  // Open the first tab by default
  tabs[0].click();
});


//Form ribbon
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



// menu icon
document.getElementById("span").addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "250px";
});

document.getElementById("closeNavBtn").addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "0";
});






//popup window i.e, MORE in menu-bar
document.getElementById("options").addEventListener("click", () => {
  const popupWidth = 800;
  const popupHeight = 450;

  //position for centering the popup
  const left = (window.screen.width - popupWidth) / 2;
  const top = (window.screen.height - popupHeight) / 2;

  window.open(
    "form.html",
    "",
    `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
  );
});

//popup window i.e, MORE in main
// document.getElementById("moreoptions").addEventListener("click", () => {
//   const popupWidth = 800;
//   const popupHeight = 450;

//   //position for centering the popup
//   const left = (window.screen.width - popupWidth) / 2;
//   const top = (window.screen.height - popupHeight) / 2;

//   window.open(
//     "form.html",
//     "",
//     `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
//   );
// });
document.addEventListener("DOMContentLoaded", () => {
  // Request `service.js` to update data
  chrome.runtime.sendMessage({ action: "updateData" }, (response) => {
      console.log(response.status); // Debugging

      // After updating, fetch and display the latest data
      chrome.storage.local.get(["blocked"], (result) => {
          console.log(result)

          for (let i = 0; i < result.blocked.length; i++) {
              
            let p = document.getElementById("blocked-content");
            let textNode = document.createTextNode(result.blocked[i]);
            let br = document.createElement("br");

            p.appendChild(textNode);
            p.appendChild(br);
          }
          
      });
  });
});


// chrome.storage.sync.set({ userPreference: "dark-mode" }, () => {
//   console.log("Data saved and synced!");
// });





const checkbox = document.getElementById('mode')

checkbox.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    mode=true;
  } else {
    mode=false;
  }
  chrome.storage.local.set({ key: mode }, () => {
    console.log("mode:",mode);
  });
})

chrome.storage.local.get(["key"], (result) => {
  if (chrome.runtime.lastError) {
      console.error("Error retrieving data:", chrome.runtime.lastError);
  } else {
      console.log(mode)
      mode=result.key
      console.log(mode,result.key)
      document.getElementById("mode").checked = mode;
  }
});

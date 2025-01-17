//ribbon
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

// menu icon
document.getElementById("span").addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "250px";
});

document.getElementById("closeNavBtn").addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "0";
});






//popup window i.e, MORE
document.getElementById("options").addEventListener("click", () => {
  const popupWidth = 600;
  const popupHeight = 400;

  //position for centering the popup
  const left = (window.screen.width - popupWidth) / 2;
  const top = (window.screen.height - popupHeight) / 2;

  window.open(
    "form.html",
    "",
    `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
  );
});

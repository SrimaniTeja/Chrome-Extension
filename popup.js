// Add event listeners to tab buttons
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tablinks");
  const tabContents = document.querySelectorAll(".tabcontent");

  // Function to open the corresponding tab
  function openTab(event) {
    // Hide all tab contents
    tabContents.forEach(content => {
      content.style.display = "none";
    });

    // Remove active class from all tab buttons
    tabs.forEach(tab => {
      tab.classList.remove("active");
    });

    // Show the clicked tab content
    const tabName = event.target.getAttribute("data-tab");
    document.getElementById(tabName).style.display = "block";

    // Add active class to the clicked button
    event.target.classList.add("active");
  }

  // Add click event listeners to all tab buttons
  tabs.forEach(tab => {
    tab.addEventListener("click", openTab);
  });

  // Open the first tab by default
  tabs[0].click();
});

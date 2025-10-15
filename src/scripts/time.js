function updateDateTime() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    };
    document.getElementById("current-time").innerText =
      now.toLocaleString("en-US", options);
  }
  

  updateDateTime();

  setInterval(updateDateTime, 1000);
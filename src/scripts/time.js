document.addEventListener("DOMContentLoaded", function () {
    function updateTime() {
      const now = new Date();
      const formatted = now.toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
  
      const timeBlock = document.getElementById("current-time");
      if (timeBlock) {
        timeBlock.textContent = formatted;
      }
    }
  
    updateTime();
    setInterval(updateTime, 1000);
  });



  function updateTime() {
    const now = new Date();
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    const formattedTime = now.toLocaleTimeString([], options);
    document.getElementById("current-time").textContent = formattedTime;
  }
  
  // запускаем сразу и обновляем каждую секунду
  updateTime();
  setInterval(updateTime, 1000);
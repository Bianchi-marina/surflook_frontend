export function applyStoredTheme() {
    const storedTheme = localStorage.getItem("theme") || "light"; 
    const html = document.querySelector("html");
    html.setAttribute("data-theme", storedTheme);
  
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      img.src = img.src.replace("/light/", `/${storedTheme}/`).replace("/dark/", `/${storedTheme}/`);
    });
  }
  
  export function toggleTheme() {
    const html = document.querySelector("html");
    const images = document.querySelectorAll("img");
  
    if (html.getAttribute("data-theme") === "light") {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");  
      images.forEach(img => {
        img.src = img.src.replace("/light/", "/dark/");
      });
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");  
      images.forEach(img => {
        img.src = img.src.replace("/dark/", "/light/");
      });
    }
  }
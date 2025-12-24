let inactivityTimer;
      const INACTIVITY_LIMIT = 120000; // 2 minutes
    
      function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          location.reload();
        }, INACTIVITY_LIMIT);
      }
    
      function startInactivityRefresh() {
        // Start timer
        resetInactivityTimer();
    
        // Activity listeners
        ["mousemove", "keydown", "scroll", "click", "touchstart"].forEach(event => {
          document.addEventListener(event, resetInactivityTimer);
        });
      }
function checkPassword() {
        const pw = document.getElementById('pw').value;
        const error = document.getElementById('pw-error');
        
        if (pw === 'Websitegames') {
          error.style.display = 'none';
    
          document.getElementById('password-area').style.display = 'none';
          const content = document.getElementById('content');
          content.style.display = 'block';
          setTimeout(() => content.classList.add('show'), 10);
    
          startInactivityRefresh(); // keep your inactivity refresh
        } else {
          error.style.display = 'block';
        }
      }
      document.querySelectorAll('a').forEach(a => a.target = '_blank');
 const officialOrigin = "https://www.nolangraysongames.com";
    
      if (window.location.origin !== officialOrigin) {
        document.getElementById("unofficial-warning").style.display = "flex";
      }
    
      function closeWarning() {
        document.getElementById("unofficial-warning").style.display = "none";
      }
const canvas = document.getElementById("bg");
      const ctx = canvas.getContext("2d");
    
      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      window.addEventListener("resize", resize);
      resize();
    
      const stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        s: Math.random() * 0.3 + 0.1
      }));
    
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
    
        stars.forEach(star => {
          star.y += star.s;
          if (star.y > canvas.height) star.y = 0;
    
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        });
    
        requestAnimationFrame(animate);
      }
    
      animate();
      function searchLinks() {
        const input = document.getElementById("search").value.toLowerCase();
        const links = document.querySelectorAll("#content a");
        const headers = document.querySelectorAll("#content h2, #content h5, #content h6, #content p"); // select all h2 in content
        
        // Show/hide links based on search
        links.forEach(link => {
          const text = link.textContent.toLowerCase();
          link.style.display = text.includes(input) ? "inline-block" : "none";
        });
      
        // Show/hide headers based on search input
        headers.forEach(h => {
          h.style.display = input ? "none" : "block";
        });
      }
 document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            const search = document.getElementById("search");
              if (search) {
                search.value = "";
                searchLinks(); // show all links again
              }
          }
      });
function clearSearch() {
        const search = document.getElementById("search");
        search.value = "";
        searchLinks(); // show all links again
        search.focus(); // optional: focus input after clearing
      }
const favoritesKey = "favoriteLinks";
    
      function getFavorites() {
        return JSON.parse(localStorage.getItem(favoritesKey)) || [];
      }
    
      function saveFavorites(favs) {
        localStorage.setItem(favoritesKey, JSON.stringify(favs));
      }
    
      function toggleFavorite(link) {
        const href = link.href;
        let favs = getFavorites();
        const star = link.nextElementSibling;
      
        if (favs.includes(href)) {
          favs = favs.filter(f => f !== href);
        } else {
          favs.push(href);
      
          // ⭐ Animate when starring
          star.classList.add("animate");
          setTimeout(() => star.classList.remove("animate"), 350);
        }
      
        saveFavorites(favs);
        renderFavorites();
        updateStars();
      }

    
      function renderFavorites() {
        const favs = getFavorites();
        const favContainer = document.getElementById("favorites");
        const title = document.getElementById("favorites-title");
    
        favContainer.innerHTML = "";
    
        if (favs.length === 0) {
          title.style.display = "none";
          return;
        }
    
        title.style.display = "block";
    
        favs.forEach(href => {
          const original = document.querySelector(`a[href="${href}"]`);
          if (original) {
            const clone = original.cloneNode(true);
            clone.querySelector(".star")?.remove();
            favContainer.appendChild(clone);
          }
        });
      }
    
      function updateStars() {
        const favs = getFavorites();
    
        document.querySelectorAll(".star").forEach(star => {
          const link = star.previousElementSibling;
          if (favs.includes(link.href)) {
            star.classList.add("favorited");
          } else {
            star.classList.remove("favorited");
          }
        });
      }
    
      function addStarsToLinks() {
        document.querySelectorAll("#content a").forEach(link => {
          if (link.nextElementSibling?.classList.contains("star")) return;
    
          const star = document.createElement("span");
          star.textContent = "★";
          star.className = "star";
          star.onclick = () => toggleFavorite(link);
    
          link.after(star);
        });
    
        updateStars();
      }
    
      // Initialize
      addStarsToLinks();
      renderFavorites();
function showCategory(category) {
        const categories = document.querySelectorAll(".category");
        const favTitle = document.getElementById("favorites-title");
        const favs = document.getElementById("favorites");
      
        // Hide everything first
        categories.forEach(cat => cat.style.display = "none");
        favTitle.style.display = "none";
        favs.style.display = "none";
      
        if (category === "all") {
          categories.forEach(cat => cat.style.display = "block");
          if (favs.children.length > 0) {
            favTitle.style.display = "block";
            favs.style.display = "block";
          }
        } 
        else if (category === "favorites") {
          favTitle.style.display = "block";
          favs.style.display = "block";
        } 
        else {
          document
            .querySelector(`.category[data-category="${category}"]`)
            .style.display = "block";
        }
      }
function sortLinks() {
          const sortType = document.getElementById("sort").value;
          const categories = document.querySelectorAll(".category");
        
          categories.forEach(category => {
            const links = Array.from(category.querySelectorAll("a"));
        
            links.sort((a, b) => {
              const textA = a.textContent.toLowerCase();
              const textB = b.textContent.toLowerCase();
        
              if (sortType === "az") return textA.localeCompare(textB);
              if (sortType === "za") return textB.localeCompare(textA);
        
              if (sortType === "favorites") {
                const favs = getFavorites();
                const aFav = favs.includes(a.href);
                const bFav = favs.includes(b.href);
        
                if (aFav === bFav) return textA.localeCompare(textB);
                return aFav ? -1 : 1;
              }
            });
        
            // Re-append sorted links (and stars stay attached)
            links.forEach(link => {
              const star = link.nextElementSibling;
              category.appendChild(link);
              if (star?.classList.contains("star")) {
                category.appendChild(star);
              }
            });
          });
        }
function saveAndSort() {
            const sortValue = document.getElementById("sort").value;
            localStorage.setItem("sortOption", sortValue);
            sortLinks();
          }
          
          // Load saved sort on page load
          document.addEventListener("DOMContentLoaded", () => {
            const savedSort = localStorage.getItem("sortOption");
            if (savedSort) {
              document.getElementById("sort").value = savedSort;
              sortLinks();
            }
          });
function toggleTheme() {
              const body = document.body;
              const btn = document.getElementById("themeToggle");
            
              body.classList.toggle("light");
            
              if (body.classList.contains("light")) {
                localStorage.setItem("theme", "light");
                btn.textContent = "☀️ Light";
              } else {
                localStorage.setItem("theme", "dark");
                btn.textContent = "🌙 Dark";
              }
            }
            
            // Load saved theme on page load
            document.addEventListener("DOMContentLoaded", () => {
              const savedTheme = localStorage.getItem("theme");
              const btn = document.getElementById("themeToggle");
            
              if (savedTheme === "light") {
                document.body.classList.add("light");
                btn.textContent = "☀️ Light";
              } else {
                btn.textContent = "🌙 Dark";
              }
            });
function setTheme(theme) {
                document.body.className = theme;
                localStorage.setItem("theme", theme);
              }
              
              // Load saved theme
              document.addEventListener("DOMContentLoaded", () => {
                const savedTheme = localStorage.getItem("theme") || "dark";
                document.body.className = savedTheme;
                document.getElementById("themeSelect").value = savedTheme;
              });

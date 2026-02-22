document.addEventListener("DOMContentLoaded", async () => {

    try {
      const response = await fetch("http://localhost:3000/publications");
      const publications = await response.json();
  
      const container = document.getElementById("publications-container");
  
      publications.forEach(pub => {
  
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";
  
        col.innerHTML = `
          <article class="card h-100 border-dark border-2 rounded-4 shadow-sm overflow-hidden">
              <div class="bg-black d-flex justify-content-center align-items-center" style="height: 200px;">
                  <img src="images/Jad.png" alt="Blog Image" style="max-height: 150px;">
              </div>
  
              <div class="text-center text-black h5 px-3 py-2 fw-bold border-dark border-2">
                  ${pub.titre}
              </div>
  
              <div class="card-body">
                  <p class="card-text text-dark">
                      ${pub.contenu}
                  </p>
                  <small class="text-muted">
                      ${pub.auteur} — ${pub.datePublication}
                  </small>
              </div>
              <div class="card-body text-center">
                <a href="pageBlog.html?id=${pub.id}" class="btn btn-primary">
                    Lire la suite
                </a>
            </div>
          </article>
        `;
  
        container.appendChild(col);
      });
  
    } catch (error) {
      console.error("Erreur API :", error);
    }
  
  });
  
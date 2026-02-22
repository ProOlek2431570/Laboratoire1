document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    if (!id) {
      console.error("Aucun id trouvé dans l'URL");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/publications/${id}`);
      const publication = await response.json();
  
      // Remplir le titre
      document.getElementById("blog-titre").textContent = publication.titre;
  
      // Remplir le contenu
      document.getElementById("blog-contenu").innerHTML = `
          <p>${publication.contenu}</p>
          <p class="mt-4 text-muted">
            ${publication.auteur} — ${publication.datePublication}
          </p>
      `;
      // ===== Charger commentaires =====
const responseCommentaires = await fetch(`http://localhost:3000/commentaires?publicationId=${id}`);
const commentaires = await responseCommentaires.json();

const commentairesContainer = document.getElementById("commentaires");

commentaires.forEach(c => {
  const div = document.createElement("div");
  div.className = "card p-2 mb-2";
  div.innerHTML = `
      <strong>${c.auteur ?? "Anonyme"}</strong>
      <p class="mb-0">${c.contenu}</p>
  `;
  commentairesContainer.appendChild(div);
});

        
    } catch (error) {
      console.error("Erreur API :", error);
    }
// ===== Ajouter commentaire =====
document.getElementById("btnCommenter").addEventListener("click", async () => {

    const id = new URLSearchParams(window.location.search).get("id");
    const contenu = document.getElementById("nouveauCommentaire").value.trim();
  
    if (!contenu) return;
  
    const commentaire = {
      id: Date.now(),
      publicationId: id,
      contenu: contenu,
      date: new Date().toISOString()
    };
  
    try {
      const response = await fetch("http://localhost:3000/commentaires", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commentaire)
      });
  
      if (response.ok) {
  
        // Ajouter immédiatement dans la page
        const div = document.createElement("div");
        div.className = "card p-2 mb-2";
        div.innerHTML = `<p class="mb-0">${contenu}</p>`;
  
        document.getElementById("commentaires").prepend(div);
  
        document.getElementById("nouveauCommentaire").value = "";
      }
  
    } catch (error) {
      console.error("Erreur ajout commentaire :", error);
    }
  
  });
  
  
  });
  
  
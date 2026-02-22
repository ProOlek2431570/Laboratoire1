$(document).ready(function () {

    $("#formPublication").submit(function (e) {
        e.preventDefault();

        $("#dialog-confirm").dialog({
            resizable: false,
            modal: true,
            buttons: {
                "Confirmer": function () {

                    const publication = {
                        id: Date.now(), // ID automatique
                        titre: $("#titre").val(),
                        auteur: $("#auteur").val(),
                        contenu: $("#contenu").val(),
                        date: new Date().toISOString() // Date automatique
                    };

                    fetch("http://localhost:3000/publications", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(publication)
                    })
                    .then(response => response.json())
                    .then(() => {
                        window.location.href = "index.html";
                    });

                    $(this).dialog("close");
                },
                "Annuler": function () {
                    $(this).dialog("close");
                }
            }
        });

    });

});

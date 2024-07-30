document
    .querySelector("#uploadResume")
    .addEventListener("click", function () {
        document.querySelector("#loader").style.display = "flex"
        document.querySelector("#uploadResume").style.cursor = "not-allowed"

        var files = document.querySelector("#resume").files;

        if (!files || !files[0]) {
        document.querySelector("#loader").style.display = "none"
        document.querySelector("#uploadResume").style.cursor = "pointer"
            return alert("select some resume first");
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(`${i}`, files[i], `${i}.pdf`);
        }

        resumeUpload(formData);
    });

async function resumeUpload(formData) {
    try {
        const origin = window.location.origin;
        const url = `${origin}/v1/parser`;

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        document.querySelector("#loader").style.display = "none"

        document.querySelector("#downloadData").href = `${origin}${json.link}`;
        document.querySelector("#downloadData").style.display = `block`;
        document.querySelector("#uploadResume").style.cursor = "pointer"
         document.querySelector("#uploadResume").style.pointerEvents = "none"

        // window.location.href = `${origin}${json.link}`;
    } catch (error) {
        console.error(error.message);
    }
}
// const API = "https://api.thecatapi.com/v1/images/search?limit=3"
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_9REBz0Dd13JZUfwPrJkdW81yy9adIe7gSFILE8RrRcH5VNwmBU5q7yQN0CAB17vX";

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=5&api_key=live_9REBz0Dd13JZUfwPrJkdW81yy9adIe7gSFILE8RrRcH5VNwmBU5q7yQN0CAB17vX";

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_9REBz0Dd13JZUfwPrJkdW81yy9adIe7gSFILE8RrRcH5VNwmBU5q7yQN0CAB17vX`;

const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload?limit=1&api_key=live_9REBz0Dd13JZUfwPrJkdW81yy9adIe7gSFILE8RrRcH5VNwmBU5q7yQN0CAB17vX";

async function loadRandomCats() {
    const response = await fetch(API_URL_RANDOM)
    const data = await response.json()

    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status + data.message
    } else {
        const imgCat1 = document.getElementById("cat1")
        const imgCat2 = document.getElementById("cat2")
        const imgCat3 = document.getElementById("cat3")
        // BOTONES DE AGREGAR CATS A FAVORITE
        const saveButtonCat1 = document.getElementById("savebutton1")
        const saveButtonCat2 = document.getElementById("savebutton2")
        const saveButtonCat3 = document.getElementById("savebutton3")

        imgCat1.src = data[0].url
        imgCat2.src = data[1].url
        imgCat3.src = data[2].url

        // SE AGREGAN LOS CATS A FAVORITES

        saveButtonCat1.onclick = () => {
            saveFavoritescats(data[0].id)
            saveButtonCat1.classList = 'liked';
        }
        saveButtonCat2.onclick = () =>{
            saveFavoritescats(data[1].id)
            saveButtonCat2.classList = 'liked'
        }
        saveButtonCat3.onclick = () =>{
            saveFavoritescats(data[2].id)
            saveButtonCat3.classList = 'liked'
        }
    }
}

const inputCat = document.getElementById("recargar")
inputCat.onclick = loadRandomCats

async function loadFavoritesCats() {
    const response = await fetch(API_URL_FAVORITES + '&order=DESC')
    const data = await response.json()

    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status + data.message

    } else {
        data.forEach((cat, i) => {
            const img = document.getElementById("favoritecat" + parseInt(i+1))
            img.src = cat.image.url

        // BOTONES DE ELIMINAR CAT DE FAVORITO

        const deleteButtonCat = document.getElementById("deletebuttoncat"  + parseInt(i+1))

        // SE ELIMINAN LOS CATS DE FAVORITOS

        deleteButtonCat.onclick = () => deleteFavoritescats(cat.id)
        })
    }
    loadFavoritesCats()
}

const imageUp = document.getElementById('file');
    const michiUp = document.getElementById('catUp');
    imageUp.onchange = evt => {
        const [file] = imageUp.files
        if (file) {
            catUp.src = URL.createObjectURL(file)
        }
    }




async function saveFavoritescats(id) {
    const rest = await fetch(API_URL_FAVORITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            image_id: id
        })
    })
    loadFavoritesCats()
}

async function deleteFavoritescats(id) {
    const rest = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: "DELETE",
    })
    loadFavoritesCats()
}

async function upLoadCatPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form)
    
    const res = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
    loadFavoritesCats()
    
}

loadRandomCats()
loadFavoritesCats()

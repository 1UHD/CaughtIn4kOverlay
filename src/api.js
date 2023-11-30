function get_mojang_uuid(name) {
    fetch(`https://api.mojang.com/users/profiles/minecraft/${name}?`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Ratelimited")
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error("Found error while grabbing stats: ", error)
    })
}

get_mojang_uuid("vjoierjdsoidsdjsoivdjsoids")
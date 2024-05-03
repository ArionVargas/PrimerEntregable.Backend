import { response } from "express"

const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => obj[key] = value)

    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            return response.json()
                .then(data => {
                    console.log('Cookies generadas en login public')
                    console.log(document.cookie)

                    /* console.log(data)
                    if (data.status === 'success') {
                       
                        window.location.replace('/api/products')
                    } else {
                       
                        window.location.replace('/login')
                    } */
                })
        } else if (response.status === 401) {
            console.log(response)
            /* window.location.replace('/login') */
        }
    })
})

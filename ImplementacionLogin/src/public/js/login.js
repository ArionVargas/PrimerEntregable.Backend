const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('en login form');
    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => obj[key] = value)
    console.log('en login form');
    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(response => {
        if (response.status === 200) {
            console.log('en login')
            console.log(response);
            return response.json()
                .then(data => {
                    if (data.status === 'success') {
                       console.log(data);
                       /*  window.location.replace('/api/products', data.user) */
                        window.location.replace('api/products', data.user)
                    } else {
                       
                        window.location.replace('/login')
                    }
                })
        } else if (response.status === 401) {
            
            window.location.replace('/login')
        }
    })
})

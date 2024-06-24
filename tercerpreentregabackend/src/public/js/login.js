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
        },
        credentials: 'include'
    }).then(response => {
        if (response.status === 200) {
            
            return response.json()
                .then(data => {
                    if (data.status === 'success') {
                      
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

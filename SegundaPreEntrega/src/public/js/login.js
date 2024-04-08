
const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault()
   
    const data = new FormData(form)
   
    const obj = {};
    
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Respuesta recibida de response:', response)
        return response.json()
        }).then(data => {
            
            if (data.status === 'success') {
               
                window.location.replace('/api/products')
            } else {
               
                window.location.replace('/login')
            }
        })
        .catch(error => {
           
            window.location.replace('/login')
        })
})

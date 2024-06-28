const connectBtn = document.getElementById('connectBtn') as HTMLButtonElement
const connectForm = document.getElementById('connectForm') as HTMLFormElement
console.log(connectForm)
const emailElement = <HTMLInputElement>document.getElementById('email')
const passwordElement = document.getElementById('password') as HTMLInputElement

const adminsList: Array<{ email: string; password: string }> = JSON.parse(localStorage.getItem('admins') || '[]')

const connectError = (message: string): void => {
    connectForm.reset()
    const errorMessage: HTMLElement = document.createElement('p')
    errorMessage.innerText = message
    errorMessage.classList.add('text-red-500', 'text-center')
    connectForm.appendChild(errorMessage)
    setTimeout((): void => {
        errorMessage.remove()
    }, 2000)
}

connectBtn.addEventListener('click', (event): void => {
    event.preventDefault()
    const emailValue: string = emailElement.value
    const passwordValue: string = passwordElement.value
    const validValues: boolean = (emailValue !== '' && isNaN(parseInt(emailValue))) && (passwordValue !== '' && isNaN(parseInt(passwordValue)))
    if (!validValues) {
        connectError('Tout les champs doivent être rempli')
    }
    else {
        let adminExist: boolean = false
        adminsList.forEach((element): void => {
            if (element.email === emailValue && element.password === passwordValue) {
                adminExist = true
                sessionStorage.setItem('isConnected', JSON.stringify(true))
                window.location.href = './index.html'
            }
        })
        if (!adminExist) {
            connectError('Les identifiants sont incorrectes');
        }


    }
})
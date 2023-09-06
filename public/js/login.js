const form = document.querySelector("form")
const emailInput = document.getElementById("emailInput")
const passwordInput = document.getElementById("passwordInput")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const userData = {
    email: emailInput.value,
    password: passwordInput.value,
  }

  fetch("/api/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.status === 200) {
      window.location.assign("/")
    }
  })
  .catch(err => console.log(err))
})
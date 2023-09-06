const logout = document.getElementById("logout")

logout.addEventListener("click", (event) => {
  event.preventDefault()
  console.log("clicked")
  fetch("/api/users/logout", {
    method: "post",
  })
  .then(response => {
    if (response.status === 204) {
      window.location.assign("/")
    }
  })
  .catch(err => console.log(err))
})
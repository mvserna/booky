const fetchAuthentication = async (setAuthenticated) => {
  try {
    const response = await fetch("/api/v1/users", {
      credentials: "same-origin",
    })
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`)
    }
    const responseBody = await response.json()
    setAuthenticated(responseBody.authenticated)
  } catch (err) {
    console.log(err)
  }
}

export default fetchAuthentication
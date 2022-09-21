export function getUserId() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
        return loggedUser.id
    }
    return undefined;
}


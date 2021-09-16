module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', mail: '', password: ''}

    if (err.message.includes("pseudo"))
        errors.pseudo = "Pseudo incorrecte ou déjà pris";

    if (err.message.includes("mail"))
        errors.mail = "Email incorrecte ou déjà pris";

    if (err.message.includes("password"))
        errors.password = "Mot de passe incorrecte, 6 caractères minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = 'Ce pseudo est déjà enregistré'

    if (err.code === 11000 && (Object.keys(err.keyValue)[0].includes("email")))
        errors. mail = 'Cet email est déjà enregistré'

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = { pseudo: '', password: ''}

    if (err.message.includes("pseudo"))
        errors.pseudo = "Pseudo inconnu";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe ne correspond pas";

    return errors;
}
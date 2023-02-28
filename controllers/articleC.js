const test = (req,res) => {
    return res.status(200),json({
        mensaje:'Prueba controlador articles'
    });
}

module.exports = {
    test
}
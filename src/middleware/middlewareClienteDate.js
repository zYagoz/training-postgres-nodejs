const validateEmailName = (req, res, next) =>{
    const {name, email} = req.params;
    if(!name || !email) return res.staus(400).message({
        message: `Nome e Email devem ser fornecidos`
    });

    next();
}
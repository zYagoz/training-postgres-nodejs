export const middlewareId = (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({
        message: `ID inválido`
    })
    next();
}
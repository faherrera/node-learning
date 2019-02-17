
const MESSAGE_500 = 'Ocurrió un error en el servidor, intente nuevamente';
const MESSAGE_404 = 'No se encontró el recurso solicitado';
const MESSAGE_200 = 'Se encontró el recurso solicitado';

const serverError500 = (res,payload) => {
    res
        .status(500)
        .send(
            payload || {message : MESSAGE_500}
        )
};

const serverError404 = (res,payload) => {
    res
        .status(404)
        .send(
            payload || {message : MESSAGE_404}
        )
};
const serverError200 = (res,data,payload) => {
    res
        .status(200)
        .send(
            payload || {message : MESSAGE_200, data}
        )
};

module.exports = {
    serverError500,
    serverError404,
    serverError200,
};
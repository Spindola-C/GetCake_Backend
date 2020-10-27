const execSQLQuery = require('../utils/execSqlQuery')

class ClienteController {
    async create(req, res) {
        const nome = req.body.nome.substring(0, 60)
        const tipo = req.body.tipo.substring(0, 1)
        const cpfCnpj = req.body.cpfCnpj
        await execSQLQuery(`INSERT INTO CLIENTE(NM_CLIENTE, TIPO_CLIENTE, CPF_CNPJ) 
                            VALUES('${nome}','${tipo}','${cpfCnpj}')`, res)
    }
    async read(req, res) {
        const { nome } = req.query
        await execSQLQuery(`SELECT * FROM CLIENTE WHERE NM_CLIENTE = '${nome}'`, res)
    }
    async update(req, res) {
        const id = parseInt(req.params.id)
        const nome = req.body.nome.substring(0, 20)
        const tipo = req.body.tipo.substring(0, 1)
        const cpfCnpj = req.body.cpfCnpj
        await execSQLQuery(`UPDATE CLIENTE SET NM_CLIENTE='${nome}', TIPO_CLIENTE='${tipo}',
                            CPF_CNPJ='${cpfCnpj}' WHERE ID_CLIENTE=${id}`, res)
    }
    async delete(req, res) {
        const id = parseInt(req.params.id)
        await execSQLQuery(`DELETE CLIENTE WHERE ID_CLIENTE='${id}'`, res)
    }
}


module.exports = ClienteController
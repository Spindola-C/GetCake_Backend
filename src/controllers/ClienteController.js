const execSqlQuery = require('../utils/execSqlQuery')

const ClienteController = {
    create: async (req, res) => {
        const nome = req.body.nome.substring(0, 60)
        const tipo = req.body.tipo.substring(0, 1)
        const cpfCnpj = req.body.cpfCnpj.substring(0, 20)
        await execSqlQuery(`INSERT INTO CLIENTE(NM_CLIENTE, TIPO_CLIENTE, CPF_CNPJ) 
                            VALUES('${nome}','${tipo}','${cpfCnpj}')`, res)
    },
    index: async (req, res) => {
        const { cpf_cnpj } = req.query
        await execSqlQuery(`SELECT * FROM CLIENTE AS C 
                            JOIN TELEFONE AS T ON C.ID_CLIENTE = T.ID_TEL_CLIENTE
                            JOIN ENDERECO AS E ON C.ID_CLIENTE = E.ID_END_CLIENTE
                            WHERE C.CPF_CNPJ='${cpf_cnpj}'`, res)
    },
    search: async (req, res) => {
        const { nome } = req.query
        await execSqlQuery(`SELECT * FROM CLIENTE WHERE NM_CLIENTE LIKE '%${nome}%'`, res)
    },
    getId: async (req, res) => {
        const { cpf_cnpj } = req.query
        await execSqlQuery(`SELECT ID_CLIENTE AS idCliente FROM CLIENTE WHERE CPF_CNPJ='${cpf_cnpj}'`, res)
    },
    update: async (req, res) => {
        const { id } = req.params
        const nome = req.body.nome.substring(0, 60)
        const tipo = req.body.tipo.substring(0, 1)
        const cpfCnpj = req.body.cpfCnpj.substring(0, 20)
        await execSqlQuery(`UPDATE CLIENTE SET NM_CLIENTE='${nome}', TIPO_CLIENTE='${tipo}',
                            CPF_CNPJ='${cpfCnpj}' WHERE ID_CLIENTE=${id}`, res)
    },
    delete: async (req, res) => {
        const { id } = req.params
        await execSqlQuery(`DELETE CLIENTE WHERE ID_CLIENTE='${id}'`, res)
    }
}

module.exports = ClienteController
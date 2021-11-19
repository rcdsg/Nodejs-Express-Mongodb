const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return{
                db_string: 'mongodb+srv://rcdsg2021:Rc_200822@billing-cycles-backend.fggn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: 'front123',
                jwt_expiresIn:'3d'
            }
        case 'hml':
            return{
                db_string: 'mongodb+srv://rcdsg2021:Rc_200822@billing-cycles-backend.fggn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: 'front123',
                jwt_expiresIn:'7d'
            }
        case 'prod':
            return{
                db_string: 'mongodb+srv://rcdsg2021:Rc_200822@billing-cycles-backend.fggn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: 'hgg%$¨&¨&*¨jdfskfhfhdskhj',
                jwt_expiresIn:'7d'
            }
    }
}

console.log(` Iniciando a API em ambiente ${env.toUpperCase()} `);

module.exports = config();
const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return{
                db_string: 'mongodb+srv://rc_admin:mongdbapindjrct21@clusterapi.n7i7b.mongodb.net/apiteste?retryWrites=true&w=majority',
                jwt_pass: 'front123',
                jwt_expiresIn:'3d'
            }
        case 'hml':
            return{
                db_string: 'mongodb+srv://rc_admin:mongdbapindjrct21@clusterapi.n7i7b.mongodb.net/apiteste?retryWrites=true&w=majority',
                jwt_pass: 'front123',
                jwt_expiresIn:'7d'
            }
        case 'prod':
            return{
                db_string: 'mongodb+srv://rc_admin:mongdbapindjrct21@clusterapi.n7i7b.mongodb.net/apiteste?retryWrites=true&w=majority',
                jwt_pass: 'hgg%$¨&¨&*¨jdfskfhfhdskhj',
                jwt_expiresIn:'7d'
            }
    }
}

console.log(` Iniciando a API em ambiente ${env.toUpperCase()} `);

module.exports = config();
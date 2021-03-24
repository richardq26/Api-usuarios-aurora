# Para ejecutar localmente
sls invoke local -f funcion


## sls= serverless

## En package json:
npm run invoke

## Crear servicio
serverless create --template aws-nodejs --path myService

### Configuraciones:
sls config credentials --provider aws --key "" --secret "" --profile deploy-aws     
El profile se crea localmente
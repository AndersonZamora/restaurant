# Next.js Hotel San Martin
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```

* El -d, significa __detached__

## Configurar las variables de entorno
Remonbrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/nombreDb
```
* Reconstruir los módulos de node y levantar Next

```
yarn install
yarn dev
```
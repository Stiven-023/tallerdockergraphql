const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    aboutStivenC : String
    aboutDylanFarkas: String
    aboutMiguelCaicedo: String
    aboutJuanSebastian: String

  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {

      return `¡Hola, ${message}! Un saludo por parte del profe `;
    },
    aboutStivenC: () => {
      return `Hola, soy Stiven Castro, me gusta jugar futbol, hacer ejercicio, 
        escuchar musica y los animales   `;
    },

        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },

    aboutDylanFarkas: () => {
      return `¡Holiii a toditessss!. Soy Dylan Farkas, estudio Ingeniería de Sistemas, 
      me gusta la música, mi deporte favorito es el ciclismo, me gusta el gimnasio, 
      no tengo mascotas yyyy armé el cubo de rubik en menos de 30 segundos :D`;
    } 
    aboutMiguelCaicedo: () => {
      return 'Soy Miguel, tengo 20 años de edad me gusta la tecnologia y el deporte. Me apasiona las motocicletas, salir de paseo y compartir con mis compañeros y amigos'
    }

    aboutJuanSebastian: () => {
      return `¡Hola! Me llamo Sebastian Oviedo Oviedo soy estudiante de TEDESOFT en Univalle. Me gusta los paisajes verdes y jugar videojuegos con compañeros`;
    },

  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
  const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
  app.use(express.static(reactAppPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
  });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();


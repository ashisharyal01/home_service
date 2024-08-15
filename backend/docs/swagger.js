module.exports = {
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {   
        version: "1.0.0",
        title: "Rl-Offset-Press",
        description: "Rl-Offset-Press API Information",
        servers: ["http://localhost:5000"],
      },
      components: {
        securitySchemes: {
          jwt: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ["routes/*.js"],
  };
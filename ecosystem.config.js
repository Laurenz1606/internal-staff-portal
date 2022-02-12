module.exports = {
  apps: [
    {
      name: "isp-server",
      script: "./server/dist/index.js",
      env: {
        NODE_ENV: "production",
        MONGO_HOST: "127.0.0.1",
        MONGO_DATABASE: "isp-prod",
        MONGO_USER: "isp-prod",
        MONGO_PASSWORD: "yM8mVWph36jH4QP4Jg8RTL2BPESx5ZKG",
        REDIS_HOST: "127.0.0.1",
        REDIS_PORT: "6379",
        REDIS_PASSWORD: "117796bc7e35da47adac8f9ad8f1dd7d",
        REDIS_SET: "isp-prod-tokens",
        JWT_ACCESS_TOKEN_SECRET:
          "dc727af38884dd4ae56ca883748601329cfe549935fccfb929ff7ac41b3c338d0a956e46680a5e37266ccaaf48d7e6f53c3cc9c0f3cf2f4aa36e9678811cd2241b49f956f698a9e3574d4aaa3e1351850765274cbfbe3e4d158fd6c68ea202bbd9bb124e818edca2f292cd66176e9b28f8c71371c82d9f68febc7ef07e3dc88b",
        JWT_REFRESH_TOKEN_SECRET:
          "657fe11a4a13073305090ea073725292e93c5e51c3b0848a107b9f8deb51893a2678369c222f8843eb23530b6abdc2ae18fdda9323831e13c62ff65231232f0a883a41c5f8f2e07ba91673156db00d845356cde716d02f3a7285eb4ae2cff59037bc35ec6d8a03c1321803269b339e1c8180f0bfaa31c06143999f5997488972",
        PORT: "4001",
      },
    },
    {
      name: "isp-client",
      script: "./client/index.js",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
    },
  ],
};

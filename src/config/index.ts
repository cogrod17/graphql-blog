type Config = {
  secret: string;
};

const secret =
  process.env.NODE_ENV === "production" ? process.env.SECRET : "secret";

const config: Config = {
  secret: secret || "secret",
};

export default config;

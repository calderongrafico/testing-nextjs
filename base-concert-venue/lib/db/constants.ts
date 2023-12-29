export const venueCapacity = 400;

// export const getDbPath = (): string => "db";
export const getDbPath = (): string => {
  if (!process.env.DB_PATH) {
    // return process.env.DB_PATH;
    throw new Error("DB_PATH not implemented");
  }

  return process.env.DB_PATH;
};

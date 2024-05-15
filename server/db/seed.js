const { prisma } = require("./index.js");

const createInitialPlayer = async (username) => {
  try {
    await prisma.user.create({
      data: {
        username,
      },
    });
  } catch (error) {
    console.error("error creating inital players", error);
  }
};

const seed = async () => {
  console.log("starting seed");
  console.log("creating players");
  await createInitialPlayer("Player One");
  await createInitialPlayer("Player Two");
  console.log("players created");
  console.log("seed complete");
};

seed();

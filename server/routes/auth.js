require('dotenv').config()
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res, next) => {
  try {
    const currentUser = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      }
    })
    const matchPassword = await bcrypt.compare(
      req.body.password,
      currentUser?.password
    )
    if (!currentUser || !matchPassword) {
      res.status(401).send("Cannot find user")
    } else {

      const token = jwt.sign({ id: currentUser.id }, process.env.JWT_SECRET)
      res.send({
        message: "You are logged in",
        id: currentUser.id,
        username: currentUser.username,
        token,
      })
    }
  } catch (error) {
    console.log(`YOU ARE NOT LOGGED IN!`)
    next(error)
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const registeredUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    })
    const token = jwt.sign({ id: registeredUser.id }, process.env.JWT_SECRET)
    
    res.send({
      message: "you are now registered to pet",
      id: registeredUser.id,
      username: registeredUser.username,
      token,
    })
    return registeredUser;
   } catch (error) {
    next(error);
  }
});

router.get('/me/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
    try{
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        include: {gamesAsWinner: true, gamesAsLoser: true}
      })
      res.send(user);
    }catch(error){
      next(error);
    }
})

module.exports = router;

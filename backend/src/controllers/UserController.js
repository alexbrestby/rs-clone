require("dotenv").config();
const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const secret = process.env.SECRET;

const generateAccessToken = (id, email) => {
  const payload = {
    id,
    email
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class UserController {

  async getAll(req, res, next) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.params.id })
      if (!user) {
        return res.status(404).send()
      }
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors })
      }
      const { username, password, email } = req.body;
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
      }
      const candidateMail = await User.findOne({ email })
      if (candidateMail) {
        return res.status(400).json({ message: "Пользователь с таким email уже существует" })
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashPassword, email: email })
      await user.save()
      return res.json({ message: "Пользователь успешно зарегистрирован" })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      const { username, password, email } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
      }
      const token = generateAccessToken(user._id, user.email)
      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Login error' })
    }
  }
}

module.exports = new UserController();

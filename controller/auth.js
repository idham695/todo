const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt');
const prisma = new PrismaClient;
let renderPageDaftar = (req, res) => {
   res.render('daftar'); 
}

let renderPageMasuk = (req, res) => {
   res.render('masuk'); 
}

let handleSignUp = async (req, res) => {
   try {
      let { uname, email, password } = req.body;
      // let isuserExist = await prisma.user.create;
      let checkIfUserRegistered = await prisma.user.findUnique({
         where: {
            email : email
         }
      })
      if (checkIfUserRegistered) {
         req.flash('error', 'anda sudah daftar')
         res.redirect('daftar')
      }

      const insertUsertoDatabase = await prisma.user.create({
         data: {
            username: uname,
            email: email,
            password : await bcrypt.hash(password, 10),
         }
      });

      if (insertUsertoDatabase) {
         res.redirect('masuk')
      }

   } catch (e) {
      console.log(e);
   }
}

let handleSignIn = async (req, res) => {
   try {
      let { email, password } = req.body;
      const checkIfUserRegistered = await prisma.user.findUnique({
         where: {
            email : email
         }
      })
      if (!checkIfUserRegistered) {
         req.flash('error', 'anda belum daftar')
         res.redirect('daftar')
      }
      const isPassowrdValid = await bcrypt.compare(password, checkIfUserRegistered.password);
      if (!isPassowrdValid) {
         req.flash('error', 'password salah')
         res.redirect('masuk')
      }
      req.session.data = {
         ...checkIfUserRegistered, sudahMasuk : true
      }
      res.redirect('/');
   } catch (e) {
      console.log(e);
   }
}

let logout = async (req, res) => {
   try {
      req.session = null;
      res.redirect('masuk');
   } catch (error) {
      console.log(error);
   }
}

module.exports = {renderPageDaftar, renderPageMasuk, handleSignUp, handleSignIn, logout}
const connection = require('../config/database')
const {getAllUsers, getUserById,updateUserById,deleteUserById} = require('../services/CRUDservice')

const getHomePage = async (req,res) =>
{
  let results = await getAllUsers()
  return res.render('home.ejs', {listUsers: results})
}

const getABC = (req, res) => {
  res.send('Hello ABC')
}

const getHiHi = (req, res) => {
  res.render('sample.ejs')
}

const getCreatePage = (req,res) => {
  res.render('create.ejs')
}

const getUpdatePage = async (req,res) => {
  const userId = req.params.id
  
  let user = await getUserById(userId)

  res.render('update.ejs', {userUpdate : user})
}

const postCreateUser = async (req,res)=> {
  
  let {email,name,city} = req.body
  console.log(">>>>>email: ",email,">>>name: ",name,">>>city: ",city)
  // 
  // ;

  // Using placeholders
  // connection.query(
  //     `INSERT INTO 
  //     Users (email,name,city) 
  //     VALUES (?, ?, ?)`,
  //     [email,name,city],
  //     function (err,results) {

  //       res.send('create succes a new user')
  //     }
  //   );

  let [results,fields] = await connection.query(
    `INSERT INTO Users (email,name,city) VALUES (?, ?, ?)`,
    [email,name,city])
  
  console.log(">>>>check result:", results)
  res.send('create succes a new user')
    // const [results, fields] = await connection.query('select * from Users')
    // console.log(results)
}

const postUpdateUser = async (req,res)=> {
  
  let {email,name,city,userId} = req.body
  console.log(">>>>>email: ",email,">>>name: ",name,">>>city: ",city,">>>>>>id: ", userId)

  await updateUserById(email,name,city,userId)
  res.redirect('/')
}

const postDeleteUser = async (req,res)=> {
  const userId = req.params.id
  
  let user = await getUserById(userId)

  res.render('delete.ejs', {userUpdate : user})
}

const postHandleRemoveUser = async (req,res)=> {
  const id = req.body.userId
  await deleteUserById(id)
  res.redirect('/')
}

module.exports = {
    getHomePage,
    getABC,
    getHiHi,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}
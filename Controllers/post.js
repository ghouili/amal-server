const post = require('../models/post');
const user = require('../models/user');


const moment = require('moment');

const Ajouter = async (req, res) => {
    const { texte, iduser } = req.body;

    let image  = '';
    if (req.file) {
        image = req.file.filename
    }
    const today = new Date();

    let existinguser;
    try {
        existinguser = await user.findById(iduser);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB in user", error: error})
    }

    
    const Newpost = new post({
        texte,
        iduser,
        date: moment(today).format("DD-MM-YYYY"),
        time: moment(today).format("HH:mm:ss"),    
        image,

    });

    try {
        await Newpost.save();
        await existinguser.posts.push(Newpost);
        await existinguser.save();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    res.status(201).json({message: "success", data: Newpost});
}

const GetAll = async (req, res) => {

    let existingpost;
    try {
        existingpost = await post.find();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }

    res.status(200).json({message: "success", data: existingpost});

}

const FindById = async(req, res) => {

    const { id } = req.params;

    let existingpost;
    try {
        existingpost = await post.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existingpost) {
        return res.status(405).json({message: "post Doesn't Exist!!"})
    }
    
    return res.status(200).json({message: "success", data: existingpost});

}

const Delete = async(req, res) => {

    const { id } = req.params;

    let existingpost;
    try {
        existingpost = await post.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existingpost) {
        return res.status(405).json({message: "post Doesn't Exist!!"})
    }
    
    try {
        await existingpost.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    return res.status(200).json({message: "deleted succesfully"});

}

const updatepost = async(req, res) => {

    const { email, password } = req.body;
    const { id } = req.params;

    let existingpost;
    try {
        existingpost = await post.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existingpost) {
        return res.status(405).json({message: "post Doesn't Exist!!"})
    }
    
    existingpost.email = email;
    existingpost.password = password;

    try {
        await existingpost.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    return res.status(201).json({message: "success", data: existingpost});

}

exports.Ajouter = Ajouter 
exports.GetAll = GetAll 
exports.FindById = FindById 
exports.Delete = Delete 
exports.updatepost = updatepost 

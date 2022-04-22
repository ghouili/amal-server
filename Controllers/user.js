const user = require('../models/user');

const bcrypt = require('bcryptjs');

const Ajouter = async (req, res) => {
    const { email, password } = req.body;

    const NewUser = new user({
        email,
        password,
        image: req.file.filename
    });

    try {
        await NewUser.save();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    res.status(201).json({message: "success", data: NewUser});
}

const Register = async (req, res) => {
    const { email, password, nom, prenom, type, sexe, tel, adress, birthdate} = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    let avatar= 'avatar.png';
    if (req.file){
        avatar= req.file.filename;
    }
    const NewUser = new user({
        email,
        password: hashedPass,
        nom, 
        prenom, 
        type, 
        sexe, 
        tel, 
        adress,
        avatar,
        birthdate
    });

    try {
        await NewUser.save();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    res.status(201).json({message: "success", data: NewUser});
}

const login = async (req, res) => {

    const {email, password } = req.body;

    let existinguser;
    try {
        existinguser = await user.findOne({ email: email});
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({message: "User Doesn't Exist!!"})
    }

    let check = await bcrypt.compare( password, existinguser.password);

    if (!check) {
        return res.status(405).json({message: "check your Password!!"})
    }

    return res.status(200).json({message: "success", data: existinguser});

}

const GetAll = async (req, res) => {

    let existinguser;
    try {
        existinguser = await user.find();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }

    res.status(200).json({message: "success", data: existinguser});

}

const FindById = async(req, res) => {

    const { id } = req.params;

    let existinguser;
    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({message: "User Doesn't Exist!!"})
    }
    
    return res.status(200).json({message: "success", data: existinguser});

}

const Delete = async(req, res) => {

    const { id } = req.params;

    let existinguser;
    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({message: "User Doesn't Exist!!"})
    }
    
    try {
        await existinguser.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    return res.status(200).json({message: "deleted succesfully"});

}

const updateuser = async(req, res) => {

    const { email, password, nom, prenom, type, sexe, tel, adress} = req.body;
    const { id } = req.params;

    let existinguser;
    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({message: "User Doesn't Exist!!"})
    }
    
    existinguser.email = email;
    existinguser.nom = nom;
    existinguser.prenom = prenom;
    existinguser.type = type;
    existinguser.sexe = sexe;
    existinguser.tel = tel;
    existinguser.adress = adress;
    existinguser.password = password;

    try {
        await existinguser.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    return res.status(201).json({message: "success", data: existinguser});

}

exports.Ajouter = Ajouter 
exports.GetAll = GetAll 
exports.FindById = FindById 
exports.Delete = Delete 
exports.updateuser = updateuser 
exports.login = login 
exports.Register = Register 
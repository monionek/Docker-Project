import { Request, Response } from 'express';
import { User } from '../models/postgresModels/User';
import { Op } from 'sequelize';
import { generateToken } from '../utils/jwtGenerate';
import config from "../config/config"
export const registerUser = async (req: Request, res: Response) => {
    try {
    const {email, username, password} = req.body;

    const existingUser = await User.findAll({
        where: {[Op.or]: [{email: email}, {username: username}]}
    })
    if (existingUser.length > 0) {
        res.status(403).json({message: "username or email taken"});
        return;
    }
    const newUser = await User.create({
        username,
        email,
        password
    });
    res.status(201).json({message: newUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({
            where: {[Op.or]: [{email: login}, {username: login}]}
        });
        if (!user) {
            res.status(404).json({message: "No user with this login"});
            return;
        }
        if (password !== user.get().password) {
            res.status(403).json({message: "Invalid password"});
            return;
        }
        const payload = {
        username: user.get().username,
        role: user.get().role,
        id: user.get().id,
      };
        const token = generateToken(payload); 
        res.status(203).json({token: token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
};

export const getUser = async (req: Request, res: Response) => {
    try  {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({message: "user not found"});
            return;
        }
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try  {
        const userId = req.params.id;
        console.log('Deleting userId:', userId)
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({message: "user not found"});
            return;
        }
        await user.destroy();
        res.status(203).json({message: "User Destroyed"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
        where: {role : "user"}
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};


export const registerAdmin = async (req: Request, res: Response) => {
    try {
    const {email, username, password, adminSecret} = req.body;

    const existingUser = await User.findAll({
        where: {[Op.or]: [{email: email}, {username: username}]}
    })
    if (existingUser.length > 0) {
        res.status(403).json({message: "username or email taken"});
        return;
    }
    if (adminSecret !== config.adminSecret) {
        console.log(config.adminSecret);
        console.log("elo żelo");
        res.status(403).json({message: "acces denied"});
        return;
    }
    const role = "admin";
    const newAdmin = await User.create({
        username,
        email,
        password,
        role
    });
    res.status(201).json({message: newAdmin})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
};
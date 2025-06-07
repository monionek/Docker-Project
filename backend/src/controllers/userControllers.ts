import { Request, Response, NextFunction } from 'express';
import { User } from '../models/postgresModels/User';
import { Op } from 'sequelize';
import { generateToken } from '../utils/jwtGenerate';

export const registerUser = async (req: Request, res: Response) => {
    try {
    const {email, username, password} = req.body;

    const existingUser = await User.findAll({
        where: {[Op.or]: [{email: email}, {username: username}]}
    })
    if (existingUser) {
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
      attributes: ['id', 'username', 'email', 'role', 'createdAt'] // wykluczamy hasła
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

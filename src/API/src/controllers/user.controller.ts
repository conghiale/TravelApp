import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user-model"
import { Types } from "mongoose"

const getUserToken = (_id: string|Types.ObjectId) => {
    const authenticatedUserToken = jwt.sign({ _id }, "express", {
        expiresIn: "7d"
    })
    return authenticatedUserToken
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        
        const existingUser = await User.find({email})
        if(existingUser) {
            return res.status(409).send("User already exist")
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        await User.create({
            name,
            email,
            hashedPassword
        })

        return res.status(201).send({message: "User created successfully"})
    } catch (error) {
        console.log("Error: createUser\n", error)
        throw error
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: IUser = req.body
        const existingUser = await User.findOne({ email })

        if(!existingUser) {
            return res.status(409).send({ message: "User does not exist" })
        }

        const isPasswordIdentical = await bcrypt.compare(
            password,
            (await existingUser).password
        )

        if(isPasswordIdentical) {
            const token = getUserToken(existingUser._id)
            return res.send({
                token,
                user: {
                    email: existingUser.email,
                    name: existingUser.name,
                }
            })
        } else {
            return res.status(400).send({ message: "Wrong credentials" })
        }
    } catch(error) {
        console.log("Error: loginUser\n", error)
        throw error
    }
}

import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import Zod from 'zod';
import { compare, hash } from 'bcrypt';
import { excludeField } from '../utils/excludeField';
import {sign} from 'jsonwebtoken'

export class AuthenticateController {
  public async create(req: Request, res: Response) {
    const bodySchema = Zod.object({
      email: Zod.string().email(),
      password: Zod.string().min(6),
    }).strict()

    const { email, password } = bodySchema.parse(req.body)
    
    const User = await prisma.user.findFirst({
      where: {email}
    }) 

    if (!User){
      throw new AppError('Incorrect Email or Password', 401)
    } 

    const passwordMatch  = await compare(password, User.password_hash)

    if(!passwordMatch) throw new AppError('Incorrect Email or Password', 401)

    const token = sign({}, 'minhachavemuitosecreta', {
      subject: User.id,
      expiresIn: '1d'
    })

    const id = User.id

    return res.status(200).json({ token, id });
  }
}
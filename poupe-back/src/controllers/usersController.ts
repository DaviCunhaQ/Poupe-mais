import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import Zod from 'zod';
import { hash } from 'bcrypt';
import { excludeField } from '../utils/excludeField';

export class UsersController {
  public async list(req: Request, res: Response) {
    
    const users = await prisma.user.findMany()
    
    const userWithoutPass = users.map((user)=>
       excludeField(user, ['password_hash'])
    )
    
    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response) {

    const { id } = req.params

    const users = await prisma.user.findUnique({
      where: { id },
      include: { 
        balances: true,
        expenditures: true
      
      }
    })

    if(!users) {
      throw new AppError('User not Found',404)
    }

    return res.status(200).json(excludeField(users, ['password_hash']));
  }

  public async create(req: Request, res: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3),
      email: Zod.string().email(),
      salary: Zod.number(),
      password: Zod.string().min(6)
    })

    const { name, email, password, salary } = bodySchema.parse(req.body)
    
    const userExists = await prisma.user.findFirst({
      where: {email}
    }) 

    if (userExists) throw new AppError('User already exists', 409)

    const password_hash = await hash(password, 6)
    
    const users = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
        salary
      },
    })

    const userWithoutPass = excludeField(users, ['password_hash'])

    return res.status(200).json(userWithoutPass);
  }
  
  public async update(req: Request, res: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().nullish(),
      salary: Zod.number().nullish()
    }).strict()

    const { name, salary} = bodySchema.parse(req.body)
    const { id } = req.params

    const userExists = await prisma.user.findUnique({
      where: {id}
    })

    if (!userExists) throw new AppError('User not found', 404)
    
    let data = {}

    if(name) data = {name}
    if(salary) data = {...data, salary}
    
    const users = await prisma.user.update({
      where: { id },
      data
    })

    return res.status(200).json(excludeField(users, ['password_hash']));
  }

  public async delete(req: Request, res: Response) {

    const { id } = req.params

    const users = await prisma.user.findUnique({
      where: { id }
    })
    
    if (!users) {
      throw new AppError('User not Found', 404)
    }

    await prisma.user.delete({
      where: { id }
    })


    return res.status(204).json({});
  }

  public async redefine(req: Request, res: Response){
    const { id } = req.params

    const userExists = await prisma.user.findUnique({
      where: { id }
    })

    if(!userExists) throw new AppError('User not found', 404)

    await prisma.user.update({
      where: { id },
      data: {
        salary: 0
      }
    })

    await prisma.balance.deleteMany({
      where: { userId: id }
    })

    await prisma.expenditure.deleteMany({
      where: { userId: id }
    })

    return res.status(204).json({});
  }
}
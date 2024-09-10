import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import Zod from 'zod';
import { hash } from 'bcrypt';
import { excludeField } from '../utils/excludeField';
import { sumBalances } from '../utils/sumBal';

export class BalancesController {
  public async list(req: Request, res: Response) {
    const { userId } = req.params
    const balances = await prisma.balance.findMany({
      where: { userId },
      orderBy: { created_at: 'desc' }
    }
    )

    const totalBal = sumBalances(balances)
    
    return res.status(200).json({balances, totalBal});
  }

  public async create(req: Request, res: Response) {
    const { userId } = req.params
    const bodySchema = Zod.object({
      price: Zod.number(),
      descript: Zod.string().min(1)
    })

    const { price, descript} = bodySchema.parse(req.body)
    
    const balances = await prisma.balance.create({
      data: {
        price,
        descript,
        userId
      },
    })
    

    return res.status(200).json(balances);
  }

  public async delete(req: Request, res: Response) {

    const { id } = req.params

    const balances = await prisma.balance.findUnique({
      where: { id }
    })
    
    if (!balances) {
      throw new AppError('balance not Found', 404)
    }

    await prisma.balance.delete({
      where: { id }
    })


    return res.status(204).json({});
  }
}
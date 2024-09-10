import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import Zod from 'zod';
import { hash } from 'bcrypt';
import { excludeField } from '../utils/excludeField';
import { log } from 'console';
import dayjs from 'dayjs';
import { sumExpenditures } from '../utils/sumExp';

export class ExpenditureController {
  public async list(req: Request, res: Response) {
    const { userId } = req.params
    const endDate = dayjs()
    const startDate = endDate.startOf('month')
    const expenditures = await prisma.expenditure.findMany(
      {
        where: { userId: userId,
          created_at:{
            gte:startDate.toDate(),
            lte:endDate.toDate()
          }
       },
        orderBy: { price: 'desc' }
      }
    )
    const totalExp = sumExpenditures(expenditures)
    
    return res.status(200).json({expenditures, totalExp});
  }

  public async listByDate(req: Request, res: Response) {
    const { userId } = req.params
    const expenditures = await prisma.expenditure.findMany(
      {
        where: { userId },
        orderBy: { created_at: 'desc' }
      }
    )
    
    return res.status(200).json(expenditures);
  }

  public async create(req: Request, res: Response) {
    const { userId } = req.params
    const bodySchema = Zod.object({
      price: Zod.number(),
      descript: Zod.string().min(1),
      category: Zod.string()
    })

    const { price, descript, category } = bodySchema.parse(req.body)
    
    const expenditures = await prisma.expenditure.create({
      data: {
        price,
        descript,
        category,
        userId
      },
    })
    return res.status(200).json(expenditures);
  }

  public async delete(req: Request, res: Response) {

    const { id } = req.params

    const expenditures = await prisma.expenditure.findUnique({
      where: { id }
    })
    
    if (!expenditures) {
      throw new AppError('balance not Found', 404)
    }

    await prisma.expenditure.delete({
      where: { id }
    })


    return res.status(204).json({});
  }

}
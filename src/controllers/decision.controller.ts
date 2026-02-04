import { Request, Response, NextFunction } from 'express';
import { CreateDecisionDTO, UpdateDecisionDTO } from '../dtos';
import { DecisionService } from '../services/decision.service';


export class DecisionController {

    static async createDecision(req: Request, res: Response, next: NextFunction) {
        try {
            const dto: CreateDecisionDTO = {
                title: req.body.title,
                description: req.body.description,
                parentId: req.body.parentId,
                order: req.body.order,
                topicId: req.body.topicId,
                userId: req.user!.id
            };

            await DecisionService.createDecision(dto);
            return res.status(201).json({ message: 'Decision created' });

        } catch (error) {
            return next(error);
        }
    }


    static async findChildren(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            const userId = req.user!.id;

            const decisions = await DecisionService.findChildren(id, userId);
            return res.status(200).json({ decisions });
        } catch (error) {
            return next(error);
        }
    }

    static async updateDecision(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };

            const dto: UpdateDecisionDTO = {
                id,
                userId: req.user!.id,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                order: req.body.order
            }
            await DecisionService.updateDecision(dto);
            return res.status(200).json({ message: 'Decision updated' });
        } catch (error) {
            return next(error);
        }
    }

    static async deleteDecision(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            const userId = req.user!.id;
            await DecisionService.deleteDecision(id, userId);
            return res.status(200).json({ message: 'Decision deleted' });
        } catch (error) {
            return next(error);
        }
    }



}
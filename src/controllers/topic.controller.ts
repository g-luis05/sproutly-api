import { NextFunction, Request, Response } from "express";
import { TopicService } from "../services/topic.service";
import { DeleteTopicDTO, UpdateTopicDTO } from "../dtos";


export class TopicController {


    static async createTopic(req: Request, res: Response, next: NextFunction) {

        try {
            const { title, description } = req.body;
            const userId = req.user!.id;

            await TopicService.createTopic({ title, description, userId });
            return res.status(201).json({ message: 'Topic created' });
        } catch (error) {
            return next(error);
        }

    }

    static async findAllTopics(req: Request, res: Response, next: NextFunction) {

        try {
            const userId = req.user!.id;
            const topics = await TopicService.findAllTopics(userId);

            return res.status(200).json({ topics });

        } catch (error) {
            return next(error);
        }

    }

    static async updateTopic(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params as { id: string };

            const dto: UpdateTopicDTO = {
                id,
                userId: req.user!.id,
                title: req.body.title,
                description: req.body.description
            };
            await TopicService.updateTopic(dto);
            return res.status(200).json({ message: 'Topic updated' });
        } catch (error) {
            return next(error);
        }
    }

    static async deleteTopic(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params as { id: string };
            const dto: DeleteTopicDTO = {
                id,
                userId: req.user!.id
            };
            await TopicService.deleteTopic(dto);
            return res.status(200).json({ message: 'Topic deleted' });
        } catch (error) {
            return next(error);
        }
    }

}



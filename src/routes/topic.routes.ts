import { Router } from "express";
import { AuthMiddleware, ValidateMiddleware } from "../middlewares";
import { createTopicSchema, deleteTopicSchemaParams, updateTopicSchema, updateTopicSchemaParams } from "../validators/topic.validator";
import { TopicController } from "../controllers/topic.controller";


export class TopicRoutes {

    static get routes(): Router {

        const router = Router();

        router.post( '/',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateBody( createTopicSchema ),
            TopicController.createTopic,
        );

        router.get('/',
            AuthMiddleware.verifyToken,
            TopicController.findAllTopics,
        );

        router.patch('/:id',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams( updateTopicSchemaParams ),
            ValidateMiddleware.validateBody( updateTopicSchema ),
            TopicController.updateTopic,
        );

        router.delete('/:id',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams( deleteTopicSchemaParams ),
            TopicController.deleteTopic,
        );
        
        return router;

    }

}
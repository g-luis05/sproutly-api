import { Router } from "express";
import { AuthMiddleware, ValidateMiddleware } from "../middlewares";
import { createTopicSchema, idValidatorSchemaParams, updateTopicSchema } from "../validators/topic.validator";
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

        router.get('/:id/decisions',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams( idValidatorSchemaParams ),
            TopicController.findRootDecisionsByTopic,
        );

        router.patch('/:id',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams( idValidatorSchemaParams ),
            ValidateMiddleware.validateBody( updateTopicSchema ),
            TopicController.updateTopic,
        );

        router.delete('/:id',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams( idValidatorSchemaParams ),
            TopicController.deleteTopic,
        );
        
        return router;

    }

}
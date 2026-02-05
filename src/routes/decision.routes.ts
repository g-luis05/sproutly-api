import { Router } from "express";
import { AuthMiddleware, ValidateMiddleware } from "../middlewares";
import { createDecisionSchema, idValidatorSchemaParams, updateDecisionSchema } from "../validators";
import { DecisionController } from "../controllers/";


export class DecisionRoutes {

    static get routes(): Router {

        const router = Router();

        router.post('/',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateBody(createDecisionSchema),
            DecisionController.createDecision,
        );

        router.get('/:id/children',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams(idValidatorSchemaParams),
            DecisionController.findChildren,
        );

        router.patch('/:id',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams(idValidatorSchemaParams),
            ValidateMiddleware.validateBody(updateDecisionSchema),
            DecisionController.updateDecision,
        );

        router.delete('/:id',
            AuthMiddleware.verifyToken,
            ValidateMiddleware.validateParams(idValidatorSchemaParams),
            DecisionController.deleteDecision,
        ); 

        return router;
    }

}
import { CustomError } from "../domain/errors/custom.error";
import { CreateTopicDTO, DeleteTopicDTO, UpdateTopicDTO } from "../dtos";
import { TopicRepository } from "../repositories/";



export class TopicService {

    static async createTopic(dto: CreateTopicDTO) {
        await TopicRepository.create(dto);
    }

    static async findAllTopics(userId: string) {
        const topics = await TopicRepository.findAll(userId);
        return topics;
    }

    static async updateTopic(dto: UpdateTopicDTO) {
        const data: { title?: string; description?: string; } = {};

        if ( dto.title !== undefined ) data.title = dto.title;
        if ( dto.description !== undefined ) data.description = dto.description;

        if ( Object.keys(data).length === 0 ) return true;

        const updated = await TopicRepository.updateById(dto.id, dto.userId, data);

        if ( updated.count === 0 ) throw CustomError.notFound('Topic not found');

        return true;
    }

    static async deleteTopic(dto: DeleteTopicDTO) {
        const deleted = await TopicRepository.deleteById(dto.id, dto.userId);
        if ( deleted.count === 0 ) throw CustomError.notFound('Topic not found');
        return true; 
    }

}
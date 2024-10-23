import { CreateTaskDto } from '../../dto/TaskDto'
import { TaskEntity } from '../../entity/task.entity'

export interface ITaskService {
    getAllTasks(projectId: string): Promise<TaskEntity[]>
    addTask(projectId: string, input: CreateTaskDto): Promise<TaskEntity>
}

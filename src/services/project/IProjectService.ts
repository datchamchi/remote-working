import { CreateProjectDto } from '../../dto/ProjectDto'
import { ProjectEntity } from '../../entity/projectEntity'

export interface IProjectService {
    addProject(user: string, input: CreateProjectDto): Promise<ProjectEntity>
    getAllProjects(
        email: string,
        page: number,
        name: string | undefined,
        createdAt: string | undefined
    ): Promise<ProjectEntity[]>
    getProject(projectId: number): Promise<ProjectEntity | null>
    addUserIntoProject(
        projectId: string,
        leader: string,
        emails: string[]
    ): Promise<ProjectEntity>
}

import { api } from "./index.ts";
import type { Project, CreateProject, UpdateProject } from "@/types/project.ts";

export const projectApi = {
    create: (project: CreateProject) => api.post<CreateProject>(`/projects`, project),
    getAll: () => api.get<Project[]>('/projects'),
    getById: (id: string) => api.get<Project>(`/projects/${id}`),
    update: (id: string, project: UpdateProject) => api.patch<UpdateProject>(`/projects/${id}`, project),
    delete: (id: string) => api.delete<Project>(`/projects/${id}`)
}
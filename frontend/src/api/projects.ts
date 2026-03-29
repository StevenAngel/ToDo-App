import { api } from "./index.ts";
import type { Project } from "@/types/project.ts";

export const projectApi = {
    create: (project: Project) => api.post<Project>(`/project`),
    getAll: () => api.get<Project[]>('/projects'),
    getById: (id: string) => api.get<Project>(`/projects/${id}`),
    update: (id: string, project: Project) => api.patch<Project>(`/projects/${id}`),
    delete: (id: string) => api.delete<Project>(`/projects/${id}`)
}
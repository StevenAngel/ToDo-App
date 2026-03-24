import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {

  // InjectRepository(Project) injiziert das Repository für die Project Entity im constructor für Dependency Injection (DI)
  // this.projectRepository ist meine verbindung zur DB Table "Project"
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    // Create project, dann save in Datenbank
    const project = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(project);
  }

  async findAll() {
    return await this.projectRepository.find();
  }

  async findOne(id: number) {
    return await this.projectRepository.findOneBy({ id: id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update({ id: id }, updateProjectDto);
  }

  async remove(id: number) {
    // Delete == delete by xyz. Remove kann ein object removen, dass geladen wurde (z.b. mit findOne)
    return await this.projectRepository.delete({ id: id });
  }
}

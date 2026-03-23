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

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.create(createProjectDto)
  }

  findAll() {
    return this.projectRepository.find()
  }

  findOne(id: number) {
    return this.projectRepository.findBy({id: id})
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update({id: id}, updateProjectDto)
  }

  remove(id: number) {
    // Delete == delete by xyz. Remove kann ein object removen, dass geladen wurde (z.b. mit findOne)
    return this.projectRepository.delete({id: id})
  }
}

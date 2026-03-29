import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) { }

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async findAll(projectId: number) {
    return await this.todoRepository.find({
      where: { project: { id: projectId } },
      // relations 'project', damit die ManyToOne entry angezeigt wird und das Project Object mitgesendet wird.
      // Ein anderer weg project immer anzuzeigen wäre im MnayToOne { eager: true }
      // relations: [
      //   'project'
      // ]
    });
  }

  async findOne(id: number) {
    return await this.todoRepository.findOneBy({ id: id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepository.update({ id: id }, updateTodoDto);
  }

  async remove(id: number) {
    return await this.todoRepository.delete({ id: id });
  }
}

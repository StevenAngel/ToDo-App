import { Todo } from 'src/todos/entities/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // nullable: true für ein optionales feld
    @Column({ nullable: true })
    description?: string;

    @Column({default: []})
    todos: Array<Todo>
}

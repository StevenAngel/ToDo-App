import { Todo } from 'src/todos/entities/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // nullable: true für ein optionales feld
    @Column({ nullable: true })
    description?: string;

    // OneToMany erstellt keine spalte in der DB, sonder schaut nur welche Zeilen zu dieser projectId gehören. Todo Entitiy todo.project hält die zugehörige projektId.
    @OneToMany(() => Todo, todo => todo.project)
    todos: Array<Todo>;
}

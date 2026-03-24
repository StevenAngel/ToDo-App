import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import { Importance } from "../enums/importance.enum";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    importance: Importance;

    @Column({ nullable: true })
    deadline: Date;

    @ManyToOne(() => Project, project => project.todos)
    project: Project;
}

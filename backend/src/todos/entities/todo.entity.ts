import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import { Priority } from "../enums/priority.enum";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    priority: Priority;

    @Column({ nullable: true })
    deadline: Date;

    @Column({ default: [] })
    categories: Array<string>;

    @Column()
    isDone: boolean;

    // ManyToOne erstellt ein Feld in der DB. Außerdem wird eine verbindung erstellt zu project.todos, dem OneToMany feld, welchem die daten geliefert werden für schnellere abfragen.
    @ManyToOne(() => Project, project => project.todos, {
        // Löscht alle todos wenn project gelöscht wird
        onDelete: "CASCADE"
    })
    project: Project;
}

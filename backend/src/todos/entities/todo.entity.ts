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

    // ManyToOne erstellt ein Feld in der DB. Außerdem wird eine verbindung erstellt zu project.todos, dem OneToMany feld, welchem die daten geliefert werden für schnellere abfragen.
    @ManyToOne(() => Project, project => project.todos, {
        // Löscht alle todos wenn project gelöscht wird
        onDelete: "CASCADE"
    })
    project: Project;
}

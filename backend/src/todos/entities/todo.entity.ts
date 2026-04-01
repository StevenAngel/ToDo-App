import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({ type: 'simple-json', default: [] })
    tags: Array<string>;

    @Column({ default: false })
    isDone: boolean;

    // CreateDateColumn() setzt den neusten zeitpunkt bei creation. default: new Date() setzt den zeitpunkt einmal beim start der app und wird dann immer wieder verwendet.
    @CreateDateColumn()
    // @Column({ default: new Date() })
    createdAt: Date;

    // ManyToOne erstellt ein Feld in der DB. Außerdem wird eine verbindung erstellt zu project.todos, dem OneToMany feld, welchem die daten geliefert werden für schnellere abfragen.
    @ManyToOne(() => Project, project => project.todos, {
        // Löscht alle todos wenn project gelöscht wird
        onDelete: "CASCADE"
    })
    project: Project;
}

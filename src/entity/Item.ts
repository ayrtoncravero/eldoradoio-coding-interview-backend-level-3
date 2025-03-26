import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('items')
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price!: number

    @CreateDateColumn({
		name: 'created_at',
	})
    createdAt!: Date;

    @UpdateDateColumn({
		name: 'updated_at',
	})
    updatedAt!: Date;
};

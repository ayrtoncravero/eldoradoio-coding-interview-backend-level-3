import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

/**
 * Representa un item en el sistema de inventario.
 * 
 * @class Item
 * @extends {BaseEntity}
 * @description Esta clase representa un artículo con su nombre, precio y las fechas de creación y actualización.
 */
@Entity('items')
export class Item extends BaseEntity {
    
    /**
     * Identificador único del item.
     * 
     * @type {number}
     * @memberof Item
     */
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Nombre del item.
     * 
     * @type {string}
     * @memberof Item
     */
    @Column()
    name!: string;

    /**
     * Precio del item.
     * 
     * El precio es almacenado como un número decimal con precisión de 10 dígitos y 2 decimales.
     * 
     * @type {number}
     * @memberof Item
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price!: number;

    /**
     * Fecha en que el item fue creado.
     * 
     * @type {Date}
     * @memberof Item
     */
    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt!: Date;

    /**
     * Fecha en que el item fue actualizado por última vez.
     * 
     * @type {Date}
     * @memberof Item
     */
    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt!: Date;
};

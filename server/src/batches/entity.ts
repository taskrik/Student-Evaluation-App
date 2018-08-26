import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsDate } from 'class-validator'
import { Type } from 'class-transformer'
import { Student } from '../students/entity';


@Entity('batches')
export class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  
  @Column('text')
  batchId: string

  @IsDate()
  @Column('date')
  @Type(() => Date)
  startDate: Date

  @IsDate()
  @Column('date')
  @Type(() => Date)
  endDate: Date

  @OneToMany(_ => Student, student => student.batch, {eager:true})
  students: Student[]
  
}

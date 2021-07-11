import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'twitch_audit' })
export class AppEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  channel: string;

  @Column()
  username: string;

  @Column()
  type: string;

  @Column('text')
  payload: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ default: null, nullable: true })
  updated_at?: Date | null;

  @DeleteDateColumn({ default: null, nullable: true })
  deleted_at?: Date | null;
}

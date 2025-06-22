import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Author } from '../../authors/entities/author.entity';

@Entity('user_follows_author')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.following)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // This line requires the 'followers' property on the Author entity
  @ManyToOne(() => Author, author => author.followers)
  @JoinColumn({ name: 'author_id' })
  author: Author;
}
import { UserRole } from '../users/entities/user.entity';

export const authorsData = [
    { author_name: 'James Clear', bio: 'Author of Atomic Habits.', dob: '1986-01-22', avatar: 'https://i.imgur.com/example1.jpg' },
    { author_name: 'Mark Manson', bio: 'Author of The Subtle Art of Not Giving a F*ck.', dob: '1984-03-09', avatar: 'https://i.imgur.com/example2.jpg' },
];

export const booksData = [
    { title: 'Atomic Habits', price: 27.99, genre: 'Self-Help', published_year: 2018, stock: 150, booktype: 'Physical', author_id_ref: 1, image: 'https://i.imgur.com/example3.jpg' },
    { title: 'The Subtle Art of Not Giving a F*ck', price: 15.50, genre: 'Self-Help', published_year: 2016, stock: 200, booktype: 'Physical', author_id_ref: 2, image: 'https://i.imgur.com/example4.jpg' },
];

export const usersData = [
    { fname: 'Admin', lname: 'User', email: 'admin@bookworm.com', password: 'password123', role: UserRole.ADMIN },
    { fname: 'John', lname: 'Doe', email: 'john.doe@email.com', password: 'password123', role: UserRole.USER, address: '123 Main St, Phnom Penh' },
    { fname: 'Jane', lname: 'Smith', email: 'jane.smith@email.com', password: 'password123', role: UserRole.USER, address: '456 Oak Ave, Siem Reap' },
];

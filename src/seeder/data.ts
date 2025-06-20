import { UserRole } from '../users/entities/user.entity';

export const authorsData = [
    { author_name: 'James Clear', bio: 'Author of Atomic Habits.', dob: '1986-01-22', avatar: 'https://images.gr-assets.com/authors/1532985859p5/7325699.jpg' },
    { author_name: 'Mark Manson', bio: 'Author of The Subtle Art of Not Giving a F*ck.', dob: '1984-03-09', avatar: 'https://images.gr-assets.com/authors/1465801955p5/7785303.jpg' },
];

export const booksData = [
    { title: 'Atomic Habits', price: 27.99, genre: 'Self-Help', published_year: 2018, stock: 150, booktype: 'Physical', image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378.jpg', author_id_ref: 1 },
    { title: 'The Subtle Art of Not Giving a F*ck', price: 15.50, genre: 'Self-Help', published_year: 2016, stock: 200, booktype: 'Physical', image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302l/28257707.jpg', author_id_ref: 2 },
];

export const usersData = [
    { fname: 'Admin', lname: 'User', email: 'admin@bookworm.com', password: 'password123', role: UserRole.ADMIN },
    { fname: 'John', lname: 'Doe', email: 'john.doe@email.com', password: 'password123', role: UserRole.USER, address: '123 Main St, Anytown, USA' },
    { fname: 'Jane', lname: 'Smith', email: 'jane.smith@email.com', password: 'password123', role: UserRole.USER, address: '456 Oak Ave, Sometown, USA' },
];

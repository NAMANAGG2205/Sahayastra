import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAllUsers, saveUsers } from "../db/userDb.js";
import crypto from "crypto";

class User {
    constructor(data) {
        this._id = data._id || crypto.randomUUID();
        this.name = data.name || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.phoneNumber = data.phoneNumber || '';
        this.role = data.role || 'USER';
        this.refreshToken = data.refreshToken || null;
        this.interests = data.interests || [];
        this.incomeGroup = data.incomeGroup || '';
        this.state = data.state || '';
        this.age = data.age || null;
        this.dob = data.dob || '';
        this.fatherName = data.fatherName || '';
        this.occupation = data.occupation || '';
        this.income = data.income || null;
        this.favorites = data.favorites || [];
        this.gender = data.gender || '';
    }

    async save() {
        const users = await getAllUsers();
        const existingIndex = users.findIndex(u => u._id === this._id);
        
        // Hash password if it's new or changed (we assume it's unhashed if it doesn't start with $2a$ or similar, 
        // but to be safe, if we are calling save() on a new user, we hash it.
        // For simplicity, we just check if it's not already a bcrypt hash)
        if (this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
            this.password = await bcrypt.hash(this.password, 10);
        }

        if (existingIndex !== -1) {
            users[existingIndex] = { ...this };
        } else {
            users.push({ ...this });
        }
        await saveUsers(users);
        return this;
    }

    static async findOne(query) {
        const users = await getAllUsers();
        // Currently only supporting email query as used in controller
        if (query.email) {
            const user = users.find(u => u.email === query.email);
            return user ? new User(user) : null;
        }
        return null;
    }

    static async findById(id) {
        const users = await getAllUsers();
        const user = users.find(u => u._id === id);
        return user ? new User(user) : null;
    }

    static async findByIdAndUpdate(id, updateData, options = {}) {
        const users = await getAllUsers();
        const userIndex = users.findIndex(u => u._id === id);
        
        if (userIndex === -1) return null;

        let user = users[userIndex];

        // Handle specific Mongoose operators used in controllers
        if (updateData.$unset) {
            if (updateData.$unset.refreshToken !== undefined) {
                user.refreshToken = null;
            }
        } else if (updateData.$push) {
            if (updateData.$push.favorites) {
                if (!user.favorites.includes(updateData.$push.favorites)) {
                    user.favorites.push(updateData.$push.favorites);
                }
            }
        } else if (updateData.$pull) {
            if (updateData.$pull.favorites) {
                user.favorites = user.favorites.filter(fav => fav !== updateData.$pull.favorites);
            }
        } else {
            // Normal update
            user = { ...user, ...updateData };
        }

        users[userIndex] = user;
        await saveUsers(users);

        return options.new ? new User(user) : new User(users[userIndex]); // simplified returning
    }

    async isPasswordCorrect(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }

    async generateAccessToken() {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                name: this.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        );
    }

    async generateRefreshToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
        );
    }

    select(fields) {
        // Mocking Mongoose select. Returns a new object without excluded fields
        const excludeFields = fields.split(' ').filter(f => f.startsWith('-')).map(f => f.substring(1));
        const result = { ...this };
        excludeFields.forEach(field => {
            delete result[field];
        });
        // Return a Promise to match Mongoose behavior
        return Promise.resolve(new User(result));
    }

    toObject() {
        return { ...this };
    }
}

export default User;
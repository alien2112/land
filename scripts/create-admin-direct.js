const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://eslamabdaltif:oneone2@cluster0.k0laen8.mongodb.net/?appName=Cluster0';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

        const username = 'admin';
        const password = 'admin123';

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        });

        await newAdmin.save();
        console.log('Admin user created successfully!');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

createAdmin();


import express from 'express';
import db from './config/db.js'

import mongoose from 'mongoose';
const { Schema } = mongoose;

const app = express();
db(); // connection to database

var User = [];
var Job  = [];
var Application = [];

// Define User, Job, and Application schemas
var userSchema = new Schema(
    {
  name: { type: String, required: true, max: 100},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Assume hashing elsewhere
  role: { type: String, required: true, enum: ['admin', 'job_seeker'] }
    });

var jobSchema = new Schema(
    {
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  postedDate: { type: Date, default: Date.now }
    });

var applicationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  CV: { type: String, required: true }, // Assume file path handling elsewhere
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' }
});

// Create models for the user schema 
const user = mongoose.model('User', userSchema);
const job = mongoose.model('Job', jobSchema);
const application = mongoose.model('Application', applicationSchema);



// Function to seed users
// code to seed database for local library

async function createUser(name, email, password, role) {
  const user = new User({ name, email, password, role });
  await user.save();
  console.log('User created:', user._id);
  users.push(user._id);
}

// Function to seed jobs
async function createJob(title, description, category, location, salary) {
  const job = new Job({ title, description, category, location, salary });
  await job.save();
  console.log('Job created:', job._id);
  jobs.push(job._id);
}

// Function to seed applications



async function createApplication(userId, jobId, CV, status = 'pending') {
  const application = new Application({ userId, jobId, CV, status });
  await application.save();
  console.log('Application created:', application._id);
}

// seeding data
// Main seeding function
async function seed() {
  // Drop collections if they exist
  await mongoose.connection.dropDatabase();

  // Seed Users
  await createUser('Alice Johnson', 'alice@example.com', 'hashed_password_1', 'job_seeker');
  await createUser('Bob Smith', 'bob@example.com', 'hashed_password_2', 'admin');
  await createUser('Carol Davis', 'carol@example.com', 'hashed_password_3', 'job_seeker');

  // Seed Jobs
  await createJob('Software Engineer', 'Develop and maintain software solutions.', 'IT', 'San Francisco', 120000);
  await createJob('Marketing Manager', 'Lead marketing campaigns.', 'Marketing', 'New York', 90000);

  // Seed Applications
  await createApplication(users[0], jobs[0], '/uploads/alice_cv.pdf', 'pending');
  await createApplication(users[2], jobs[1], '/uploads/carol_cv.pdf', 'reviewed');

  console.log('Database seeding completed.');
}

// Run the seeding function

seed();

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


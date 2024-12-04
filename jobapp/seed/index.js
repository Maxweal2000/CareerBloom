import express from 'express';
import db from './config/db.js'

import mongoose from 'mongoose';
const { Schema } = mongoose;

const app = express();
db(); // connection to database

// Arrays to hold IDs of created data
var users = [];
var jobs = [];
var applications = [];




// Define the schema for a user
var UserSchema = new Schema(
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'job_seeker'], required: true },
});

// Define the schema for a job
var JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  postedDate: { type: Date, default: Date.now },
});

// Define the schema for an application
var ApplicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  CV: { type: String, required: true }, // File path to CV
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
});

const User = mongoose.model('User', UserSchema);
const Job = mongoose.model('Job', JobSchema);
const Application = mongoose.model('Application', ApplicationSchema);

// code to seed database 

// Function to create a user
async function userCreate(users, name, email, password, role) {
  let newUser = new User({
    name: name,
    email: email,
    password: password, // Remember to hash passwords in production!
    role: role,
  });
  await newUser.save()
    .then(user => {
      console.log('User created:', user._id);
      users.push(user._id);
      console.log(users);
    })
    .catch(err => console.error(err));
}

// Function to create a job posting
async function jobCreate(jobs, title, description, category, location, salary) {
  let newJob = new Job({
    title: title,
    description: description,
    category: category,
    location: location,
    salary: salary,
  });
  await newJob.save()
    .then(job => {
      console.log('Job created:', job._id);
      jobs.push(job._id);
      console.log(jobs);
    })
    .catch(err => console.error(err));
}

// Function to create a job application
async function applicationCreate(applications, userId, jobId, CV, status) {
  let newApplication = new Application({
    userId: userId,
    jobId: jobId,
    CV: CV, // Path to the CV file
    status: status || 'pending',
  });
  await newApplication.save()
    .then(application => {
      console.log('Application created:', application._id);
      applications.push(application._id);
      console.log(applications);
    })
    .catch(err => console.error(err));
}



// Seed data function
async function seed() {
  // Drop existing collections
  await User.collection.drop().catch(() => console.log('No users to drop'));
  await Job.collection.drop().catch(() => console.log('No jobs to drop'));
  await Application.collection.drop().catch(() => console.log('No applications to drop'));

  // Create users
  await userCreate(users, "John Doe", "john@example.com", "password123", "job_seeker");
  await userCreate(users, "Jane Smith", "jane@example.com", "securePass456", "admin");

  // Create jobs
  await jobCreate(jobs, "Frontend Developer", "Build user interfaces", "IT", "Remote", 90000);
  await jobCreate(jobs, "Data Scientist", "Analyze large data sets", "Analytics", "New York", 120000);

  // Create applications
  await applicationCreate(applications, users[0], jobs[0], "/cv/john_frontend.pdf", "pending");
  await applicationCreate(applications, users[0], jobs[1], "/cv/john_data.pdf", "reviewed");
}


seed();

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

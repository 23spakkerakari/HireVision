// pages/api/jobs.js
let jobs = []; // Temporary in-memory storage, replace with database for production

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { jobDescription, questions } = req.body;

    // Generate a unique ID for the job post
    const jobId = Date.now().toString();
    const newJob = { id: jobId, jobDescription, questions };
    jobs.push(newJob);

    res.status(201).json(newJob);
  } else if (req.method === 'GET') {
    // Return all jobs for reference or testing purposes
    res.status(200).json(jobs);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


// pages/api/jobs/[id].js
export default function handler(req, res) {
    const { id } = req.query;
  
    const job = jobs.find((job) => job.id === id);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  }
  

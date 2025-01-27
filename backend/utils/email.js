import nodemailer from "nodemailer"
import Job from "../models/Job.js"

export const sendJobAlert = async (jobId, candidates) => {
  const job = await Job.findById(jobId).populate("company")

  const transporter = nodemailer.createTransport({
    // Configure your email service here
  })

  for (const candidate of candidates) {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: candidate,
      subject: `New Job Alert: ${job.title}`,
      html: `
        <h1>New Job Opportunity</h1>
        <p>Job Title: ${job.title}</p>
        <p>Company: ${job.company.name}</p>
        <p>Description: ${job.description}</p>
        <p>Experience Level: ${job.experienceLevel}</p>
        <p>End Date: ${job.endDate}</p>
      `,
    })
  }
}


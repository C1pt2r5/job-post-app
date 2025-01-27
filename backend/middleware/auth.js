import jwt from "jsonwebtoken"
import Company from "../models/Company.js"

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: "Authentication required" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const company = await Company.findById(decoded.id)
    if (!company) {
      return res.status(401).json({ error: "Authentication required" })
    }
    req.company = company
    next()
  } catch (error) {
    res.status(401).json({ error: "Authentication required" })
  }
}


const CLIENT_ID = "924880684322-sm1pdikriuvgdqf3b57vsi8omr88kp3b.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//04KJdrdc2BxeqCgYIARAAGAQSNwF-L9IrPksf49ZWK7dxfKkrkLxIJV7QvQdslDLkW4iJ7oGzwJ4hkNo2sjk-SssFm_m0z5LjR4Q"
const AUTH_SECRET = process.env.AUTH_SECRET || "Secret!"
const ACTIVATION_SECRET = process.env.ACTIVATION_SECRET || "ActivationSecret!"
const RECOVERY_SECRET = process.env.RECOVERY_SECRET || "RecoverySecret!"
const FRONT_URL = process.env.FRONT_URL || "https://study-rooms-gilt.vercel.app"


module.exports = {CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, AUTH_SECRET, ACTIVATION_SECRET, RECOVERY_SECRET, FRONT_URL}
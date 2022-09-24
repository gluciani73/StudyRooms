const CLIENT_ID = "924880684322-sm1pdikriuvgdqf3b57vsi8omr88kp3b.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//04VRO9eA1LxEjCgYIARAAGAQSNwF-L9IrfteSPk-xjs0G5Z5fF_OWx0v0fBX9Uhj3Mcuz5kb2_ItPYLiNyBS5fA61Nzu5GiBw5x0"
const AUTH_SECRET = process.env.AUTH_SECRET || "Secret!"
const ACTIVATION_SECRET = process.env.ACTIVATION_SECRET || "ActivationSecret!"
const RECOVERY_SECRET = process.env.RECOVERY_SECRET || "RecoverySecret!"

module.exports = {CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, AUTH_SECRET, ACTIVATION_SECRET, RECOVERY_SECRET}
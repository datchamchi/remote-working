import { MailtrapClient } from 'mailtrap'

/**
 * For this example to work, you need to set up a sending domain,
 * and obtain a token that is authorized to send from the domain.
 */

const TOKEN = process.env.MAILTRAP_API

if (!TOKEN) throw new Error('ERROR CONFIG MAILTRAP')
const mailtrapClient = new MailtrapClient({ token: TOKEN })

export default mailtrapClient

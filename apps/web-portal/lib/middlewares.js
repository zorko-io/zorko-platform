import cors from 'cors'
import bodyParser from 'body-parser'

export default {
  json: bodyParser.json({
    limit: 1024 * 1024,
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf)
      } catch (e) {
        res.send({
          status: 0,
          error: {
            code: 'BROKEN_JSON',
            message: 'Please, verify your json',
          },
        })
        throw new Error('BROKEN_JSON')
      }
    },
  }),
  urlencoded: bodyParser.urlencoded({extended: true}),
  cors: cors({origin: '*'}), // Allow any origin because we DO NOT USE cookies and basic auth
}

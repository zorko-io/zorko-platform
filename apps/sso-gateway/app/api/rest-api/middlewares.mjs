import bodyParser   from 'body-parser';
import cors         from 'cors';


export default {
    urlencoded: bodyParser.urlencoded({ extended: true }),

    json: bodyParser.json({
        limit  : 1024 * 1024,
        verify : (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch(e) {
                res.send({
                    status: 0,
                    error: {
                        message: 'Please verify your json'
                    }
                });
                throw new Error('BROKEN_JSON');
            }
        }
    }),

    cors: cors({ origin: '*' })
}
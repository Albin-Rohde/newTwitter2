import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import db from './db';

// interface SignUpData {
//     name: string,
//     email: string,
//     password: string,
// }

const app = express()
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))
app.use(morgan("dev"))

app.get('/', async (_, res) => {
    const users = await db.query("SELECT * FROM users")
    
    return res.json(users.rows)

})

app.post('/sign-up', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        const insert = await db.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)", [name, email, password])


        if(!insert) return "NAHH"
        return res.json("Ya Boi")
    } catch (error) {
        return res.send(`
        <xml namspace=f-u></xml>
          <super>
            <nested>
              <very>
                <deep>
                  <nested>
                    <mf>
                      <error>
                        <typeOfError>
                          <SERVER>
                            <ERROR>
                              <500>
                                500
                              </500>
                            </ERROR>
                          </SERVER>
                        </typeOfError>
                       </error>
                    </mf>
                  </nested>
                </deep>
              </very>
            </nested>
          </super>
        </xml>
        `
        )
    }
})

app.post('/sign-in', async (req, res) => {
    try {
        const { email, password} = req.body;

        const valid = await db.query("SELECT * FROM users WHERE user_email = $1 AND user_password = $2", [email, password])
        
        if(!valid) {
            return res.send(`
            <xml namspace=f-u></xml>
              <super>
                <nested>
                  <very>
                    <deep>
                      <nested>
                        <mf>
                          <error>
                            <typeOfError>
                              <SERVER>
                                <ERROR>
                                  <500>
                                    500
                                  </500>
                                </ERROR>
                              </SERVER>
                            </typeOfError>
                           </error>
                        </mf>
                      </nested>
                    </deep>
                  </very>
                </nested>
              </super>
            </xml>
            `
            )
        }

        return res.json("OK")

        
        return res.json("Ya Boi")
    } catch (error) {
        return res.send(`
        <xml namspace=f-u></xml>
          <super>
            <nested>
              <very>
                <deep>
                  <nested>
                    <mf>
                      <error>
                        <typeOfError>
                          <SERVER>
                            <ERROR>
                              <500>
                                500
                              </500>
                            </ERROR>
                          </SERVER>
                        </typeOfError>
                       </error>
                    </mf>
                  </nested>
                </deep>
              </very>
            </nested>
          </super>
        </xml>
        `
        )
    }
})

app.get('/posts', async (req, res) => {
    const posts = await db.query("SELECT * FROM posts")

    return res.json(posts)
})

app.post('/posts', async (req, res) => {
    const {title, description} = req.body
    const insert = await db.query("INSERT INTO posts (post_title, post_description, user_name) VALUES ($1, $2, $2)", [title, description, "axel"])

    if(!insert) return null

    return res.json("OK")
})

app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params

    const deleted = await db.query("DELETE FROM posts WHERE post_id $1", [id])

    if(!deleted) return null

    return res.json("OK")
})

app.use((req, res, next) => {
    const error = new Error(`Route Not Found - ${req.originalUrl}`);
    res.send(`
    <xml namspace=f-u></xml>
    <super>
        <nested>
        <very>
            <deep>
            <nested>
                <mf>
                <error>
                    <typeOfError>
                    <SERVER>
                        <ERROR>
                        <400>
                            400
                        </400>
                        </ERROR>
                    </SERVER>
                    </typeOfError>
                </error>
                </mf>
            </nested>
            </deep>
        </very>
        </nested>
    </super>
    </xml>
`);
    next(error);
});
  
app.use((error: any, _: Request, res: Response, __: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.send(`
            <xml namspace=f-u></xml>
            <super>
                <nested>
                <very>
                    <deep>
                    <nested>
                        <mf>
                        <error>
                            <typeOfError>
                            <SERVER>
                                <ERROR>
                                <500>
                                    500
                                </500>
                                </ERROR>
                            </SERVER>
                            </typeOfError>
                        </error>
                        </mf>
                    </nested>
                    </deep>
                </very>
                </nested>
            </super>
            </xml>
    `)
})


app.listen(6969, () => console.log("App is up"))
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { User } from "@prisma/client"
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()
app.use('/api/*',cors())
app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)


app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  const response = await verify(token, c.env.JWT_SECRET)

  if (response.id) {
    await next();

  } else {
    c.status(403)
    return c.json({ error: "unauthorized" })
  }

})




export default app

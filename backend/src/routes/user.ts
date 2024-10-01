import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { User } from "@prisma/client"
import { signupInput,signinInput} from '@amit63390/medium-common'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();



userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
  
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input detected!"
      })
    }

  
    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name
        },
      })
      if (!user) {
        c.status(403);
        return c.json({
          msg: "Incorrect creds"
        })
      }
  
      const token = await sign(
        { id: user.id },
        c.env.JWT_SECRET
      )

      
  
      return c.redirect('/blogs');
    } catch (e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input detected!"
      })
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: body.username,
          password: body.password
        }
      })
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
      }
      const jwt = await sign(
        {id: user.id},c.env.JWT_SECRET)
  
        return c.redirect('/blogs');
    } catch (e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
  
    }
  
  
  })
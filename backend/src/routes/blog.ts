import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { User } from "@prisma/client"
import { createBlogInput,updateBlogInput } from '@amit63390/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId:string;
    }
}>();



blogRouter.use("/*", async (c, next) => {
    const authHeader = await c.req.header("authorization")||"";
    const user = await verify(authHeader,c.env.JWT_SECRET);

    if(user){
        c.set("userId",user.id);
        await next();
    }else{
        c.status(403);
        return c.json({msg:"you are not loggen in"})
    }

    
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input detected!"
      })
    }

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })

})
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        msg:"Invalid input detected!"
      })
    }

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,

        }
    })

    return c.json({
        id: blog.id
    })
})

//TODO : add pagination
blogRouter.get('/bulk', async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
    
                }
            }
        });
        return c.json({
            blogs
        })
    } catch (error) {
        return c.json({
            msg:"Error from bulk router"
        })
        
    }

})

blogRouter.get('/:id', async (c) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch (e) {
        c.status(411)
        return c.json({
            msg: "Error while fetching blog post"
        })

    }

})


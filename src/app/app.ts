import express, { NextFunction, Request, Response } from 'express'
const app = express()

// parser
app.use(express.json())
app.use(express.text())



const userRouter = express.Router()
const courseRouter = express.Router()


app.use('/api/v1',courseRouter)
app.use('/api/v1/course',userRouter)

userRouter.get('/users/creat-user', (req: Request, res: Response) => {
    const user = req.body
    console.log(user);
    res.json({
        succuss: true,
        message: "User is created successFully",
        data:user
    })
})

courseRouter.post('/createCourse', (req: Request, res: Response) => {
    const course = req.body
    console.log(course);
    res.json({
        succuss: true,
        message: "course is created successFully",
        data:course
    })
})



// MiddleWare
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.hostname);
    next()
}


app.get('/',logger, (req : Request, res:Response) => {
 
})

app.post('/',logger, (req:Request, res:Response,next:NextFunction) => {
    try {
        // console.log(tst);

    res.send("Got Data")
    }
    catch (err) {
        next(err)

    }

})



app.all("*", (req:Request, res:Response) => {
    res.status(400).json({
        success: false,
        message:"Route Not Found"
    })
})


// globadl error handler

app.use((error:any, req:Request, res:Response, next:NextFunction) => {
    console.log(error);
    if (error) {
        res.status(400).json({
            succuss: false,
            message:"Something went wrong"
        })
    }
})

export default app
import express from 'express';
import cors from 'cors';
import { router } from "./domains/controller";

const app = express();

app.use(
    cors({
        origin: '*',
    })
)

app.use(router)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

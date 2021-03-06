const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const campaignRouter = require('./routes/campaign.route');
const segmentRouter = require('./routes/segment.route');
const customerRouter =require('./routes/customer.route');
const templateRouter = require(`./routes/template.route`)

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/campaign`, campaignRouter);
app.use(`/api/v1/segment`,segmentRouter);
app.use(`/api/v1/customer`,customerRouter);
app.use(`/api/v1/template`,templateRouter );
app.use('/api/v1/image_template',express.static(`${process.cwd()}/assets/imageTemplate`))
// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
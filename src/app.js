import cookieParser from 'cookie-parser';
import ejs          from 'ejs';
import express      from 'express';
import createError  from 'http-errors';
import logger       from 'morgan';
import path         from 'path';

import { router as indexRouter } from './routes/index';

const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export { app };

import cookieParser    from 'cookie-parser';
import { randomBytes } from 'crypto';
import ejs             from 'ejs';
import express         from 'express';
import session         from 'express-session';
import createError     from 'http-errors';
import logger          from 'morgan';
import path            from 'path';

import { scripts, styles } from './assets';

import { router as authRouter }  from './routes/auth';
import { router as indexRouter } from './routes/index';

const app = express();

app.locals = {
    $_styles: styles,
    $_scripts: scripts,
    rmWhitespace: true,
};

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.__express);

const sessionOptions = {
    secret: randomBytes(256).toString(),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
};

if (app.get('env') !== 'development') {
    app.set('trust proxy', 1);
    sessionOptions.cookie.secure = true;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

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

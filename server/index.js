require('./config');

const express= require('express');
const hbs= require('hbs');
const hbsUtils = require('hbs-utils')(hbs);

hbs.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

const router = require('./routes');
const app= express();

const port= process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`)
app.use(express.json())

/**__filename -> route from / to the actual archive.
 * dirname -> route from / to the archive file.
 */
app.use('/', express.static(`${__dirname}/public`))
app.use(router);

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Travel Agency Web',
        users: [
            {id: 1, name: 'Natasha'},
            {id: 2, name: 'Ariel'},
            {id: 3, name: 'Jasmine'}
        ],
        admin: {
            name: 'Natasha',
            fullName: 'Natasha Davis'
        }
    });
});


app.listen(port, () =>
    console.log('server opened at port '+ port))

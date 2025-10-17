const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// In-memory user store (in production, use a database)
const users = [
    {
        id: 1,
        username: 'admin',
        password: '$2a$10$8Q8h.8L3J3Q8h.8L3J3Q8uO8Q8h.8L3J3Q8h.8L3J3Q8uO8Q8h.8L3J2' // "password" hashed
    }
];

// Express middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Flash messages
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables for templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
});

// Passport Local Strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = users.find(u => u.username === username);
            
            if (!user) {
                return done(null, false, { message: 'उपयोगकर्ता नहीं मिला।' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'गलत पासवर्ड।' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Authentication middleware
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'कृपया पहले लॉगिन करें।');
    res.redirect('/login');
}

// Routes
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        res.render('index', { title: 'स्वागत है' });
    }
});

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    res.render('login', { title: 'लॉगिन' });
});

app.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    res.render('register', { title: 'पंजीकरण' });
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { 
        title: 'डैशबोर्ड',
        user: req.user
    });
});

app.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { 
        title: 'प्रोफ़ाइल',
        user: req.user
    });
});

// Authentication routes
app.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.post('/register', async (req, res) => {
    const { username, password, password2 } = req.body;
    let errors = [];

    // Validation
    if (!username || !password || !password2) {
        errors.push({ msg: 'कृपया सभी फील्ड भरें।' });
    }

    if (password !== password2) {
        errors.push({ msg: 'पासवर्ड मेल नहीं खाते।' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।' });
    }

    // Check if user exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        errors.push({ msg: 'उपयोगकर्ता पहले से मौजूद है।' });
    }

    if (errors.length > 0) {
        res.render('register', {
            title: 'पंजीकरण',
            errors,
            username,
            password,
            password2
        });
    } else {
        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create new user
            const newUser = {
                id: users.length + 1,
                username: username,
                password: hashedPassword
            };
            
            users.push(newUser);
            
            req.flash('success_msg', 'आप सफलतापूर्वक पंजीकृत हैं। अब आप लॉगिन कर सकते हैं।');
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'पंजीकरण में त्रुटि हुई।');
            res.redirect('/register');
        }
    }
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'आप सफलतापूर्वक लॉगआउट हैं।');
        res.redirect('/login');
    });
});

// API routes for testing
app.get('/api/users', ensureAuthenticated, (req, res) => {
    // Don't send passwords in real applications
    const safeUsers = users.map(user => ({
        id: user.id,
        username: user.username
    }));
    res.json(safeUsers);
});

app.get('/api/profile', ensureAuthenticated, (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server चल रहा है पोर्ट ${PORT} पर`);
    console.log(`http://localhost:${PORT} पर जाएं`);
});

module.exports = app;

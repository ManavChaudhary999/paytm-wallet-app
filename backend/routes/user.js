const zod = require('zod');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const {User, Account} = require('../db');
const {authMiddleware} = require('../middlewares');

const jwtKey = process.env.JWT_SECRET;

const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
});

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

const profileSchema = zod.object({
    firstName: zod.string().min(3).max(20).optional(),
    lastName: zod.string().min(3).max(20).optional(),
    password: zod.string().min(6).optional(),
});


router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const {success, error} = signupSchema.safeParse({email, password, firstName, lastName});
    if(!success) return res.status(411).json({message: 'Invalid input', error});
    
    const existingUser = await User.findOne({email});

    if(existingUser) return res.status(409).json({message: 'User already exists'});

    try {
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
        });
    
        const token = jwt.sign({userId: user._id}, jwtKey);

        await Account.create({
            userId: user._id,
            balance: Math.floor(1 + Math.random() * 10000),
        })
    
        res.json({
            msg: 'User Created Successfully',
            token,
        });
    } catch (err) {
        res.status(500).json({message: 'Server Error', err});
    }
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    const {success, error} = loginSchema.safeParse({email, password});
    if(!success) return res.status(411).json({message: 'Invalid input', error});

    const user = await User.findOne({email, password});
    if(!user) return res.status(401).json({message: 'Invalid Credentials'});

    const token = jwt.sign({userId: user._id}, jwtKey);
    res.json({
        msg: 'User Signed In Successfully',
        token,
    });
});

router.put('/', authMiddleware, (req, res) => {
    const {success, error} = profileSchema.safeParse(req.body);
    if(!success) return res.status(411).json({message: 'Invalid input', error});

    const userId = req.userId;
    const {firstName, lastName, password} = req.body;
    
    User.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        password
    }).then(()=> res.json({ msg: 'Profile Updated Successfully'}))
    .catch((err)=> res.status(500).json({message: 'Error updating profile', error}));

});

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter;
    const searchFilter = filter || '';

    const users = await User.find({
        $and: [
            {
                $or: [
                    {firstName: {$regex: searchFilter, $options: 'i'}},
                    {lastName: {$regex: searchFilter, $options: 'i'}},
                ]
            },
            {
                _id: {$ne: req.userId}
            }
        ]
    }, 'firstName lastName email _id');

    res.json({users});
    
    // res.json({
    //     users: users.map(user => ({
    //         _id: user._id,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         email: user.email,
    //     }))
    // })
});


module.exports = router;
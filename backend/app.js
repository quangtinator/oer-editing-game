const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const constants = require('./utils/constants');
const utils = require('./utils/utils');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt_decode = require('jwt-decode');
const UserModel = require('./models/user');
const HighScoreModel = require('./models/high_score');
const {mongo_db_base_url} = require('./api');
const app = express();

const memoryStore = new session.MemoryStore();

app.use(cors());
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

const keycloak = require('./utils/keycloak-config').initKeycloak(memoryStore);

app.use(keycloak.middleware());

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Server is on no api/v1');
});

app.post('/api/v1/check-compatible', keycloak.checkSso(), (req, res) => {
    const {type} = req.body;
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ')[1];
    const decoded_token = jwt_decode(token);
    if (type.toLowerCase() === constants.TYPE.collage) {
        res.send(utils.checkCompatibilityCollage(req.body))
    } else if (type.toLowerCase() === constants.TYPE.composition) {
        res.send(utils.checkCompatibilityComposition(req.body))
    }
});

// get progress
app.get('/api/v1/progress/get', keycloak.checkSso(), (req, res) => {
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ')[1];
    const decoded_token = jwt_decode(token);
    UserModel
        .findOne({email: decoded_token.email})
        .then(userDoc => {
            if (!userDoc) {
                const user = new UserModel({...decoded_token});
                return user.save();
            } else if (userDoc.sub === decoded_token.sub) {
                res.status(200).json(userDoc.toJSON());
            } else {
                res.status(200).json(null);
            }
        })
        .catch(err => {
            console.log('err :>> ', err);
            res.status(400).json("Failed");
        })
});

// post progress
app.post('/api/v1/progress/post', keycloak.checkSso(), (req, res) => {
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ')[1];
    const decoded_token = jwt_decode(token);
    const level = req.body.level;

    UserModel
        .findOne({email: decoded_token.email})
        .then(userDoc => {
            if (!userDoc) {
                const user = new UserModel({...decoded_token, ...req.body});
                return user.save();
            } else if (userDoc.sub === decoded_token.sub) {
                userDoc.set('level', {
                    ...userDoc.toJSON().level,
                    ...level
                });
                return userDoc.save();
            } else {
                userDoc.overwrite({...decoded_token, ...req.body});
                return userDoc.save();
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log('err :>> ', err);
            res.status(400).json("Failed");
        })
});

// get score
app.get('/api/v1/high-score-board/get', keycloak.checkSso(), (req, res) => {
    HighScoreModel
        .find({})
        .populate('user')
        .then(high_score_board => {
            high_score_board = high_score_board.map(row => {
                return {...row._doc, user: row._doc.user.preferred_username}
            });
            res.status(200).json(high_score_board);
        })
        .catch(err => {
            console.log('err :>> ', err);
            res.status(400).json("Failed");
        });
});

// post score
app.post('/api/v1/score/post', keycloak.checkSso(), (req, res) => {
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ')[1];
    const decoded_token = jwt_decode(token);
    const score = req.body.score;
    UserModel
        .findOne({email: decoded_token.email})
        .then(userDoc => {
            if (!userDoc) {
                const user = new UserModel({...decoded_token, ...req.body});
                return user.save();
            } else if (userDoc.sub === decoded_token.sub) {
                userDoc.set('score', score);
                return userDoc.save();
            } else {
                userDoc.overwrite({...decoded_token, ...req.body});
                return userDoc.save();
            }
        })
        .then(current_user => {
            HighScoreModel
                .find({position: {$lt: 3}})
                .then(slots => {
                    slots = check_high_score(slots, current_user);
                    HighScoreModel.deleteMany({}).then(res => {
                        return Promise.all(slots.map(slot => {
                            const high_score = new HighScoreModel({
                                user: slot.user,
                                score: slot.score,
                                position: slot.position
                            });
                            return high_score.save();
                        })).then(res => res);
                    });
                })
                .catch(err => console.log(err));

            res.status(200);
        })
        .catch(err => {
            console.log('err :>> ', err);
            res.status(400).json("Failed");
        });
});

const check_high_score = (slots, current_user) => {
    let index_of_user_in_high_score_board = slots.findIndex((slot) => (slot.user.toString() === current_user._id.toString()));
    if (index_of_user_in_high_score_board !== -1 && slots[index_of_user_in_high_score_board].score <= current_user.score) {
        slots[index_of_user_in_high_score_board].score = current_user.score;
    } else if (slots.length < 3 && index_of_user_in_high_score_board === -1) {
        slots.push({
            user: current_user._id,
            score: current_user.score
        });
    } else if (index_of_user_in_high_score_board === -1) {
        let pointer = -1;
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].score < current_user.score
                && (pointer === -1 || slots[i].score > slots[pointer].score)) {
                pointer = i;
            }
        }

        if (pointer !== -1) {
            slots[pointer].user = current_user._id;
            slots[pointer].score = current_user.score;
        } else {
            console.log('user does not get into the leaderboard');
        }
    }

    slots.sort((slot1, slot2) => slot2.score - slot1.score);

    for (let i = 0; i < slots.length; i++) {
        slots[i].position = i;
    }
    return slots;
};

mongoose.connect(mongo_db_base_url + 'license_game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log('connected to mongoDB');
    app.listen(5001, () => {
        console.log('App listening on port 5001');
    });
}).catch(err => console.log(err));

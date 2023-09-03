import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory store for users
type User = { id: number, name: string };
let users: User[] = [];
let currentId = 1;

// Create user
app.post('/users', (req, res) => {
    const user: User = {
        id: currentId++,
        name: req.body.name
    };
    users.push(user);
    res.json(user);
});

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Edit user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.sendStatus(404);
    }

    user.name = req.body.name || user.name;
    res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    users = users.filter(u => u.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});

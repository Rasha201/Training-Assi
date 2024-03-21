const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

function readFile() {
    const filePath = path.resolve(__dirname, '../tasks.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

function writeFile(data) {
    const filePath = path.resolve(__dirname, '../tasks.json');
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function getAll(req, res) {
    try {
        res.status(200).json({ tasks: readFile() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function getById(req, res) {
    try {
        const id = req.params.id;
        const tasks = readFile();
        const task = tasks[id];
        if (!task) {
            return res.status(404).json({ message: `Task with id ${id} not found` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function create(req, res) {
    try {
        const data = req.body;
        const tasks = readFile();
        const id = uuid.v4();
        data.id = id;
        tasks[id] = data;
        writeFile(tasks);
        res.status(201).json({ task: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const tasks = readFile();
        if (!tasks[id]) {
            return res.status(404).json({ message: 'Task not found' });
        }
        data.id = id;
        tasks[id] = data;
        writeFile(tasks);
        res.status(200).json({ task: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function remove(req, res) {
    try {
        const id = req.params.id;
        const tasks = readFile();
        if (!tasks[id]) {
            return res.status(404).json({ message: `Task with id ${id} not found` });
        }
        delete tasks[id];
        writeFile(tasks);
        res.json({ message: `Task with id ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};

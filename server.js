// Import express module
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data to be returned by the API
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

// GET endpoint to fetch all items
app.get('/api/items', (req, res) => {
    res.status(200).json(items);
});

// GET endpoint to fetch a specific item by ID
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.status(200).json(item);
});

// POST endpoint to create a new item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT endpoint to update an existing item
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }

    item.name = req.body.name;
    res.status(200).json(item);
});

// DELETE endpoint to delete an item by ID
app.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }

    items.splice(itemIndex, 1);
    res.status(200).send('Item deleted');
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

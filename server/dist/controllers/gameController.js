// GET all Games
export function getAllGames(dbAdapter) {
    return async (_req, res) => {
        try {
            const rows = await dbAdapter.query("SELECT * FROM Games");
            res.json(rows);
        }
        catch (error) {
            console.error("Error fetching Games data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// GET Game by ID
export function getGameById(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const [row] = await dbAdapter.query("SELECT * FROM Games WHERE gameID = ?", [id]);
            if (row) {
                res.json(row);
            }
            else {
                res.status(404).json({ error: "Game not found" });
            }
        }
        catch (error) {
            console.error("Error fetching Game by ID:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// POST (create) Game
export function createGame(dbAdapter) {
    return async (req, res) => {
        try {
            const { developerID, title, description, releaseDate } = req.body;
            if ([developerID, title, description, releaseDate].some((field) => field === undefined)) {
                res.status(400).json({ error: "All game fields are required" });
                return;
            }
            const result = await dbAdapter.command("INSERT INTO Games (developerID, title, description, releaseDate) VALUES (?, ?, ?, ?)", [developerID, title, description, releaseDate]);
            res.status(201).json({ message: "Game created", id: result.insertId });
        }
        catch (error) {
            console.error("Error creating Game:", error.message || error);
            res.status(500).json({ error: "Failed to create data" });
        }
    };
}
// PATCH (update) Game (by ID)
export function updateGame(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const { developerID, title, description, releaseDate } = req.body;
            if (title === undefined) {
                res.status(400).json({ error: "title is required" });
                return;
            }
            const result = await dbAdapter.command("UPDATE Games SET developerID = ?, title = ?, description = ?, releaseDate = ? WHERE gameID = ?", [developerID, title, description, releaseDate, id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Game updated successfully" });
            }
            else {
                res.status(404).json({ error: "Game not found" });
            }
        }
        catch (error) {
            console.error("Error updating Game:", error.message || error);
            res.status(500).json({ error: "Failed to update data" });
        }
    };
}
// DELETE Game (by ID)
export function deleteGame(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID parameter is required" });
                return;
            }
            const result = await dbAdapter.command("DELETE FROM Games WHERE gameID = ?", [id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Game deleted successfully" });
            }
            else {
                res.status(404).json({ error: "Game not found" });
            }
        }
        catch (error) {
            console.error("Error deleting Game:", error.message || error);
            res.status(500).json({ error: "Failed to delete data" });
        }
    };
}

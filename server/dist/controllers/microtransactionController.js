// GET all Microtransactions
export function getAllMicrotransactions(dbAdapter) {
    return async (_req, res) => {
        try {
            const rows = await dbAdapter.query("SELECT * FROM Microtransactions");
            res.json(rows);
        }
        catch (error) {
            console.error("Error fetching Microtransactions data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// GET Microtransaction by ID
export function getMicrotransactionById(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const [row] = await dbAdapter.query("SELECT * FROM Microtransactions WHERE microtransactionID = ?", [id]);
            if (row) {
                res.json(row);
            }
            else {
                res.status(404).json({ error: "Microtransaction not found" });
            }
        }
        catch (error) {
            console.error("Error fetching Microtransaction by ID:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// POST (create) Microtransaction
export function createMicrotransaction(dbAdapter) {
    return async (req, res) => {
        try {
            const { gameID, price, description } = req.body;
            if ([gameID, price, description].some((field) => field === undefined)) {
                res
                    .status(400)
                    .json({ error: "gameID, price, and description are required" });
                return;
            }
            const result = await dbAdapter.command("INSERT INTO Microtransactions (gameID, price, description) VALUES (?, ?, ?)", [gameID, price, description]);
            res
                .status(201)
                .json({ message: "Microtransaction created", id: result.insertId });
        }
        catch (error) {
            console.error("Error creating Microtransaction:", error.message || error);
            res.status(500).json({ error: "Failed to create data" });
        }
    };
}
// PATCH (update) Microtransaction (by ID)
export function updateMicrotransaction(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const { gameID, price, description } = req.body;
            if (description === undefined) {
                res.status(400).json({ error: "description is required" });
                return;
            }
            const result = await dbAdapter.command("UPDATE Microtransactions SET gameID = ?, price = ?, description = ? WHERE microtransactionID = ?", [gameID, price, description, id]);
            if (result.affectedRows > 0) {
                res
                    .status(200)
                    .json({ message: "Microtransaction updated successfully" });
            }
            else {
                res.status(404).json({ error: "Microtransaction not found" });
            }
        }
        catch (error) {
            console.error("Error updating Microtransaction:", error.message || error);
            res.status(500).json({ error: "Failed to update data" });
        }
    };
}
// DELETE Microtransaction (by ID)
export function deleteMicrotransaction(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID parameter is required" });
                return;
            }
            const result = await dbAdapter.command("DELETE FROM Microtransactions WHERE microtransactionID = ?", [id]);
            if (result.affectedRows > 0) {
                res
                    .status(200)
                    .json({ message: "Microtransaction deleted successfully" });
            }
            else {
                res.status(404).json({ error: "Microtransaction not found" });
            }
        }
        catch (error) {
            console.error("Error deleting Microtransaction:", error.message || error);
            res.status(500).json({ error: "Failed to delete data" });
        }
    };
}

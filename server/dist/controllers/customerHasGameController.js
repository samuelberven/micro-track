// GET all records
export function getAllCustomersHaveGames(dbAdapter) {
    return async (_req, res) => {
        try {
            const rows = await dbAdapter.query("SELECT * FROM CustomersHaveGames");
            res.json(rows);
        }
        catch (error) {
            console.error("Error fetching CustomersHaveGames data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// GET record by ID
export function getCustomersHaveGameById(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const [row] = await dbAdapter.query("SELECT * FROM CustomersHaveGames WHERE customersHaveGamesID = ?", [id]);
            if (row) {
                res.json(row);
            }
            else {
                res.status(404).json({ error: "Record not found" });
            }
        }
        catch (error) {
            console.error("Error fetching record by ID:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// POST (create) record
export function createCustomersHaveGame(dbAdapter) {
    return async (req, res) => {
        try {
            const { customerID, gameID, installDate } = req.body;
            if ([customerID, gameID].some((field) => field === undefined)) {
                res.status(400).json({ error: "customerID and gameID are required" });
                return;
            }
            const result = await dbAdapter.command("INSERT INTO CustomersHaveGames (customerID, gameID, installDate) VALUES (?, ?, ?)", [customerID, gameID, installDate || null]);
            res.status(201).json({ message: "Record created", id: result.insertId });
        }
        catch (error) {
            console.error("Error creating record:", error.message || error);
            res.status(500).json({ error: "Failed to create data" });
        }
    };
}
// PATCH (update) record
export function updateCustomersHaveGame(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const { customerID, gameID, installDate } = req.body;
            if (customerID === undefined || gameID === undefined) {
                res.status(400).json({ error: "customerID and gameID are required" });
                return;
            }
            const result = await dbAdapter.command("UPDATE CustomersHaveGames SET customerID = ?, gameID = ?, installDate = ? WHERE customersHaveGamesID = ?", [customerID, gameID, installDate || null, id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Record updated successfully" });
            }
            else {
                res.status(404).json({ error: "Record not found" });
            }
        }
        catch (error) {
            console.error("Error updating record:", error.message || error);
            res.status(500).json({ error: "Failed to update data" });
        }
    };
}
// DELETE record
export function deleteCustomersHaveGame(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID parameter is required" });
                return;
            }
            const result = await dbAdapter.command("DELETE FROM CustomersHaveGames WHERE customersHaveGamesID = ?", [id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Record deleted successfully" });
            }
            else {
                res.status(404).json({ error: "Record not found" });
            }
        }
        catch (error) {
            console.error("Error deleting record:", error.message || error);
            res.status(500).json({ error: "Failed to delete data" });
        }
    };
}

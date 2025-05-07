// GET all Developers
export function getAllDevelopers(dbAdapter) {
    return async (_req, res) => {
        try {
            const rows = await dbAdapter.query("SELECT * FROM Developers");
            res.json(rows);
        }
        catch (error) {
            console.error("Error fetching Developers data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// GET Developer by ID
export function getDeveloperById(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const [row] = await dbAdapter.query("SELECT * FROM Developers WHERE developerID = ?", [id]);
            if (row) {
                res.json(row);
            }
            else {
                res.status(404).json({ error: "Developer not found" });
            }
        }
        catch (error) {
            console.error("Error fetching Developer by ID:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// POST (create) Developer
export function createDeveloper(dbAdapter) {
    return async (req, res) => {
        try {
            const { developerName, address, city, state, zipCode, email, contact } = req.body;
            // Ensure all required fields are provided
            if ([developerName, address, city, state, zipCode, email, contact].some((field) => field === undefined)) {
                res.status(400).json({ error: "All developer fields are required" });
                return;
            }
            const result = await dbAdapter.command("INSERT INTO Developers (developerName, address, city, state, zipCode, email, contact) VALUES (?, ?, ?, ?, ?, ?, ?)", [developerName, address, city, state, zipCode, email, contact]);
            res.status(201).json({
                message: "Developer created",
                id: result.insertId,
            });
        }
        catch (error) {
            console.error("Error creating Developer:", error.message || error);
            res.status(500).json({ error: "Failed to create data" });
        }
    };
}
// PATCH (update) Developer (by ID)
export function updateDeveloper(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const { developerName, address, city, state, zipCode, email, contact } = req.body;
            // Require at least a primary field, e.g. developerName
            if (developerName === undefined) {
                res.status(400).json({ error: "developerName is required" });
                return;
            }
            const result = await dbAdapter.command("UPDATE Developers SET developerName = ?, address = ?, city = ?, state = ?, zipCode = ?, email = ?, contact = ? WHERE developerID = ?", [developerName, address, city, state, zipCode, email, contact, id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Developer updated successfully" });
            }
            else {
                res.status(404).json({ error: "Developer not found" });
            }
        }
        catch (error) {
            console.error("Error updating Developer:", error.message || error);
            res.status(500).json({ error: "Failed to update data" });
        }
    };
}
// DELETE Developer (by ID)
export function deleteDeveloper(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID parameter is required" });
                return;
            }
            const result = await dbAdapter.command("DELETE FROM Developers WHERE developerID = ?", [id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Developer deleted successfully" });
            }
            else {
                res.status(404).json({ error: "Developer not found" });
            }
        }
        catch (error) {
            console.error("Error deleting Developer:", error.message || error);
            res.status(500).json({ error: "Failed to delete data" });
        }
    };
}

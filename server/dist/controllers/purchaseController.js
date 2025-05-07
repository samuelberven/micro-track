// GET all Purchases
export function getAllPurchases(dbAdapter) {
    return async (_req, res) => {
        try {
            const rows = await dbAdapter.query("SELECT * FROM Purchases");
            res.json(rows);
        }
        catch (error) {
            console.error("Error fetching Purchases data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// GET Purchase by ID
export function getPurchaseById(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const [row] = await dbAdapter.query("SELECT * FROM Purchases WHERE purchaseID = ?", [id]);
            if (row) {
                res.json(row);
            }
            else {
                res.status(404).json({ error: "Purchase not found" });
            }
        }
        catch (error) {
            console.error("Error fetching Purchase by ID:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// POST (create) Purchase
export function createPurchase(dbAdapter) {
    return async (req, res) => {
        try {
            const { customerID, microtransactionID, date } = req.body;
            // microtransactionID and date are required; customerID is allowed to be null.
            if ([microtransactionID, date].some((field) => field === undefined)) {
                res
                    .status(400)
                    .json({ error: "microtransactionID and date are required" });
                return;
            }
            const result = await dbAdapter.command("INSERT INTO Purchases (customerID, microtransactionID, date) VALUES (?, ?, ?)", [customerID || null, microtransactionID, date]);
            res
                .status(201)
                .json({ message: "Purchase created", id: result.insertId });
        }
        catch (error) {
            console.error("Error creating Purchase:", error.message || error);
            res.status(500).json({ error: "Failed to create data" });
        }
    };
}
// PATCH (update) Purchase (by ID)
export function updatePurchase(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const { customerID, microtransactionID, date } = req.body;
            if (microtransactionID === undefined || date === undefined) {
                res
                    .status(400)
                    .json({ error: "microtransactionID and date are required" });
                return;
            }
            const result = await dbAdapter.command("UPDATE Purchases SET customerID = ?, microtransactionID = ?, date = ? WHERE purchaseID = ?", [customerID || null, microtransactionID, date, id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Purchase updated successfully" });
            }
            else {
                res.status(404).json({ error: "Purchase not found" });
            }
        }
        catch (error) {
            console.error("Error updating Purchase:", error.message || error);
            res.status(500).json({ error: "Failed to update data" });
        }
    };
}
// DELETE Purchase (by ID)
export function deletePurchase(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID parameter is required" });
                return;
            }
            const result = await dbAdapter.command("DELETE FROM Purchases WHERE purchaseID = ?", [id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Purchase deleted successfully" });
            }
            else {
                res.status(404).json({ error: "Purchase not found" });
            }
        }
        catch (error) {
            console.error("Error deleting Purchase:", error.message || error);
            res.status(500).json({ error: "Failed to delete data" });
        }
    };
}

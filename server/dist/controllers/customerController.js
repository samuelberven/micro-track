// GET all Customers
export function getAllCustomers(dbAdapter) {
    return async (_req, res) => {
        try {
            const rows = await dbAdapter.query("SELECT * FROM Customers");
            res.json(rows);
        }
        catch (error) {
            console.error("Error fetching Customers data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// GET Customer by ID
export function getCustomerById(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const [row] = await dbAdapter.query("SELECT * FROM Customers WHERE customerID = ?", [id]);
            if (row) {
                res.json(row);
            }
            else {
                res.status(404).json({ error: "Customer not found" });
            }
        }
        catch (error) {
            console.error("Error fetching Customer by ID:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };
}
// POST (create) Customer
export function createCustomer(dbAdapter) {
    return async (req, res) => {
        try {
            const { servicePlatformID, username, email } = req.body;
            if ([servicePlatformID, username, email].some((field) => field === undefined)) {
                res.status(400).json({ error: "All customer fields are required" });
                return;
            }
            const result = await dbAdapter.command("INSERT INTO Customers (servicePlatformID, username, email) VALUES (?, ?, ?)", [servicePlatformID, username, email]);
            res
                .status(201)
                .json({ message: "Customer created", id: result.insertId });
        }
        catch (error) {
            console.error("Error creating Customer:", error.message || error);
            res.status(500).json({ error: "Failed to create data" });
        }
    };
}
// PATCH (update) Customer (by ID)
export function updateCustomer(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const { servicePlatformID, username, email } = req.body;
            if (username === undefined) {
                res.status(400).json({ error: "username is required" });
                return;
            }
            const result = await dbAdapter.command("UPDATE Customers SET servicePlatformID = ?, username = ?, email = ? WHERE customerID = ?", [servicePlatformID, username, email, id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Customer updated successfully" });
            }
            else {
                res.status(404).json({ error: "Customer not found" });
            }
        }
        catch (error) {
            console.error("Error updating Customer:", error.message || error);
            res.status(500).json({ error: "Failed to update data" });
        }
    };
}
// DELETE Customer (by ID)
export function deleteCustomer(dbAdapter) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID parameter is required" });
                return;
            }
            const result = await dbAdapter.command("DELETE FROM Customers WHERE customerID = ?", [id]);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Customer deleted successfully" });
            }
            else {
                res.status(404).json({ error: "Customer not found" });
            }
        }
        catch (error) {
            console.error("Error deleting Customer:", error.message || error);
            res.status(500).json({ error: "Failed to delete data" });
        }
    };
}
